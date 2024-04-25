import { NavigationControl, FullscreenControl } from 'mapbox-gl';
import { memo, useMemo, useEffect, ReactElement } from 'react';
import { MapboxExportControl } from '../../../gis/widget/Print';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import ExportTrack from './ExportTrack';
import CanvasToMap from './CanvasToMap';
import ExportTrackMap from './ExportTrackMap';
import StatisticControl from './StatisticControl';
import { useMap } from '@/gis/context/mapContext';
import LayerList from '@/gis/widget/LayerList';
import Measure from '@/gis/widget/Measure';
import Legend from '@/gis/widget/Legend';
import Swipe from '@/gis/widget/Swipe';
import Search from './Search';
import Track from './Track';

interface TControlPanel {
  searchContent?: ReactElement;
  statisticContent?: ReactElement;
  trackContent?: ReactElement;
}

const ControlPanel = (props: TControlPanel) => {
  const { searchContent, statisticContent, trackContent } = props;
  const { map } = useMap();
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
      <ExportTrack position={{ top: 10, right: 550 }} />
      {/* <ExportTrackMap position={{ top: 10, right: 550 }} /> */}
      <CanvasToMap position={{ top: 10, right: 410 }} />
      <LayerList position={{ top: 10, left: 10 }} />
      <Legend position={{ bottom: 10, left: 10 }} />
      <Swipe position={{ top: 185, right: 10 }} />
      <Measure position={{ top: 225, right: 10 }} />
      {trackContent && <Track position={{ top: 10, right: 170 }} content={trackContent} />}
      {searchContent && <Search position={{ top: 10, right: 50 }} content={searchContent} />}
      {statisticContent && <StatisticControl position={{ top: 10, right: 290 }} content={statisticContent} />}
    </div>
  );
};

export default memo(ControlPanel);
