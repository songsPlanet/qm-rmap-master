import StatisticContent from './components/control/StatisticControl/StatisticContent';
import { memo, useMemo, useEffect } from 'react';
import TimeSliderContent from './components/control/SliderControl/TimeSliderContent';
import TrackContent from '@/pages/themeMap/components/control/Track/TrackContent';
import OffsetContent from './components/control/OffSetControl/OffsetContent';
import SearchContent from './components/control/Search/SearchContent';
import { wh_sqal_sdbhq_wms } from './mapSetting/wh_sqal_sdbhq_wms';
import ProtectionPopup from './components/popup/ProtectionPopup';
import ControlPanel from './components/control/ControlPanel';
import MapContainer from '../../gis/widget/MapContainer';
import FieldPopup from './components/popup/FieldPopup';
import { useRegion } from '@/gis/context/RegionContext';
import { mapOptionsJS } from '@/gis/context/mapContext';
import PopupPanel from '@/gis/widget/PopupPanel';
import { useModel, useActions } from '@/redux';
import { field_vt } from './mapSetting/field_vt';
import { mainActions } from '@/models';
import mapSetting from './mapSetting';
import { isEmpty } from '@/utils';

const ThemeMap = (props: any) => {
  const { regionList } = useModel('main');
  const { queryRegionList } = useActions(mainActions);
  const { dispatch } = useRegion();

  const vector = useMemo(() => {
    return [{ id: field_vt.id, title: field_vt.name, template: <FieldPopup /> }];
  }, []);

  const wms = {
    baseUrl: 'http://120.26.225.92:8088/geoserver/wh_sqal_work/ows',
    layers: [
      {
        id: 'wh_sqal_sdbhq_wms',
        title: wh_sqal_sdbhq_wms.name,
        layerName: wh_sqal_sdbhq_wms.LayerName!,
        template: <ProtectionPopup />,
      },
    ],
  };

  useEffect(() => {
    if (isEmpty(regionList)) queryRegionList({ level: 5 });
    else {
      dispatch({
        type: 'changeRegion',
        payload: { regions: regionList || [], currentRegion: { label: '安徽省', value: '34' } },
      });
    }
  }, [regionList, queryRegionList]);

  return (
    <MapContainer mapOptions={{ ...mapOptionsJS, id: 'themeMap' }} mapSetting={mapSetting}>
      <PopupPanel vector={vector} wms={wms} />
      <ControlPanel
        offsetContent={<OffsetContent />}
        trackContent={<TrackContent />}
        timeSliderContent={<TimeSliderContent />}
        searchContent={props?.location?.pathname === '/theme-map' ? <SearchContent /> : undefined}
        statisticContent={props?.location?.pathname === '/theme-map' ? <StatisticContent /> : undefined}
      />
    </MapContainer>
  );
};
export default memo(ThemeMap);
