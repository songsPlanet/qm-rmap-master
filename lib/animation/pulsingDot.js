"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPulsingDot = void 0;
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array-buffer.constructor.js");
require("core-js/modules/es.array-buffer.slice.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.typed-array.uint8-array.js");
require("core-js/modules/es.typed-array.at.js");
require("core-js/modules/es.typed-array.copy-within.js");
require("core-js/modules/es.typed-array.every.js");
require("core-js/modules/es.typed-array.fill.js");
require("core-js/modules/es.typed-array.filter.js");
require("core-js/modules/es.typed-array.find.js");
require("core-js/modules/es.typed-array.find-index.js");
require("core-js/modules/es.typed-array.find-last.js");
require("core-js/modules/es.typed-array.find-last-index.js");
require("core-js/modules/es.typed-array.for-each.js");
require("core-js/modules/es.typed-array.includes.js");
require("core-js/modules/es.typed-array.index-of.js");
require("core-js/modules/es.typed-array.iterator.js");
require("core-js/modules/es.typed-array.join.js");
require("core-js/modules/es.typed-array.last-index-of.js");
require("core-js/modules/es.typed-array.map.js");
require("core-js/modules/es.typed-array.reduce.js");
require("core-js/modules/es.typed-array.reduce-right.js");
require("core-js/modules/es.typed-array.reverse.js");
require("core-js/modules/es.typed-array.set.js");
require("core-js/modules/es.typed-array.slice.js");
require("core-js/modules/es.typed-array.some.js");
require("core-js/modules/es.typed-array.sort.js");
require("core-js/modules/es.typed-array.subarray.js");
require("core-js/modules/es.typed-array.to-locale-string.js");
require("core-js/modules/es.typed-array.to-reversed.js");
require("core-js/modules/es.typed-array.to-sorted.js");
require("core-js/modules/es.typed-array.to-string.js");
require("core-js/modules/es.typed-array.with.js");
require("core-js/modules/esnext.array-buffer.detached.js");
require("core-js/modules/esnext.array-buffer.transfer.js");
require("core-js/modules/esnext.array-buffer.transfer-to-fixed-length.js");
var _concat = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/concat"));
var _fill = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/fill"));
var getPulsingDot = exports.getPulsingDot = function getPulsingDot(map) {
  var colors = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    outerColor: '255, 200, 200',
    innerColor: '255, 100,100'
  };
  var size = 200;
  var animationImg = {
    width: size,
    height: size,
    data: new Uint8Array(size * size * 4),
    // When the layer is added to the map,
    // get the rendering context for the map canvas.
    onAdd: function onAdd() {
      var canvas = document.createElement('canvas');
      canvas.width = this.width;
      canvas.height = this.height;
      this.context = canvas.getContext('2d');
    },
    // Call once before every frame where the icon will be used.
    render: function render() {
      var _context;
      var duration = 1000;
      var t = performance.now() % duration / duration;
      var radius = size / 2 * 0.3;
      var outerRadius = size / 2 * 0.7 * t + radius;
      var context = this.context;
      // Draw the outer circle.
      context.clearRect(0, 0, this.width, this.height);
      context.beginPath();
      context.arc(this.width / 2, this.height / 2, outerRadius, 0, Math.PI * 2);
      context.fillStyle = (0, _concat.default)(_context = "rgba(".concat(colors.outerColor, ", ")).call(_context, 1 - t, ")");
      (0, _fill.default)(context).call(context);
      // Draw the inner circle.
      context.beginPath();
      context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2);
      context.fillStyle = "rgba(".concat(colors.innerColor, ", 1)");
      context.strokeStyle = 'white';
      context.lineWidth = 2 + 4 * (1 - t);
      (0, _fill.default)(context).call(context);
      context.stroke();
      // Update this image's data with data from the canvas.
      this.data = context.getImageData(0, 0, this.width, this.height).data;
      // Continuously repaint the map, resulting
      // in the smooth animation of the dot.
      map.triggerRepaint();
      // Return `true` to let the map know that the image was updated.
      return true;
    }
  };
  return animationImg;
};