import { TLayerGroupOptions, TLayerOptions } from '@/gis/mapboxgl/typings';
import { text } from 'stream/consumers';

const zwfbLyrs: TLayerOptions[] = [
  {
    id: 'zwfb_wandao_2022',
    type: 'fill',
    name: '晚稻',
    isAdd: true,
    source: {
      type: 'vector',
      minzoom: 0,
      maxzoom: 14,
      tiles: [`http://192.168.146.131:8082/data/zwfb_wandao_2022_all/{z}/{x}/{y}.pbf`],
    },
    'source-layer': 'zwfb_wandao_2022',
    paint: {
      'fill-color': 'rgba(8, 179, 225,1)', // 蓝色
    },
  },
];

export const zwfb: TLayerGroupOptions = {
  id: 'zwfb',
  name: '作物识别',
  type: 'logicGroup',
  // legend:{
  //   title: '作物识别',
  //   items: [
  //     style: { backgroundColor:'#9267ee', opacity:0.6 },
  //     text: d.name,
  //   ]
  // },
  layers: zwfbLyrs,
};
