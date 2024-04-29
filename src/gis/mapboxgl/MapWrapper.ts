import { Map, LngLatBounds, StyleFunction, Expression } from 'mapbox-gl';
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
  selectFeature(geo: GeoJSON.Feature<GeoJSON.Geometry> | GeoJSON.FeatureCollection<GeoJSON.Geometry> | string) {
    this.clearSelect();
    const dsId = 'location-ds';
    const lyrId = 'location-lyr';
    this.addSource(dsId, {
      type: 'geojson',
      data: geo,
    });
    this.addLayer({
      id: lyrId,
      type: 'line',
      paint: {
        'line-color': '#00ffff',
        'line-width': 2,
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
   * filter：标注过滤条件
   * filter-example ['concat','保单号:  ',['get', 'policyNo'],'\n','险种:  ',['get', 'seedCodeNames']]
   */
  selectSymbolFeature(
    geo: GeoJSON.Feature<GeoJSON.Geometry> | GeoJSON.FeatureCollection<GeoJSON.Geometry> | string,
    id?: string,
    filter?: string | StyleFunction | Expression | undefined,
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
      type: 'symbol',
      minzoom: 10,
      layout: {
        'text-field': filter ?? '',
        'text-font': ['Open Sans Regular'],
        'text-size': 14,
        'symbol-placement': 'point',
      },
      paint: {
        'text-color': '#F320BE', // 玫红
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
   * 地图定位
   */
  locationFeatureByBounds(featCol: FeatureCollection) {
    const bds = new LngLatBounds();
    featCol.features.forEach((d: any) => {
      bds.extend(getFeatureBoundingBox(d));
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
   * 根据坐标点数据创建线矢量
   * @returns {{}}
   */
  createLineFeatureCollection = (coordinates: any) => {
    return {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: coordinates,
          },
        },
      ],
    };
  };
}

export default MapWrapper;
