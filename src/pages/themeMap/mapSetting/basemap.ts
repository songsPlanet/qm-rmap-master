import type { TLayerGroupOptions } from '@/gis/mapboxgl/typings';
const tianditukey = '7271c460eedd19a02b7b7bb1b19ba7ac';

export const basemap: TLayerGroupOptions = {
  id: 'base_map',
  name: '基础底图',
  type: 'logicGroup',
  layers: [
    {
      id: 'tdt_img',
      name: '天地图-影像',
      type: 'raster',
      isAdd: false,
      source: {
        type: 'raster',
        tileSize: 256,
        tiles: [
          `http://t2.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${tianditukey}`,
        ],
      },
    },
    {
      id: 'tdt_vct',
      name: '天地图-矢量',
      type: 'raster',
      isAdd: false,
      source: {
        type: 'raster',
        tileSize: 256,
        tiles: [
          `http://t2.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${tianditukey}`,
        ],
      },
    },
    {
      id: 'tdt_cia',
      name: '天地图-地址地名',
      type: 'raster',
      isAdd: true,
      source: {
        type: 'raster',
        tileSize: 256,
        tiles: [
          `http://t2.tianditu.gov.cn/cia_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${tianditukey}`,
        ],
      },
    },
    {
      id: 'raster_png',
      name: '遥感底图',
      type: 'raster',
      isAdd: false,
      source: {
        type: 'raster',
        tileSize: 256,
        minzoom: 0,
        maxzoom: 18,
        tiles: [`http://120.26.225.92:8090/data/jieshou_img_0to16/{z}/{x}/{y}.png`],
        // tiles: [`http://${window.location.host}/tileserver/data/jieshou_img_0to16/{z}/{x}/{y}.png`],
      },
    },
  ],
};
