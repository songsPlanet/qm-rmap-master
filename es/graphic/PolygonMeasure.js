import _classCallCheck from '@babel/runtime-corejs3/helpers/classCallCheck';
import _createClass from '@babel/runtime-corejs3/helpers/createClass';
import _defineProperty from '@babel/runtime-corejs3/helpers/defineProperty';
import _mapInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/map';
import _concatInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/concat';
import 'core-js/modules/es.array.map.js';
import 'core-js/modules/es.array.push.js';
import 'core-js/modules/es.number.to-fixed.js';
import 'core-js/modules/es.object.to-string.js';
import 'core-js/modules/es.regexp.to-string.js';
import 'core-js/modules/web.dom-collections.for-each.js';
import { polygon, area } from '@turf/turf';
import { Marker } from 'mapbox-gl';
import './index.css';

var PolygonMeasure = /*#__PURE__*/function () {
  function PolygonMeasure(map, ifMu) {
    var _this = this;
    _classCallCheck(this, PolygonMeasure);
    _defineProperty(this, "uuid", void 0);
    _defineProperty(this, "map", void 0);
    _defineProperty(this, "isMeasure", void 0);
    _defineProperty(this, "ele", void 0);
    _defineProperty(this, "ifMu", void 0);
    // 单位默认为m^2,值为true的时候，单位为亩
    _defineProperty(this, "tooltip", void 0);
    _defineProperty(this, "points", []);
    _defineProperty(this, "markers", []);
    _defineProperty(this, "jsonPoint", {
      type: 'FeatureCollection',
      features: []
    });
    _defineProperty(this, "jsonLine", {
      type: 'FeatureCollection',
      features: []
    });
    _defineProperty(this, "addPoint", function (coords) {
      var polygonPointsSourceId = 'polygonPointsSource' + _this.uuid;
      _this.jsonPoint.features.push({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: coords
        }
      });
      _mapInstanceProperty(_this).getSource(polygonPointsSourceId).setData(_this.jsonPoint);
    });
    _defineProperty(this, "getArea", function (coords) {
      var _context;
      var pts = _concatInstanceProperty(_context = _this.points).call(_context, [coords]);
      pts = _concatInstanceProperty(pts).call(pts, [_this.points[0]]);
      var plg = polygon([pts]);
      var parea = area(plg);
      if (_this.ifMu) {
        parea = (parea * 0.0015).toFixed(4) + '亩';
      } else {
        if (parea < 1000) {
          parea = Math.round(parea) + 'm²';
        } else {
          parea = (parea / 1000000).toFixed(4) + 'km²';
        }
      }
      return parea;
    });
    _defineProperty(this, "mapClickHandle", function (e) {
      if (_this.isMeasure) {
        var coords = [e.lngLat.lng, e.lngLat.lat];
        _this.addPoint(coords);
        _this.points.push(coords);
      }
    });
    _defineProperty(this, "mapMouseMoveHandle", function (e) {
      if (_this.isMeasure) {
        var polygonLinesSourceId = 'polygonLines' + _this.uuid;
        var coords = [e.lngLat.lng, e.lngLat.lat];
        var len = _this.jsonPoint.features.length;
        if (len === 0) {
          _this.ele.innerHTML = '点击地图开始测量';
        } else if (len === 1) {
          _this.ele.innerHTML = '点击地图继续绘制';
        } else {
          var _context2;
          var pts = _concatInstanceProperty(_context2 = _this.points).call(_context2, [coords]);
          pts = _concatInstanceProperty(pts).call(pts, [_this.points[0]]);
          var json = {
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              coordinates: [pts]
            }
          };
          _mapInstanceProperty(_this).getSource(polygonLinesSourceId).setData(json);
          _this.ele.innerHTML = _this.getArea(coords);
        }
        _this.tooltip.setLngLat(coords);
      }
    });
    _defineProperty(this, "mapDbclickHandle", function (e) {
      if (_this.isMeasure) {
        var coords = [e.lngLat.lng, e.lngLat.lat];
        _this.points.push(coords);
        _this.isMeasure = false;
        _this.ele.innerHTML = _this.getArea(coords);
        _this.tooltip.setLngLat(coords);
        // 添加关闭按钮
        var _ele = document.createElement('div');
        _ele.setAttribute('class', 'measureResultClose');
        _ele.innerHTML = '×';
        var closeMarker = new Marker({
          element: _ele,
          anchor: 'bottom-left',
          offset: [-5, -10]
        }).setLngLat(coords).addTo(_mapInstanceProperty(_this));
        _ele.onclick = function (e) {
          e.stopPropagation();
          _this.clearMeasure();
        };
        _this.markers.push(closeMarker);
      }
    });
    this.uuid = this.generateId();
    this.map = map;
    this.ifMu = ifMu ? true : false;
    this.isMeasure = false;
    var _polygonPointsSourceId = 'polygonPointsSource' + this.uuid;
    var polygonPointsLayerId = 'polygonPointsLayer' + this.uuid;
    var _polygonLinesSourceId = 'polygonLines' + this.uuid;
    var polygonLinesLayerId = 'polygonLinesLayer' + this.uuid;
    var polygonLinesStrokeLayerId = 'polygonLinesstrokeLayer' + this.uuid;
    _mapInstanceProperty(this).addSource(_polygonPointsSourceId, {
      type: 'geojson',
      data: this.jsonPoint
    });
    _mapInstanceProperty(this).addSource(_polygonLinesSourceId, {
      type: 'geojson',
      data: this.jsonLine
    });
    _mapInstanceProperty(this).addLayer({
      id: polygonLinesLayerId,
      type: 'fill',
      source: _polygonLinesSourceId,
      paint: {
        'fill-color': '#ff0000',
        'fill-opacity': 0.1
      }
    });
    map.addLayer({
      id: polygonLinesStrokeLayerId,
      type: 'line',
      source: _polygonLinesSourceId,
      paint: {
        'line-color': '#ff0000',
        'line-width': 2,
        'line-opacity': 0.65
      }
    });
    _mapInstanceProperty(this).addLayer({
      id: polygonPointsLayerId,
      type: 'circle',
      source: _polygonPointsSourceId,
      paint: {
        'circle-color': '#ffffff',
        'circle-radius': 3,
        'circle-stroke-width': 2,
        'circle-stroke-color': '#ff0000'
      }
    });
    this.ele = document.createElement('div');
    this.ele.setAttribute('class', 'measureResult');
    this.tooltip = new Marker({
      element: this.ele,
      anchor: 'left',
      offset: [8, 0]
    }).setLngLat([0, 0]).addTo(map);
    this.markers.push(this.tooltip);
  }
  return _createClass(PolygonMeasure, [{
    key: "generateId",
    value: function generateId() {
      return (Math.random() * 10000000).toString(16).substr(0, 4) + '-' + new Date().getTime() + '-' + Math.random().toString().substr(2, 5);
    }
  }, {
    key: "start",
    value: function start() {
      _mapInstanceProperty(this).doubleClickZoom.disable();
      _mapInstanceProperty(this).getCanvas().style.cursor = 'crosshair';
      this.isMeasure = true;
      _mapInstanceProperty(this).on('click', this.mapClickHandle);
      _mapInstanceProperty(this).on('mousemove', this.mapMouseMoveHandle);
      _mapInstanceProperty(this).on('dblclick', this.mapDbclickHandle);
    }
  }, {
    key: "clearDrawEventListener",
    value: function clearDrawEventListener() {
      _mapInstanceProperty(this).off('click', this.mapClickHandle);
      _mapInstanceProperty(this).off('mousemove', this.mapMouseMoveHandle);
      _mapInstanceProperty(this).off('dblclick', this.mapDbclickHandle);
    }
  }, {
    key: "clearMeasure",
    value: function clearMeasure() {
      _mapInstanceProperty(this).doubleClickZoom.enable();
      _mapInstanceProperty(this).getCanvas().style.cursor = 'pointer';
      var polygonPointsSourceId = 'polygonPointsSource' + this.uuid;
      var polygonPointsLayerId = 'polygonPointsLayer' + this.uuid;
      var polygonLinesSourceId = 'polygonLines' + this.uuid;
      var polygonLinesLayerId = 'polygonLinesLayer' + this.uuid;
      var polygonLinesStrokeLayerId = 'polygonLinesstrokeLayer' + this.uuid;
      var source = _mapInstanceProperty(this).getSource(polygonPointsSourceId);
      if (source) {
        _mapInstanceProperty(this).removeLayer(polygonPointsLayerId);
        _mapInstanceProperty(this).removeLayer(polygonLinesLayerId);
        _mapInstanceProperty(this).removeLayer(polygonLinesStrokeLayerId);
        _mapInstanceProperty(this).removeSource(polygonPointsSourceId);
        _mapInstanceProperty(this).removeSource(polygonLinesSourceId);
      }
      this.markers.forEach(function (marker) {
        marker.remove();
      });
      this.points = [];
      this.clearDrawEventListener();
    }
  }]);
}();

export { PolygonMeasure as default };
