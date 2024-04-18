import { TLayerGroupOptions, TLayerOptions } from '@/gis/mapboxgl/typings';

const regionConfig = [
  { name: '界首—县级', lyr: 'jieshou_xian', lbField: 'xjxzqh', minzoom: 0, maxzoom: 21 },
  //   { name: '界首—镇级', lyr: 'jieshou_zhen', lbField: 'xzxzqh', minzoom: 9, maxzoom: 12 },
  //   { name: '界首—村级', lyr: 'jieshou_cun', lbField: 'cjxzqh', minzoom: 12, maxzoom: 21 },
];

const regionLyrs: Array<TLayerGroupOptions | TLayerOptions> = [];

regionConfig.forEach((d) => {
  // 图层
  regionLyrs.push({
    id: d.lyr,
    name: d.name,
    type: 'line',
    minzoom: d.minzoom,
    maxzoom: d.maxzoom,
    paint: {
      'line-color': 'blue',
      'line-width': 2,
    },
    source: {
      type: 'geojson',
      data: './src/pages/mapSetting/assets/jieshou-xian.geojson',
    },
  });
  // 图层标注
  // regionLyrs.push({
  //   id: `${d.lyr}-label`,
  //   name: `${d.name}-标注`,
  //   type: 'symbol',
  //   minzoom: d.minzoom,
  //   maxzoom: d.maxzoom,
  //   source: `${d.lyr}-ds`,
  //   'source-layer': d.lyr,
  //   layout: {
  //     'text-field': ['get', d.lbField],
  //     'text-font': ['Open Sans Regular'],
  //     'text-size': 14,
  //     'symbol-placement': 'point',
  //   },
  //   paint: {
  //     'text-color': 'blue',
  //     'text-halo-width': 2,
  //     'text-halo-color': 'white',
  //   },
  // });
});

export const region: TLayerGroupOptions = {
  id: 'region',
  name: '行政区划',
  type: 'layerGroup',
  legend: {
    style: { border: '2px solid blue' },
    text: '行政区划',
  },
  layers: regionLyrs,
};
