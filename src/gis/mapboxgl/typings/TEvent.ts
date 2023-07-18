import LayerGroupWrapper from '../layer/LayerGroupWrapper';
import LayerWrapper from '../layer/LayerWrapper';
import MapWrapper from '../MapWrapper';

export enum MapEvent {
  /**
   * 地图初始化
   */
  MAPINITED = 'MAPINITED',
  /**
   * 地图点击事件
   */
  MAPCLICKED = 'MAPCLICKED',
  /**
   * 地图图层变化事件
   */
  MAPLAYERCHANGED = 'MAPLAYERCHANGED',
  /**
   * 地图销毁
   */
  MAPDESTRORY = 'MAPDESTRORY',
}

export type MapEventData = {
  map: MapWrapper;
  layer?: LayerWrapper | LayerGroupWrapper;
};
