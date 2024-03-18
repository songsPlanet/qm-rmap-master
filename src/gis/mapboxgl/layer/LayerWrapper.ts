import MapWrapper from '../MapWrapper';
import { TLayerOptions } from '../typings';
import BaseLayer from './BaseLayer';
import { VectorSource } from 'mapbox-gl';

/**
 * 图层扩展
 * @description extend BaseLayer
 */
class LayerWrapper extends BaseLayer {
  constructor(options: TLayerOptions) {
    super(options);
    this._options = options;
  }

  protected add(map: MapWrapper, beforeId?: string) {
    const { id, source, canUpdate } = this._options as TLayerOptions;
    let sourceId = this._options.id + '-ds';
    // 直接传id
    if (typeof source === 'string') {
      sourceId = source;
    }
    // add source
    const oldSource = map.getSource(sourceId);
    if (!oldSource && source && typeof source !== 'string') {
      map.addSource(sourceId, source);
    }

    if (canUpdate && oldSource?.type === 'vector') {
      oldSource.setTiles((source as VectorSource).tiles!);
    }

    // add layer
    const oldLayer = map.getLayer(id);
    const newSource = map.getSource(sourceId);
    if (!oldLayer && newSource) {
      const layerOptions = { ...(this._options as TLayerOptions), source: sourceId };
      map.addLayer(layerOptions, beforeId);
    }
  }
}

export default LayerWrapper;
