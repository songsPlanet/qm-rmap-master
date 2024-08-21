import type MapWrapper from '../MapWrapper';
import type { TLayerOptions } from '../typings';
declare abstract class BaseLayer {
    protected _options: TLayerOptions;
    get options(): TLayerOptions;
    constructor(options: TLayerOptions);
    protected abstract add(map: MapWrapper, beforeId?: string): void;
    onAdd(map: MapWrapper, beforeId?: string): void;
    onRemove(map: MapWrapper, removeSource?: boolean): void;
}
export default BaseLayer;
