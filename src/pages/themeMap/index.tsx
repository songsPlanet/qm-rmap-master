import SearchContent from '../components/Controls/Search/SearchContent';
import ControlPanel from '../components/Controls/ControlPanel';
import MapWidget from '@/gis/widget/MapWidget';
import styles from './index.module.less';
import { LngLatLike } from 'mapbox-gl';
import mapSetting from './mapSetting';
import { memo } from 'react';
import TrackContent from '@/gis/widget/TrackContent';
import StatisticContent from '../components/Controls/StatisticControl/StatisticContent';
import { RegionProvider } from '@/gis/context/RegionContext';

const ThemeMap = (props: any) => {
  const mapOptions = {
    id: 'themeMap',
    container: '',
    center: [118.16333303406572, 31.108394692222518] as LngLatLike, // 芜湖
    zoom: 8.7,
    maxZoom: 20,
  };

  return (
    <div className={styles.mapContainer}>
      <MapWidget mapOptions={mapOptions} mapLayerSettting={mapSetting}>
        <RegionProvider>
          <ControlPanel
            trackContent={<TrackContent />}
            searchContent={props?.location?.pathname === '/theme-map' ? <SearchContent /> : undefined}
            statisticContent={props?.location?.pathname === '/theme-map' ? <StatisticContent /> : undefined}
          />
        </RegionProvider>
      </MapWidget>
    </div>
  );
};
export default memo(ThemeMap);
