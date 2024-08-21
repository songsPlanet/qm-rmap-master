import 'core-js/modules/es.error.cause.js';
import 'core-js/modules/es.array.push.js';
import 'core-js/modules/es.number.to-fixed.js';
import 'core-js/modules/es.object.to-string.js';
import 'core-js/modules/es.regexp.exec.js';
import 'core-js/modules/es.regexp.test.js';
import 'core-js/modules/es.regexp.to-string.js';
import 'core-js/modules/web.dom-collections.for-each.js';
import '@babel/runtime-corejs3/core-js-stable/object/keys';
import '@babel/runtime-corejs3/core-js-stable/parse-int';
import '@babel/runtime-corejs3/core-js-stable/instance/concat';
import '@babel/runtime-corejs3/core-js-stable/map';
import '@babel/runtime-corejs3/core-js-stable/instance/filter';
import '@babel/runtime-corejs3/core-js-stable/parse-float';
import '@babel/runtime-corejs3/core-js-stable/instance/slice';
import '@babel/runtime-corejs3/core-js-stable/array/from';
import '@babel/runtime-corejs3/core-js-stable/symbol';
import '@babel/runtime-corejs3/core-js/get-iterator-method';
import '@turf/turf';
import 'immutable';
import { LngLatBounds } from 'mapbox-gl';
import 'moment';

/**
 * 防抖
 * @param func：需要防抖处理的函数
 * @param delay：时间间隔
 */
var debounce = function debounce(func, delay) {
  var task = null;
  // 通过闭包缓存一个定时器id
  // 将debounce处理结果当做函数返回
  // 出发时间回调执行这个返回函数
  return function (args) {
    // 如果已经设定过定时器就清空上一次定时器
    if (task) {
      clearTimeout(task);
    }
    // 开始设定一个新的定时器，定时器结束后，执行传入的函数
    task = setTimeout(function () {
      func(args);
    }, delay);
  };
};
/**
 * 转换树形数据为数组
 *  @param {*} list
 *  @param {*} tree
 */
var _transTreeToArr = function transTreeToArr(list, tree) {
  if (!(Array.isArray(tree) && tree.length > 0)) return;
  tree.forEach(function (father) {
    list.push(father);
    if (father.layers instanceof Array) {
      _transTreeToArr(list, father.layers);
    }
  });
};
var _loopBounds = function loopBounds(bound, coordinates) {
  if (coordinates[0] instanceof Array) {
    coordinates.forEach(function (item) {
      if (item[0] instanceof Array) {
        _loopBounds(bound, item);
      } else {
        bound.extend(item);
      }
    });
  } else {
    bound.extend(coordinates);
  }
};
var getFeatureBoundingBox = function getFeatureBoundingBox(feature) {
  var bounds = new LngLatBounds();
  _loopBounds(bounds, feature.geometry.coordinates);
  return bounds;
};

export { debounce, getFeatureBoundingBox, _loopBounds as loopBounds, _transTreeToArr as transTreeToArr };
