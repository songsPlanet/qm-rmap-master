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
})(MapEvent || (MapEvent = {}));

export { MapEvent };
