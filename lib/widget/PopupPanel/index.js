"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.array.push.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));
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
var _findIndex = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/find-index"));
var _keys = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/keys"));
var _getOwnPropertySymbols = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols"));
var _getOwnPropertyDescriptor = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor"));
var _getOwnPropertyDescriptors = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors"));
var _jsxRuntime = require("react/jsx-runtime");
var _react = require("react");
var _mapContext = require("../../context/mapContext.js");
var _index = _interopRequireDefault(require("../PopupWrapper/index.js"));
var _axios = _interopRequireDefault(require("../../utils/axios.js"));
function ownKeys(e, r) {
  var t = (0, _keys.default)(e);
  if (_getOwnPropertySymbols.default) {
    var o = (0, _getOwnPropertySymbols.default)(e);
    r && (o = (0, _filter.default)(o).call(o, function (r) {
      return (0, _getOwnPropertyDescriptor.default)(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
      (0, _defineProperty2.default)(e, r, t[r]);
    }) : _getOwnPropertyDescriptors.default ? Object.defineProperties(e, (0, _getOwnPropertyDescriptors.default)(t)) : ownKeys(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, (0, _getOwnPropertyDescriptor.default)(t, r));
    });
  }
  return e;
}
var PopupPanel = function PopupPanel(props) {
  var _useMap = (0, _mapContext.useMap)(),
    map = (0, _map.default)(_useMap);
  var vector = props.vector,
    wms = props.wms;
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
        var _context;
        var ids = (0, _map.default)(_context = (0, _filter.default)(vector).call(vector, function (d) {
          var _context2;
          var flag = map === null || map === void 0 ? void 0 : (0, _find.default)(_context2 = map.getLayerList()).call(_context2, function (f) {
            return f.options.id === d.id && f.options.isAdd;
          });
          return flag;
        })).call(_context, function (d) {
          return d.id;
        });
        var features = map.queryRenderedFeatures(e.point, {
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
            lngLat: e.lngLat,
            title: title,
            template: template
          });
        }
      }
    };
    var restLayerClicked = /*#__PURE__*/function () {
      var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(map, e) {
        var _context3, _context4, _context5, _context6, url, params, lyrIds, openLys, _loop, _ret, i;
        return _regenerator.default.wrap(function _callee$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              if (!wms) {
                _context8.next = 15;
                break;
              }
              url = wms.baseUrl;
              params = {
                service: 'WFS',
                version: '1.0.0',
                request: 'GetFeature',
                maxFeatures: 50,
                outputFormat: 'application/json',
                CQL_FILTER: (0, _concat.default)(_context3 = "INTERSECTS(the_geom,Point(".concat(e.lngLat.lng, " ")).call(_context3, e.lngLat.lat, "))")
              };
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
                var rData;
                return _regenerator.default.wrap(function _loop$(_context7) {
                  while (1) switch (_context7.prev = _context7.next) {
                    case 0:
                      _context7.next = 2;
                      return _axios.default.get(url, _objectSpread(_objectSpread({}, params), {}, {
                        typeName: openLys[i].layerName
                      })).then(function (ctx) {
                        var _temp$features;
                        var temp = ctx || {};
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
                    case 2:
                      rData = _context7.sent;
                      if (!rData) {
                        _context7.next = 5;
                        break;
                      }
                      return _context7.abrupt("return", {
                        v: rData
                      });
                    case 5:
                    case "end":
                      return _context7.stop();
                  }
                }, _loop);
              });
              i = 0;
            case 7:
              if (!(i < openLys.length)) {
                _context8.next = 15;
                break;
              }
              return _context8.delegateYield(_loop(i), "t0", 9);
            case 9:
              _ret = _context8.t0;
              if (!_ret) {
                _context8.next = 12;
                break;
              }
              return _context8.abrupt("return", _ret.v);
            case 12:
              i++;
              _context8.next = 7;
              break;
            case 15:
              return _context8.abrupt("return", undefined);
            case 16:
            case "end":
              return _context8.stop();
          }
        }, _callee);
      }));
      return function restLayerClicked(_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }();
    // 添加事件监听
    map === null || map === void 0 || map.on('click', /*#__PURE__*/function () {
      var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(e) {
        var rData, _context9, _context10, feature, layerId, title, template;
        return _regenerator.default.wrap(function _callee2$(_context11) {
          while (1) switch (_context11.prev = _context11.next) {
            case 0:
              _context11.next = 2;
              return restLayerClicked(map, e);
            case 2:
              rData = _context11.sent;
              if (!rData) {
                vectorLayerClicked(map, e);
              } else {
                feature = rData.data;
                layerId = rData.layerId;
                title = (0, _find.default)(_context9 = wms.layers).call(_context9, function (d) {
                  return layerId === d.id;
                }).title;
                template = (0, _find.default)(_context10 = wms.layers).call(_context10, function (d) {
                  return layerId === d.id;
                }).template;
                map.selectFeature(feature);
                setPopupData({
                  properties: feature.properties,
                  lngLat: rData.lngLat,
                  title: title,
                  template: template
                });
              }
            case 4:
            case "end":
              return _context11.stop();
          }
        }, _callee2);
      }));
      return function (_x3) {
        return _ref2.apply(this, arguments);
      };
    }());
  }, []);
  return (0, _jsxRuntime.jsx)("div", {
    children: popupData ? (0, _jsxRuntime.jsx)(_index.default, {
      title: popupData.title,
      lngLat: popupData.lngLat,
      closeOnClick: false,
      onClose: function onClose() {
        return onCloseHandle();
      },
      children: popupData.template && /*#__PURE__*/(0, _react.cloneElement)(popupData.template, {
        data: popupData.properties
      })
    }) : null
  });
};
var index = exports.default = /*#__PURE__*/(0, _react.memo)(PopupPanel);