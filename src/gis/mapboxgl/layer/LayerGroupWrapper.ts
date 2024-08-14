import type MapWrapper from '../MapWrapper';
import type { TLayerGroupOptions } from '../typings';
import LayerWrapper from './LayerWrapper';

/**
 * 图层组
 * @description 多个图层作为一个对象控制
 */
class LayerGroupWrapper {
  private _options: TLayerGroupOptions;

  get options() {
    return this._options;
  }
  private _layers: Array<LayerGroupWrapper | LayerWrapper> = [];

  get layers() {
    return this._layers;
  }

  constructor(options: TLayerGroupOptions) {
    this._options = options;
    options.layers.forEach((item) => {
      let layer: LayerWrapper | LayerGroupWrapper;
      if ('layers' in item) {
        layer = new LayerGroupWrapper(item);
      } else {
        layer = new LayerWrapper(item);
      }
      this._layers.push(layer);
    });
  }

  onAdd(map: MapWrapper, beforeId?: string) {
    this._layers.forEach((layer) => {
      map.addLayerWrapper(layer, beforeId);
    });
    this.updateOptions();
  }

  onRemove(map: MapWrapper) {
    this._layers.forEach((layer) => {
      map.removeLayerWrapper(layer, false);
    });
    this.updateOptions();
  }

  private updateOptions() {
    // 更新group isAdd
    const isAdd = this._layers.findIndex((d) => d.options.isAdd) > -1;
    this._options.isAdd = isAdd;
  }
}

export default LayerGroupWrapper;
