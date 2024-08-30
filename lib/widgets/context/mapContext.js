"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useMap = exports.MapContext = void 0;
require("core-js/modules/es.error.cause.js");
var _map = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/map"));
var _react = require("react");
var MapContext = exports.MapContext = /*#__PURE__*/(0, _react.createContext)({
  map: null
});
var useMap = exports.useMap = function useMap() {
  var context = (0, _react.useContext)(MapContext);
  if (!context) {
    throw Error('MapContext is not provided correctly');
  }
  if ((0, _map.default)(context) === null) {
    // 处理 map 为 null 的情况，可能只是返回一个默认值或抛出一个错误
    throw new Error('MapWrapper is not available in the context');
  }
  return context;
};