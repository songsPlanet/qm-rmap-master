import type { MainModel } from './main';

export type AllModelStateType = {
  main: MainModel;
};

export { default as mainReducer, actions as mainActions } from './main';
