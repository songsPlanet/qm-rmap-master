"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLocalStorage = getLocalStorage;
Object.defineProperty(exports, "request", {
  enumerable: true,
  get: function get() {
    return _axios.default;
  }
});
require("core-js/modules/es.object.keys.js");
require("@babel/runtime-corejs3/helpers/typeof");
require("@babel/runtime-corejs3/helpers/toConsumableArray");
require("core-js/modules/es.error.cause.js");
require("core-js/modules/es.number.to-fixed.js");
require("core-js/modules/es.object.has-own.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.test.js");
require("core-js/modules/es.regexp.to-string.js");
require("@babel/runtime-corejs3/core-js-stable/instance/slice");
require("@babel/runtime-corejs3/core-js-stable/instance/concat");
require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-names");
require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols");
require("@babel/runtime-corejs3/core-js-stable/instance/last-index-of");
require("@babel/runtime-corejs3/core-js-stable/url");
require("@babel/runtime-corejs3/core-js-stable/object/keys");
require("@babel/runtime-corejs3/core-js-stable/promise");
require("@babel/runtime-corejs3/core-js-stable/json/stringify");
var _axios = _interopRequireDefault(require("./axios.js"));
require("core-js/modules/es.array.push.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("@babel/runtime-corejs3/core-js-stable/instance/filter");
require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor");
require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors");
require("@babel/runtime-corejs3/helpers/slicedToArray");
require("@babel/runtime-corejs3/helpers/defineProperty");
require("react");
require("./events.js");
function getLocalStorage(key) {
  var value = window.localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
}