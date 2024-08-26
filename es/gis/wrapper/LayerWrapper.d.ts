import type { TLayerOptions } from '../typings';
import type MapWrapper from './MapWrapper';
import BaseLayer from './BaseLayer';
/**
 * 图层扩展
 * @description extend BaseLayer
 */
declare class LayerWrapper extends BaseLayer {
    constructor(options: TLayerOptions);
    protected add(map: MapWrapper, beforeId?: string): void;
}
export default LayerWrapper;
