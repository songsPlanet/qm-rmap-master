import StatisticContent from '../components/Controls/StatisticControl/StatisticContent';
import OffsetContent from '../components/Controls/OffSetControl/OffsetContent';
import SearchContent from '../components/Controls/Search/SearchContent';
import ControlPanel from '../components/Controls/ControlPanel';
import { RegionProvider } from '@/gis/context/RegionContext';
import TrackContent from '@/pages/components/Controls/Track/TrackContent';
import { memo, useMemo, useEffect, useState } from 'react';
import { wh_sy_geo } from '@/pages/mapSetting/wh_sy_geo';
import PopupPanel from '@/gis/widget/PopupPanel';
import FieldPopup from './popup/FieldPopup';
import mapSetting from './mapSetting';
import { LngLatLike } from 'mapbox-gl';
import axios from '@/utils/axios';
import { AnimationLine } from '@/gis/widget/Animation/AnimationLine';
import MapContainer from '../components/MapContainer';

const mapOptions = {
  id: 'themeMap',
  container: '',
  // center: [118.16333303406572, 31.108394692222518] as LngLatLike, // 芜湖
  center: [115.345459, 33.220307] as LngLatLike, // 界首市

  zoom: 8.7,
  maxZoom: 20,
};

const ThemeMap = (props: any) => {
  const [LineFeatCol, setLineFeatCol] = useState<any>(null);

  const vector = useMemo(() => {
    return [{ id: wh_sy_geo.id, title: wh_sy_geo.name, template: <FieldPopup /> }];
  }, []);

  const onMapLoad = (map: any) => {
    const animation = new AnimationLine(map, LineFeatCol);
  };

  const getGeoData = async () => {
    const url = 'http://localhost:9999/src/pages/mapSetting/assets/jieshou-xian.geojson';
    const rData = await axios.get(url).then((ctx: any) => {
      return ctx;
    });
    if (rData) {
      return rData;
    }
  };

  useEffect(() => {
    getGeoData().then((res: any) => {
      setLineFeatCol(res);
    });
  }, []);

  return LineFeatCol ? (
    <MapContainer mapOptions={mapOptions} mapSetting={mapSetting} onMapLoad={onMapLoad}>
      <RegionProvider>
        <PopupPanel vector={vector} />
        <ControlPanel
          offsetContent={<OffsetContent />}
          trackContent={<TrackContent />}
          searchContent={props?.location?.pathname === '/theme-map' ? <SearchContent /> : undefined}
          statisticContent={props?.location?.pathname === '/theme-map' ? <StatisticContent /> : undefined}
        />
      </RegionProvider>
    </MapContainer>
  ) : null;
};
export default memo(ThemeMap);
