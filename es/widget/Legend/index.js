import _slicedToArray from '@babel/runtime-corejs3/helpers/slicedToArray';
import 'core-js/modules/es.array.push.js';
import 'core-js/modules/es.object.to-string.js';
import 'core-js/modules/web.dom-collections.for-each.js';
import _mapInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/map';
import _filterInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/filter';
import _findInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/find';
import _reduceInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/reduce';
import { jsxs, jsx } from 'react/jsx-runtime';
import { memo, useState, useCallback, useEffect } from 'react';
import { useMap } from '../../context/mapContext.js';
import { MapEvent } from '../../mapboxgl/typings/TEvent.js';
import { debounce } from '../../utils.js';
import BaseWidget from '../BaseWidget/index.js';
import './index.css';

var Legend = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjcyMTEwNzAzMTU0IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjQ5NzIiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTExMiAxMTJtMzIgMGw3MzYgMHEzMiAwIDMyIDMybDAgNzM2cTAgMzItMzIgMzJsLTczNiAwcS0zMiAwLTMyLTMybDAtNzM2cTAtMzIgMzItMzJaIiBmaWxsPSIjRkZGRkZGIiBwLWlkPSI0OTczIj48L3BhdGg+PHBhdGggZD0iTTEyOCA5Nmg3NjhhMzIgMzIgMCAwIDEgMzIgMzJ2NzY4YTMyIDMyIDAgMCAxLTMyIDMySDEyOGEzMiAzMiAwIDAgMS0zMi0zMlYxMjhhMzIgMzIgMCAwIDEgMzItMzJ6IG0wIDMydjc2OGg3NjhWMTI4SDEyOHoiIGZpbGw9IiM1RDZEN0UiIHAtaWQ9IjQ5NzQiPjwvcGF0aD48cGF0aCBkPSJNMjI0IDM4NGg2NHY2NEgyMjRWMzg0eiBtMCAxMjhoNjR2NjRIMjI0di02NHogbTAgMTI4aDY0djY0SDIyNHYtNjR6IG0wIDEyOGg2NHY2NEgyMjR2LTY0ek01NDQgMzg0aDY0djY0aC02NFYzODR6IG0wIDEyOGg2NHY2NGgtNjR2LTY0eiBtMCAxMjhoNjR2NjRoLTY0di02NHogbTAgMTI4aDY0djY0aC02NHYtNjR6IiBmaWxsPSIjODA4RkExIiBwLWlkPSI0OTc1Ij48L3BhdGg+PHBhdGggZD0iTTMyMCAzODRoMTYwdjY0SDMyMFYzODR6IG0wIDEyOGgxNjB2NjRIMzIwdi02NHogbTAgMTI4aDE2MHY2NEgzMjB2LTY0eiBtMCAxMjhoMTYwdjY0SDMyMHYtNjR6TTY0MCAzODRoMTYwdjY0aC0xNjBWMzg0eiBtMCAxMjhoMTYwdjY0aC0xNjB2LTY0eiBtMCAxMjhoMTYwdjY0aC0xNjB2LTY0eiBtMCAxMjhoMTYwdjY0aC0xNjB2LTY0eiIgZmlsbD0iI0FDQjRDMCIgcC1pZD0iNDk3NiI+PC9wYXRoPjxwYXRoIGQ9Ik0yMjQgMjI0aDU3NnY5NkgyMjR6IiBmaWxsPSIjMzBBRDk4IiBwLWlkPSI0OTc3Ij48L3BhdGg+PC9zdmc+';
var LegendControl = function LegendControl(props) {
  var _useMap = useMap(),
    map = _mapInstanceProperty(_useMap);
  var _useState = useState(),
    _useState2 = _slicedToArray(_useState, 2),
    listDom = _useState2[0],
    setListDom = _useState2[1];
  var _useState3 = useState(0),
    _useState4 = _slicedToArray(_useState3, 2),
    height = _useState4[0],
    setHeight = _useState4[1];
  var loop = useCallback(function (layers, hArr, list) {
    var nodeData;
    layers.forEach(function (layer) {
      var _context;
      nodeData = undefined;
      if ('layers' in layer && !layer.options.legend) {
        loop(layer.layers, hArr, list);
      } else if (layer.options.legend && (layer.options.isAdd || 'layers' in layer && _filterInstanceProperty(_context = layer.layers).call(_context, function (d) {
        return d.options.isAdd;
      }).length)) {
        var _layer$options$legend = layer.options.legend,
          title = _layer$options$legend.title,
          items = _layer$options$legend.items;
        if (items) {
          nodeData = jsxs("div", {
            className: "mapboxgl-legend-group",
            children: [jsx("div", {
              className: "mapboxgl-legend-tilte",
              children: title ? title : layer.options.name
            }), items === null || items === void 0 ? void 0 : _mapInstanceProperty(items).call(items, function (d) {
              var _context2;
              hArr.push(26);
              var img = map === null || map === void 0 ? void 0 : _findInstanceProperty(_context2 = map.images).call(_context2, function (f) {
                return f.id === d.imageId;
              });
              return jsxs("div", {
                className: "mapboxgl-legend-item",
                children: [img ? jsx("img", {
                  src: img.data,
                  alt: "",
                  className: "mapboxgl-legend-item-img"
                }) : jsx("div", {
                  className: "mapboxgl-legend-item-geo",
                  style: d.style
                }), jsx("div", {
                  className: "mapboxgl-legend-item-text",
                  children: d.text
                })]
              }, d.text);
            })]
          }, layer.options.id);
          hArr.push(50);
        } else {
          var _context3;
          var _layer$options$legend2 = layer.options.legend,
            style = _layer$options$legend2.style,
            imageId = _layer$options$legend2.imageId,
            text = _layer$options$legend2.text;
          var img = map === null || map === void 0 ? void 0 : _findInstanceProperty(_context3 = map.images).call(_context3, function (f) {
            return f.id === imageId;
          });
          hArr.push(26);
          nodeData = jsxs("div", {
            className: "mapboxgl-legend-item",
            children: [img ? jsx("img", {
              src: img.data,
              alt: "",
              className: "mapboxgl-legend-item-img"
            }) : jsx("div", {
              className: "mapboxgl-legend-item-geo",
              style: style
            }), jsx("div", {
              className: "mapboxgl-legend-item-text",
              children: text ? text : layer.options.name
            })]
          }, text ? text : title ? title : layer.options.id);
        }
      } else {
        nodeData = undefined;
      }
      if (nodeData) {
        list.push(nodeData);
      }
    });
  }, []);
  useEffect(function () {
    var init = function init() {
      // 计算高度
      var hArr = [];
      // dom列表
      var list = [];
      loop(map.layers, hArr, list);
      setListDom(list);
      var h = _reduceInstanceProperty(hArr).call(hArr, function (sum, cur) {
        return sum + cur;
      }, 0);
      setHeight(h + 40);
    };
    var mapLayerChangedHandle = debounce(function () {
      init();
    }, 200);
    map === null || map === void 0 || map.on(MapEvent.MAPLAYERCHANGED, mapLayerChangedHandle);
    init();
    return function () {
      map === null || map === void 0 || map.off(MapEvent.MAPLAYERCHANGED, mapLayerChangedHandle);
    };
  }, []);
  return jsx(BaseWidget, {
    name: "\u56FE\u4F8B",
    position: props.position,
    icon: props.icon ? props.icon : Legend,
    width: 180,
    height: height,
    children: jsx("div", {
      className: "mapboxgl-legend",
      children: listDom
    })
  });
};
var index = /*#__PURE__*/memo(LegendControl);

export { index as default };
