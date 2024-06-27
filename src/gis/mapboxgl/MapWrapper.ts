import { Map, LngLatBounds, LngLatLike, StyleFunction, Expression } from 'mapbox-gl';
import { transTreeToArr, getFeatureBoundingBox } from '../utils';
import LayerGroupWrapper from './layer/LayerGroupWrapper';
import LayerWrapper from './layer/LayerWrapper';
import { MapEvent } from './typings/TEvent';
import { TMapLayerSettting } from './typings/TLayerOptions';
import { TMapOptions } from './typings/TMapOptions';
import type { FeatureCollection } from '@turf/turf';
/**
 * 地图扩展类
 */
class MapWrapper extends Map {
  private _id: string;

  public get id(): string {
    return this._id;
  }

  /**
   * 获取mapOptions
   */
  private _options: TMapOptions;

  public get options() {
    return this._options;
  }

  /**
   * 获取MapLayerSettting
   */
  private _mapLayerSetting: TMapLayerSettting;

  public get mapLayerSetting() {
    return this._mapLayerSetting;
  }

  /**
   * 获取images列表
   * {
   *  id:"imageID",
   *  data:"base64字符串"
   * }[]
   */
  private _images: { id: string; data: string }[] = [];

  public get images() {
    return this._images;
  }

  // 绘制工具
  private _drawTool: any;
  get drawTool() {
    return this._drawTool;
  }
  set drawTool(value) {
    this._drawTool = value;
  }

  private _layers: Array<LayerWrapper | LayerGroupWrapper> = [];

  public get layers() {
    return this._layers;
  }

  constructor(options: TMapOptions) {
    super(options);
    this._options = options;
    this._id = options.id;
    this._mapLayerSetting = [];
    // 地图初始化
    this.fire(MapEvent.MAPINITED, { map: this });
  }

  /**
   * 返回初始地图位置
   */
  zoomHome() {
    const center = this._options.center;
    const zoom = this._options.zoom;
    this.flyTo({
      duration: 2000,
      center,
      zoom,
    });
  }

  getLayerWrapper(
    layers: Array<LayerWrapper | LayerGroupWrapper>,
    id: string,
  ): LayerWrapper | LayerGroupWrapper | undefined {
    for (const lyr of layers) {
      if (lyr.options.id === id) {
        return lyr;
      } else if ('layers' in lyr) {
        const temp = this.getLayerWrapper(lyr.layers, id);
        if (temp) {
          return temp;
        }
      }
    }
    return undefined;
  }

  addLayerWrapper(layer: LayerWrapper | LayerGroupWrapper, beforeId?: string) {
    layer.onAdd(this, beforeId);
    // 图层变化事件
    this.fire(MapEvent.MAPLAYERCHANGED, { map: this, layer: layer });
  }

  removeLayerWrapper(layer: LayerWrapper | LayerGroupWrapper, removeSource?: boolean) {
    layer.onRemove(this, removeSource);
    // 图层变化事件
    this.fire(MapEvent.MAPLAYERCHANGED, { map: this, layer: layer });
  }

  /**
   * 添加临时图层-和图层关联
   */
  addTemporaryWrapper(mapLayerSettting: TMapLayerSettting) {
    mapLayerSettting.forEach((layerOption) => {
      let lyrWrapper;
      if ('layers' in layerOption) {
        lyrWrapper = new LayerGroupWrapper(layerOption);
      } else {
        lyrWrapper = new LayerWrapper(layerOption);
      }
      const flag = this.getLayer(layerOption.id);
      if (flag) {
        // remove layer
        this.removeLayer(layerOption.id);
        this.removeSource(layerOption.id + '-ds');
        this.layers.pop();
      }
      this.addLayerWrapper(lyrWrapper);
      this.layers.push(lyrWrapper);
    });
  }

  load(mapLayerSettting: TMapLayerSettting) {
    this._mapLayerSetting = mapLayerSettting;
    mapLayerSettting.forEach((layerOption) => {
      let lyrWrapper;
      if ('layers' in layerOption) {
        lyrWrapper = new LayerGroupWrapper(layerOption);
      } else {
        lyrWrapper = new LayerWrapper(layerOption);
      }
      this.addLayerWrapper(lyrWrapper);
      this._layers.push(lyrWrapper);
    });
  }

  /**
   * 高亮要素-面/线
   */
  selectFeature(
    geo: GeoJSON.Feature<GeoJSON.Geometry> | GeoJSON.FeatureCollection<GeoJSON.Geometry> | string,
    id?: string,
    color?: string,
  ) {
    id ? this.clearSelect(id) : this.clearSelect();
    const dsId = id ? `${id}-location-ds` : 'location-ds';
    const lyrId = id ? `${id}-location-lyr` : 'location-lyr';
    this.addSource(dsId, {
      type: 'geojson',
      data: geo,
    });
    this.addLayer({
      id: lyrId,
      type: 'line',
      paint: {
        'line-color': color ?? '#00ffff',
        'line-width': 3,
      },
      source: dsId,
    });
  }
  /**
   * 高亮要素-点
   */
  selectCircleFeature(geo: GeoJSON.Feature<GeoJSON.Geometry> | GeoJSON.FeatureCollection<GeoJSON.Geometry>) {
    this.clearSelect('circle');
    const dsId = 'circle-location-ds';
    const lyrId = 'circle-location-lyr';
    this.addSource(dsId, {
      type: 'geojson',
      data: geo,
    });
    this.addLayer({
      id: lyrId,
      type: 'circle',
      paint: {
        'circle-color': '#00ffff',
        'circle-radius': 6,
        'circle-opacity': 0.3,
        'circle-stroke-width': 1,
        'circle-stroke-color': '#00ffff',
      },
      source: dsId,
    });
  }

  /**
   * 要素注记
   * geo：目标要素geometry
   * id：指定id，区分与一般高亮要素
   * filter：标注过滤条件：如['concat','保单号:  ',['get', 'policyNo'],'\n','险种:  ',['get', 'seedCodeNames']]
   */
  selectSymbolFeature(
    geo: GeoJSON.Feature<GeoJSON.Geometry> | GeoJSON.FeatureCollection<GeoJSON.Geometry> | string,
    id: string,
    color?: string,
    filter?: string | StyleFunction | Expression | undefined,
  ) {
    this.clearSelect(id);
    const dsId = `${id}-location-ds`;
    const lyrId = `${id}-location-lyr`;
    this.addSource(dsId, {
      type: 'geojson',
      data: geo,
    });
    this.addLayer({
      id: lyrId,
      type: 'symbol',
      minzoom: 10,
      layout: {
        'text-size': 14,
        'text-field': filter ?? 'test',
        'text-justify': 'auto',
        'symbol-placement': 'point',
        'text-radial-offset': 0.5,
        'text-font': ['Open Sans Regular'],
        'text-variable-anchor': ['top', 'bottom', 'left', 'right'],
      },
      paint: {
        'text-color': color ? color : '#F320BE', // 玫红
        'text-halo-width': 2,
        'text-halo-color': 'white',
      },
      source: dsId,
    });
  }

  clearSelect(id?: string) {
    const dsId = id ? `${id}-location-ds` : 'location-ds';
    const lyrId = id ? `${id}-location-lyr` : 'location-lyr';
    const flag = this.getLayer(lyrId);
    if (flag) {
      this.removeLayer(lyrId);
      this.removeSource(dsId);
    }
  }

  /**
   * 查找有效beforeId
   */
  findValidBeforeId(layerId: string) {
    const lyrList = this.getLayerList();
    const layerIndex = lyrList.findIndex((d) => d.options.id === layerId);
    if (layerIndex > -1) {
      for (let i: any = layerIndex; i < lyrList.length; i++) {
        const beforeLayer = this.getLayer(lyrList[i].options.id);
        if (beforeLayer) {
          return beforeLayer.id;
        }
      }
    }
    return undefined;
  }

  /**
   * 获取图层列表(偏平化数组)
   */
  getLayerList() {
    const lyrList: Array<LayerWrapper | LayerGroupWrapper> = [];
    transTreeToArr(lyrList, this.layers);
    return lyrList;
  }

  /**
   * 地图销毁
   */
  destory() {
    this.fire(MapEvent.MAPDESTRORY, { map: this });
    this.remove();
  }

  /**
   * 单个要素地图定位
   */
  locationFeature(featCol: FeatureCollection) {
    const bds = new LngLatBounds();
    featCol.features.forEach((d: any) => {
      bds.extend(getFeatureBoundingBox(d));
    });
    this.fitBounds(bds, { maxZoom: 16 });
  }

  /**
   * 多个要素的地图定位
   */
  locationFeatures(featCols: FeatureCollection[]) {
    const bds = new LngLatBounds();
    featCols.forEach((featCol: any) => {
      featCol.features.forEach((d: any) => {
        bds.extend(getFeatureBoundingBox(d));
      });
    });
    this.fitBounds(bds, { maxZoom: 16 });
  }

  /**
   * 获取地图四至：
   * @returns {[[*, *], [*, *], [*, *], [*, *]]}
   */
  getMapExtent = () => {
    const xmin = this.getBounds().getWest();
    const xmax = this.getBounds().getEast();
    const ymin = this.getBounds().getSouth();
    const ymax = this.getBounds().getNorth();
    return [
      [xmin, ymax],
      [xmax, ymax],
      [xmax, ymin],
      [xmin, ymin],
    ];
  };
  /**
   * 获取lnglatBounds四至：
   * @returns {[[*, *], [*, *], [*, *], [*, *]]}
   */
  getBoundsExtent = (bounds: LngLatBounds) => {
    const xmin = bounds.getWest();
    const xmax = bounds.getEast();
    const ymin = bounds.getSouth();
    const ymax = bounds.getNorth();
    return [
      [xmin, ymax],
      [xmax, ymax],
      [xmax, ymin],
      [xmin, ymin],
    ];
  };

  /**
   * 给线矢量添加动态效果
   * @param sourceid 线矢量sourceid
   */
  addDashLayer(sourceid: string) {
    const that = this;
    this.addLayer({
      id: 'line-dashed',
      type: 'line',
      source: sourceid,
      paint: {
        'line-color': '#3FB2BF',
        'line-width': 3,
        'line-dasharray': [0, 4, 3],
      },
    });
    const dashArraySequence = [
      [0, 4, 3],
      [0.5, 4, 2.5],
      [1, 4, 2],
      [1.5, 4, 1.5],
      [2, 4, 1],
      [2.5, 4, 0.5],
      [3, 4, 0],
      [0, 0.5, 3, 3.5],
      [0, 1, 3, 3],
      [0, 1.5, 3, 2.5],
      [0, 2, 3, 2],
      [0, 2.5, 3, 1.5],
      [0, 3, 3, 1],
      [0, 3.5, 3, 0.5],
    ];
    let step = 0;
    const animateDashArray = (timestamp: any) => {
      const newStep = parseInt(((timestamp / 80) % dashArraySequence.length) as any);

      if (newStep !== step) {
        that.setPaintProperty('line-dashed', 'line-dasharray', dashArraySequence[step]);
        step = newStep;
      }

      // Request the next frame of the animation.
      requestAnimationFrame(animateDashArray);
    };
    animateDashArray(0);
  }

  /**
   * 创建Point的FeatureCollection
   * lon：经度
   * lat: 纬度
   * @returns {{}}
   */
  createPointFeatureCollection = (lon: number, lat: number) => {
    return {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [lon, lat],
          },
        },
      ],
    };
  };

  /**
   *创建lineString的geojson 数据
   * coordinates ：[[],[],...]
   * @returns {{}}
   */
  createLineFeatureCollection = (coords: any) => {
    return {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: coords,
          },
        },
      ],
    };
  };

  /**
   *创建Polygon的geojson 数据
   * coords ：[[],[],...]
   * @returns {{}}
   */
  createPolygonFeatureCollection = (coords: any) => {
    return {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: [coords],
          },
        },
      ],
    };
  };
}

export default MapWrapper;
