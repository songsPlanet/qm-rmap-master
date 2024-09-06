import 'core-js/modules/es.array.push.js';
import _Object$keys from '@babel/runtime-corejs3/core-js-stable/object/keys';
import _Object$getOwnPropertySymbols from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols';
import _filterInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/filter';
import _Object$getOwnPropertyDescriptor from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor';
import _Object$getOwnPropertyDescriptors from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors';
import _defineProperty from '@babel/runtime-corejs3/helpers/defineProperty';
import _slicedToArray from '@babel/runtime-corejs3/helpers/slicedToArray';
import _includesInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/includes';
import _findInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/find';
import 'core-js/modules/es.array.map.js';
import 'core-js/modules/es.object.to-string.js';
import 'core-js/modules/web.dom-collections.for-each.js';
import React, { memo, useRef, useState, useEffect } from 'react';
import { getPulsingDot } from '../../animation/pulsingDot.js';
import { MapContext } from '../context/mapContext.js';
import MapWrapper from '../../wrapper/MapWrapper.js';
import GisToolHelper from '../../GISToolHelper.js';
import 'mapbox-gl/dist/mapbox-gl.css';
import { cloneDeep } from 'lodash';
import './index.css';

function ownKeys(e, r) { var t = _Object$keys(e); if (_Object$getOwnPropertySymbols) { var o = _Object$getOwnPropertySymbols(e); r && (o = _filterInstanceProperty(o).call(o, function (r) { return _Object$getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : _Object$getOwnPropertyDescriptors ? Object.defineProperties(e, _Object$getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, _Object$getOwnPropertyDescriptor(t, r)); }); } return e; }
function MapWidget(props) {
  var mapOptions = props.mapOptions,
    mapLayerSettting = props.mapLayerSettting,
    children = props.children,
    onMapLoad = props.onMapLoad,
    className = props.className;
  var mapDom = useRef(null);
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    mapInit = _useState2[0],
    setMapInit = _useState2[1];
  var _useRef = useRef({
      map: null
    }),
    contextValue = _useRef.current;
  useEffect(function () {
    var map = new MapWrapper(_objectSpread(_objectSpread({
      pitch: 0,
      bearing: 0,
      attributionControl: false,
      renderWorldCopies: false,
      trackResize: true,
      preserveDrawingBuffer: true,
      style: {
        version: 8,
        glyphs: "font/{fontstack}/{range}.pbf",
        sources: {},
        layers: []
      }
    }, mapOptions), {}, {
      container: mapDom.current
    }));
    var loadLayers = function loadLayers() {
      map.load(cloneDeep(mapLayerSettting));
      setMapInit(true);
      if (contextValue) {
        contextValue.map = map;
      }
      // 添加动态点图标
      var redAnimationImg = getPulsingDot(map);
      map.addImage('redAnimationImg', redAnimationImg, {
        pixelRatio: 2
      });
      if (contextValue) {
        contextValue.map = map;
      }
      onMapLoad === null || onMapLoad === void 0 || onMapLoad(map);
      map.images.forEach(function (item) {
        map.loadImage(item.url, function (error, image) {
          if (!error) {
            if (!map.hasImage(item.id)) map.addImage(item.id, image);
          } else throw error;
        });
      });
    };
    map.on('styleimagemissing', function (e) {
      var _context;
      var id = e.id;
      var prefix = 'icon-';
      // 检查缺失的图片ID是否以特定前缀开始
      if (!_includesInstanceProperty(id).call(id, prefix)) return;
      // 在自定义图片数组中查找缺失的图片
      var customImage = _findInstanceProperty(_context = map.images).call(_context, function (img) {
        return img.id === id;
      });
      if (!customImage) return; // 如果没有找到，则不做任何操作
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
    map.on('click', function (e) {
      console.log(e.lngLat, map.getCenter(), map.getZoom());
      console.log(map.getStyle());
    });
    var resizeMap = GisToolHelper.debounce(function () {
      map.resize();
    }, 10);
    var ro = new ResizeObserver(resizeMap);
    ro.observe(mapDom === null || mapDom === void 0 ? void 0 : mapDom.current);
    return function () {
      map.off('load', loadLayers);
    };
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    ref: mapDom,
    className: className !== null && className !== void 0 ? className : 'map-wrapper',
    id: "map-wrapper"
  }, mapInit && contextValue && /*#__PURE__*/React.createElement(MapContext.Provider, {
    value: contextValue
  }, children));
}
var MapWidget$1 = /*#__PURE__*/memo(MapWidget);

export { MapWidget$1 as default };
