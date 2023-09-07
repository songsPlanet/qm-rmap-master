import 'mapbox-gl/dist/mapbox-gl.css';
import { TMapLayerSettting } from '@/gis/mapboxgl/typings/TLayerOptions';
import { MapboxOptions } from 'mapbox-gl';
import MapWrapper from '@/gis/mapboxgl/MapWrapper';
import React, { useRef, useEffect, memo, useState } from 'react';
import './index.less';
import { MapContext, TMapContext } from '@/gis/context/mapContext';
import { debounce } from '@/gis/utils';
import { cloneDeep } from 'lodash';
interface TMapProps {
  mapOptions: MapboxOptions & {
    id: string;
  };
  mapLayerSettting: TMapLayerSettting;
  children?: React.ReactNode;
  onMapLoad?: (map: MapWrapper) => void;
  className?: string;
}

function MapWidget(props: TMapProps) {
  const { mapOptions, mapLayerSettting, children, onMapLoad, className } = props;
  const mapDom = useRef<HTMLDivElement | null>(null);
  const [mapInit, setMapInit] = useState<boolean>(false);
  const { current: contextValue } = useRef<TMapContext>({ map: null });

  useEffect(() => {
    const map = new MapWrapper({
      pitch: 0,
      bearing: 0,
      attributionControl: false,
      renderWorldCopies: false,
      trackResize: true,
      preserveDrawingBuffer: true,
      ...mapOptions,
      container: mapDom.current as HTMLElement,
      style: {
        version: 8,
        glyphs: `/font/{fontstack}/{range}.pbf`,
        sources: {},
        layers: [],
      },
    });
    const loadLayers = () => {
      map.load(cloneDeep(mapLayerSettting));
      setMapInit(true);
      onMapLoad?.(map);
      if (contextValue) {
        contextValue.map = map;
      }
    };
    map.on('load', loadLayers);
    // map.showTileBoundaries = true;
    map.on('click', (e) => {
      console.log(e.lngLat);
      console.log(map.getCenter(), map.getZoom(), map.getBounds());
    });
    const resizeMap = debounce(() => {
      map.resize();
    }, 10);
    const ro = new ResizeObserver(resizeMap);
    ro.observe(mapDom?.current as Element);
    return () => {
      map.off('load', loadLayers);
    };
  }, []);

  return (
    <div ref={mapDom} className={className ?? 'map-wrapper'} id="map-wrapper">
      {mapInit && contextValue && <MapContext.Provider value={contextValue}>{children}</MapContext.Provider>}
    </div>
  );
}
export default memo(MapWidget);
