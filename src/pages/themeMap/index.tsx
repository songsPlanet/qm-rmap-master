import { memo } from 'react';
import styles from './index.module.less';
import { LngLatLike } from 'mapbox-gl';
import MapContainer from '../components/MapContainer';
import mapSetting from './mapSetting';

const ThemeMap = (props: any) => {
  const mapOptions = {
    id: 'themeMap',
    container: '',
    center: [118.16333303406572, 31.108394692222518] as LngLatLike, // 芜湖
    zoom: 8.7,
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
      <MapContainer mapOptions={mapOptions} mapSetting={mapSetting} toolSetting={toolSetting} />
    </div>
  );
};
export default memo(ThemeMap);
