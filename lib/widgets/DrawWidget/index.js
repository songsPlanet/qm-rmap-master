"use strict";

var _typeof = require("@babel/runtime-corejs3/helpers/typeof");
var _WeakMap = require("@babel/runtime-corejs3/core-js-stable/weak-map");
var _Object$getOwnPropertyDescriptor2 = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.array.push.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
var _keys = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/keys"));
var _getOwnPropertySymbols = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols"));
var _getOwnPropertyDescriptor = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor"));
var _getOwnPropertyDescriptors = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/slicedToArray"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));
var _map = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/map"));
var _filter = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/filter"));
var _react = _interopRequireWildcard(require("react"));
var _mapboxGlDrawRectangleMode = _interopRequireDefault(require("mapbox-gl-draw-rectangle-mode"));
require("@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css");
var _GISToolHelper = _interopRequireDefault(require("../../GISToolHelper.js"));
var _mapboxGlDraw2 = _interopRequireDefault(require("@mapbox/mapbox-gl-draw"));
var _constant = require("./constant.js");
var _mapboxGl = require("mapbox-gl");
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
var DrawWidget = function DrawWidget(props) {
  var position = props.position,
    map = (0, _map.default)(props);
  var controlStyle = _objectSpread({}, position);
  var _useState = (0, _react.useState)('none'),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2);
  _useState2[0];
  var setMode = _useState2[1];
  var markerRef = (0, _react.useRef)([]);
  var featureRef = (0, _react.useRef)([{
    id: ''
  }]);
  var selectedModeHandle = function selectedModeHandle(type) {
    setMode(type);
    if (map.drawTool) {
      map.drawTool.changeMode(type);
    }
  };
  var clearAllHandle = function clearAllHandle() {
    setMode('simple_select');
    if (map.drawTool) {
      map.drawTool.deleteAll();
      map.drawTool.changeMode('simple_select');
      markerRef.current.forEach(function (item) {
        item.remove();
      });
    }
  };
  // 添加关闭按钮
  var addMarkerHandle = function addMarkerHandle(e) {
    var box = _GISToolHelper.default.getFeatureBoundingBox(e.features[0]);
    var _ele = document.createElement('div');
    _ele.setAttribute('class', 'measureResultClose');
    _ele.setAttribute('id', e.features[0].id);
    _ele.innerHTML = '×';
    var closeMarker = new _mapboxGl.Marker({
      element: _ele,
      anchor: 'bottom-left',
      offset: [-5, -10]
    }).setLngLat(box.getCenter()).addTo(map);
    markerRef.current.push(closeMarker);
    _ele.onclick = function (e) {
      e.stopPropagation();
      map.drawTool.delete(_ele.getAttribute('id'));
      closeMarker.remove();
    };
  };
  var updatetDraw = function updatetDraw(e) {
    var _context, _context2;
    (0, _map.default)(_context = (0, _filter.default)(_context2 = markerRef.current).call(_context2, function (item) {
      return item._element.getAttribute('id') === e.features[0].id;
    })).call(_context, function (d) {
      d.remove();
      return null;
    });
    addMarkerHandle(e);
  };
  var creatDraw = function creatDraw(e) {
    if (featureRef.current[0].id !== e.features[0].id) {
      featureRef.current = e.features;
      addMarkerHandle(e);
    }
  };
  (0, _react.useEffect)(function () {
    if (!map.drawTool) {
      map.drawTool = new _mapboxGlDraw2.default({
        displayControlsDefault: false,
        modes: _objectSpread(_objectSpread({}, _mapboxGlDraw2.default.modes), {}, {
          draw_rectangle: _mapboxGlDrawRectangleMode.default
        }),
        defaultMode: 'simple_select'
      });
      map.addControl(map.drawTool, 'bottom-right');
      map.on('draw.create', creatDraw);
      map.on('draw.update', updatetDraw);
    }
  }, []);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "mapboxgl-draw",
    style: controlStyle
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "mapboxgl-draw-bar"
  }, /*#__PURE__*/_react.default.createElement("div", null, (0, _map.default)(_constant.drawToolList).call(_constant.drawToolList, function (item) {
    return /*#__PURE__*/_react.default.createElement("div", {
      key: item.mode,
      title: item.title,
      className: "mapboxgl-draw-bar-button",
      style: {
        backgroundImage: "url(".concat(item.icon, ")")
      },
      onClick: item.mode === 'simple_select' ? function () {
        return clearAllHandle();
      } : function () {
        return selectedModeHandle(item.mode);
      }
    });
  }))));
};
var index = exports.default = /*#__PURE__*/(0, _react.memo)(DrawWidget);