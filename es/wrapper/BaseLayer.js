import _classCallCheck from '@babel/runtime-corejs3/helpers/classCallCheck';
import _createClass from '@babel/runtime-corejs3/helpers/createClass';
import _defineProperty from '@babel/runtime-corejs3/helpers/defineProperty';

var BaseLayer = /*#__PURE__*/function () {
  function BaseLayer(options) {
    _classCallCheck(this, BaseLayer);
    _defineProperty(this, "_options", void 0);
    this._options = options;
  }
  return _createClass(BaseLayer, [{
    key: "options",
    get: function get() {
      return this._options;
    }
  }, {
    key: "onAdd",
    value: function onAdd(map, beforeId) {
      // isAdd
      if (this._options.isAdd === false) {
        this._options.isAdd = false;
        return;
      }
      // 查找有效beforeId
      beforeId = map.findValidBeforeId(this._options.id);
      this.add(map, beforeId);
      // isAdd:true
      this._options.isAdd = true;
    }
  }, {
    key: "onRemove",
    value: function onRemove(map, removeSource) {
      if (this._options.isAdd) {
        return;
      }
      var flag = map.getLayer(this._options.id);
      if (flag) {
        // remove layer
        map.removeLayer(this._options.id);
      }
      var sourceId = this._options.id + '-ds';
      // remove source
      if (removeSource) {
        map.removeSource(sourceId);
      }
      // isAdd:false
      this._options.isAdd = false;
    }
  }]);
}();

export { BaseLayer as default };
