"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.array.push.js");
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/createClass"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));
var _map = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/map"));
var _findIndex = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/find-index"));
/*
 * 轨迹线追踪:含播放、暂停、重播
 * map：            地图
 * route：          轨迹geojson，类型LineString
 * isStyle:         动态样式，默认false，true需使用map.addDashLayer
 * stepPoint?：     通过turf.js重新划分线，会导致轨迹线的折点不真实
 */
var trackIcon = 'data:image/png;base64,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';
var arrow = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAnElEQVQ4T63TsQ0CMQyF4f/NgMQQ0CBR0FIx190cFIiWhhFoKdgEiRUeSoF0gO8cjkub+Evs2OLPpc9422dgBRwlNZn/BtjeApdOUJsh0QuuwKYWiYAFcAKWHaSR1EbpfAHlkO0ICdMJgV+QXmAAmUu6v9IZA8wkPVKgtg7TF7H25t4UbN+A9ahGmqqVD8AO2GdzUF45+I3ZJJb9JxbwRhEhB66xAAAAAElFTkSuQmCC';
var geojson = {
  type: 'FeatureCollection',
  features: [{
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates: []
    }
  }]
};
var pointGeojson = {
  type: 'FeatureCollection',
  features: []
};
var AnimationRoute = exports.default = /*#__PURE__*/function () {
  function AnimationRoute(map, route) {
    (0, _classCallCheck2.default)(this, AnimationRoute);
    (0, _defineProperty2.default)(this, "map", void 0);
    (0, _defineProperty2.default)(this, "route", void 0);
    // 目标路径geojson
    (0, _defineProperty2.default)(this, "pauseIndex", void 0);
    // 暂停geometry下标
    (0, _defineProperty2.default)(this, "pauseStatus", void 0);
    // 暂停状
    (0, _defineProperty2.default)(this, "interval", void 0);
    (0, _defineProperty2.default)(this, "isStyle", void 0);
    this.map = map;
    this.route = route;
    this.pauseStatus = false;
    this.pauseIndex = 0;
    this.isStyle = false;
    if (!map) return;
    this.init();
  }
  return (0, _createClass2.default)(AnimationRoute, [{
    key: "init",
    value: function init() {
      var _this = this;
      // 路径
      this.addRouteLayer();
      // 动态点
      (0, _map.default)(this).addSource('point', {
        type: 'geojson',
        data: pointGeojson
      });
      (0, _map.default)(this).addLayer({
        id: 'point-animation',
        type: 'symbol',
        source: 'point',
        layout: {
          'icon-image': 'trackIcon',
          'icon-size': 1,
          'icon-rotation-alignment': 'map',
          'icon-allow-overlap': true,
          'icon-offset': [0, -10]
        }
      });
      // 动态线
      (0, _map.default)(this).addSource('line-animate', {
        type: 'geojson',
        data: geojson
      });
      (0, _map.default)(this).addLayer({
        id: 'line-animation',
        type: 'line',
        source: 'line-animate',
        layout: {
          'line-cap': 'round',
          'line-join': 'round'
        },
        paint: {
          'line-color': 'orange',
          'line-width': 3,
          'line-opacity': 1
        }
      });
      //  动态图标，目标layer:pointGeojson
      (0, _map.default)(this).loadImage(trackIcon, function (error, image) {
        if (!error) {
          if (!(0, _map.default)(_this).hasImage('trackIcon')) (0, _map.default)(_this).addImage('trackIcon', image);
        }
      });
      if (this.isStyle) this.addDashLayer();
    }
  }, {
    key: "addDashLayer",
    value: function addDashLayer() {
      (0, _map.default)(this).addDashLayer('line-ds');
      this.addImageLayer();
    }
  }, {
    key: "addImageLayer",
    value: function addImageLayer() {
      var _this2 = this;
      // 路径上的箭头
      (0, _map.default)(this).loadImage(arrow, function (error, image) {
        if (!error) {
          if (!(0, _map.default)(_this2).hasImage('arrow')) (0, _map.default)(_this2).addImage('arrow', image);
          (0, _map.default)(_this2).addLayer({
            id: 'line-arrow',
            source: 'line-ds',
            type: 'symbol',
            layout: {
              'symbol-placement': 'line',
              'symbol-spacing': 50,
              'icon-image': 'arrow',
              'icon-size': 0.6,
              'icon-allow-overlap': true
            }
          });
        }
      });
    }
  }, {
    key: "addRouteLayer",
    value: function addRouteLayer() {
      // 添加路径图层
      (0, _map.default)(this).addSource('line-ds', {
        type: 'geojson',
        data: this.route
      });
      (0, _map.default)(this).addLayer({
        id: 'line',
        type: 'line',
        source: 'line-ds',
        layout: {
          'line-cap': 'round',
          'line-join': 'round'
        },
        paint: {
          'line-color': 'blue',
          'line-width': this.isStyle ? 10 : 3,
          'line-opacity': 1
        }
      });
      // this.map.locationFeature(this.route);
      (0, _map.default)(this).jumpTo({
        center: this.route.features[0].geometry.coordinates[0],
        zoom: 17
      });
    }
  }, {
    key: "getIndex",
    value: function getIndex() {
      if (pointGeojson.features.length !== 0) {
        var _context;
        this.pauseIndex = (0, _findIndex.default)(_context = this.route.features[0].geometry.coordinates).call(_context, function (value) {
          return value[0] === pointGeojson.features[0].id;
        });
      }
    }
  }, {
    key: "animateLine",
    value: function animateLine() {
      var that = this;
      var idx = 0;
      loop();
      function loop() {
        var newIndex = that.pauseStatus === false ? idx : that.pauseIndex;
        task(newIndex);
        idx++;
        that.pauseIndex++;
        that.interval = requestAnimationFrame(loop);
      }
      function task(index) {
        var coords = that.route.features[0].geometry.coordinates;
        geojson.features[0].geometry.coordinates.push(coords[index]);
        pointGeojson = {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            id: coords[index][0],
            geometry: {
              type: 'Point',
              coordinates: coords[index]
            }
          }]
        };
        if ((0, _map.default)(that)) {
          (0, _map.default)(that).getSource('line-animate').setData(geojson);
          (0, _map.default)(that).getSource('point').setData(pointGeojson);
        }
      }
    }
  }, {
    key: "resetTime",
    value: function resetTime() {
      if (this.interval) {
        cancelAnimationFrame(this.interval);
      }
    }
  }, {
    key: "resetData",
    value: function resetData() {
      this.pauseIndex = 0;
      pointGeojson.features = [];
      geojson.features[0].geometry.coordinates = [];
    }
  }, {
    key: "replay",
    value: function replay() {
      this.resetData();
      this.resetTime();
      this.animateLine();
    }
  }, {
    key: "play",
    value: function play() {
      this.getIndex();
      this.animateLine();
    }
  }, {
    key: "pause",
    value: function pause() {
      this.pauseStatus = true;
      this.getIndex();
      this.resetTime();
    }
  }, {
    key: "destory",
    value: function destory() {
      this.resetTime();
      this.resetData();
    }
  }]);
}();