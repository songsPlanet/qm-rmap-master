import { NavigationControl, FullscreenControl } from 'mapbox-gl';
import { useMap } from '@/gis/widgets/context/mapContext';
import { memo, useMemo, useEffect } from 'react';

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
      {/* <Swipe position={{ top: 225, right: 10 }} /> */}
      {/* <Location position={{ top: 265, right: 10 }} /> */}
    </div>
  );
};

export default memo(ControlPanel);
