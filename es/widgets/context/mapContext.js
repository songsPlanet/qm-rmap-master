import _mapInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/map';
import 'core-js/modules/es.error.cause.js';
import { createContext, useContext } from 'react';

var MapContext = /*#__PURE__*/createContext({
  map: null
});
var useMap = function useMap() {
  var context = useContext(MapContext);
  if (!context) {
    throw Error('MapContext is not provided correctly');
  }
  if (_mapInstanceProperty(context) === null) {
    // 处理 map 为 null 的情况，可能只是返回一个默认值或抛出一个错误
    throw new Error('MapWrapper is not available in the context');
  }
  return context;
};

export { MapContext, useMap };
