import { useContext, createContext } from 'react';
import type MapWrapper from '../../wrapper/MapWrapper';

export interface TMapContext {
  map: MapWrapper | null;
}
export const MapContext = createContext<TMapContext>({ map: null });

export const useMap = () => {
  const context = useContext(MapContext);
  if (!context) {
    throw Error('MapContext is not provided correctly');
  }
  if (context.map === null) {
    // 处理 map 为 null 的情况，可能只是返回一个默认值或抛出一个错误
    throw new Error('MapWrapper is not available in the context');
  }
  return context;
};
