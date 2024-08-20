'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.EventEmitter = void 0;
class EventEmitter {
  listeners;
  constructor() {
    this.listeners = {};
  }
  emit(type, ...args) {
    const fns = this.listeners[type];
    if (!fns || fns.length === 0) return;
    for (let i = 0; i < fns.length; i++) {
      fns[i].apply(this, args);
    }
  }
  add(type, fn) {
    let fns = this.listeners[type];
    if (!fns) this.listeners[type] = fns = [];
    fns.push(fn);
  }
  remove(type, fn) {
    const fns = this.listeners[type];
    if (!fns || fns.length <= 0) return;
    if (typeof fn === 'undefined') {
      fns.length = 0;
      return;
    } else {
      const index = fns.indexOf(fn);
      fns.splice(index, 1);
    }
  }
}
exports.EventEmitter = EventEmitter;
exports.default = new EventEmitter();
