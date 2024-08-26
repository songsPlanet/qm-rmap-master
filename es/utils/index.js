import '@babel/runtime-corejs3/helpers/typeof';
import '@babel/runtime-corejs3/helpers/toConsumableArray';
import 'core-js/modules/es.error.cause.js';
import 'core-js/modules/es.number.to-fixed.js';
import 'core-js/modules/es.object.has-own.js';
import 'core-js/modules/es.object.keys.js';
import 'core-js/modules/es.object.to-string.js';
import 'core-js/modules/es.regexp.to-string.js';
import '@babel/runtime-corejs3/core-js-stable/instance/slice';
import '@babel/runtime-corejs3/core-js-stable/instance/concat';
import '@babel/runtime-corejs3/core-js-stable/object/get-own-property-names';
import '@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols';
import '@babel/runtime-corejs3/core-js-stable/instance/last-index-of';
import '@babel/runtime-corejs3/core-js-stable/object/keys';
import '@babel/runtime-corejs3/core-js-stable/promise';
import '@babel/runtime-corejs3/core-js-stable/json/stringify';
export { default as request } from './axios.js';
import 'core-js/modules/es.array.push.js';
import 'core-js/modules/web.dom-collections.for-each.js';
import '@babel/runtime-corejs3/core-js-stable/instance/filter';
import '@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor';
import '@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors';
import '@babel/runtime-corejs3/helpers/slicedToArray';
import '@babel/runtime-corejs3/helpers/defineProperty';
import 'react';
import './events.js';

function getLocalStorage(key) {
  var value = window.localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
}

export { getLocalStorage };
