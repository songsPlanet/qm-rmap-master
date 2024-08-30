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
var PolygonMeasure = exports.default = /*#__PURE__*/function () {
  function PolygonMeasure(map, ifMu) {
    var _this = this;
    (0, _classCallCheck2.default)(this, PolygonMeasure);
    (0, _defineProperty2.default)(this, "uuid", void 0);
    (0, _defineProperty2.default)(this, "map", void 0);
    (0, _defineProperty2.default)(this, "isMeasure", void 0);
    (0, _defineProperty2.default)(this, "ele", void 0);
    (0, _defineProperty2.default)(this, "ifMu", void 0);
    // 单位默认为m^2,值为true的时候，单位为亩
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
      var polygonPointsSourceId = 'polygonPointsSource' + _this.uuid;
      _this.jsonPoint.features.push({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: coords
        }
      });
      (0, _map.default)(_this).getSource(polygonPointsSourceId).setData(_this.jsonPoint);
    });
    (0, _defineProperty2.default)(this, "getArea", function (coords) {
      var _context;
      var pts = (0, _concat.default)(_context = _this.points).call(_context, [coords]);
      pts = (0, _concat.default)(pts).call(pts, [_this.points[0]]);
      var plg = (0, _turf.polygon)([pts]);
      var parea = (0, _turf.area)(plg);
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
    (0, _defineProperty2.default)(this, "mapClickHandle", function (e) {
      if (_this.isMeasure) {
        var coords = [e.lngLat.lng, e.lngLat.lat];
        _this.addPoint(coords);
        _this.points.push(coords);
      }
    });
    (0, _defineProperty2.default)(this, "mapMouseMoveHandle", function (e) {
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
          var pts = (0, _concat.default)(_context2 = _this.points).call(_context2, [coords]);
          pts = (0, _concat.default)(pts).call(pts, [_this.points[0]]);
          var json = {
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              coordinates: [pts]
            }
          };
          (0, _map.default)(_this).getSource(polygonLinesSourceId).setData(json);
          _this.ele.innerHTML = _this.getArea(coords);
        }
        _this.tooltip.setLngLat(coords);
      }
    });
    (0, _defineProperty2.default)(this, "mapDbclickHandle", function (e) {
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
        var closeMarker = new _mapboxGl.Marker({
          element: _ele,
          anchor: 'bottom-left',
          offset: [-5, -10]
        }).setLngLat(coords).addTo((0, _map.default)(_this));
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
    (0, _map.default)(this).addSource(_polygonPointsSourceId, {
      type: 'geojson',
      data: this.jsonPoint
    });
    (0, _map.default)(this).addSource(_polygonLinesSourceId, {
      type: 'geojson',
      data: this.jsonLine
    });
    (0, _map.default)(this).addLayer({
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
    (0, _map.default)(this).addLayer({
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
    this.tooltip = new _mapboxGl.Marker({
      element: this.ele,
      anchor: 'left',
      offset: [8, 0]
    }).setLngLat([0, 0]).addTo(map);
    this.markers.push(this.tooltip);
  }
  return (0, _createClass2.default)(PolygonMeasure, [{
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
      var polygonPointsSourceId = 'polygonPointsSource' + this.uuid;
      var polygonPointsLayerId = 'polygonPointsLayer' + this.uuid;
      var polygonLinesSourceId = 'polygonLines' + this.uuid;
      var polygonLinesLayerId = 'polygonLinesLayer' + this.uuid;
      var polygonLinesStrokeLayerId = 'polygonLinesstrokeLayer' + this.uuid;
      var source = (0, _map.default)(this).getSource(polygonPointsSourceId);
      if (source) {
        (0, _map.default)(this).removeLayer(polygonPointsLayerId);
        (0, _map.default)(this).removeLayer(polygonLinesLayerId);
        (0, _map.default)(this).removeLayer(polygonLinesStrokeLayerId);
        (0, _map.default)(this).removeSource(polygonPointsSourceId);
        (0, _map.default)(this).removeSource(polygonLinesSourceId);
      }
      this.markers.forEach(function (marker) {
        marker.remove();
      });
      this.points = [];
      this.clearDrawEventListener();
    }
  }]);
}();