import React, { useEffect, memo } from 'react';
import styles from './index.module.less';
import mapboxgl, { LngLatLike } from 'mapbox-gl';
import MapWidget from '@/gis/widget/MapWidget';
import mapSetting from './mapSetting';
import ControlPanel from '../components/map/controls/ControlPanel';

const ThemeMap = (props: any) => {
  const mapOptions = {
    id: 'themeMap',
    container: '',
    center: [112.51767497034729, 27.73329145510668] as LngLatLike,
    zoom: 12,
    maxZoom: 17,
  };

  return (
    <div className={styles.mapContainer}>
      <MapWidget mapOptions={mapOptions} mapLayerSettting={mapSetting}>
        <ControlPanel />
      </MapWidget>
    </div>
  );
};
export default memo(ThemeMap);
