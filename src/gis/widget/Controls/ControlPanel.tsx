import { useMap } from '@/gis/context/mapContext';
import LayerList from '@/gis/widget/LayerList';
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
    map?.addControl(navCtrl, 'bottom-right');
    map?.addControl(fullCtrl, 'bottom-right');
    return () => {
      map?.removeControl(navCtrl);
      map?.removeControl(fullCtrl);
    };
  }, []);

  return (
    <div>
      <LayerList position={{ top: 10, left: 10 }} />
      <Legend position={{ bottom: 10, left: 10 }} />
    </div>
  );
};

export default memo(ControlPanel);
