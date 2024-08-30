"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.array.push.js");
require("core-js/modules/es.number.to-fixed.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/createClass"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));
var _map = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/map"));
var _concat = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/concat"));
var _turf = require("@turf/turf");
var _mapboxGl = require("mapbox-gl");
require("./index.css");
var PolylineMeasure = exports.default = /*#__PURE__*/function () {
  function PolylineMeasure(map) {
    var _this = this;
    (0, _classCallCheck2.default)(this, PolylineMeasure);
    (0, _defineProperty2.default)(this, "uuid", void 0);
    (0, _defineProperty2.default)(this, "map", void 0);
    (0, _defineProperty2.default)(this, "isMeasure", void 0);
    (0, _defineProperty2.default)(this, "ele", void 0);
    (0, _defineProperty2.default)(this, "tooltip", void 0);
    (0, _defineProperty2.default)(this, "points", []);
    (0, _defineProperty2.default)(this, "markers", []);
    (0, _defineProperty2.default)(this, "jsonPoint", {
      type: 'FeatureCollection',
      features: []
    });
    (0, _defineProperty2.default)(this, "jsonLine", {
      type: 'FeatureCollection',
      features: []
    });
    (0, _defineProperty2.default)(this, "addPoint", function (coords) {
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
        (0, _map.default)(_this).getSource(polylineLinesSourceId).setData(_this.jsonLine);
      }
      _this.jsonPoint.features.push({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: coords
        }
      });
      (0, _map.default)(_this).getSource(polylinePointsSourceId).setData(_this.jsonPoint);
    });
    (0, _defineProperty2.default)(this, "getLength", function (coords) {
      var _context;
      var _points = (0, _concat.default)(_context = _this.points).call(_context, [coords]);
      var line = (0, _turf.lineString)(_points);
      var len = (0, _turf.length)(line);
      if (len < 1) {
        len = Math.round(len * 1000) + 'm';
      } else {
        len = len.toFixed(2) + 'km';
      }
      return len;
    });
    (0, _defineProperty2.default)(this, "addMeasureRes", function (coords) {
      var ele = document.createElement('div');
      ele.setAttribute('class', 'measureResult');
      ele.innerHTML = _this.points.length === 0 ? '起点' : _this.getLength(coords);
      var marker = new _mapboxGl.Marker({
        element: ele,
        anchor: 'left',
        offset: [8, 0]
      }).setLngLat(coords).addTo((0, _map.default)(_this));
      _this.markers.push(marker);
    });
    (0, _defineProperty2.default)(this, "mapClickHandle", function (e) {
      if (_this.isMeasure) {
        var coords = [e.lngLat.lng, e.lngLat.lat];
        _this.addMeasureRes(coords);
        _this.addPoint(coords);
        _this.points.push(coords);
      }
    });
    (0, _defineProperty2.default)(this, "mapMouseMoveHandle", function (e) {
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
          (0, _map.default)(_this).getSource(polylineMovelinesSourceId).setData(json);
          _this.ele.innerHTML = _this.getLength(coords);
        } else {
          _this.ele.innerHTML = '点击地图开始测量';
        }
        _this.tooltip.setLngLat(coords);
      }
    });
    (0, _defineProperty2.default)(this, "mapDbclickHandle", function (e) {
      if (_this.isMeasure) {
        var coords = [e.lngLat.lng, e.lngLat.lat];
        _this.addPoint(coords);
        _this.isMeasure = false;
        (0, _map.default)(_this).getCanvas().style.cursor = '';
        _this.jsonPoint.features = [];
        _this.jsonLine.features = [];
        _this.tooltip.remove();
        // 添加关闭按钮
        var ele = document.createElement('div');
        ele.setAttribute('class', 'measureResultClose');
        ele.innerHTML = 'x';
        var closeMarker = new _mapboxGl.Marker({
          element: ele,
          anchor: 'bottom-left',
          offset: [-5, -10]
        }).setLngLat(coords).addTo((0, _map.default)(_this));
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
    (0, _map.default)(this).addSource(_polylinePointsSourceId, {
      type: 'geojson',
      data: this.jsonPoint
    });
    (0, _map.default)(this).addSource(_polylineLinesSourceId, {
      type: 'geojson',
      data: this.jsonLine
    });
    (0, _map.default)(this).addSource(_polylineMovelinesSourceId, {
      type: 'geojson',
      data: this.jsonLine
    });
    (0, _map.default)(this).addLayer({
      id: polylineMovelinesLayerId,
      type: 'line',
      source: _polylineMovelinesSourceId,
      paint: {
        'line-color': '#ff0000',
        'line-width': 2,
        'line-opacity': 0.65
      }
    });
    (0, _map.default)(this).addLayer({
      id: polylineLinesLayerId,
      type: 'line',
      source: _polylineLinesSourceId,
      paint: {
        'line-color': '#ff0000',
        'line-width': 2,
        'line-opacity': 0.65
      }
    });
    (0, _map.default)(this).addLayer({
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
    this.tooltip = new _mapboxGl.Marker({
      element: this.ele,
      anchor: 'left',
      offset: [8, 0]
    }).setLngLat([0, 0]).addTo(map);
    this.markers.push(this.tooltip);
  }
  return (0, _createClass2.default)(PolylineMeasure, [{
    key: "generateId",
    value: function generateId() {
      return (Math.random() * 10000000).toString(16).substr(0, 4) + '-' + new Date().getTime() + '-' + Math.random().toString().substr(2, 5);
    }
  }, {
    key: "start",
    value: function start() {
      (0, _map.default)(this).doubleClickZoom.disable();
      (0, _map.default)(this).getCanvas().style.cursor = 'crosshair';
      this.isMeasure = true;
      (0, _map.default)(this).on('click', this.mapClickHandle);
      (0, _map.default)(this).on('mousemove', this.mapMouseMoveHandle);
      (0, _map.default)(this).on('dblclick', this.mapDbclickHandle);
    }
  }, {
    key: "clearDrawEventListener",
    value: function clearDrawEventListener() {
      (0, _map.default)(this).off('click', this.mapClickHandle);
      (0, _map.default)(this).off('mousemove', this.mapMouseMoveHandle);
      (0, _map.default)(this).off('dblclick', this.mapDbclickHandle);
    }
  }, {
    key: "clearMeasure",
    value: function clearMeasure() {
      (0, _map.default)(this).doubleClickZoom.enable();
      (0, _map.default)(this).getCanvas().style.cursor = 'pointer';
      var polylinePointsSourceId = 'polylinePointsSource' + this.uuid;
      var polylinePointsLayerId = 'polylinePointsLayer' + this.uuid;
      var polylineLinesSourceId = 'polylineLines' + this.uuid;
      var polylineLinesLayerId = 'polylineLinesLayer' + this.uuid;
      var polylineMovelinesSourceId = 'polylineMovelinesSource' + this.uuid;
      var polylineMovelinesLayerId = 'polylineMovelinesLayer' + this.uuid;
      var source = (0, _map.default)(this).getSource(polylinePointsSourceId);
      if (source) {
        (0, _map.default)(this).removeLayer(polylinePointsLayerId);
        (0, _map.default)(this).removeLayer(polylineLinesLayerId);
        (0, _map.default)(this).removeLayer(polylineMovelinesLayerId);
        (0, _map.default)(this).removeSource(polylinePointsSourceId);
        (0, _map.default)(this).removeSource(polylineLinesSourceId);
        (0, _map.default)(this).removeSource(polylineMovelinesSourceId);
      }
      this.markers.forEach(function (marker) {
        marker.remove();
      });
      this.points = [];
      this.clearDrawEventListener();
    }
  }]);
}();