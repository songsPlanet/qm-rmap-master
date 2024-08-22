import type { TLayerOptions } from '@/gis/typings';

export const field_vt: TLayerOptions = {
  id: 'field_vt',
  type: 'fill',
  name: '土地确权',
  isAdd: true,
  legend: {
    style: { backgroundColor: '#e94c08', opacity: 0.6 },
    text: '土地确权',
  },
  paint: {
    'fill-color': '#f29327',
    'fill-opacity': 0.6,
    'fill-outline-color': '#e94c08',
  },
  source: {
    type: 'vector',
    minzoom: 0,
    maxzoom: 14,
    bounds: [115.241901, 33.006651, 115.532445, 33.524751],
    tiles: [`http://120.26.225.92:8090/data/dk3412822017/{z}/{x}/{y}.pbf`],
  },
  'source-layer': 'dk3412822017',
};
