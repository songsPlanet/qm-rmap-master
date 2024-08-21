import 'core-js/modules/es.error.cause.js';
import { createContext, useContext } from 'react';

var MapContext = /*#__PURE__*/createContext({
  map: null
});
var useMap = function useMap() {
  var context = useContext(MapContext);
  if (!context) {
    throw Error('只能在函数组件中使用');
  }
  return context;
};

export { MapContext, useMap };
