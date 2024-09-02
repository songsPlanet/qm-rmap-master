"use strict";

var _typeof = require("@babel/runtime-corejs3/helpers/typeof");
var _WeakMap = require("@babel/runtime-corejs3/core-js-stable/weak-map");
var _Object$getOwnPropertyDescriptor2 = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _modal = _interopRequireDefault(require("antd/lib/modal"));
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
var _map = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/map"));
var _react = _interopRequireWildcard(require("react"));
require("mapbox-gl-compare/dist/mapbox-gl-compare.css");
var _mapContext = require("../context/mapContext.js");
var _mapboxGlCompare2 = _interopRequireDefault(require("mapbox-gl-compare"));
var _index = _interopRequireDefault(require("../BaseWidget/index.js"));
var _index2 = _interopRequireDefault(require("../LayerList/index.js"));
var _index3 = _interopRequireDefault(require("../MapWidget/index.js"));
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
var SwipeIcon = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjcyMTk3MzE2MzYyIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9Ijk2NTIiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTUzNy4xIDkxMC4yYzAgNy44IDcuOSAwIDAgMHogbS00OS4yIDBjLTcuOSAwIDAgNy44IDAgMHogbTQzOC40LTY1Mi40Yy0yLjctMi41LTYuNC00LTEwLjEtNC0yLjggMC01LjQgMC44LTcuOCAyLjRsLTM3MS4zIDI0M1YxMjMuMWMwLTcuOC0xNi43IDAtMjQuNiAwLTcuOSAwLTI0LjYtNy44LTI0LjYgMHYzNzYuMmwtMzcxLjMtMjQzYy0yLjUtMS42LTUuMS0yLjQtNy45LTIuNC02LjkgMC0xNC40IDUuNC0xNC40IDE0LjJ2NDk3LjRjMCA4LjcgNy41IDE0LjEgMTQuNSAxNC4xIDIuNyAwIDUuNC0wLjggNy44LTIuNGwzNzEuMy0yNDN2Mzc2LjJoNDkuMlY1MzRsMzcxLjMgMjQzYzIuNSAxLjYgNS4xIDIuNCA3LjkgMi40IDMuNyAwIDcuNC0xLjUgMTAuMS00IDItMS44IDQuMy01LjEgNC4zLTEwLjFWMjY4YzAtNS4xLTIuNC04LjMtNC40LTEwLjJ6IiBmaWxsPSIjMTQwQTBBIiBwLWlkPSI5NjUzIj48L3BhdGg+PC9zdmc+';
var SwipeControl = function SwipeControl(props) {
  var _useMap = (0, _mapContext.useMap)(),
    map = (0, _map.default)(_useMap);
  var _useState = (0, _react.useState)(false),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    open = _useState2[0],
    setOpen = _useState2[1];
  var _useState3 = (0, _react.useState)(null),
    _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
    beforeMap = _useState4[0],
    setBeforeMap = _useState4[1];
  var _useState5 = (0, _react.useState)(null),
    _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
    afterMap = _useState6[0],
    setAfterMap = _useState6[1];
  var onOpenHandle = (0, _react.useCallback)(function (value) {
    setOpen(!open);
  }, []);
  (0, _react.useEffect)(function () {
    if (beforeMap && afterMap) {
      // 卷帘
      var container = document.getElementById('swipeContainer');
      if (container) {
        new _mapboxGlCompare2.default(beforeMap, afterMap, container, {
          mousemove: false,
          orientation: 'vertical'
        });
        beforeMap.setCenter(map.getCenter());
        beforeMap.setZoom(map.getZoom());
        beforeMap.setBearing(map.getBearing());
        afterMap.setPitch(map.getPitch());
      }
    }
  }, [beforeMap, afterMap]);
  return /*#__PURE__*/_react.default.createElement(_index.default, {
    name: "\u5377\u5E18\u5BF9\u6BD4",
    openHandle: onOpenHandle,
    position: _objectSpread({}, props.position),
    icon: props.icon ? props.icon : SwipeIcon
  }, /*#__PURE__*/_react.default.createElement(_modal.default, {
    title: "\u5377\u5E18\u5BF9\u6BD4",
    maskClosable: false,
    open: open,
    width: 1250,
    footer: null,
    onCancel: function onCancel() {
      return setOpen(false);
    },
    destroyOnClose: true
  }, /*#__PURE__*/_react.default.createElement("div", {
    id: "swipeContainer",
    className: "mapboxgl-swipe"
  }, /*#__PURE__*/_react.default.createElement(_index3.default, {
    mapOptions: _objectSpread(_objectSpread({}, map.options), {}, {
      id: 'swipeBeforeMap'
    }),
    mapLayerSettting: map.mapLayerSetting,
    onMapLoad: function onMapLoad(map) {
      return setBeforeMap(map);
    },
    className: "swipe-map-container"
  }, /*#__PURE__*/_react.default.createElement(_index2.default, {
    position: {
      top: 10,
      left: 10
    }
  })), /*#__PURE__*/_react.default.createElement(_index3.default, {
    mapOptions: _objectSpread(_objectSpread({}, map.options), {}, {
      id: 'swipeAfterMap'
    }),
    mapLayerSettting: map.mapLayerSetting,
    onMapLoad: function onMapLoad(map) {
      return setAfterMap(map);
    },
    className: "swipe-map-container"
  }, /*#__PURE__*/_react.default.createElement(_index2.default, {
    position: {
      top: 10,
      right: 10
    }
  })))));
};
var index = exports.default = /*#__PURE__*/(0, _react.memo)(SwipeControl);