import StatisticContent from '../components/Controls/StatisticControl/StatisticContent';
import SearchContent from '../components/Controls/Search/SearchContent';
import ControlPanel from '../components/Controls/ControlPanel';
import { RegionProvider } from '@/gis/context/RegionContext';
import { wh_sy_geo } from '@/pages/mapSetting/wh_sy_geo';
import TrackContent from '@/pages/components/Controls/Track/TrackContent';
import MapWidget from '@/gis/widget/MapWidget';
import styles from './index.module.less';
import { LngLatLike } from 'mapbox-gl';
import mapSetting from './mapSetting';
import { memo, useMemo, useEffect, useState } from 'react';
import FieldPopup from './popup/FieldPopup';
import PopupPanel from '@/gis/widget/PopupPanel';

const mapOptions = {
  id: 'themeMap',
  container: '',
  center: [118.16333303406572, 31.108394692222518] as LngLatLike, // 芜湖
  zoom: 8.7,
  maxZoom: 20,
};

const ThemeMap = (props: any) => {
  const vector = useMemo(() => {
    return [{ id: wh_sy_geo.id, title: wh_sy_geo.name, template: <FieldPopup /> }];
  }, []);

  return (
    <div className={styles.mapContainer}>
      <MapWidget mapOptions={mapOptions} mapLayerSettting={mapSetting}>
        <RegionProvider>
          <PopupPanel vector={vector} />
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
