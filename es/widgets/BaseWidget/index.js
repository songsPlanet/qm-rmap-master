import 'core-js/modules/es.array.push.js';
import 'core-js/modules/es.object.to-string.js';
import 'core-js/modules/web.dom-collections.for-each.js';
import _Object$keys from '@babel/runtime-corejs3/core-js-stable/object/keys';
import _Object$getOwnPropertySymbols from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols';
import _filterInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/filter';
import _Object$getOwnPropertyDescriptor from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor';
import _Object$getOwnPropertyDescriptors from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors';
import _defineProperty from '@babel/runtime-corejs3/helpers/defineProperty';
import _slicedToArray from '@babel/runtime-corejs3/helpers/slicedToArray';
import { jsxs, jsx } from 'react/jsx-runtime';
import { memo, useState } from 'react';
import './index.css';

function ownKeys(e, r) { var t = _Object$keys(e); if (_Object$getOwnPropertySymbols) { var o = _Object$getOwnPropertySymbols(e); r && (o = _filterInstanceProperty(o).call(o, function (r) { return _Object$getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : _Object$getOwnPropertyDescriptors ? Object.defineProperties(e, _Object$getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, _Object$getOwnPropertyDescriptor(t, r)); }); } return e; }
var BaseWidget = function BaseWidget(props) {
  var position = props.position,
    children = props.children,
    name = props.name,
    icon = props.icon,
    width = props.width,
    height = props.height,
    openHandle = props.openHandle;
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
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
  return jsxs("div", {
    className: "mapboxgl-control",
    style: controlStyle,
    children: [jsxs("div", {
      className: "mapboxgl-bar",
      children: [jsx("div", {
        className: "mapboxgl-bar-button",
        onClick: onClickHandle,
        title: name !== null && name !== void 0 ? name : '',
        style: {
          backgroundImage: "url(".concat(icon, ")")
        }
      }), name && jsx("div", {
        className: "mapboxgl-bar-title",
        children: name
      })]
    }), open && children]
  });
};
var BaseWidget$1 = /*#__PURE__*/memo(BaseWidget);

export { BaseWidget$1 as default };
