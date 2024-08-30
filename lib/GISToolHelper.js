"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.error.cause.js");
require("core-js/modules/es.array.push.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.test.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
var _slice = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/slice"));
var _from = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/array/from"));
var _symbol = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/symbol"));
var _getIteratorMethod2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/get-iterator-method"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/createClass"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/classCallCheck"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));
var _keys = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/keys"));
var _parseInt2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/parse-int"));
var _concat = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/concat"));
var _map = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/map"));
var _filter = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/filter"));
var _immutable = require("immutable");
var _mapboxGl = require("mapbox-gl");
var _moment = _interopRequireDefault(require("moment"));
var _GisToolHelper;
function _createForOfIteratorHelper(r, e) {
  var t = "undefined" != typeof _symbol.default && (0, _getIteratorMethod2.default)(r) || r["@@iterator"];
  if (!t) {
    if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) {
      t && (r = t);
      var _n = 0,
        F = function F() {};
      return {
        s: F,
        n: function n() {
          return _n >= r.length ? {
            done: !0
          } : {
            done: !1,
            value: r[_n++]
          };
        },
        e: function e(r) {
          throw r;
        },
        f: F
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var o,
    a = !0,
    u = !1;
  return {
    s: function s() {
      t = t.call(r);
    },
    n: function n() {
      var r = t.next();
      return a = r.done, r;
    },
    e: function e(r) {
      u = !0, o = r;
    },
    f: function f() {
      try {
        a || null == t.return || t.return();
      } finally {
        if (u) throw o;
      }
    }
  };
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    var _context6;
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = (0, _slice.default)(_context6 = {}.toString.call(r)).call(_context6, 8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? (0, _from.default)(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}
function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
var GisToolHelper = exports.default = /*#__PURE__*/(0, _createClass2.default)(function GisToolHelper() {
  (0, _classCallCheck2.default)(this, GisToolHelper);
});
_GisToolHelper = GisToolHelper;
/**
* 浅比较
* @param obj1
* @param obj2
* @returns ture or false
*/
(0, _defineProperty2.default)(GisToolHelper, "shollawEqual", function (obj1, obj2) {
  if (obj1 === obj2) {
    return true;
  }
  var keys1 = (0, _keys.default)(obj1);
  var keys2 = (0, _keys.default)(obj2);
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
(0, _defineProperty2.default)(GisToolHelper, "deepEqual", function (obj1, obj2) {
  var map1 = (0, _immutable.Map)(obj1);
  var map2 = (0, _immutable.Map)(obj2);
  return (0, _immutable.is)(map1, map2);
});
/**
 * 生成UUID
 * @returns
 */
(0, _defineProperty2.default)(GisToolHelper, "generateUUID", function () {
  return 'FY' + (0, _moment.default)().format('YYYYMMDDHHmmSSSS');
});
/**
* 防抖
* @param func：需要防抖处理的函数
* @param delay：时间间隔
*/
(0, _defineProperty2.default)(GisToolHelper, "debounce", function (func, delay) {
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
(0, _defineProperty2.default)(GisToolHelper, "throttle", function (func, delay) {
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
(0, _defineProperty2.default)(GisToolHelper, "transTreeToArr", function (list, tree) {
  if (!(Array.isArray(tree) && tree.length > 0)) return;
  tree.forEach(function (father) {
    list.push(father);
    if (father.layers instanceof Array) {
      _GisToolHelper.transTreeToArr(list, father.layers);
    }
  });
});
(0, _defineProperty2.default)(GisToolHelper, "loopBounds", function (bound, coordinates) {
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
(0, _defineProperty2.default)(GisToolHelper, "getFeatureBoundingBox", function (feature) {
  var bounds = new _mapboxGl.LngLatBounds();
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
(0, _defineProperty2.default)(GisToolHelper, "convertHexToRGB", function (color) {
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
    r: (0, _parseInt2.default)(color.substr(1, 2), 16),
    g: (0, _parseInt2.default)(color.substr(3, 2), 16),
    b: (0, _parseInt2.default)(color.substr(5, 2), 16)
  };
  return (0, _concat.default)(_context = (0, _concat.default)(_context2 = (0, _concat.default)(_context3 = "rgba(".concat(values.r, ", ")).call(_context3, values.g, ", ")).call(_context2, values.b, ", ")).call(_context, opacity, ")");
});
/**
* 16位转换为rgba
* @param color
* @param opacity
* @returns {string}
* @private
*/
(0, _defineProperty2.default)(GisToolHelper, "unique", function (arr, uniId) {
  var res = new _map.default();
  return (0, _filter.default)(arr).call(arr, function (item) {
    return !res.has(item[uniId]) && res.set(item[uniId], 1);
  });
});
/**
*十进制转度分秒
* @returns {{}}
*/
(0, _defineProperty2.default)(GisToolHelper, "decimalToDms", function (decimal) {
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
(0, _defineProperty2.default)(GisToolHelper, "calcPointByPointAndDistance", function (pointA, brng, dist) {
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
(0, _defineProperty2.default)(GisToolHelper, "rad", function (d) {
  return d * Math.PI / 180.0;
});
/**
 * 弧度换成度
 * @param  {number} x 弧度
 * @return {number}   度
 */
(0, _defineProperty2.default)(GisToolHelper, "deg", function (x) {
  return x * 180 / Math.PI;
});
/**
 *创建Polygon的geojson 数据
 * coords ：[[],[],...]
 * @returns {{}}
 */
(0, _defineProperty2.default)(GisToolHelper, "createPolygonFeatureCollection", function (coords, prop) {
  return {
    type: 'FeatureCollection',
    features: [{
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [coords]
      },
      properties: prop
    }]
  };
});
/**
 * 创建Point的FeatureCollection
 * @param lonlat 经纬度数组
 * lat: 纬度
 * @returns {{}}
 */
(0, _defineProperty2.default)(GisToolHelper, "createPointFeatureCollection", function (lonlat, prop) {
  return {
    type: 'FeatureCollection',
    features: [{
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: lonlat
      },
      properties: prop
    }]
  };
});
/**
 *创建lineString的geojson 数据
 * coordinates ：[[],[],...]
 * @returns {{}}
 */
(0, _defineProperty2.default)(GisToolHelper, "createLineFeatureCollection", function (coords, prop) {
  return {
    type: 'FeatureCollection',
    features: [{
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: coords
      },
      properties: prop
    }]
  };
});
/**
*十进制转度分秒
* @returns {{}}
*/
(0, _defineProperty2.default)(GisToolHelper, "getTdtSubDomain", function (tianditukey) {
  var _context4, _context5;
  // 创建一个随机选择子域名的函数
  var subDomains = ['t1', 't2', 't3', 't4', 't5', 't6', 't7'];
  var index = Math.floor(Math.random() * subDomains.length);
  var sub = subDomains[index];
  var tiles = {
    imgw: (0, _concat.default)(_context4 = "http://".concat(sub, ".tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=")).call(_context4, tianditukey),
    ciaw: (0, _concat.default)(_context5 = "http://".concat(sub, ".tianditu.gov.cn/cia_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=")).call(_context5, tianditukey)
  };
  return tiles;
});