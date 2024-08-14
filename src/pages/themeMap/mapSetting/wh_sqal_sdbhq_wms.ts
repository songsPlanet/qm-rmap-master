import type { TLayerOptions } from '@/gis/mapboxgl/typings';

export interface TCBDK {
  name: string;
  fillColor: string;
  outlineColor: string;
  fillOpacity: number;
}

export const dwlxConfig: TCBDK[] = [
  {
    name: '绿地',
    fillColor: '#36e559',
    outlineColor: '#36e559',
    fillOpacity: 0.6,
  },
  {
    name: '空地、建筑、道路等',
    fillColor: '#f1e503',
    outlineColor: '#f1e503',
    fillOpacity: 0.6,
  },
  {
    name: '水',
    fillColor: '#3c7db7',
    outlineColor: '#3c7db7',
    fillOpacity: 0.6,
  },
];

export const wh_sqal_sdbhq_wms: TLayerOptions = {
  id: 'wh_sqal_sdbhq_wms',
  name: '芜湖保护区',
  type: 'raster',
  isAdd: true,
  minzoom: 0,
  legend: {
    title: '芜湖湿地保护区',
    items: [
      ...dwlxConfig.map((d) => ({
        style: { backgroundColor: d.fillColor, opacity: d.fillOpacity },
        text: d.name,
      })),
      { text: '其他', style: { backgroundColor: '#232323', opacity: 0.6 } },
    ],
  },
  LayerName: 'wh_sqal_work:wh_sqal_sdbhq_2024_01',
  source: {
    type: 'raster',
    tileSize: 256,
    minzoom: 0,
    // bounds: [118.35170198146139, 31.29213976477696, 118.23273300262598, 31.239937594082534],
    tiles: [
      'http://120.26.225.92:8088/geoserver/wh_sqal_work/wms?' +
        'service=WMS' +
        '&version=1.1.1' +
        '&request=GetMap' +
        '&format=image/png' +
        '&transparent=true' +
        '&layers=wh_sqal_work:wh_sqal_sdbhq_2024_01' +
        '&exceptions=application/nd.ogc.se_inimage' +
        '&srs=EPSG:3857' +
        '&STYLES=' +
        '&width=256' +
        '&height=256' +
        '&bbox={bbox-epsg-3857}',
    ],
  },
};
