import _Object$keys from '@babel/runtime-corejs3/core-js-stable/object/keys';
import _Object$getOwnPropertySymbols from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols';
import _Object$getOwnPropertyDescriptor from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor';
import _Object$getOwnPropertyDescriptors from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors';
import _slicedToArray from '@babel/runtime-corejs3/helpers/slicedToArray';
import _defineProperty from '@babel/runtime-corejs3/helpers/defineProperty';
import 'core-js/modules/es.array.push.js';
import 'core-js/modules/es.object.to-string.js';
import 'core-js/modules/web.dom-collections.for-each.js';
import _mapInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/map';
import _filterInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/filter';
import React, { memo, useState, useRef, useEffect } from 'react';
import DrawRectangle from 'mapbox-gl-draw-rectangle-mode';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import { GISToolHelper } from 'qm-map-wrapper';
import mapboxDraw from '@mapbox/mapbox-gl-draw';
import { useMap } from '../context/mapContext.js';
import { drawToolList } from './constant.js';
import { Marker } from 'mapbox-gl';
import './index.css';

function ownKeys(e, r) { var t = _Object$keys(e); if (_Object$getOwnPropertySymbols) { var o = _Object$getOwnPropertySymbols(e); r && (o = _filterInstanceProperty(o).call(o, function (r) { return _Object$getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : _Object$getOwnPropertyDescriptors ? Object.defineProperties(e, _Object$getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, _Object$getOwnPropertyDescriptor(t, r)); }); } return e; }
var DrawWidget = function DrawWidget(props) {
  var _useMap = useMap(),
    map = _mapInstanceProperty(_useMap);
  var position = props.position;
  var controlStyle = _objectSpread({}, position);
  var _useState = useState('none'),
    _useState2 = _slicedToArray(_useState, 2);
    _useState2[0];
    var setMode = _useState2[1];
  var markerRef = useRef([]);
  var featureRef = useRef([{
    id: ''
  }]);
  var selectedModeHandle = function selectedModeHandle(type) {
    setMode(type);
    if (map !== null && map !== void 0 && map.drawTool) {
      map === null || map === void 0 || map.drawTool.changeMode(type);
    }
  };
  var clearAllHandle = function clearAllHandle() {
    setMode('simple_select');
    if (map !== null && map !== void 0 && map.drawTool) {
      map === null || map === void 0 || map.drawTool.deleteAll();
      map === null || map === void 0 || map.drawTool.changeMode('simple_select');
      var ele = document.getElementsByClassName('measureResultClose');
      map === null || map === void 0 || map.drawTool.delete(ele);
      markerRef.current.forEach(function (item) {
        item.remove();
      });
    }
  };
  // 添加关闭按钮
  var addMarkerHandle = function addMarkerHandle(e) {
    var box = GISToolHelper.getFeatureBoundingBox(e.features[0]);
    var _ele = document.createElement('div');
    _ele.setAttribute('class', 'measureResultClose');
    _ele.setAttribute('id', e.features[0].id);
    _ele.innerHTML = '×';
    var closeMarker = new Marker({
      element: _ele,
      anchor: 'bottom-left',
      offset: [-5, -10]
    }).setLngLat(box.getCenter()).addTo(map);
    markerRef.current.push(closeMarker);
    _ele.onclick = function (e) {
      e.stopPropagation();
      map === null || map === void 0 || map.drawTool.delete(_ele.getAttribute('id'));
      closeMarker.remove();
    };
  };
  var updatetDraw = function updatetDraw(e) {
    var _context, _context2;
    _mapInstanceProperty(_context = _filterInstanceProperty(_context2 = markerRef.current).call(_context2, function (item) {
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
  useEffect(function () {
    if (!(map !== null && map !== void 0 && map.drawTool) && map) {
      map.drawTool = new mapboxDraw({
        displayControlsDefault: false,
        modes: _objectSpread(_objectSpread({}, mapboxDraw.modes), {}, {
          draw_rectangle: DrawRectangle
        }),
        defaultMode: 'simple_select'
      });
      map.addControl(map.drawTool, 'bottom-right');
      map.on('draw.create', creatDraw);
      map.on('draw.update', updatetDraw);
    }
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    className: "mapboxgl-draw",
    style: controlStyle
  }, /*#__PURE__*/React.createElement("div", {
    className: "mapboxgl-draw-bar"
  }, /*#__PURE__*/React.createElement("div", null, _mapInstanceProperty(drawToolList).call(drawToolList, function (item) {
    return /*#__PURE__*/React.createElement("div", {
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
var index = /*#__PURE__*/memo(DrawWidget);

export { index as default };
