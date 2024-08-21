import type { TMapLayerSettting } from '@/lib/mapboxgl/typings';
import type MapWrapper from '@/lib/mapboxgl/MapWrapper';
import React, { memo, useEffect, useRef } from 'react';
import MapWidget from '@/lib/widget/MapWidget';
import classes from './index.module.less';
import { cloneDeep } from 'lodash';

interface TMapContainerProp {
  mapOptions: any;
  children?: React.ReactNode;
  mapSetting: TMapLayerSettting;
  onMapLoad?: (map: MapWrapper) => void;
}
const MapContainer = (props: TMapContainerProp) => {
  const { mapSetting, children, mapOptions, onMapLoad } = props;
  const mapR = useRef<MapWrapper>();

  const mapLoadHandle = (map: MapWrapper) => {
    if (!mapR.current) {
      mapR.current = map;
      onMapLoad?.(map);
    }
  };
  useEffect(() => {
    mapR.current?.load(cloneDeep(mapSetting));
  }, [mapSetting]);
  return (
    <div className={classes.mapContainer}>
      <MapWidget mapOptions={mapOptions} mapLayerSettting={mapSetting} onMapLoad={mapLoadHandle}>
        {children}
      </MapWidget>
    </div>
  );
};

export default memo(MapContainer);
