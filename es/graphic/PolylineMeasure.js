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
import { lineString, length } from '@turf/turf';
import { Marker } from 'mapbox-gl';
import './index.css';

var PolylineMeasure = /*#__PURE__*/function () {
  function PolylineMeasure(map) {
    var _this = this;
    _classCallCheck(this, PolylineMeasure);
    _defineProperty(this, "uuid", void 0);
    _defineProperty(this, "map", void 0);
    _defineProperty(this, "isMeasure", void 0);
    _defineProperty(this, "ele", void 0);
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
      var polylinePointsSourceId = 'polylinePointsSource' + _this.uuid;
      var polylineLinesSourceId = 'polylineLines' + _this.uuid;
      if (_this.jsonPoint.features.length > 0) {
        var prev = _this.jsonPoint.features[_this.jsonPoint.features.length - 1];
        _this.jsonLine.features.push({
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: [prev.geometry.coordinates, coords]
          }
        });
        _mapInstanceProperty(_this).getSource(polylineLinesSourceId).setData(_this.jsonLine);
      }
      _this.jsonPoint.features.push({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: coords
        }
      });
      _mapInstanceProperty(_this).getSource(polylinePointsSourceId).setData(_this.jsonPoint);
    });
    _defineProperty(this, "getLength", function (coords) {
      var _context;
      var _points = _concatInstanceProperty(_context = _this.points).call(_context, [coords]);
      var line = lineString(_points);
      var len = length(line);
      if (len < 1) {
        len = Math.round(len * 1000) + 'm';
      } else {
        len = len.toFixed(2) + 'km';
      }
      return len;
    });
    _defineProperty(this, "addMeasureRes", function (coords) {
      var ele = document.createElement('div');
      ele.setAttribute('class', 'measureResult');
      ele.innerHTML = _this.points.length === 0 ? '起点' : _this.getLength(coords);
      var marker = new Marker({
        element: ele,
        anchor: 'left',
        offset: [8, 0]
      }).setLngLat(coords).addTo(_mapInstanceProperty(_this));
      _this.markers.push(marker);
    });
    _defineProperty(this, "mapClickHandle", function (e) {
      if (_this.isMeasure) {
        var coords = [e.lngLat.lng, e.lngLat.lat];
        _this.addMeasureRes(coords);
        _this.addPoint(coords);
        _this.points.push(coords);
      }
    });
    _defineProperty(this, "mapMouseMoveHandle", function (e) {
      var polylineMovelinesSourceId = 'polylineMovelinesSource' + _this.uuid;
      if (_this.isMeasure) {
        var coords = [e.lngLat.lng, e.lngLat.lat];
        if (_this.jsonPoint.features.length > 0) {
          var prev = _this.jsonPoint.features[_this.jsonPoint.features.length - 1];
          var json = {
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: [prev.geometry.coordinates, coords]
            }
          };
          _mapInstanceProperty(_this).getSource(polylineMovelinesSourceId).setData(json);
          _this.ele.innerHTML = _this.getLength(coords);
        } else {
          _this.ele.innerHTML = '点击地图开始测量';
        }
        _this.tooltip.setLngLat(coords);
      }
    });
    _defineProperty(this, "mapDbclickHandle", function (e) {
      if (_this.isMeasure) {
        var coords = [e.lngLat.lng, e.lngLat.lat];
        _this.addPoint(coords);
        _this.isMeasure = false;
        _mapInstanceProperty(_this).getCanvas().style.cursor = '';
        _this.jsonPoint.features = [];
        _this.jsonLine.features = [];
        _this.tooltip.remove();
        // 添加关闭按钮
        var ele = document.createElement('div');
        ele.setAttribute('class', 'measureResultClose');
        ele.innerHTML = 'x';
        var closeMarker = new Marker({
          element: ele,
          anchor: 'bottom-left',
          offset: [-5, -10]
        }).setLngLat(coords).addTo(_mapInstanceProperty(_this));
        ele.onclick = function (e) {
          e.stopPropagation();
          _this.clearMeasure();
        };
        _this.markers.push(closeMarker);
      }
    });
    this.uuid = this.generateId();
    this.map = map;
    this.isMeasure = false;
    var _polylinePointsSourceId = 'polylinePointsSource' + this.uuid;
    var polylinePointsLayerId = 'polylinePointsLayer' + this.uuid;
    var _polylineLinesSourceId = 'polylineLines' + this.uuid;
    var polylineLinesLayerId = 'polylineLinesLayer' + this.uuid;
    var _polylineMovelinesSourceId = 'polylineMovelinesSource' + this.uuid;
    var polylineMovelinesLayerId = 'polylineMovelinesLayer' + this.uuid;
    _mapInstanceProperty(this).addSource(_polylinePointsSourceId, {
      type: 'geojson',
      data: this.jsonPoint
    });
    _mapInstanceProperty(this).addSource(_polylineLinesSourceId, {
      type: 'geojson',
      data: this.jsonLine
    });
    _mapInstanceProperty(this).addSource(_polylineMovelinesSourceId, {
      type: 'geojson',
      data: this.jsonLine
    });
    _mapInstanceProperty(this).addLayer({
      id: polylineMovelinesLayerId,
      type: 'line',
      source: _polylineMovelinesSourceId,
      paint: {
        'line-color': '#ff0000',
        'line-width': 2,
        'line-opacity': 0.65
      }
    });
    _mapInstanceProperty(this).addLayer({
      id: polylineLinesLayerId,
      type: 'line',
      source: _polylineLinesSourceId,
      paint: {
        'line-color': '#ff0000',
        'line-width': 2,
        'line-opacity': 0.65
      }
    });
    _mapInstanceProperty(this).addLayer({
      id: polylinePointsLayerId,
      type: 'circle',
      source: _polylinePointsSourceId,
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
  return _createClass(PolylineMeasure, [{
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
      var polylinePointsSourceId = 'polylinePointsSource' + this.uuid;
      var polylinePointsLayerId = 'polylinePointsLayer' + this.uuid;
      var polylineLinesSourceId = 'polylineLines' + this.uuid;
      var polylineLinesLayerId = 'polylineLinesLayer' + this.uuid;
      var polylineMovelinesSourceId = 'polylineMovelinesSource' + this.uuid;
      var polylineMovelinesLayerId = 'polylineMovelinesLayer' + this.uuid;
      var source = _mapInstanceProperty(this).getSource(polylinePointsSourceId);
      if (source) {
        _mapInstanceProperty(this).removeLayer(polylinePointsLayerId);
        _mapInstanceProperty(this).removeLayer(polylineLinesLayerId);
        _mapInstanceProperty(this).removeLayer(polylineMovelinesLayerId);
        _mapInstanceProperty(this).removeSource(polylinePointsSourceId);
        _mapInstanceProperty(this).removeSource(polylineLinesSourceId);
        _mapInstanceProperty(this).removeSource(polylineMovelinesSourceId);
      }
      this.markers.forEach(function (marker) {
        marker.remove();
      });
      this.points = [];
      this.clearDrawEventListener();
    }
  }]);
}();

export { PolylineMeasure as default };
