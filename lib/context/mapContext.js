"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useMap = exports.MapContext = void 0;
require("core-js/modules/es.error.cause.js");
var _react = require("react");
var MapContext = exports.MapContext = /*#__PURE__*/(0, _react.createContext)({
  map: null
});
var useMap = exports.useMap = function useMap() {
  var context = (0, _react.useContext)(MapContext);
  if (!context) {
    throw Error('只能在函数组件中使用');
  }
  return context;
};