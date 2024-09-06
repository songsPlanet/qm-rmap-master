"use strict";

var _typeof = require("@babel/runtime-corejs3/helpers/typeof");
var _WeakMap = require("@babel/runtime-corejs3/core-js-stable/weak-map");
var _Object$getOwnPropertyDescriptor = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/slicedToArray"));
var _react = _interopRequireWildcard(require("react"));
require("./index.css");
function _getRequireWildcardCache(e) { if ("function" != typeof _WeakMap) return null; var r = new _WeakMap(), t = new _WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && _Object$getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? _Object$getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var defaultXY = {
  x: 0,
  y: 0
};
var divOffset = {
  l: 0,
  t: 0
};
var FlexibleContent = function FlexibleContent(props) {
  var isOpenHandle = props.isOpenHandle,
    children = props.children,
    title = props.title,
    contentStyle = props.contentStyle;
  var popoverRef = (0, _react.useRef)(null);
  var _useState = (0, _react.useState)(undefined),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    container = _useState2[0],
    setContainer = _useState2[1];
  var onclickHandle = function onclickHandle() {
    isOpenHandle === null || isOpenHandle === void 0 || isOpenHandle();
  };
  var mousemove = function mousemove(e) {
    // 判断鼠标是否按住
    if (container) {
      // 获取x和y
      var nx = e.clientX;
      var ny = e.clientY;
      var nl = nx - (defaultXY.x - divOffset.l);
      var nt = ny - (defaultXY.y - divOffset.t);
      container.style.left = nl + 'px';
      container.style.top = nt + 'px';
    }
  };
  var mousedown = function mousedown(e) {
    e.preventDefault(); // 阻止事件默认行为
    defaultXY = {
      x: e.clientX,
      y: e.clientY
    };
    divOffset = {
      l: container === null || container === void 0 ? void 0 : container.offsetLeft,
      t: container === null || container === void 0 ? void 0 : container.offsetTop
    };
    window.addEventListener('mousemove', mousemove);
  };
  var mouseup = function mouseup() {
    window.removeEventListener('mousemove', mousemove);
  };
  (0, _react.useEffect)(function () {
    setContainer(popoverRef.current);
    return function () {
      window.removeEventListener('mousemove', mousemove);
    };
  }, []);
  return /*#__PURE__*/_react.default.createElement("div", {
    ref: popoverRef,
    id: "flexibleContent",
    className: "flexibleContent"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "titlePop",
    style: contentStyle,
    onMouseDown: function onMouseDown(e) {
      return mousedown(e);
    },
    onMouseUp: function onMouseUp(e) {
      return mouseup();
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "text"
  }, title !== null && title !== void 0 ? title : ''), /*#__PURE__*/_react.default.createElement("div", {
    className: "close",
    onClick: onclickHandle
  }, "x")), /*#__PURE__*/_react.default.createElement("div", {
    className: "container"
  }, children));
};
var index = exports.default = /*#__PURE__*/(0, _react.memo)(FlexibleContent);