import type { TMapLayerSettting } from '@/gis/typings';
import type MapWrapper from '@/gis/wrapper/MapWrapper';
import React, { memo, useEffect, useRef } from 'react';
import type { MapboxOptions } from 'mapbox-gl';
import classes from './index.module.less';
import { MapWidget } from '@/gis';
import { cloneDeep } from 'lodash';

interface TMapContainerProp {
  mapOptions: MapboxOptions & {
    id: string;
  };
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
