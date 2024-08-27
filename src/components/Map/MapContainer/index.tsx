import type { TMapLayerSettting } from '@/gis/typings';
import type MapWrapper from '@/gis/wrapper/MapWrapper';
import React, { memo, useEffect, useRef } from 'react';
import { MapWidget } from '@/gis';
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
        <div
          id="popup-mask-container"
          style={{
            display: 'none',
            position: 'absolute',
            width: '100%',
            height: 'calc(100vh - 131px)',
            top: 0,
            left: 0,
            zIndex: 998,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
          }}
        >
          {children}
        </div>
      </MapWidget>
    </div>
  );
};

export default memo(MapContainer);
