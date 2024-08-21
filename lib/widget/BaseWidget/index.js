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
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/slicedToArray"));
var _jsxRuntime = require("react/jsx-runtime");
var _react = require("react");
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
var BaseWidget = function BaseWidget(props) {
  var position = props.position,
    children = props.children,
    name = props.name,
    icon = props.icon,
    width = props.width,
    height = props.height,
    openHandle = props.openHandle;
  var _useState = (0, _react.useState)(false),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    open = _useState2[0],
    setOpen = _useState2[1];
  var controlStyle = _objectSpread({
    width: open ? width !== null && width !== void 0 ? width : 30 : 30,
    height: open ? height !== null && height !== void 0 ? height : 30 : 30
  }, position);
  var onClickHandle = function onClickHandle() {
    if (openHandle) {
      openHandle(true);
      setOpen(!open);
    } else {
      setOpen(!open);
    }
  };
  return (0, _jsxRuntime.jsxs)("div", {
    className: "mapboxgl-control",
    style: controlStyle,
    children: [(0, _jsxRuntime.jsxs)("div", {
      className: "mapboxgl-bar",
      children: [(0, _jsxRuntime.jsx)("div", {
        className: "mapboxgl-bar-button",
        onClick: onClickHandle,
        title: name !== null && name !== void 0 ? name : '',
        style: {
          backgroundImage: "url(".concat(icon, ")")
        }
      }), name && (0, _jsxRuntime.jsx)("div", {
        className: "mapboxgl-bar-title",
        children: name
      })]
    }), open && children]
  });
};
var BaseWidget$1 = exports.default = /*#__PURE__*/(0, _react.memo)(BaseWidget);