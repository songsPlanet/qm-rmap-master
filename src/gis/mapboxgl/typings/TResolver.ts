import { GeoJSONSource } from 'mapbox-gl';

export interface IGeoJSONResolver {
  /**
   * 数据加载
   */
  load: (source: GeoJSONSource) => Promise<any>;
  /**
   * 数据卸载
   */
  unload?: () => void;
}

/**
 * 处理自动更新的图层
 */
export interface IDynamicResolver extends IGeoJSONResolver {
  timer: NodeJS.Timer;
}
/**
 * 处理websocket自动更新图层
 */
export interface IWebSocketResolver extends IGeoJSONResolver {
  webSocket: WebSocket;
}

export type IDataResolver = IGeoJSONResolver | IDynamicResolver | IWebSocketResolver;
