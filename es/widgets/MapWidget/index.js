import 'core-js/modules/es.array.push.js';
import _Object$keys from '@babel/runtime-corejs3/core-js-stable/object/keys';
import _Object$getOwnPropertySymbols from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols';
import _filterInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/filter';
import _Object$getOwnPropertyDescriptor from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor';
import _Object$getOwnPropertyDescriptors from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors';
import _defineProperty from '@babel/runtime-corejs3/helpers/defineProperty';
import _slicedToArray from '@babel/runtime-corejs3/helpers/slicedToArray';
import _includesInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/includes';
import 'core-js/modules/es.array.map.js';
import 'core-js/modules/es.object.to-string.js';
import 'core-js/modules/web.dom-collections.for-each.js';
import { jsx } from 'react/jsx-runtime';
import { memo, useRef, useState, useEffect } from 'react';
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
      var id = e.id;
      var prefix = 'icon-';
      if (!_includesInstanceProperty(id).call(id, prefix)) return;
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
  return jsx("div", {
    ref: mapDom,
    className: className !== null && className !== void 0 ? className : 'map-wrapper',
    id: "map-wrapper",
    children: mapInit && contextValue && jsx(MapContext.Provider, {
      value: contextValue,
      children: children
    })
  });
}
var index = /*#__PURE__*/memo(MapWidget);

export { index as default };
