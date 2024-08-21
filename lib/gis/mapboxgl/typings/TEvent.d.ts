import type LayerGroupWrapper from '../layer/LayerGroupWrapper';
import type LayerWrapper from '../layer/LayerWrapper';
import type MapWrapper from '../MapWrapper';
export declare enum MapEvent {
    /**
     * 地图初始化
     */
    MAPINITED = "MAPINITED",
    /**
     * 地图点击事件
     */
    MAPCLICKED = "MAPCLICKED",
    /**
     * 地图图层变化事件
     */
    MAPLAYERCHANGED = "MAPLAYERCHANGED",
    /**
     * 地图销毁
     */
    MAPDESTRORY = "MAPDESTRORY"
}
export type MapEventData = {
    map: MapWrapper;
    layer?: LayerWrapper | LayerGroupWrapper;
};
