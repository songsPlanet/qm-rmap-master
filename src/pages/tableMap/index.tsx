import { memo } from 'react';
import styles from './index.module.less';
import { LngLatLike } from 'mapbox-gl';
import MapContainer from '../components/MapContainer';
import mapSetting from './mapSetting';
import MapWidget from '@/gis/widget/MapWidget';
import ControlPanel from '../components/Controls/ControlPanel';

const ThemeMap2 = (props: any) => {
  const mapOptions = {
    id: 'themeMapNJZY',
    container: '',
    center: [112.51767497034729, 27.73329145510668] as LngLatLike, // 湖南
    zoom: 12,
    maxZoom: 17,
  };
  const toolSetting = [
    {
      id: 'ControlPanel',
      name: '视图工具',
    },
    {
      id: 'ToolBar',
      name: '工具条',
    },
  ];
  return (
    <div className={styles.mapContainer}>
      <MapWidget mapOptions={mapOptions} mapLayerSettting={mapSetting}>
        {/* <ToolPanel toolsSetting={toolSetting} /> */}
        <ControlPanel />
      </MapWidget>
    </div>
  );
};
export default memo(ThemeMap2);
