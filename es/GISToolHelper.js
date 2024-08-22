import 'core-js/modules/es.error.cause.js';
import 'core-js/modules/es.regexp.exec.js';
import 'core-js/modules/es.regexp.test.js';
import 'core-js/modules/es.regexp.to-string.js';
import _sliceInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/slice';
import _Array$from from '@babel/runtime-corejs3/core-js-stable/array/from';
import _Symbol from '@babel/runtime-corejs3/core-js-stable/symbol';
import _getIteratorMethod from '@babel/runtime-corejs3/core-js/get-iterator-method';
import _createClass from '@babel/runtime-corejs3/helpers/createClass';
import _classCallCheck from '@babel/runtime-corejs3/helpers/classCallCheck';
import _defineProperty from '@babel/runtime-corejs3/helpers/defineProperty';
import 'core-js/modules/es.array.push.js';
import 'core-js/modules/es.object.to-string.js';
import 'core-js/modules/web.dom-collections.for-each.js';
import _Object$keys from '@babel/runtime-corejs3/core-js-stable/object/keys';
import _parseInt from '@babel/runtime-corejs3/core-js-stable/parse-int';
import _concatInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/concat';
import _Map from '@babel/runtime-corejs3/core-js-stable/map';
import _filterInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/filter';
import { Map, is } from 'immutable';
import { LngLatBounds } from 'mapbox-gl';
import moment from 'moment';

var _GisToolHelper;
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof _Symbol && _getIteratorMethod(r) || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { var _context4; if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = _sliceInstanceProperty(_context4 = {}.toString.call(r)).call(_context4, 8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? _Array$from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
var GisToolHelper = /*#__PURE__*/_createClass(function GisToolHelper() {
  _classCallCheck(this, GisToolHelper);
});
_GisToolHelper = GisToolHelper;
/**
* 浅比较
* @param obj1
* @param obj2
* @returns ture or false
*/
_defineProperty(GisToolHelper, "shollawEqual", function (obj1, obj2) {
  if (obj1 === obj2) {
    return true;
  }
  var keys1 = _Object$keys(obj1);
  var keys2 = _Object$keys(obj2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  var _iterator = _createForOfIteratorHelper(keys1),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var key = _step.value;
      if (!obj2.hasOwnProperty(key) || obj1[key] !== obj2[key]) {
        return false;
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return true;
});
/**
 * 深比较
 * @param obj1
 * @param obj2
 * @returns ture or false
 */
_defineProperty(GisToolHelper, "deepEqual", function (obj1, obj2) {
  var map1 = Map(obj1);
  var map2 = Map(obj2);
  return is(map1, map2);
});
/**
 * 生成UUID
 * @returns
 */
_defineProperty(GisToolHelper, "generateUUID", function () {
  return 'FY' + moment().format('YYYYMMDDHHmmSSSS');
});
/**
* 防抖
* @param func：需要防抖处理的函数
* @param delay：时间间隔
*/
_defineProperty(GisToolHelper, "debounce", function (func, delay) {
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
});
/**
* 节流
* @param func
* @param delay
*/
_defineProperty(GisToolHelper, "throttle", function (func, delay) {
  var task = null;
  return function (args) {
    if (!task) {
      task = setTimeout(function () {
        task = null;
        func(args);
      }, delay);
    }
  };
});
/**
* 转换树形数据为数组
*  @param {*} list
*  @param {*} tree
*/
_defineProperty(GisToolHelper, "transTreeToArr", function (list, tree) {
  if (!(Array.isArray(tree) && tree.length > 0)) return;
  tree.forEach(function (father) {
    list.push(father);
    if (father.layers instanceof Array) {
      _GisToolHelper.transTreeToArr(list, father.layers);
    }
  });
});
_defineProperty(GisToolHelper, "loopBounds", function (bound, coordinates) {
  if (coordinates[0] instanceof Array) {
    coordinates.forEach(function (item) {
      if (item[0] instanceof Array) {
        _GisToolHelper.loopBounds(bound, item);
      } else {
        bound.extend(item);
      }
    });
  } else {
    bound.extend(coordinates);
  }
});
/**
 * 获取边界：
 * return：LngLatBounds
 */
_defineProperty(GisToolHelper, "getFeatureBoundingBox", function (feature) {
  var bounds = new LngLatBounds();
  _GisToolHelper.loopBounds(bounds, feature.geometry.coordinates);
  return bounds;
});
/**
* 16位转换为rgba
* @param color
* @param opacity
* @returns {string}
* @private
*/
_defineProperty(GisToolHelper, "convertHexToRGB", function (color) {
  var _context, _context2, _context3;
  var opacity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  if (color.length === 4) {
    var extendedColor = '#';
    for (var i = 1; i < color.length; i++) {
      extendedColor += color.charAt(i) + color.charAt(i);
    }
    color = extendedColor;
  }
  var values = {
    r: _parseInt(color.substr(1, 2), 16),
    g: _parseInt(color.substr(3, 2), 16),
    b: _parseInt(color.substr(5, 2), 16)
  };
  return _concatInstanceProperty(_context = _concatInstanceProperty(_context2 = _concatInstanceProperty(_context3 = "rgba(".concat(values.r, ", ")).call(_context3, values.g, ", ")).call(_context2, values.b, ", ")).call(_context, opacity, ")");
});
/**
* 16位转换为rgba
* @param color
* @param opacity
* @returns {string}
* @private
*/
_defineProperty(GisToolHelper, "unique", function (arr, uniId) {
  var res = new _Map();
  return _filterInstanceProperty(arr).call(arr, function (item) {
    return !res.has(item[uniId]) && res.set(item[uniId], 1);
  });
});
/**
*十进制转度分秒
* @returns {{}}
*/
_defineProperty(GisToolHelper, "decimalToDms", function (decimal) {
  // 提取整数部分
  var degrees = Math.floor(decimal);
  // 计算小数部分并转换为百分比
  var minutesAndSeconds = (decimal - degrees) * 60;
  // 提取分钟部分
  var minutes = Math.floor(minutesAndSeconds);
  // 计算秒钟部分
  var seconds = Math.round((minutesAndSeconds - minutes) * 60);
  return {
    degrees: degrees,
    minutes: minutes,
    seconds: seconds
  };
});
/**
 * 已知一点经纬度，方位角，距离求另一点的坐标
 *  @param  {number[]} 已知点经纬度
 *  @param  {number}  方位角
 *  @param  {number} 距离
 */
_defineProperty(GisToolHelper, "calcPointByPointAndDistance", function (pointA, brng, dist) {
  var VincentyConstants = {
    a: 6378137,
    b: 6356752.3142,
    f: 1 / 298.257223563
  };
  var a = VincentyConstants.a;
  var b = VincentyConstants.b;
  var f = VincentyConstants.f;
  var lon1 = pointA[0];
  var lat1 = pointA[1];
  var s = dist;
  var alpha1 = _GisToolHelper.rad(brng);
  var sinAlpha1 = Math.sin(alpha1);
  var cosAlpha1 = Math.cos(alpha1);
  var tanU1 = (1 - f) * Math.tan(_GisToolHelper.rad(lat1));
  var cosU1 = 1 / Math.sqrt(1 + tanU1 * tanU1);
  var sinU1 = tanU1 * cosU1;
  var sigma1 = Math.atan2(tanU1, cosAlpha1);
  var sinAlpha = cosU1 * sinAlpha1;
  var cosSqAlpha = 1 - sinAlpha * sinAlpha;
  var uSq = cosSqAlpha * (a * a - b * b) / (b * b);
  var A = 1 + uSq / 16384 * (4096 + uSq * (-768 + uSq * (320 - 175 * uSq)));
  var B = uSq / 1024 * (256 + uSq * (-128 + uSq * (74 - 47 * uSq)));
  var sigma = s / (b * A);
  var sigmaP = 2 * Math.PI;
  var cosSigma;
  var sinSigma;
  var cos2SigmaM;
  while (Math.abs(sigma - sigmaP) > 1e-12) {
    cos2SigmaM = Math.cos(2 * sigma1 + sigma);
    sinSigma = Math.sin(sigma);
    cosSigma = Math.cos(sigma);
    var deltaSigma = B * sinSigma * (cos2SigmaM + B / 4 * (cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM) - B / 6 * cos2SigmaM * (-3 + 4 * sinSigma * sinSigma) * (-3 + 4 * cos2SigmaM * cos2SigmaM)));
    sigmaP = sigma;
    sigma = s / (b * A) + deltaSigma;
  }
  var tmp = sinU1 * sinSigma - cosU1 * cosSigma * cosAlpha1;
  var lat2 = Math.atan2(sinU1 * cosSigma + cosU1 * sinSigma * cosAlpha1, (1 - f) * Math.sqrt(sinAlpha * sinAlpha + tmp * tmp));
  var lambda = Math.atan2(sinSigma * sinAlpha1, cosU1 * cosSigma - sinU1 * sinSigma * cosAlpha1);
  var C = f / 16 * cosSqAlpha * (4 + f * (4 - 3 * cosSqAlpha));
  var L = lambda - (1 - C) * f * sinAlpha * (sigma + C * sinSigma * (cos2SigmaM + C * cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM)));
  return [lon1 + _GisToolHelper.deg(L), _GisToolHelper.deg(lat2)];
});
/**
 * 度换成弧度
 * @param  {number} d 度
 * @return {number} 弧度
 */
_defineProperty(GisToolHelper, "rad", function (d) {
  return d * Math.PI / 180.0;
});
/**
 * 弧度换成度
 * @param  {number} x 弧度
 * @return {number}   度
 */
_defineProperty(GisToolHelper, "deg", function (x) {
  return x * 180 / Math.PI;
});
/**
 *创建Polygon的geojson 数据
 * coords ：[[],[],...]
 * @returns {{}}
 */
_defineProperty(GisToolHelper, "createPolygonFeatureCollection", function (coords) {
  return {
    type: 'FeatureCollection',
    features: [{
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [coords]
      }
    }]
  };
});
/**
 * 创建Point的FeatureCollection
 * @param lonlat 经纬度数组
 * lat: 纬度
 * @returns {{}}
 */
_defineProperty(GisToolHelper, "createPointFeatureCollection", function (lonlat) {
  return {
    type: 'FeatureCollection',
    features: [{
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: lonlat
      }
    }]
  };
});
/**
 *创建lineString的geojson 数据
 * coordinates ：[[],[],...]
 * @returns {{}}
 */
_defineProperty(GisToolHelper, "createLineFeatureCollection", function (coords) {
  return {
    type: 'FeatureCollection',
    features: [{
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: coords
      }
    }]
  };
});

export { GisToolHelper as default };
