import _toConsumableArray from '@babel/runtime-corejs3/helpers/toConsumableArray';
import _slicedToArray from '@babel/runtime-corejs3/helpers/slicedToArray';
import 'core-js/modules/es.array.push.js';
import 'core-js/modules/es.object.to-string.js';
import 'core-js/modules/web.dom-collections.for-each.js';
import _mapInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/map';
import _Set from '@babel/runtime-corejs3/core-js-stable/set';
import _concatInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/concat';
import _filterInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/filter';
import _includesInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/includes';
import _findIndexInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/find-index';
import { jsx } from 'react/jsx-runtime';
import { memo, useState, useCallback, useEffect } from 'react';
import GisToolHelper from '../../GISToolHelper.js';
import { useMap } from '../context/mapContext.js';
import { MapEvent } from '../../typings/TEvent.js';
import BaseWidget from '../BaseWidget/index.js';
import { Tree } from 'antd';

var LayerListIcon = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjcyMTMyNjkyNzI3IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9Ijg5OTAiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTg1Mi42IDQ2Mi45bDEyLjEgNy42YzI0LjggMTUuNiAzMi4zIDQ4LjMgMTYuNyA3My4yLTQuMiA2LjctOS45IDEyLjQtMTYuNyAxNi43TDU0MC40IDc2NC4xYy0xNy4zIDEwLjgtMzkuMiAxMC44LTU2LjQgMEwxNTkuMyA1NjBjLTI0LjgtMTUuNi0zMi4zLTQ4LjMtMTYuNy03My4yIDQuMi02LjcgOS45LTEyLjQgMTYuNy0xNi43bDEyLjEtNy42TDQ4My45IDY1OWMxNy4zIDEwLjggMzkuMiAxMC44IDU2LjQgMGwzMTIuMi0xOTYgMC4xLTAuMXogbTAgMTU2LjFsMTIuMSA3LjZjMjQuOCAxNS42IDMyLjMgNDguMyAxNi43IDczLjItNC4yIDYuNy05LjkgMTIuNC0xNi43IDE2LjdMNTQwLjQgOTIwLjJjLTE3LjMgMTAuOC0zOS4yIDEwLjgtNTYuNCAwTDE1OS4zIDcxNi4xYy0yNC44LTE1LjYtMzIuMy00OC4zLTE2LjctNzMuMiA0LjItNi43IDkuOS0xMi40IDE2LjctMTYuN2wxMi4xLTcuNkw0ODMuOSA4MTVjMTcuMyAxMC44IDM5LjIgMTAuOCA1Ni40IDBsMzEyLjItMTk2aDAuMXpNNTQwIDEwNi40bDMyNC42IDIwNC4xYzI0LjggMTUuNiAzMi4zIDQ4LjMgMTYuNyA3My4yLTQuMiA2LjctOS45IDEyLjQtMTYuNyAxNi43TDU0MC40IDYwNGMtMTcuMyAxMC44LTM5LjIgMTAuOC01Ni40IDBMMTU5LjMgMzk5LjhjLTI0LjgtMTUuNi0zMi4zLTQ4LjMtMTYuNy03My4yIDQuMi02LjcgOS45LTEyLjQgMTYuNy0xNi43bDMyNC40LTIwMy43YzE3LjMtMTAuOCAzOS4yLTEwLjggNTYuNCAwbC0wLjEgMC4yeiIgcC1pZD0iODk5MSI+PC9wYXRoPjwvc3ZnPg==';
var LayerList = function LayerList(props) {
  var _useMap = useMap(),
    map = _mapInstanceProperty(_useMap);
  var _useState = useState([]),
    _useState2 = _slicedToArray(_useState, 2),
    keys = _useState2[0],
    setkeys = _useState2[1];
  var _useState3 = useState([]),
    _useState4 = _slicedToArray(_useState3, 2),
    data = _useState4[0],
    setData = _useState4[1];
  var loop = useCallback(function (data, keys) {
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
    var union = new _Set(_concatInstanceProperty(_context = []).call(_context, _toConsumableArray(keys), _toConsumableArray(checkedKeys)));
    // 差集 增加的
    var addKeys = new _Set(_filterInstanceProperty(_context2 = _toConsumableArray(union)).call(_context2, function (x) {
      return !_includesInstanceProperty(keys).call(keys, x);
    }));
    // 差集 减少的
    var delKeys = new _Set(_filterInstanceProperty(_context3 = _toConsumableArray(union)).call(_context3, function (x) {
      return !_includesInstanceProperty(checkedKeys).call(checkedKeys, x);
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
    if ('layers' in layer && _findIndexInstanceProperty(_context4 = layer.layers).call(_context4, function (d) {
      return d.options.type === 'logicGroup';
    }) > -1) {
      layer.layers.forEach(function (f) {
        _modifyMapLayers(f);
      });
    } else if ('layers' in layer && layer.options.type === 'logicGroup') {
      var _context5;
      var isAllFalse = _findIndexInstanceProperty(_context5 = layer.layers).call(_context5, function (d) {
        return d.options.isAdd;
      }) === -1;
      if (isAllFalse) {
        layer.options.isAdd = false;
      } else {
        layer.options.isAdd = true;
      }
    }
  };
  useEffect(function () {
    // 地图图层加载事件
    var init = function init() {
      var loadkeys = [];
      var treeData = map ? loop(map.layers, loadkeys) : [];
      setData(treeData);
      setkeys(loadkeys);
    };
    var mapLayerChangedHandle = GisToolHelper.debounce(function () {
      init();
    }, 300);
    map === null || map === void 0 || map.on(MapEvent.MAPLAYERCHANGED, mapLayerChangedHandle);
    init();
    return function () {
      map === null || map === void 0 || map.off(MapEvent.MAPLAYERCHANGED, mapLayerChangedHandle);
    };
  }, []);
  return jsx(BaseWidget, {
    name: "\u56FE\u5C42\u63A7\u5236",
    width: 180,
    position: props.position,
    icon: props.icon ? props.icon : LayerListIcon,
    height: keys.length * 28 < 280 ? 280 : keys.length * 28,
    children: jsx(Tree, {
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
    })
  });
};
var index = /*#__PURE__*/memo(LayerList);

export { index as default };
