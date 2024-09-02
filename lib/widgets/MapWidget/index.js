"use strict";

var _typeof = require("@babel/runtime-corejs3/helpers/typeof");
var _WeakMap = require("@babel/runtime-corejs3/core-js-stable/weak-map");
var _Object$getOwnPropertyDescriptor2 = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.array.push.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
var _keys = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/keys"));
var _getOwnPropertySymbols = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols"));
var _filter = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/filter"));
var _getOwnPropertyDescriptor = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor"));
var _getOwnPropertyDescriptors = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/slicedToArray"));
var _includes = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/includes"));
var _find = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/find"));
var _react = _interopRequireWildcard(require("react"));
var _mapContext = require("../context/mapContext.js");
var _MapWrapper = _interopRequireDefault(require("../../wrapper/MapWrapper.js"));
var _GISToolHelper = _interopRequireDefault(require("../../GISToolHelper.js"));
require("mapbox-gl/dist/mapbox-gl.css");
var _lodash = require("lodash");
require("./index.css");
function _getRequireWildcardCache(e) { if ("function" != typeof _WeakMap) return null; var r = new _WeakMap(), t = new _WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && _Object$getOwnPropertyDescriptor2; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? _Object$getOwnPropertyDescriptor2(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function ownKeys(e, r) {
  var t = (0, _keys.default)(e);
  if (_getOwnPropertySymbols.default) {
    var o = (0, _getOwnPropertySymbols.default)(e);
    r && (o = (0, _filter.default)(o).call(o, function (r) {
      return (0, _getOwnPropertyDescriptor.default)(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
      (0, _defineProperty2.default)(e, r, t[r]);
    }) : _getOwnPropertyDescriptors.default ? Object.defineProperties(e, (0, _getOwnPropertyDescriptors.default)(t)) : ownKeys(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, (0, _getOwnPropertyDescriptor.default)(t, r));
    });
  }
  return e;
}
function MapWidget(props) {
  var mapOptions = props.mapOptions,
    mapLayerSettting = props.mapLayerSettting,
    children = props.children,
    onMapLoad = props.onMapLoad,
    className = props.className;
  var mapDom = (0, _react.useRef)(null);
  var _useState = (0, _react.useState)(false),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    mapInit = _useState2[0],
    setMapInit = _useState2[1];
  var _useRef = (0, _react.useRef)({
      map: null
    }),
    contextValue = _useRef.current;
  (0, _react.useEffect)(function () {
    var map = new _MapWrapper.default(_objectSpread(_objectSpread({
      pitch: 0,
      bearing: 0,
      attributionControl: false,
      renderWorldCopies: false,
      trackResize: true,
      preserveDrawingBuffer: true,
      style: {
        version: 8,
        glyphs: "font/{fontstack}/{range}.pbf",
        sources: {},
        layers: []
      }
    }, mapOptions), {}, {
      container: mapDom.current
    }));
    var loadLayers = function loadLayers() {
      map.load((0, _lodash.cloneDeep)(mapLayerSettting));
      setMapInit(true);
      if (contextValue) {
        contextValue.map = map;
      }
      onMapLoad === null || onMapLoad === void 0 || onMapLoad(map);
      map.images.forEach(function (item) {
        map.loadImage(item.url, function (error, image) {
          if (!error) {
            if (!map.hasImage(item.id)) map.addImage(item.id, image);
          } else throw error;
        });
      });
    };
    map.on('styleimagemissing', function (e) {
      var _context;
      var id = e.id;
      var prefix = 'icon-';
      // 检查缺失的图片ID是否以特定前缀开始
      if (!(0, _includes.default)(id).call(id, prefix)) return;
      // 在自定义图片数组中查找缺失的图片
      var customImage = (0, _find.default)(_context = map.images).call(_context, function (img) {
        return img.id === id;
      });
      if (!customImage) return; // 如果没有找到，则不做任何操作
      map.images.forEach(function (item) {
        if (item.id === id) {
          map.loadImage(item.url, function (error, image) {
            map.removeImage(id);
            if (!map.hasImage(id)) map.addImage(item.id, image);
          });
        }
      });
    });
    map.on('load', loadLayers);
    map.on('click', function (e) {
      console.log(e.lngLat, map.getCenter(), map.getZoom());
      console.log(map.getStyle());
    });
    var resizeMap = _GISToolHelper.default.debounce(function () {
      map.resize();
    }, 10);
    var ro = new ResizeObserver(resizeMap);
    ro.observe(mapDom === null || mapDom === void 0 ? void 0 : mapDom.current);
    return function () {
      map.off('load', loadLayers);
    };
  }, []);
  return /*#__PURE__*/_react.default.createElement("div", {
    ref: mapDom,
    className: className !== null && className !== void 0 ? className : 'map-wrapper',
    id: "map-wrapper"
  }, mapInit && contextValue && /*#__PURE__*/_react.default.createElement(_mapContext.MapContext.Provider, {
    value: contextValue
  }, children));
}
var index = exports.default = /*#__PURE__*/(0, _react.memo)(MapWidget);