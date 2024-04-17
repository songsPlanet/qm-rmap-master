import { TLayerOptions } from '@/gis/mapboxgl/typings';

export const wh_sy_mvt: TLayerOptions = {
  id: 'wh_sy_mvt',
  name: 'mvt-芜湖水域',
  type: 'fill',
  isAdd: false,
  maxzoom: 18,
  legend: {
    style: { backgroundColor: '#BF3F7F', opacity: 0 }, // 红色
    text: 'mvt-芜湖水域',
  },
  paint: {
    'fill-color': '#BF3F7F',
    'fill-opacity': 1,
    'fill-outline-color': '#BF3F7F',
  },
  source: {
    type: 'vector',
    maxzoom: 14,
    bounds: [117.720251, 30.971158, 118.350398, 31.493937],
    tiles: [`http://192.168.146.131:8090/data/sqal_s/{z}/{x}/{y}.pbf`], // linux测试环境
  },
  'source-layer': 'wh_sqal_sy',
};
