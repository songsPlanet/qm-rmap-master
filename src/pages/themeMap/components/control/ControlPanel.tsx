import { NavigationControl, FullscreenControl } from 'mapbox-gl';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import { useMap } from '@/lib/context/mapContext';
import { memo, useMemo, useEffect } from 'react';
import LayerList from '@/lib/widget/LayerList';
import Location from '@/components/Map/Location';
import Measure from '@/components/Map/Measure';
import Legend from '@/lib/widget/Legend';
import Swipe from '@/components/Map/Swipe';

interface TControlPanel {
  regionList?: any;
}

const ControlPanel = (props: TControlPanel) => {
  const { map } = useMap();

  const navCtrl = useMemo(() => {
    return new NavigationControl();
  }, []);
  const fullCtrl = useMemo(() => {
    return new FullscreenControl();
  }, []);

  useEffect(() => {
    map?.addControl(navCtrl, 'top-right');
    map?.addControl(fullCtrl, 'top-right');

    return () => {
      map?.removeControl(navCtrl);
      map?.removeControl(fullCtrl);
    };
  }, []);

  return (
    <div>
      <LayerList position={{ top: 10, left: 10 }} />
      <Legend position={{ bottom: 10, left: 10 }} />
      <Swipe position={{ top: 225, right: 10 }} />
      <Location position={{ top: 265, right: 10 }} />
      <Measure position={{ top: 305, right: 10 }} />
    </div>
  );
};

export default memo(ControlPanel);
