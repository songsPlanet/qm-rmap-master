import { useMap } from '@/gis/context/mapContext';
import LayerList from '@/gis/widget/LayerList';
import Swipe from '@/gis/widget/Swipe';
import Legend from '@/gis/widget/Legend';
import { NavigationControl, FullscreenControl } from 'mapbox-gl';
import { memo, useMemo, useEffect } from 'react';

const ControlPanel = () => {
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
      <Swipe position={{ top: 190, right: 10 }} />
      <LayerList position={{ top: 10, left: 10 }} />
      <Legend position={{ bottom: 10, left: 10 }} />
    </div>
  );
};

export default memo(ControlPanel);
