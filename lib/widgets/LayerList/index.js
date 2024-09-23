"use strict";

var _typeof = require("@babel/runtime-corejs3/helpers/typeof");
var _WeakMap = require("@babel/runtime-corejs3/core-js-stable/weak-map");
var _Object$getOwnPropertyDescriptor = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _tree = _interopRequireDefault(require("antd/lib/tree"));
require("core-js/modules/es.array.push.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/toConsumableArray"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/slicedToArray"));
var _map = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/map"));
var _set = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/set"));
var _concat = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/concat"));
var _filter = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/filter"));
var _includes = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/includes"));
var _findIndex = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/find-index"));
var _react = _interopRequireWildcard(require("react"));
var _qmMapWrapper = require("qm-map-wrapper");
var _mapContext = require("../context/mapContext.js");
var _index = _interopRequireDefault(require("../BaseWidget/index.js"));
function _getRequireWildcardCache(e) { if ("function" != typeof _WeakMap) return null; var r = new _WeakMap(), t = new _WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && _Object$getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? _Object$getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var LayerListIcon = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjcyMTMyNjkyNzI3IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9Ijg5OTAiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTg1Mi42IDQ2Mi45bDEyLjEgNy42YzI0LjggMTUuNiAzMi4zIDQ4LjMgMTYuNyA3My4yLTQuMiA2LjctOS45IDEyLjQtMTYuNyAxNi43TDU0MC40IDc2NC4xYy0xNy4zIDEwLjgtMzkuMiAxMC44LTU2LjQgMEwxNTkuMyA1NjBjLTI0LjgtMTUuNi0zMi4zLTQ4LjMtMTYuNy03My4yIDQuMi02LjcgOS45LTEyLjQgMTYuNy0xNi43bDEyLjEtNy42TDQ4My45IDY1OWMxNy4zIDEwLjggMzkuMiAxMC44IDU2LjQgMGwzMTIuMi0xOTYgMC4xLTAuMXogbTAgMTU2LjFsMTIuMSA3LjZjMjQuOCAxNS42IDMyLjMgNDguMyAxNi43IDczLjItNC4yIDYuNy05LjkgMTIuNC0xNi43IDE2LjdMNTQwLjQgOTIwLjJjLTE3LjMgMTAuOC0zOS4yIDEwLjgtNTYuNCAwTDE1OS4zIDcxNi4xYy0yNC44LTE1LjYtMzIuMy00OC4zLTE2LjctNzMuMiA0LjItNi43IDkuOS0xMi40IDE2LjctMTYuN2wxMi4xLTcuNkw0ODMuOSA4MTVjMTcuMyAxMC44IDM5LjIgMTAuOCA1Ni40IDBsMzEyLjItMTk2aDAuMXpNNTQwIDEwNi40bDMyNC42IDIwNC4xYzI0LjggMTUuNiAzMi4zIDQ4LjMgMTYuNyA3My4yLTQuMiA2LjctOS45IDEyLjQtMTYuNyAxNi43TDU0MC40IDYwNGMtMTcuMyAxMC44LTM5LjIgMTAuOC01Ni40IDBMMTU5LjMgMzk5LjhjLTI0LjgtMTUuNi0zMi4zLTQ4LjMtMTYuNy03My4yIDQuMi02LjcgOS45LTEyLjQgMTYuNy0xNi43bDMyNC40LTIwMy43YzE3LjMtMTAuOCAzOS4yLTEwLjggNTYuNCAwbC0wLjEgMC4yeiIgcC1pZD0iODk5MSI+PC9wYXRoPjwvc3ZnPg==';
var LayerList = function LayerList(props) {
  var _useMap = (0, _mapContext.useMap)(),
    map = (0, _map.default)(_useMap);
  var _useState = (0, _react.useState)([]),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    keys = _useState2[0],
    setkeys = _useState2[1];
  var _useState3 = (0, _react.useState)([]),
    _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
    data = _useState4[0],
    setData = _useState4[1];
  var loop = (0, _react.useCallback)(function (data, keys) {
    var nodeData;
    var treeData = [];
    data.forEach(function (layer) {
      nodeData = undefined;
      if ('layers' in layer && layer.options.type === 'logicGroup') {
        nodeData = {
          title: layer.options.name,
          key: layer.options.id,
          selectable: false,
          children: loop(layer.layers, keys)
        };
      } else {
        if (!layer.options.isTemporary) {
          nodeData = {
            title: layer.options.name,
            key: layer.options.id,
            selectable: false
          };
        }
      }
      if (nodeData) {
        treeData.push(nodeData);
      }
      if (layer.options.isAdd && layer.options.type !== 'logicGroup' && !layer.options.isTemporary) {
        keys.push(layer.options.id);
      }
    });
    return treeData;
  }, []);
  var checkedHandle = function checkedHandle(checkedKeys, info) {
    var _context, _context2, _context3;
    setkeys(checkedKeys);
    // 并集
    var union = new _set.default((0, _concat.default)(_context = []).call(_context, (0, _toConsumableArray2.default)(keys), (0, _toConsumableArray2.default)(checkedKeys)));
    // 差集 增加的
    var addKeys = new _set.default((0, _filter.default)(_context2 = (0, _toConsumableArray2.default)(union)).call(_context2, function (x) {
      return !(0, _includes.default)(keys).call(keys, x);
    }));
    // 差集 减少的
    var delKeys = new _set.default((0, _filter.default)(_context3 = (0, _toConsumableArray2.default)(union)).call(_context3, function (x) {
      return !(0, _includes.default)(checkedKeys).call(checkedKeys, x);
    }));
    addKeys.forEach(function (key) {
      var lyr = map === null || map === void 0 ? void 0 : map.getLayerWrapper(map.layers, key);
      if (lyr && 'layers' in lyr) {
        lyr.layers.forEach(function (d) {
          d.options.isAdd = true;
        });
        map === null || map === void 0 || map.addLayerWrapper(lyr);
      } else if (lyr) {
        lyr.options.isAdd = true;
        map === null || map === void 0 || map.addLayerWrapper(lyr);
        // 淡入淡出效果，同时图层需要配置对应属性
        // map?.setPaintProperty(lyr.options.id, 'fill-opacity', 0.6);
      }
    });
    delKeys.forEach(function (key) {
      var lyr = map === null || map === void 0 ? void 0 : map.getLayerWrapper(map.layers, key);
      if (lyr && 'layers' in lyr) {
        lyr.layers.forEach(function (d) {
          d.options.isAdd = false;
        });
        map === null || map === void 0 || map.removeLayerWrapper(lyr);
      } else if (lyr) {
        lyr.options.isAdd = false;
        map === null || map === void 0 || map.removeLayerWrapper(lyr);
        // map?.setPaintProperty(lyr.options.id, 'fill-opacity', 0);
      }
    });
    // 修正logicGroup isAdd属性
    map.layers.forEach(function (layer) {
      _modifyMapLayers(layer);
    });
  };
  var _modifyMapLayers = function modifyMapLayers(layer) {
    var _context4;
    if ('layers' in layer && (0, _findIndex.default)(_context4 = layer.layers).call(_context4, function (d) {
      return d.options.type === 'logicGroup';
    }) > -1) {
      layer.layers.forEach(function (f) {
        _modifyMapLayers(f);
      });
    } else if ('layers' in layer && layer.options.type === 'logicGroup') {
      var _context5;
      var isAllFalse = (0, _findIndex.default)(_context5 = layer.layers).call(_context5, function (d) {
        return d.options.isAdd;
      }) === -1;
      if (isAllFalse) {
        layer.options.isAdd = false;
      } else {
        layer.options.isAdd = true;
      }
    }
  };
  (0, _react.useEffect)(function () {
    // 地图图层加载事件
    var init = function init() {
      var loadkeys = [];
      var treeData = map ? loop(map.layers, loadkeys) : [];
      setData(treeData);
      setkeys(loadkeys);
    };
    var mapLayerChangedHandle = _qmMapWrapper.GISToolHelper.debounce(function () {
      init();
    }, 300);
    map === null || map === void 0 || map.on(_qmMapWrapper.MapEvent.MAPLAYERCHANGED, mapLayerChangedHandle);
    init();
    return function () {
      map === null || map === void 0 || map.off(_qmMapWrapper.MapEvent.MAPLAYERCHANGED, mapLayerChangedHandle);
    };
  }, []);
  return /*#__PURE__*/_react.default.createElement(_index.default, {
    name: "\u56FE\u5C42\u63A7\u5236",
    width: 180,
    position: props.position,
    icon: props.icon ? props.icon : LayerListIcon,
    height: keys.length * 28 < 280 ? 280 : keys.length * 28
  }, /*#__PURE__*/_react.default.createElement(_tree.default, {
    checkable: true,
    checkedKeys: keys,
    onCheck: function onCheck(checkedKeys, info) {
      return checkedHandle(checkedKeys);
    },
    treeData: data,
    style: {
      fontSize: 12,
      maxHeight: 400,
      overflowX: 'hidden',
      overflowY: 'auto'
    }
  }));
};
var LayerList$1 = exports.default = /*#__PURE__*/(0, _react.memo)(LayerList);