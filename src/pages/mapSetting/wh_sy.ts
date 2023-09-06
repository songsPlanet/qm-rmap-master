import { TLayerOptions } from '@/gis/mapboxgl/typings';

export const wh_sy: TLayerOptions = {
  id: 'wh_sy',
  name: '长江数据测试',
  type: 'fill',
  legend: {
    style: { backgroundColor: '#0000ff', opacity: 0.6 },
    text: '长江数据测试',
  },
  paint: {
    'fill-color': '#0000ff',
    'fill-opacity': 0.6,
    'fill-outline-color': '#0000ff',
  },
  source: {
    type: 'vector',
    bounds: [117.593353, 30.943276, 118.515354, 31.539819],
    tiles: [`http://192.168.146.131:8080/data/whsqalsy202204_zg_ae_as/{z}/{x}/{y}.pbf`],
  },
  'source-layer': 'wh_sqal_sy_2022_04',
};
