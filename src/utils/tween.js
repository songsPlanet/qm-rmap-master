'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.easeInOut = exports.easeOut = exports.easeIn = exports.linear = void 0;
exports.QuadEaseIn = QuadEaseIn;
exports.QuadEaseOut = QuadEaseOut;
exports.QuadEaseInOut = QuadEaseInOut;
/**
 * 动画效果函数
 * @params t { number } 动画已执行次数
 * @params b { number } 当前位置
 * @params c { number } 变化量 目标位置 - 当前位置
 * @params d { number } 动画共需要执行多少次
 * @return { number }
 * @author shenxuxiang
 */
/* eslint-disable */
const linear = (t, b, c, d) => (c * t) / d + b;
exports.linear = linear;
const easeIn = (t, b, c, d) => (t === 0 ? b : c * 2 ** (10 * (t / d - 1)) + b);
exports.easeIn = easeIn;
const easeOut = (t, b, c, d) => (t === d ? b + c : c * (-(2 ** ((-10 * t) / d)) + 1) + b);
exports.easeOut = easeOut;
const easeInOut = (t, b, c, d) => {
  if (t === 0) return b;
  if (t === d) return b + c;
  const tm = t / (d / 2);
  if (tm < 1) return (c / 2) * 2 ** (10 * (tm - 1)) + b;
  return (c / 2) * (-(2 ** (-10 * (t - 1))) + 2) + b;
};
exports.easeInOut = easeInOut;
function QuadEaseIn(t, b, c, d) {
  return c * (t /= d) * t + b;
}
function QuadEaseOut(t, b, c, d) {
  return -c * (t /= d) * (t - 2) + b;
}
function QuadEaseInOut(t, b, c, d) {
  if ((t /= d / 2) < 1) return (c / 2) * t * t + b;
  return (-c / 2) * (--t * (t - 2) - 1) + b;
}
exports.default = {
  linear: exports.linear,
  easeIn: exports.easeIn,
  easeOut: exports.easeOut,
  easeInOut: exports.easeInOut,
  QuadEaseIn,
  QuadEaseOut,
  QuadEaseInOut,
};
