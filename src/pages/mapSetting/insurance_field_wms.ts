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

export const insurance_field_wms: TLayerOptions = {
  id: 'insurance_field_wms',
  name: '承保地块',
  type: 'raster',
  isAdd: false,
  minzoom: 14,
  legend: {
    title: '承保地块',
    items: [
      ...cbdkConfig.map((d) => ({
        style: { backgroundColor: d.fillColor, opacity: d.fillOpacity },
        text: d.name,
      })),
      { text: '其他', style: { backgroundColor: '#e77d53', opacity: 0.6 } },
    ],
  },
  LayerName: 'hn_picc_two:insurance_dk',
  source: {
    type: 'raster',
    tileSize: 256,
    minzoom: 14,
    bounds: [111.995136929, 27.483824045, 112.649857679, 28.06343488],
    tiles: [
      '/geoserver/hn_picc_two/wms?' +
        'service=WMS' +
        '&version=1.1.1' +
        '&request=GetMap' +
        '&format=image/png' +
        '&transparent=true' +
        '&layers=hn_picc_two:insurance_dk' +
        '&exceptions=application/nd.ogc.se_inimage' +
        '&srs=EPSG:3857' +
        '&STYLES=' +
        '&width=256' +
        '&height=256' +
        '&bbox={bbox-epsg-3857}',
    ],
  },
};
