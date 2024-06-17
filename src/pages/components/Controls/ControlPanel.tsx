import { NavigationControl, FullscreenControl } from 'mapbox-gl';
import { memo, useMemo, useEffect, ReactElement } from 'react';
import { MapboxExportControl } from '../../../gis/widget/Print';
import InitialLocation from '@/gis/widget/InitialLocation';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import OffsetPanel from '@/gis/widget/OffsetPanel';
import StatisticControl from './StatisticControl';
import { useMap } from '@/gis/context/mapContext';
import LayerList from '@/gis/widget/LayerList';
import { useLocation } from 'react-router-dom';
import Location from '@/gis/widget/Location';
import Measure from '@/gis/widget/Measure';
import Legend from '@/gis/widget/Legend';
import CanvasToMap from './MapToCanvas';
import Swipe from '@/gis/widget/Swipe';
import Search from './Search';
import Track from './Track';
import SliderControl from './SliderControl';
interface TControlPanel {
  searchContent?: ReactElement;
  statisticContent?: ReactElement;
  trackContent?: ReactElement;
  offsetContent?: ReactElement;
  timeSliderContent?: ReactElement;
}

const ControlPanel = (props: TControlPanel) => {
  const { searchContent, timeSliderContent, statisticContent, trackContent, offsetContent } = props;
  const { map } = useMap();
  const location = useLocation();

  const navCtrl = useMemo(() => {
    return new NavigationControl();
  }, []);
  const fullCtrl = useMemo(() => {
    return new FullscreenControl();
  }, []);
  const exportCtrl = useMemo(() => {
    return new MapboxExportControl();
  }, []);

  useEffect(() => {
    map?.addControl(navCtrl, 'top-right');
    map?.addControl(fullCtrl, 'top-right');
    map?.addControl(exportCtrl, 'top-right');

    return () => {
      map?.removeControl(navCtrl);
      map?.removeControl(fullCtrl);
      map?.removeControl(exportCtrl);
    };
  }, []);

  return (
    <div>
      {/* <ExportTrackMap position={{ top: 10, right: 550 }} /> 
      
    */}
      {offsetContent && <OffsetPanel content={offsetContent} />}
      <LayerList position={{ top: 10, left: 10 }} />
      <Legend position={{ bottom: 10, left: 10 }} />
      <InitialLocation position={{ top: 185, right: 10 }} />
      <Swipe position={{ top: 225, right: 10 }} />
      <Location position={{ top: 265, right: 10 }} />
      <Measure position={{ top: 305, right: 10 }} />
      {timeSliderContent && <SliderControl position={{ top: 10, right: 530 }} content={timeSliderContent} />}
      {location.pathname === '/theme-map' ? <CanvasToMap position={{ top: 10, right: 410 }} /> : undefined}
      {trackContent && <Track position={{ top: 10, right: 290 }} content={trackContent} />}
      {searchContent && <Search position={{ top: 10, right: 50 }} content={searchContent} />}
      {statisticContent && <StatisticControl position={{ top: 10, right: 170 }} content={statisticContent} />}
    </div>
  );
};

export default memo(ControlPanel);
