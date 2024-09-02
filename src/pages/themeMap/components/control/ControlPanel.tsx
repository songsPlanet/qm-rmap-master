import { NavigationControl, FullscreenControl } from 'mapbox-gl';
import { useMap } from '@/gis/widgets/context/mapContext';
// import SwipeControl from '@/gis/widgets/SwipeControl';
import React, { memo, useMemo, useEffect } from 'react';
import Legend from '@/gis/widgets/LegendControl';
import Measure from '@/components/Map/Measure';
import LayerList from '@/gis/widgets/LayerList';
import DrawWidget from '@/gis/widgets/DrawWidget';

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
      <Measure position={{ top: 190, right: 10 }} />
      <LayerList position={{ top: 10, left: 10 }} />
      {/* <SwipeControl position={{top: 150,right: 10}}/> */}
      {map ? <DrawWidget position={{ bottom: 10, right: 10 }} map={map} /> : null}
    </div>
  );
};

export default memo(ControlPanel);
