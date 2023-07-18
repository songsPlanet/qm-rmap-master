import { TLayerOptions } from '@/gis/mapboxgl/typings';
import { text } from 'stream/consumers';

export const field_vt: TLayerOptions = {
  id: 'field_vt',
  type: 'fill',
  name: '土地确权',
  isAdd: true,
  legend: {
    style: { backgroundColor: '#e94c08', opacity: 0.6 },
    text: '土地确权',
  },
  source: {
    type: 'vector',
    minzoom: 12,
    maxzoom: 14,
    tiles: [`http://192.168.146.131:8082/data/dk430381/{z}/{x}/{y}.pbf`],
  },
  'source-layer': 'dk430381',
  paint: {
    'fill-color': '#f29327',
    'fill-opacity': 0.6,
    'fill-outline-color': '#e94c08',
  },
};
