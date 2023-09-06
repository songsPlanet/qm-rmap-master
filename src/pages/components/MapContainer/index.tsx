import MapWidget from '@/gis/widget/MapWidget';
import ControlPanel from '../Controls/ControlPanel';
import mapSetting from '../../themeMap/mapSetting';
import { LngLatLike } from 'mapbox-gl';
import { memo } from 'react';

const MapContainer = () => {
  const mapOptions = {
    id: 'themeMap',
    container: '',
    // center: [112.51767497034729, 27.73329145510668] as LngLatLike,// 湖南
    center: [118.16333303406572, 31.108394692222518] as LngLatLike, // 芜湖
    zoom: 8.7,
    // zoom: 12,
    maxZoom: 17,
  };
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <MapWidget mapOptions={mapOptions} mapLayerSettting={mapSetting}>
        <ControlPanel />
      </MapWidget>
    </div>
  );
};

export default memo(MapContainer);
