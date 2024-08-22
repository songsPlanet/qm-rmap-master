"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.array.push.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/createClass"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));
var _findIndex = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/find-index"));
var _LayerWrapper = _interopRequireDefault(require("./LayerWrapper.js"));
/**
 * 图层组
 * @description 多个图层作为一个对象控制
 */
var LayerGroupWrapper = exports.default = /*#__PURE__*/function () {
  function LayerGroupWrapper(options) {
    var _this = this;
    (0, _classCallCheck2.default)(this, LayerGroupWrapper);
    (0, _defineProperty2.default)(this, "_layers", []);
    this._options = options;
    options.layers.forEach(function (item) {
      var layer;
      if ('layers' in item) {
        layer = new LayerGroupWrapper(item);
      } else {
        layer = new _LayerWrapper.default(item);
      }
      _this._layers.push(layer);
    });
  }
  return (0, _createClass2.default)(LayerGroupWrapper, [{
    key: "options",
    get: function get() {
      return this._options;
    }
  }, {
    key: "layers",
    get: function get() {
      return this._layers;
    }
  }, {
    key: "onAdd",
    value: function onAdd(map, beforeId) {
      this._layers.forEach(function (layer) {
        map.addLayerWrapper(layer, beforeId);
      });
      this.updateOptions();
    }
  }, {
    key: "onRemove",
    value: function onRemove(map) {
      this._layers.forEach(function (layer) {
        map.removeLayerWrapper(layer, false);
      });
      this.updateOptions();
    }
  }, {
    key: "updateOptions",
    value: function updateOptions() {
      var _context;
      // 更新group isAdd
      var isAdd = (0, _findIndex.default)(_context = this._layers).call(_context, function (d) {
        return d.options.isAdd;
      }) > -1;
      this._options.isAdd = isAdd;
    }
  }]);
}();