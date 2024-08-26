import _classCallCheck from '@babel/runtime-corejs3/helpers/classCallCheck';
import _createClass from '@babel/runtime-corejs3/helpers/createClass';
import _defineProperty from '@babel/runtime-corejs3/helpers/defineProperty';
import _findIndexInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/find-index';
import 'core-js/modules/es.array.push.js';
import 'core-js/modules/es.object.to-string.js';
import 'core-js/modules/web.dom-collections.for-each.js';
import LayerWrapper from './LayerWrapper.js';

/**
 * 图层组
 * @description 多个图层作为一个对象控制
 */
var LayerGroupWrapper = /*#__PURE__*/function () {
  function LayerGroupWrapper(options) {
    var _this = this;
    _classCallCheck(this, LayerGroupWrapper);
    _defineProperty(this, "_options", void 0);
    _defineProperty(this, "_layers", []);
    this._options = options;
    options.layers.forEach(function (item) {
      var layer;
      if ('layers' in item) {
        layer = new LayerGroupWrapper(item);
      } else {
        layer = new LayerWrapper(item);
      }
      _this._layers.push(layer);
    });
  }
  return _createClass(LayerGroupWrapper, [{
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
      var isAdd = _findIndexInstanceProperty(_context = this._layers).call(_context, function (d) {
        return d.options.isAdd;
      }) > -1;
      this._options.isAdd = isAdd;
    }
  }]);
}();

export { LayerGroupWrapper as default };
