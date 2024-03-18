import type { ReactNode } from 'react';
import { useContext, createContext, useReducer, useMemo } from 'react';

type TRegion = {
  label: string;
  fullName?: string;
  value: string;
  children?: TRegion[];
};

interface TRegionInfo {
  regions: TRegion[];
  currentRegion: TRegion | undefined;
}

const defaultState = {
  regions: [],
  currentRegion: undefined,
};

interface TAction {
  type: string;
  payload: Partial<TRegionInfo>;
}

interface TRegionContext {
  state: TRegionInfo;
  dispatch: (params: TAction) => void;
}

// 创建reducer来改变状态
const reducer = (state: TRegionInfo, action: TAction) => {
  const { type, payload } = action;
  switch (type) {
    case 'changeRegion':
      return { ...state, ...payload };
    default:
      throw new Error('Unexpected action');
  }
};

export const RegionContext = createContext<TRegionContext | undefined>(undefined);

export const RegionProvider = (props: { children: ReactNode }) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, defaultState);
  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);
  return <RegionContext.Provider value={value}>{children}</RegionContext.Provider>;
};

export const useRegion = () => {
  const context = useContext(RegionContext);
  if (!context) {
    throw Error('useRegion只能在函数组件中使用');
  }
  return context;
};
