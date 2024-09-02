/**
 * userInfo 这样的基础数据已经注入到 BasicContext 中，所以在这里就不用再次注入到 model 层了。
 * actions 中的属性默认将会注入到页面 props 中，如果不想将其注入到页面，就不要在 actions 中添加，建议直接使用 api 中定义的方法。
 */
import * as api from '@/api/main';
import { getLocalStorage } from '@/utils';
import type { Dispatch } from '@reduxjs/toolkit';
import createReducer from '@/redux/createReducer';

const effects = {
  queryRegionList: (query?: any) => {
    return (dispatch: Dispatch) => {
      return api.queryRegionList(query).then((response: any) => {
        dispatch({ type: 'main/queryRegionList', payload: { regionList: response?.data ?? [] } });
        return response;
      });
    };
  },

  queryUserInfo: () => {
    return (dispatch: Dispatch) => {
      return api.queryUserInfo().then((response: any) => {
        dispatch({ type: 'main/queryUserInfo', payload: { userInfo: response?.data ?? {} } });
        return response;
      });
    };
  },
};

export type MainModel = {
  regionList: [];
  userInfo: { [key: string]: any };
};

const { reducer, actions } = createReducer<MainModel, typeof effects>({
  effects,
  name: 'main',
  initialState: {
    regionList: [],

    userInfo: getLocalStorage('USER_INFO') || {},
  },
});

export { reducer as default, actions };
