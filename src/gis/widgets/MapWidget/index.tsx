import React, { useRef, useEffect, memo, useState } from 'react';
import { TMapContext } from '../context/mapContext';
import { MapContext } from '../context/mapContext';
import { TMapLayerSettting } from '@/gis/typings';
import MapWrapper from '../../wrapper/MapWrapper';
import GisToolHelper from '@/gis/GISToolHelper';
import type { MapboxOptions } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { cloneDeep } from 'lodash';
import './index.less';

interface TMapProps {
  mapOptions: MapboxOptions & {
    id: string;
  };
  mapLayerSettting: TMapLayerSettting;
  className?: string;
  children?: React.ReactNode;
  onMapLoad?: (map: MapWrapper) => void;
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
      style: {
        version: 8,
        glyphs: `font/{fontstack}/{range}.pbf`,
        sources: {},
        layers: [],
      },
      ...mapOptions,
      container: mapDom.current as HTMLElement,
    });
    const loadLayers = () => {
      map.load(cloneDeep(mapLayerSettting));
      setMapInit(true);
      if (contextValue) {
        contextValue.map = map;
      }
      onMapLoad?.(map);
      map.images.forEach((item: any) => {
        map.loadImage(item.url, (error: any, image: any) => {
          if (!error) {
            if (!map.hasImage(item.id)) map.addImage(item.id, image);
          } else throw error;
        });
      });
    };
    map.on('styleimagemissing', (e:any) => {
      const id = e.id;
      const prefix = 'icon-';
      if (!id.includes(prefix)) return;
      map.images.forEach((item: any) => {
        if (item.id === id) {
          map.loadImage(item.url, (error: any, image: any) => {
            map.removeImage(id);
            if (!map.hasImage(id)) map.addImage(item.id, image);
          });
        }
      });
    });
    map.on('load', loadLayers);
    map.on('click', (e: any) => {
      console.log(e.lngLat, map.getCenter(), map.getZoom());
      console.log(map.getStyle());
    });
    const resizeMap = GisToolHelper.debounce(() => {
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
