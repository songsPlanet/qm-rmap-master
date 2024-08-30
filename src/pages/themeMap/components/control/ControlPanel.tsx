import { NavigationControl, FullscreenControl } from 'mapbox-gl';
import { useMap } from '@/gis/widgets/context/mapContext';
import { memo, useMemo, useEffect } from 'react';
import Measure from '@/components/Map/Measure';
import LayerList from '@/gis/widgets/LayerList';
import Legend from '@/gis/widgets/LegendControl';

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
      <Legend position={{ bottom: 10, left: 10 }} />
      <Measure position={{ top: 180, right: 10 }} />
      <LayerList position={{ top: 10, left: 10 }} />
    </div>
  );
};

export default memo(ControlPanel);
