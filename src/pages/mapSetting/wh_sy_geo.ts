import { TLayerOptions } from '@/gis/mapboxgl/typings';

export const wh_sy_geo: TLayerOptions = {
  id: 'wh_sy_geo',
  name: '芜湖水域分布geo',
  type: 'fill',
  isAdd: false,
  maxzoom: 18,
  legend: {
    style: { backgroundColor: '#0000ff', opacity: 0.6 },
    text: '芜湖水域分布geo',
  },
  paint: {
    'fill-color': '#0000ff',
    'fill-opacity': 0.6,
    'fill-outline-color': '#0000ff',
  },
  source: {
    type: 'geojson',
    data: './src/pages/mapSetting/assets/wh_sqal_sy_2022_04.geojson',
  },
};
