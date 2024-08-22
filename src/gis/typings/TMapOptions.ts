import type { LngLatLike, MapboxOptions } from 'mapbox-gl';
export type TMapOptions = MapboxOptions & {
  id: string;
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
