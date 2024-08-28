"use strict";

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
var _filter = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/filter"));
var _getOwnPropertyDescriptor = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor"));
var _getOwnPropertyDescriptors = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));
var _map = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/map"));
var _react = require("react");
var _reactDom = require("react-dom");
var _mapboxGl = require("mapbox-gl");
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
var defaultXY = {
  x: 0,
  y: 0
};
var divOffset = {
  l: 0,
  t: 0
};
var PopupWrapper = function PopupWrapper(props) {
  var children = props.children,
    lngLat = props.lngLat,
    onOpen = props.onOpen,
    onClose = props.onClose,
    enableDrag = props.enableDrag,
    title = props.title,
    map = (0, _map.default)(props),
    ifCenter = props.ifCenter;
  var container = (0, _react.useMemo)(function () {
    var content = document.createElement('div');
    content.className = 'popup-content-wrap';
    var header = document.createElement('div');
    header.className = 'popup-header-wrap';
    var titleDiv = document.createElement('div');
    titleDiv.className = 'popup-title-wrap';
    titleDiv.id = 'popup-title-wrap-id';
    titleDiv.innerText = title !== null && title !== void 0 ? title : '';
    header.appendChild(titleDiv);
    content.appendChild(header);
    return content;
  }, []);
  var maskContainer = (0, _react.useMemo)(function () {
    return document.getElementById('popup-mask-container');
  }, []);
  var popup = (0, _react.useMemo)(function () {
    var options = _objectSpread(_objectSpread({}, props), {}, {
      maxWidth: 'none',
      className: 'mapboxgl-popup-wrapper'
    });
    var pp = new _mapboxGl.Popup(options).setLngLat(lngLat);
    pp.once('open', function (e) {
      document.getElementById('mapboxgl-popup');
      onOpen === null || onOpen === void 0 || onOpen(e);
      if (maskContainer && ifCenter) maskContainer.style.display = 'block';
    });
    return pp;
  }, []);
  (0, _react.useEffect)(function () {
    var onCloseHandle = function onCloseHandle(e) {
      onClose === null || onClose === void 0 || onClose(e);
      if (maskContainer && ifCenter) maskContainer.style.display = 'none';
    };
    popup.on('close', onCloseHandle);
    map && popup.setDOMContent(container).addTo(map);
    var ppHeader = document.getElementsByClassName('popup-header-wrap')[0];
    var ppContainer = popup === null || popup === void 0 ? void 0 : popup._container;
    var mousedown = function mousedown(e) {
      e.preventDefault(); // 阻止事件默认行为
      defaultXY = {
        x: e.clientX,
        y: e.clientY
      };
      divOffset = {
        l: ppContainer.offsetLeft,
        t: ppContainer.offsetTop
      };
      ppHeader.addEventListener('mousemove', mousemove);
    };
    var mouseup = function mouseup() {
      ppHeader.removeEventListener('mousemove', mousemove);
    };
    var mousemove = function mousemove(e) {
      if (ppContainer) {
        // 获取x和y
        var nx = e.clientX;
        var ny = e.clientY;
        var nl = nx - (defaultXY.x - divOffset.l);
        var nt = ny - (defaultXY.y - divOffset.t);
        ppContainer.style.left = nl + 'px';
        ppContainer.style.top = nt + 'px';
      }
    };
    if (enableDrag) {
      ppHeader.addEventListener('mousedown', mousedown);
      ppHeader.addEventListener('mouseup', mouseup);
    }
    return function () {
      popup.off('close', onClose);
      if (maskContainer && ifCenter) maskContainer.style.display = 'none';
      ppHeader.removeEventListener('mousedown', mousedown);
      ppHeader.removeEventListener('mouseup', mouseup);
      if (popup.isOpen()) {
        popup.remove();
      }
    };
  }, []);
  (0, _react.useEffect)(function () {
    if (popup.isOpen()) {
      popup.setLngLat(lngLat);
    }
  }, [lngLat]);
  (0, _react.useEffect)(function () {
    var titleElem = document.getElementById('popup-title-wrap-id');
    titleElem.innerText = title;
  }, [title]);
  return /*#__PURE__*/(0, _reactDom.createPortal)(children, container);
};
var PopupWrapper$1 = exports.default = /*#__PURE__*/(0, _react.memo)(PopupWrapper);