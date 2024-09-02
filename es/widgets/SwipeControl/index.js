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
import _mapInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/map';
import React, { memo, useState, useCallback, useEffect } from 'react';
import 'mapbox-gl-compare/dist/mapbox-gl-compare.css';
import { useMap } from '../context/mapContext.js';
import Compare from 'mapbox-gl-compare';
import BaseWidget from '../BaseWidget/index.js';
import LayerList from '../LayerList/index.js';
import MapWidget from '../MapWidget/index.js';
import { Modal } from 'antd';
import './index.css';

function ownKeys(e, r) { var t = _Object$keys(e); if (_Object$getOwnPropertySymbols) { var o = _Object$getOwnPropertySymbols(e); r && (o = _filterInstanceProperty(o).call(o, function (r) { return _Object$getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : _Object$getOwnPropertyDescriptors ? Object.defineProperties(e, _Object$getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, _Object$getOwnPropertyDescriptor(t, r)); }); } return e; }
var SwipeIcon = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjcyMTk3MzE2MzYyIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9Ijk2NTIiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTUzNy4xIDkxMC4yYzAgNy44IDcuOSAwIDAgMHogbS00OS4yIDBjLTcuOSAwIDAgNy44IDAgMHogbTQzOC40LTY1Mi40Yy0yLjctMi41LTYuNC00LTEwLjEtNC0yLjggMC01LjQgMC44LTcuOCAyLjRsLTM3MS4zIDI0M1YxMjMuMWMwLTcuOC0xNi43IDAtMjQuNiAwLTcuOSAwLTI0LjYtNy44LTI0LjYgMHYzNzYuMmwtMzcxLjMtMjQzYy0yLjUtMS42LTUuMS0yLjQtNy45LTIuNC02LjkgMC0xNC40IDUuNC0xNC40IDE0LjJ2NDk3LjRjMCA4LjcgNy41IDE0LjEgMTQuNSAxNC4xIDIuNyAwIDUuNC0wLjggNy44LTIuNGwzNzEuMy0yNDN2Mzc2LjJoNDkuMlY1MzRsMzcxLjMgMjQzYzIuNSAxLjYgNS4xIDIuNCA3LjkgMi40IDMuNyAwIDcuNC0xLjUgMTAuMS00IDItMS44IDQuMy01LjEgNC4zLTEwLjFWMjY4YzAtNS4xLTIuNC04LjMtNC40LTEwLjJ6IiBmaWxsPSIjMTQwQTBBIiBwLWlkPSI5NjUzIj48L3BhdGg+PC9zdmc+';
var SwipeControl = function SwipeControl(props) {
  var _useMap = useMap(),
    map = _mapInstanceProperty(_useMap);
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    open = _useState2[0],
    setOpen = _useState2[1];
  var _useState3 = useState(null),
    _useState4 = _slicedToArray(_useState3, 2),
    beforeMap = _useState4[0],
    setBeforeMap = _useState4[1];
  var _useState5 = useState(null),
    _useState6 = _slicedToArray(_useState5, 2),
    afterMap = _useState6[0],
    setAfterMap = _useState6[1];
  var onOpenHandle = useCallback(function (value) {
    setOpen(!open);
  }, []);
  useEffect(function () {
    if (beforeMap && afterMap) {
      // 卷帘
      var container = document.getElementById('swipeContainer');
      if (container) {
        new Compare(beforeMap, afterMap, container, {
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
  return /*#__PURE__*/React.createElement(BaseWidget, {
    name: "\u5377\u5E18\u5BF9\u6BD4",
    openHandle: onOpenHandle,
    position: _objectSpread({}, props.position),
    icon: props.icon ? props.icon : SwipeIcon
  }, /*#__PURE__*/React.createElement(Modal, {
    title: "\u5377\u5E18\u5BF9\u6BD4",
    maskClosable: false,
    open: open,
    width: 1250,
    footer: null,
    onCancel: function onCancel() {
      return setOpen(false);
    },
    destroyOnClose: true
  }, /*#__PURE__*/React.createElement("div", {
    id: "swipeContainer",
    className: "mapboxgl-swipe"
  }, /*#__PURE__*/React.createElement(MapWidget, {
    mapOptions: _objectSpread(_objectSpread({}, map.options), {}, {
      id: 'swipeBeforeMap'
    }),
    mapLayerSettting: map.mapLayerSetting,
    onMapLoad: function onMapLoad(map) {
      return setBeforeMap(map);
    },
    className: "swipe-map-container"
  }, /*#__PURE__*/React.createElement(LayerList, {
    position: {
      top: 10,
      left: 10
    }
  })), /*#__PURE__*/React.createElement(MapWidget, {
    mapOptions: _objectSpread(_objectSpread({}, map.options), {}, {
      id: 'swipeAfterMap'
    }),
    mapLayerSettting: map.mapLayerSetting,
    onMapLoad: function onMapLoad(map) {
      return setAfterMap(map);
    },
    className: "swipe-map-container"
  }, /*#__PURE__*/React.createElement(LayerList, {
    position: {
      top: 10,
      right: 10
    }
  })))));
};
var index = /*#__PURE__*/memo(SwipeControl);

export { index as default };
