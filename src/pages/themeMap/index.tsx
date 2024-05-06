import StatisticContent from '../components/Controls/StatisticControl/StatisticContent';
import OffsetContent from '../components/Controls/OffSetControl/OffsetContent';
import SearchContent from '../components/Controls/Search/SearchContent';
import ControlPanel from '../components/Controls/ControlPanel';
import { RegionProvider } from '@/gis/context/RegionContext';
import TrackContent from '@/pages/components/Controls/Track/TrackContent';
import { memo, useMemo, useEffect, useState } from 'react';
import { wh_sy_geo } from '@/pages/mapSetting/wh_sy_geo';
import PopupPanel from '@/gis/widget/PopupPanel';
import MapWidget from '@/gis/widget/MapWidget';
import FieldPopup from './popup/FieldPopup';
import styles from './index.module.less';
import mapSetting from './mapSetting';
import { LngLatLike } from 'mapbox-gl';

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
            offsetContent={<OffsetContent />}
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
