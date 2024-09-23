"use strict";

var _typeof = require("@babel/runtime-corejs3/helpers/typeof");
var _WeakMap = require("@babel/runtime-corejs3/core-js-stable/weak-map");
var _Object$getOwnPropertyDescriptor = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/asyncToGenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/slicedToArray"));
var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs3/regenerator"));
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _map = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/map"));
var _filter = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/filter"));
var _find = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/find"));
var _concat = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/concat"));
var _urlSearchParams = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/url-search-params"));
var _entries = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/entries"));
var _findIndex = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/find-index"));
var _react = _interopRequireWildcard(require("react"));
var _mapContext = require("../context/mapContext.js");
var _index = _interopRequireDefault(require("../PopupWrapper/index.js"));
var _mapboxGl = require("mapbox-gl");
var _axios = _interopRequireDefault(require("axios"));
require("./index.css");
function _getRequireWildcardCache(e) { if ("function" != typeof _WeakMap) return null; var r = new _WeakMap(), t = new _WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && _Object$getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? _Object$getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var PopupPanel = function PopupPanel(props) {
  var vector = props.vector,
    wms = props.wms,
    ifCenter = props.ifCenter;
  var _useMap = (0, _mapContext.useMap)(),
    map = (0, _map.default)(_useMap);
  var _useState = (0, _react.useState)(),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    popupData = _useState2[0],
    setPopupData = _useState2[1];
  var onCloseHandle = function onCloseHandle() {
    map === null || map === void 0 || map.clearSelect();
    setPopupData(undefined);
  };
  (0, _react.useEffect)(function () {
    // 矢量图层添加交互效果
    vector === null || vector === void 0 || vector.forEach(function (d) {
      map === null || map === void 0 || map.on('mouseenter', d.id, function () {
        map.getCanvas().style.cursor = 'pointer';
      });
      map === null || map === void 0 || map.on('mouseleave', d.id, function () {
        map.getCanvas().style.cursor = '';
      });
    });
    var vectorLayerClicked = function vectorLayerClicked(map, e) {
      if (vector) {
        var _context, _window$scale;
        var ids = (0, _map.default)(_context = (0, _filter.default)(vector).call(vector, function (d) {
          var _context2;
          var flag = map === null || map === void 0 ? void 0 : (0, _find.default)(_context2 = map.getLayerList()).call(_context2, function (f) {
            return f.options.id === d.id && f.options.isAdd;
          });
          return flag;
        })).call(_context, function (d) {
          return d.id;
        });
        var scale = (_window$scale = window.scale) !== null && _window$scale !== void 0 ? _window$scale : 1;
        var points = new _mapboxGl.Point(e.point.x / scale, e.point.y / scale);
        var features = map.queryRenderedFeatures(points, {
          layers: ids
        });
        if (features.length) {
          var feature = features[0];
          var title = (0, _find.default)(vector).call(vector, function (d) {
            return feature.layer.id === d.id;
          }).title;
          var template = (0, _find.default)(vector).call(vector, function (d) {
            return feature.layer.id === d.id;
          }).template;
          map.selectFeature(feature);
          setPopupData({
            properties: feature.properties,
            lngLat: ifCenter ? map.getCenter() : map.unproject(new _mapboxGl.Point(e.point.x / scale, e.point.y / scale)),
            title: title,
            template: template
          });
        }
      }
    };
    // geoserver请求
    var restLayerClicked = /*#__PURE__*/function () {
      var _ref = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee(map, e) {
        var _window$scale2, _context3, _context4, _context5, _context6, scale, url, params, queryString, lyrIds, openLys, _loop, _ret, i;
        return _regenerator.default.wrap(function _callee$(_context10) {
          while (1) switch (_context10.prev = _context10.next) {
            case 0:
              if (!wms) {
                _context10.next = 17;
                break;
              }
              scale = (_window$scale2 = window.scale) !== null && _window$scale2 !== void 0 ? _window$scale2 : 1;
              url = wms.baseUrl;
              params = {
                service: 'WFS',
                version: '1.0.0',
                request: 'GetFeature',
                maxFeatures: 50,
                outputFormat: 'application/json',
                CQL_FILTER: (0, _concat.default)(_context3 = "INTERSECTS(the_geom,Point(".concat(e.lngLat.lng / scale, " ")).call(_context3, e.lngLat.lat / scale, "))")
              };
              queryString = new _urlSearchParams.default((0, _entries.default)(params)).toString();
              lyrIds = (0, _map.default)(_context4 = (0, _filter.default)(_context5 = map.getLayerList()).call(_context5, function (d) {
                return d.options.isAdd;
              })).call(_context4, function (l) {
                return l.options.id;
              });
              openLys = (0, _filter.default)(_context6 = wms.layers).call(_context6, function (d) {
                return (0, _findIndex.default)(lyrIds).call(lyrIds, function (f) {
                  return f === d.id;
                }) > -1;
              });
              _loop = /*#__PURE__*/_regenerator.default.mark(function _loop(i) {
                var _context7, _context8;
                var requestUrl, rData;
                return _regenerator.default.wrap(function _loop$(_context9) {
                  while (1) switch (_context9.prev = _context9.next) {
                    case 0:
                      requestUrl = (0, _concat.default)(_context7 = (0, _concat.default)(_context8 = "".concat(url, "?")).call(_context8, queryString, "&typeName=")).call(_context7, openLys[i].layerName);
                      _context9.next = 3;
                      return _axios.default.get(requestUrl).then(function (ctx) {
                        var _temp$features;
                        var temp = ctx.data || {};
                        var flag = (temp === null || temp === void 0 || (_temp$features = temp.features) === null || _temp$features === void 0 ? void 0 : _temp$features.length) > 0;
                        if (flag) {
                          return {
                            layerId: openLys[i].id,
                            data: temp.features[0],
                            lngLat: e.lngLat
                          };
                        } else {
                          return undefined;
                        }
                      });
                    case 3:
                      rData = _context9.sent;
                      if (!rData) {
                        _context9.next = 6;
                        break;
                      }
                      return _context9.abrupt("return", {
                        v: rData
                      });
                    case 6:
                    case "end":
                      return _context9.stop();
                  }
                }, _loop);
              });
              i = 0;
            case 9:
              if (!(i < openLys.length)) {
                _context10.next = 17;
                break;
              }
              return _context10.delegateYield(_loop(i), "t0", 11);
            case 11:
              _ret = _context10.t0;
              if (!_ret) {
                _context10.next = 14;
                break;
              }
              return _context10.abrupt("return", _ret.v);
            case 14:
              i++;
              _context10.next = 9;
              break;
            case 17:
              return _context10.abrupt("return", undefined);
            case 18:
            case "end":
              return _context10.stop();
          }
        }, _callee);
      }));
      return function restLayerClicked(_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }();
    // 添加事件监听
    map === null || map === void 0 || map.on('click', /*#__PURE__*/function () {
      var _ref2 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee2(e) {
        var rData, _context11, _context12, feature, layerId, title, template;
        return _regenerator.default.wrap(function _callee2$(_context13) {
          while (1) switch (_context13.prev = _context13.next) {
            case 0:
              _context13.next = 2;
              return restLayerClicked(map, e);
            case 2:
              rData = _context13.sent;
              if (!rData) {
                vectorLayerClicked(map, e);
              } else {
                feature = rData.data;
                layerId = rData.layerId;
                title = (0, _find.default)(_context11 = wms.layers).call(_context11, function (d) {
                  return layerId === d.id;
                }).title;
                template = (0, _find.default)(_context12 = wms.layers).call(_context12, function (d) {
                  return layerId === d.id;
                }).template;
                map.selectFeature(feature);
                setPopupData({
                  properties: feature.properties,
                  lngLat: ifCenter ? map.getCenter() : rData.lngLat,
                  title: title,
                  template: template
                });
              }
            case 4:
            case "end":
              return _context13.stop();
          }
        }, _callee2);
      }));
      return function (_x3) {
        return _ref2.apply(this, arguments);
      };
    }());
  }, []);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: 'popupMaskContainer',
    id: "popup-mask-container"
  }, /*#__PURE__*/_react.default.createElement("div", null, popupData && map ? (/*#__PURE__*/_react.default.createElement(_index.default, {
    map: map,
    ifCenter: ifCenter,
    title: popupData.title,
    lngLat: popupData.lngLat,
    closeOnClick: false,
    onClose: function onClose() {
      return onCloseHandle();
    }
  }, popupData.template && /*#__PURE__*/(0, _react.cloneElement)(popupData.template, {
    data: popupData.properties
  }))) : null));
};
var index = exports.default = /*#__PURE__*/(0, _react.memo)(PopupPanel);