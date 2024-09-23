import { wh_sqal_sdbhq_wms } from './mapSetting/wh_sqal_sdbhq_wms';
import ProtectionPopup from './components/popup/ProtectionPopup';
import ControlPanel from './components/control/ControlPanel';
import MapContainer from '../../components/Map/MapContainer';
import FieldPopup from './components/popup/FieldPopup';
import PopupPanel from '@/gis/widgets/PopupPanel';
import { field_vt } from './mapSetting/field_vt';
import React, { memo, useMemo } from 'react';
import { TMapOptions } from 'qm-map-wrapper';
import mapSetting from './mapSetting';
import { LngLatLike } from 'mapbox-gl';

const mapOptions: TMapOptions = {
  id: 'jsmap',
  container: '',
  center: [115.345459, 33.260307] as LngLatLike, // 界首市
  zoom: 9.6,
  maxZoom: 20,
};

const ThemeMap = () => {

  const vector = useMemo(() => {
    return [{ id: field_vt.id, title: field_vt.name, template: <FieldPopup /> }];
    //   return[...zlyx.layers.map((d) => ({ id: d.id, title: d.name, template: <ZLYXPopup /> }))];
  }, []);
  
  const wms = {
    baseUrl: 'http://120.26.225.92:8088/geoserver/wh_sqal_work/ows',
    layers: [
      {
        id: 'wh_sqal_sdbhq_wms',
        title: wh_sqal_sdbhq_wms.name,
        layerName: wh_sqal_sdbhq_wms.LayerName!,
        template: <ProtectionPopup />,
      },
    ],
  };

  return (
    <MapContainer mapOptions={mapOptions} mapSetting={mapSetting}>
      <PopupPanel vector={vector} wms={wms} ifCenter={false} />
      <ControlPanel />
    </MapContainer>
  );
};

export default memo(ThemeMap);
