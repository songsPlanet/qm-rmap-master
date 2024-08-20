'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = require('react');
function reduce(state, action) {
  if (action === null) return state;
  return { ...state, ...action };
}
function useReducer(initialState) {
  const [state, dispatchSetState] = (0, react_1.useState)(initialState);
  function setState(action) {
    if (typeof action === 'function') {
      dispatchSetState((prevState) => reduce(prevState, action(prevState)));
    } else {
      dispatchSetState((prevState) => reduce(prevState, action));
    }
  }
  return [state, setState];
}
exports.default = useReducer;
