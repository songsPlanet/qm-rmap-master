import _defineProperty from '@babel/runtime-corejs3/helpers/defineProperty';
import _asyncToGenerator from '@babel/runtime-corejs3/helpers/asyncToGenerator';
import _slicedToArray from '@babel/runtime-corejs3/helpers/slicedToArray';
import _regeneratorRuntime from '@babel/runtime-corejs3/regenerator';
import 'core-js/modules/es.array.iterator.js';
import 'core-js/modules/es.array.push.js';
import 'core-js/modules/es.object.to-string.js';
import 'core-js/modules/es.string.iterator.js';
import 'core-js/modules/web.dom-collections.for-each.js';
import 'core-js/modules/web.dom-collections.iterator.js';
import _mapInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/map';
import _filterInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/filter';
import _findInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/find';
import _concatInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/concat';
import _findIndexInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/find-index';
import _Object$keys from '@babel/runtime-corejs3/core-js-stable/object/keys';
import _Object$getOwnPropertySymbols from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols';
import _Object$getOwnPropertyDescriptor from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor';
import _Object$getOwnPropertyDescriptors from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors';
import { jsx } from 'react/jsx-runtime';
import { memo, useState, useEffect, cloneElement } from 'react';
import { useMap } from '../context/mapContext.js';
import PopupWrapper from '../PopupWrapper/index.js';
import '@babel/runtime-corejs3/helpers/typeof';
import '@babel/runtime-corejs3/helpers/toConsumableArray';
import 'core-js/modules/es.error.cause.js';
import 'core-js/modules/es.number.to-fixed.js';
import 'core-js/modules/es.object.has-own.js';
import 'core-js/modules/es.object.keys.js';
import 'core-js/modules/es.regexp.to-string.js';
import '@babel/runtime-corejs3/core-js-stable/instance/slice';
import '@babel/runtime-corejs3/core-js-stable/object/get-own-property-names';
import '@babel/runtime-corejs3/core-js-stable/instance/last-index-of';
import '@babel/runtime-corejs3/core-js-stable/promise';
import '@babel/runtime-corejs3/core-js-stable/json/stringify';
import request from '../../utils/axios.js';
import '../../utils/events.js';
import { Point } from 'mapbox-gl';
import './index.css';

function ownKeys(e, r) { var t = _Object$keys(e); if (_Object$getOwnPropertySymbols) { var o = _Object$getOwnPropertySymbols(e); r && (o = _filterInstanceProperty(o).call(o, function (r) { return _Object$getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : _Object$getOwnPropertyDescriptors ? Object.defineProperties(e, _Object$getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, _Object$getOwnPropertyDescriptor(t, r)); }); } return e; }
var PopupPanel = function PopupPanel(props) {
  var vector = props.vector,
    wms = props.wms,
    ifCenter = props.ifCenter;
  var _useMap = useMap(),
    map = _mapInstanceProperty(_useMap);
  var _useState = useState(),
    _useState2 = _slicedToArray(_useState, 2),
    popupData = _useState2[0],
    setPopupData = _useState2[1];
  var onCloseHandle = function onCloseHandle() {
    map === null || map === void 0 || map.clearSelect();
    setPopupData(undefined);
  };
  useEffect(function () {
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
        var ids = _mapInstanceProperty(_context = _filterInstanceProperty(vector).call(vector, function (d) {
          var _context2;
          var flag = map === null || map === void 0 ? void 0 : _findInstanceProperty(_context2 = map.getLayerList()).call(_context2, function (f) {
            return f.options.id === d.id && f.options.isAdd;
          });
          return flag;
        })).call(_context, function (d) {
          return d.id;
        });
        var scale = (_window$scale = window.scale) !== null && _window$scale !== void 0 ? _window$scale : 1;
        var points = new Point(e.point.x / scale, e.point.y / scale);
        var features = map.queryRenderedFeatures(points, {
          layers: ids
        });
        if (features.length) {
          var feature = features[0];
          var title = _findInstanceProperty(vector).call(vector, function (d) {
            return feature.layer.id === d.id;
          }).title;
          var template = _findInstanceProperty(vector).call(vector, function (d) {
            return feature.layer.id === d.id;
          }).template;
          map.selectFeature(feature);
          console.log(feature);
          setPopupData({
            properties: feature.properties,
            lngLat: ifCenter ? map.getCenter() : map.unproject(new Point(e.point.x / scale, e.point.y / scale)),
            title: title,
            template: template
          });
        }
      }
    };
    // geoserver请求
    var restLayerClicked = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(map, e) {
        var _window$scale2, _context3, _context4, _context5, _context6, scale, url, params, lyrIds, openLys, _loop, _ret, i;
        return _regeneratorRuntime.wrap(function _callee$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              if (!wms) {
                _context8.next = 16;
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
                CQL_FILTER: _concatInstanceProperty(_context3 = "INTERSECTS(smgeometry,Point(".concat(e.lngLat.lng / scale, " ")).call(_context3, e.lngLat.lat / scale, "))")
              };
              lyrIds = _mapInstanceProperty(_context4 = _filterInstanceProperty(_context5 = map.getLayerList()).call(_context5, function (d) {
                return d.options.isAdd;
              })).call(_context4, function (l) {
                return l.options.id;
              });
              openLys = _filterInstanceProperty(_context6 = wms.layers).call(_context6, function (d) {
                return _findIndexInstanceProperty(lyrIds).call(lyrIds, function (f) {
                  return f === d.id;
                }) > -1;
              });
              _loop = /*#__PURE__*/_regeneratorRuntime.mark(function _loop(i) {
                var rData;
                return _regeneratorRuntime.wrap(function _loop$(_context7) {
                  while (1) switch (_context7.prev = _context7.next) {
                    case 0:
                      _context7.next = 2;
                      return request.get(url, _objectSpread(_objectSpread({}, params), {}, {
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
            case 8:
              if (!(i < openLys.length)) {
                _context8.next = 16;
                break;
              }
              return _context8.delegateYield(_loop(i), "t0", 10);
            case 10:
              _ret = _context8.t0;
              if (!_ret) {
                _context8.next = 13;
                break;
              }
              return _context8.abrupt("return", _ret.v);
            case 13:
              i++;
              _context8.next = 8;
              break;
            case 16:
              return _context8.abrupt("return", undefined);
            case 17:
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
      var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(e) {
        var rData, _context9, _context10, feature, layerId, title, template;
        return _regeneratorRuntime.wrap(function _callee2$(_context11) {
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
                title = _findInstanceProperty(_context9 = wms.layers).call(_context9, function (d) {
                  return layerId === d.id;
                }).title;
                template = _findInstanceProperty(_context10 = wms.layers).call(_context10, function (d) {
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
              return _context11.stop();
          }
        }, _callee2);
      }));
      return function (_x3) {
        return _ref2.apply(this, arguments);
      };
    }());
  }, []);
  return jsx("div", {
    className: 'popupMaskContainer',
    id: "popup-mask-container",
    children: jsx("div", {
      children: popupData && map ? jsx(PopupWrapper, {
        map: map,
        ifCenter: ifCenter,
        title: popupData.title,
        lngLat: popupData.lngLat,
        closeOnClick: false,
        onClose: function onClose() {
          return onCloseHandle();
        },
        children: popupData.template && /*#__PURE__*/cloneElement(popupData.template, {
          data: popupData.properties
        })
      }) : null
    })
  });
};
var index = /*#__PURE__*/memo(PopupPanel);

export { index as default };
