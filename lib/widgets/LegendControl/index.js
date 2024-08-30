"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.array.push.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/slicedToArray"));
var _map = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/map"));
var _filter = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/filter"));
var _find = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/find"));
var _reduce = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/reduce"));
var _jsxRuntime = require("react/jsx-runtime");
var _react = require("react");
var _mapContext = require("../context/mapContext.js");
var _GISToolHelper = _interopRequireDefault(require("../../GISToolHelper.js"));
var _TEvent = require("../../typings/TEvent.js");
var _index = _interopRequireDefault(require("../BaseWidget/index.js"));
require("./index.css");
var LegendIcon = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjcyMTEwNzAzMTU0IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjQ5NzIiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTExMiAxMTJtMzIgMGw3MzYgMHEzMiAwIDMyIDMybDAgNzM2cTAgMzItMzIgMzJsLTczNiAwcS0zMiAwLTMyLTMybDAtNzM2cTAtMzIgMzItMzJaIiBmaWxsPSIjRkZGRkZGIiBwLWlkPSI0OTczIj48L3BhdGg+PHBhdGggZD0iTTEyOCA5Nmg3NjhhMzIgMzIgMCAwIDEgMzIgMzJ2NzY4YTMyIDMyIDAgMCAxLTMyIDMySDEyOGEzMiAzMiAwIDAgMS0zMi0zMlYxMjhhMzIgMzIgMCAwIDEgMzItMzJ6IG0wIDMydjc2OGg3NjhWMTI4SDEyOHoiIGZpbGw9IiM1RDZEN0UiIHAtaWQ9IjQ5NzQiPjwvcGF0aD48cGF0aCBkPSJNMjI0IDM4NGg2NHY2NEgyMjRWMzg0eiBtMCAxMjhoNjR2NjRIMjI0di02NHogbTAgMTI4aDY0djY0SDIyNHYtNjR6IG0wIDEyOGg2NHY2NEgyMjR2LTY0ek01NDQgMzg0aDY0djY0aC02NFYzODR6IG0wIDEyOGg2NHY2NGgtNjR2LTY0eiBtMCAxMjhoNjR2NjRoLTY0di02NHogbTAgMTI4aDY0djY0aC02NHYtNjR6IiBmaWxsPSIjODA4RkExIiBwLWlkPSI0OTc1Ij48L3BhdGg+PHBhdGggZD0iTTMyMCAzODRoMTYwdjY0SDMyMFYzODR6IG0wIDEyOGgxNjB2NjRIMzIwdi02NHogbTAgMTI4aDE2MHY2NEgzMjB2LTY0eiBtMCAxMjhoMTYwdjY0SDMyMHYtNjR6TTY0MCAzODRoMTYwdjY0aC0xNjBWMzg0eiBtMCAxMjhoMTYwdjY0aC0xNjB2LTY0eiBtMCAxMjhoMTYwdjY0aC0xNjB2LTY0eiBtMCAxMjhoMTYwdjY0aC0xNjB2LTY0eiIgZmlsbD0iI0FDQjRDMCIgcC1pZD0iNDk3NiI+PC9wYXRoPjxwYXRoIGQ9Ik0yMjQgMjI0aDU3NnY5NkgyMjR6IiBmaWxsPSIjMzBBRDk4IiBwLWlkPSI0OTc3Ij48L3BhdGg+PC9zdmc+';
var LegendControl = function LegendControl(props) {
  var _useMap = (0, _mapContext.useMap)(),
    map = (0, _map.default)(_useMap);
  var _useState = (0, _react.useState)(0),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    height = _useState2[0],
    setHeight = _useState2[1];
  var _useState3 = (0, _react.useState)(),
    _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
    listDom = _useState4[0],
    setListDom = _useState4[1];
  var loop = (0, _react.useCallback)(function (layers, hArr, list) {
    var nodeData;
    layers.forEach(function (layer) {
      var _context;
      nodeData = undefined;
      if ('layers' in layer && !layer.options.legend) {
        loop(layer.layers, hArr, list);
      } else if (layer.options.legend && (layer.options.isAdd || 'layers' in layer && (0, _filter.default)(_context = layer.layers).call(_context, function (d) {
        return d.options.isAdd;
      }).length)) {
        var _layer$options$legend = layer.options.legend,
          title = _layer$options$legend.title,
          items = _layer$options$legend.items;
        if (items) {
          nodeData = (0, _jsxRuntime.jsxs)("div", {
            className: "mapboxgl-legend-group",
            children: [(0, _jsxRuntime.jsx)("div", {
              className: "mapboxgl-legend-tilte",
              children: title ? title : layer.options.name
            }), items === null || items === void 0 ? void 0 : (0, _map.default)(items).call(items, function (d) {
              var _context2;
              hArr.push(26);
              var img = map === null || map === void 0 ? void 0 : (0, _find.default)(_context2 = map.images).call(_context2, function (f) {
                return f.id === d.imageId;
              });
              return (0, _jsxRuntime.jsxs)("div", {
                className: "mapboxgl-legend-item",
                children: [img ? (0, _jsxRuntime.jsx)("img", {
                  src: img.url,
                  alt: "",
                  className: "mapboxgl-legend-item-img"
                }) : (0, _jsxRuntime.jsx)("div", {
                  className: "mapboxgl-legend-item-geo",
                  style: d.style
                }), (0, _jsxRuntime.jsx)("div", {
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
          var img = map === null || map === void 0 ? void 0 : (0, _find.default)(_context3 = map.images).call(_context3, function (f) {
            return f.id === imageId;
          });
          hArr.push(26);
          nodeData = (0, _jsxRuntime.jsxs)("div", {
            className: "mapboxgl-legend-item",
            children: [img ? (0, _jsxRuntime.jsx)("img", {
              src: img.url,
              alt: "",
              className: "mapboxgl-legend-item-img"
            }) : (0, _jsxRuntime.jsx)("div", {
              className: "mapboxgl-legend-item-geo",
              style: style
            }), (0, _jsxRuntime.jsx)("div", {
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
  (0, _react.useEffect)(function () {
    var init = function init() {
      // 计算高度
      var hArr = [];
      // dom列表
      var list = [];
      loop(map.layers, hArr, list);
      setListDom(list);
      var h = (0, _reduce.default)(hArr).call(hArr, function (sum, cur) {
        return sum + cur;
      }, 0);
      setHeight(h + 40);
    };
    var mapLayerChangedHandle = _GISToolHelper.default.debounce(function () {
      init();
    }, 200);
    map === null || map === void 0 || map.on(_TEvent.MapEvent.MAPLAYERCHANGED, mapLayerChangedHandle);
    init();
    return function () {
      map === null || map === void 0 || map.off(_TEvent.MapEvent.MAPLAYERCHANGED, mapLayerChangedHandle);
    };
  }, []);
  return (0, _jsxRuntime.jsx)(_index.default, {
    name: "\u56FE\u4F8B",
    width: 180,
    height: height,
    position: props.position,
    icon: props.icon ? props.icon : LegendIcon,
    children: (0, _jsxRuntime.jsx)("div", {
      className: "mapboxgl-legend",
      children: listDom
    })
  });
};
var index = exports.default = /*#__PURE__*/(0, _react.memo)(LegendControl);