import _classCallCheck from '@babel/runtime-corejs3/helpers/classCallCheck';
import _createClass from '@babel/runtime-corejs3/helpers/createClass';
import _indexOfInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/index-of';
import _spliceInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/splice';
import 'core-js/modules/es.array.push.js';

var EventEmitter = /*#__PURE__*/function () {
  function EventEmitter() {
    _classCallCheck(this, EventEmitter);
    this.listeners = {};
  }
  return _createClass(EventEmitter, [{
    key: "emit",
    value: function emit(type) {
      var fns = this.listeners[type];
      if (!fns || fns.length === 0) return;
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }
      for (var i = 0; i < fns.length; i++) {
        fns[i].apply(this, args);
      }
    }
  }, {
    key: "add",
    value: function add(type, fn) {
      var fns = this.listeners[type];
      if (!fns) this.listeners[type] = fns = [];
      fns.push(fn);
    }
  }, {
    key: "remove",
    value: function remove(type, fn) {
      var fns = this.listeners[type];
      if (!fns || fns.length <= 0) return;
      if (typeof fn === 'undefined') {
        fns.length = 0;
        return;
      } else {
        var index = _indexOfInstanceProperty(fns).call(fns, fn);
        _spliceInstanceProperty(fns).call(fns, index, 1);
      }
    }
  }]);
}();
new EventEmitter();

export { EventEmitter };
