import _slicedToArray from '@babel/runtime-corejs3/helpers/slicedToArray';
import React, { memo, useRef, useState, useEffect } from 'react';
import './index.css';

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
  var popoverRef = useRef(null);
  var _useState = useState(undefined),
    _useState2 = _slicedToArray(_useState, 2),
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
  useEffect(function () {
    setContainer(popoverRef.current);
    return function () {
      window.removeEventListener('mousemove', mousemove);
    };
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    ref: popoverRef,
    id: "flexibleContent",
    className: "flexibleContent"
  }, /*#__PURE__*/React.createElement("div", {
    className: "titlePop",
    style: contentStyle,
    onMouseDown: function onMouseDown(e) {
      return mousedown(e);
    },
    onMouseUp: function onMouseUp(e) {
      return mouseup();
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "text"
  }, title !== null && title !== void 0 ? title : ''), /*#__PURE__*/React.createElement("div", {
    className: "close",
    onClick: onclickHandle
  }, "x")), /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, children));
};
var index = /*#__PURE__*/memo(FlexibleContent);

export { index as default };
