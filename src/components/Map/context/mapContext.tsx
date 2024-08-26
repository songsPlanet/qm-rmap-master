import { useContext, createContext } from 'react';
import { MapWrapper } from '@/gis';
export interface TMapContext {
  map: MapWrapper | null;
}

export const MapContext = createContext<TMapContext>({ map: null });

export const useMap = () => {
  const context = useContext(MapContext);
  if (!context) {
    throw Error('只能在函数组件中使用');
  }
  return context;
};
