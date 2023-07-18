import { Map } from 'mapbox-gl';
import { transTreeToArr } from '../utils';
import LayerGroupWrapper from './layer/LayerGroupWrapper';
import LayerWrapper from './layer/LayerWrapper';
import { MapEvent } from './typings/TEvent';
import { TMapLayerSettting } from './typings/TLayerOptions';
import { TMapOptions } from './typings/TMapOptions';
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

  clearSelect() {
    const dsId = 'location-ds';
    const lyrId = 'location-lyr';
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
}

export default MapWrapper;
