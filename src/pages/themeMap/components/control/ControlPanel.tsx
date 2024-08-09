import { NavigationControl, FullscreenControl } from 'mapbox-gl';
import InitialLocation from '@/gis/widget/InitialLocation';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import { MapboxExportControl } from 'qm-map-print';
import { useMap } from '@/gis/context/mapContext';
import { memo, useMemo, useEffect } from 'react';
import LayerList from '@/gis/widget/LayerList';
import { useLocation } from 'react-router-dom';
import Location from '@/gis/widget/Location';
import Measure from '@/gis/widget/Measure';
import Legend from '@/gis/widget/Legend';
import Swipe from '@/gis/widget/Swipe';

interface TControlPanel {
  regionList?: any;
}

const ControlPanel = (props: TControlPanel) => {
  const { regionList } = props;
  const location = useLocation();
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
      <LayerList position={{ top: 10, left: 10 }} />
      <Legend position={{ bottom: 10, left: 10 }} />
      <Swipe position={{ top: 225, right: 10 }} />
      <Location position={{ top: 265, right: 10 }} />
      <Measure position={{ top: 305, right: 10 }} />
      <InitialLocation position={{ top: 185, right: 10 }} />
    </div>
  );
};

export default memo(ControlPanel);
