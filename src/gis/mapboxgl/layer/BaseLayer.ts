import MapWrapper from '../MapWrapper';
import { TLayerOptions } from '../typings';

abstract class BaseLayer {
  protected _options: TLayerOptions;

  get options() {
    return this._options;
  }

  constructor(options: TLayerOptions) {
    this._options = options;
  }

  protected abstract add(map: MapWrapper, beforeId?: string): void;

  onAdd(map: MapWrapper, beforeId?: string) {
    // isAdd
    if (this._options.isAdd === false) {
      this._options.isAdd = false;
      return;
    }
    // 查找有效beforeId
    beforeId = map.findValidBeforeId(this._options.id);
    this.add(map, beforeId);
    // isAdd:true
    this._options.isAdd = true;
  }

  onRemove(map: MapWrapper, removeSource?: boolean) {
    if (this._options.isAdd) {
      return;
    }
    const flag = map.getLayer(this._options.id);
    if (flag) {
      // remove layer
      map.removeLayer(this._options.id);
    }
    const sourceId = this._options.id + '-ds';
    // remove source
    if (removeSource) {
      map.removeSource(sourceId);
    }
    // isAdd:false
    this._options.isAdd = false;
  }
}
export default BaseLayer;
