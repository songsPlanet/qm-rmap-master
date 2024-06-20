import StatisticContent from './components/control/StatisticControl/StatisticContent';
import OffsetContent from './components/control/OffSetControl/OffsetContent';
import SearchContent from './components/control/Search/SearchContent';
import ControlPanel from './components/control/ControlPanel';
import { RegionProvider } from '@/gis/context/RegionContext';
import TrackContent from '@/pages/themeMap/components/control/Track/TrackContent';
import { memo, useMemo, useEffect, useState } from 'react';
import { wh_sy_geo } from '@/pages/themeMap/mapSetting/wh_sy_geo';
import PopupPanel from '@/gis/widget/PopupPanel';
import FieldPopup from './components/popup/FieldPopup';
import mapSetting from './mapSetting';
import { LngLatLike } from 'mapbox-gl';
import axios from '@/utils/axios';
import { AnimationRegion } from '@/gis/widget/Animation/AnimationRegion';
import MapContainer from '../../gis/widget/MapContainer';
// import { insurance_field_wms } from './mapSetting/wh_sqal_sdbhq';
import InsurancePopup from './components/popup/InsurancePopup';
import { TMapOptions } from '@/gis/mapboxgl/typings';
import TimeSliderContent from './components/control/SliderControl/TimeSliderContent';

const mapOptions: TMapOptions = {
  id: 'themeMap',
  container: '',
  // center: [118.16333303406572, 31.108394692222518] as LngLatLike, // 芜湖
  center: [115.345459, 33.260307] as LngLatLike, // 界首市
  zoom: 9.6,
  maxZoom: 20,
};

const ThemeMap = (props: any) => {
  const [LineFeatCol, setLineFeatCol] = useState<any>(null);

  const vector = useMemo(() => {
    return [{ id: wh_sy_geo.id, title: wh_sy_geo.name, template: <FieldPopup /> }];
  }, []);

  // const wms = {
  //   baseUrl: '/geoserver/hn_picc_two/ows',
  //   layers: [
  //     {
  //       id: 'analyse_insurance_field_wms',
  //       title: insurance_field_wms.name,
  //       layerName: insurance_field_wms.LayerName!,
  //       template: <InsurancePopup />,
  //     },
  //     {
  //       id: insurance_field_wms.id,
  //       title: insurance_field_wms.name,
  //       layerName: insurance_field_wms.LayerName!,
  //       template: <InsurancePopup />,
  //     },
  //   ],
  // };

  const onMapLoad = (map: any) => {
    if (LineFeatCol) {
      const animation = new AnimationRegion(map, LineFeatCol);
    }
  };

  const getGeoData = async () => {
    // const url = 'http://localhost:9999/src/pages/mapSetting/assets/jieshou-xian.geojson';
    const url = './src/pages/mapSetting/assets/jieshou-xian.geojson';
    const rData = await axios.get(url).then((ctx: any) => {
      return ctx;
    });
    if (rData) {
      return rData;
    }
  };

  useEffect(() => {
    // getGeoData().then((res: any) => {
    //   setLineFeatCol(res);
    // });
  }, []);

  // return LineFeatCol ? (
  //   <MapContainer mapOptions={mapOptions} mapSetting={mapSetting} onMapLoad={onMapLoad}>
  //     <RegionProvider>
  //       <PopupPanel vector={vector} wms={wms} />
  //       <ControlPanel
  //         offsetContent={<OffsetContent />}
  //         trackContent={<TrackContent />}
  //         timeSliderContent={<TimeSliderContent />}
  //         searchContent={props?.location?.pathname === '/theme-map' ? <SearchContent /> : undefined}
  //         statisticContent={props?.location?.pathname === '/theme-map' ? <StatisticContent /> : undefined}
  //       />
  //     </RegionProvider>
  //   </MapContainer>
  // ) : null;
  return (
    <MapContainer mapOptions={mapOptions} mapSetting={mapSetting} onMapLoad={onMapLoad}>
      <RegionProvider>
        {/* <PopupPanel vector={vector} wms={wms} /> */}
        <PopupPanel vector={vector} />
        <ControlPanel
          offsetContent={<OffsetContent />}
          trackContent={<TrackContent />}
          timeSliderContent={<TimeSliderContent />}
          searchContent={props?.location?.pathname === '/theme-map' ? <SearchContent /> : undefined}
          statisticContent={props?.location?.pathname === '/theme-map' ? <StatisticContent /> : undefined}
        />
      </RegionProvider>
    </MapContainer>
  );
};
export default memo(ThemeMap);
