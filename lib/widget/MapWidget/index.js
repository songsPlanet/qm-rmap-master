"use strict";

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
var _jsxRuntime = require("react/jsx-runtime");
var _react = require("react");
var _mapContext = require("../../context/mapContext.js");
var _pulsingDot = require("../../animation/pulsingDot.js");
var _MapWrapper = _interopRequireDefault(require("../../mapboxgl/MapWrapper.js"));
var _utils = require("../../utils.js");
require("mapbox-gl/dist/mapbox-gl.css");
var _lodash = require("lodash");
require("./index.css");
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
      attributionControl: false,
      renderWorldCopies: false,
      trackResize: true,
      preserveDrawingBuffer: true
    }, mapOptions), {}, {
      container: mapDom.current,
      style: {
        version: 8,
        glyphs: "/font/{fontstack}/{range}.pbf",
        sources: {},
        layers: []
      }
    }));
    var loadLayers = function loadLayers() {
      map.load((0, _lodash.cloneDeep)(mapLayerSettting));
      setMapInit(true);
      // map.showTileBoundaries=true // 瓦片
      // 添加动态点图标
      var redAnimationImg = (0, _pulsingDot.getPulsingDot)(map);
      map.addImage('redAnimationImg', redAnimationImg, {
        pixelRatio: 2
      });
      if (contextValue) {
        contextValue.map = map;
      }
      onMapLoad === null || onMapLoad === void 0 || onMapLoad(map);
      // 添加其他图标资源
      map.images.forEach(function (item) {
        map.loadImage(item.url, function (error, image) {
          if (!error) {
            if (!map.hasImage(item.id)) map.addImage(item.id, image);
          } else throw error;
        });
      });
    };
    map.on('styleimagemissing', function (e) {
      var id = e.id;
      var prefix = 'icon-';
      if (!(0, _includes.default)(id).call(id, prefix)) return;
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
    // map.showTileBoundaries = true;
    map.on('click', function (e) {
      // const vecterTile=map.querySourceFeatures("wh_sy-ds")
      // const vecterTile3=map.queryRenderedFeatures()
      console.log(e.lngLat);
      console.log(map.getCenter(), map.getZoom(), map.getBounds());
    });
    var resizeMap = (0, _utils.debounce)(function () {
      map.resize();
    }, 10);
    var ro = new ResizeObserver(resizeMap);
    ro.observe(mapDom === null || mapDom === void 0 ? void 0 : mapDom.current);
    return function () {
      map.off('load', loadLayers);
    };
  }, []);
  return (0, _jsxRuntime.jsx)("div", {
    ref: mapDom,
    className: className !== null && className !== void 0 ? className : 'map-wrapper',
    id: "map-wrapper",
    children: mapInit && contextValue && (0, _jsxRuntime.jsx)(_mapContext.MapContext.Provider, {
      value: contextValue,
      children: children
    })
  });
}
var index = exports.default = /*#__PURE__*/(0, _react.memo)(MapWidget);