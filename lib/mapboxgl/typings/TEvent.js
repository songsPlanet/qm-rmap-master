"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapEvent = void 0;
var MapEvent;
(function (MapEvent) {
  /**
   * 地图初始化
   */
  MapEvent["MAPINITED"] = "MAPINITED";
  /**
   * 地图点击事件
   */
  MapEvent["MAPCLICKED"] = "MAPCLICKED";
  /**
   * 地图图层变化事件
   */
  MapEvent["MAPLAYERCHANGED"] = "MAPLAYERCHANGED";
  /**
   * 地图销毁
   */
  MapEvent["MAPDESTRORY"] = "MAPDESTRORY";
})(MapEvent || (exports.MapEvent = MapEvent = {}));