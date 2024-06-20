import ControlPanel from '../themeMap/components/control/ControlPanel';
import mapSetting from './mapSetting';
import MapWrapper from '@/gis/mapboxgl/MapWrapper';
import MapWidget from '@/gis/widget/MapWidget';
import styles from './index.module.less';
import { LngLatLike } from 'mapbox-gl';
import { memo, useState } from 'react';
import DrawWidget from '@/gis/widget/DrawWidget';

const EditMap = (props: any) => {
  const [map, setMap] = useState<MapWrapper>();

  const mapOptions = {
    id: 'EditMap',
    container: '',
    center: [118.16333303406572, 31.108394692222518] as LngLatLike, // 芜湖
    zoom: 8.7,
    maxZoom: 17,
  };

  const mapLoadHandle = (map: MapWrapper) => {
    setMap(map);
  };

  return (
    <div className={styles.mapContainer}>
      <MapWidget mapOptions={mapOptions} mapLayerSettting={mapSetting} onMapLoad={mapLoadHandle}>
        <ControlPanel />
        {map ? <DrawWidget position={{ bottom: 10, right: 10 }} map={map} /> : null}
      </MapWidget>
    </div>
  );
};
export default memo(EditMap);
