import 'core-js/modules/es.array.push.js';
import 'core-js/modules/es.object.to-string.js';
import 'core-js/modules/web.dom-collections.for-each.js';
import _Object$keys from '@babel/runtime-corejs3/core-js-stable/object/keys';
import _Object$getOwnPropertySymbols from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols';
import _filterInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/filter';
import _Object$getOwnPropertyDescriptor from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor';
import _Object$getOwnPropertyDescriptors from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors';
import _defineProperty from '@babel/runtime-corejs3/helpers/defineProperty';
import _mapInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/map';
import { memo, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Popup } from 'mapbox-gl';
import './index.css';

function ownKeys(e, r) { var t = _Object$keys(e); if (_Object$getOwnPropertySymbols) { var o = _Object$getOwnPropertySymbols(e); r && (o = _filterInstanceProperty(o).call(o, function (r) { return _Object$getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : _Object$getOwnPropertyDescriptors ? Object.defineProperties(e, _Object$getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, _Object$getOwnPropertyDescriptor(t, r)); }); } return e; }
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
    map = _mapInstanceProperty(props),
    ifCenter = props.ifCenter;
  var container = useMemo(function () {
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
  var maskContainer = useMemo(function () {
    return document.getElementById('popup-mask-container');
  }, []);
  var popup = useMemo(function () {
    var options = _objectSpread(_objectSpread({}, props), {}, {
      maxWidth: 'none',
      className: 'mapboxgl-popup-wrapper'
    });
    var pp = new Popup(options).setLngLat(lngLat);
    pp.once('open', function (e) {
      document.getElementById('mapboxgl-popup');
      onOpen === null || onOpen === void 0 || onOpen(e);
      if (maskContainer && ifCenter) maskContainer.style.display = 'block';
    });
    return pp;
  }, []);
  useEffect(function () {
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
  useEffect(function () {
    if (popup.isOpen()) {
      popup.setLngLat(lngLat);
    }
  }, [lngLat]);
  useEffect(function () {
    var titleElem = document.getElementById('popup-title-wrap-id');
    titleElem.innerText = title;
  }, [title]);
  return /*#__PURE__*/createPortal(children, container);
};
var PopupWrapper$1 = /*#__PURE__*/memo(PopupWrapper);

export { PopupWrapper$1 as default };
