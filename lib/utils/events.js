"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EventEmitter = void 0;
require("core-js/modules/es.array.push.js");
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/createClass"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));
var _indexOf = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/index-of"));
var _splice = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/splice"));
var EventEmitter = exports.EventEmitter = /*#__PURE__*/function () {
  function EventEmitter() {
    (0, _classCallCheck2.default)(this, EventEmitter);
    (0, _defineProperty2.default)(this, "listeners", void 0);
    this.listeners = {};
  }
  return (0, _createClass2.default)(EventEmitter, [{
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
        var index = (0, _indexOf.default)(fns).call(fns, fn);
        (0, _splice.default)(fns).call(fns, index, 1);
      }
    }
  }]);
}();
new EventEmitter();