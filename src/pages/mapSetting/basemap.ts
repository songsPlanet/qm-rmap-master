import { TLayerGroupOptions } from '@/gis/mapboxgl/typings';
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
      isAdd: true,
      source: {
        type: 'raster',
        tileSize: 256,
        tiles: [
          `http://t2.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${tianditukey}`,
        ],
      },
    },
    // {
    //     id:'tdt_vct',
    //     name:'天地图-矢量',
    //     type:'raster',
    //     isAdd:false,
    //     source:{
    //         type:'raster',
    //         tileSize:256,
    //         tiles:[
    //             `http://t2.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${tianditukey}`,
    //         ]
    //     }
    // },
    {
      id: 'tdt_cia',
      name: '天地图-注记',
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
  ],
};
