import { useContext, createContext } from 'react';
import { TMapOptions } from '../mapboxgl/typings';
import MapWrapper from '../mapboxgl/MapWrapper';
import { LngLatLike } from 'mapbox-gl';
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

export const mapOptionsJS: TMapOptions = {
  id: 'jsmap',
  container: '',
  center: [115.345459, 33.260307] as LngLatLike, // 界首市
  zoom: 9.6,
  maxZoom: 20,
};

export const mapOptionsWH: TMapOptions = {
  id: 'whmap',
  container: '',
  center: [118.16333303406572, 31.108394692222518] as LngLatLike, // 芜湖
  zoom: 9.6,
  maxZoom: 20,
};
