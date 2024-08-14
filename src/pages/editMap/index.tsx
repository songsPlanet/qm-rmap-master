import ControlPanel from '../themeMap/components/control/ControlPanel';
import mapSetting from './mapSetting';
import type MapWrapper from '@/gis/mapboxgl/MapWrapper';
import MapWidget from '@/gis/widget/MapWidget';
import styles from './index.module.less';
import type { LngLatLike } from 'mapbox-gl';
import { memo, useState, useEffect } from 'react';
import DrawWidget from '@/gis/widget/DrawWidget';
import { isEmpty } from '@/utils';
import { mainActions } from '@/models';
import { useModel, useActions } from '@/redux';
import { RegionProvider } from '@/gis/context/RegionContext';

const EditMap = (props: any) => {
  const [map, setMap] = useState<MapWrapper>();
  const { regionList } = useModel('main');
  const { queryRegionList } = useActions(mainActions);

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

  useEffect(() => {
    if (isEmpty(regionList)) queryRegionList({ level: 5 });
  }, [regionList, queryRegionList]);

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
