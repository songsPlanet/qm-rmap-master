import { TLayerOptions } from '@/gis/mapboxgl/typings';

export interface TCBDK {
  name: string;
  fillColor: string;
  outlineColor: string;
  fillOpacity: number;
}

export const cbdkConfig: TCBDK[] = [
  {
    name: '早稻',
    fillColor: '#3aa786',
    outlineColor: '#3aa786',
    fillOpacity: 0.6,
  },
  {
    name: '中稻',
    fillColor: '#103dc1',
    outlineColor: '#103dc1',
    fillOpacity: 0.6,
  },
  {
    name: '晚稻',
    fillColor: '#9267ee',
    outlineColor: '#9267ee',
    fillOpacity: 0.6,
  },
];

export const wh_sqal_sdbhq_wms: TLayerOptions = {
  id: 'wh_sqal_sdbhq_wms',
  name: '芜湖保护区',
  type: 'raster',
  isAdd: true,
  minzoom: 0,
  // legend: {
  //   title: '芜湖保护区',
  //   items: [
  //     ...cbdkConfig.map((d) => ({
  //       style: { backgroundColor: d.fillColor, opacity: d.fillOpacity },
  //       text: d.name,
  //     })),
  //     { text: '其他', style: { backgroundColor: '#e77d53', opacity: 0.6 } },
  //   ],
  // },
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
