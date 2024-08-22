import type { TMapLayerSettting } from '../../../gis/typings/TLayerOptions';
import React, { useRef, useEffect, memo, useState } from 'react';
import MapWrapper from '@/gis/wrapper/MapWrapper';
import { MapContext } from '../context/mapContext';
import { TMapContext } from '../context/mapContext';
import type { MapboxOptions } from 'mapbox-gl';
import { debounce } from '../../../gis/wrapper/utils';
import 'mapbox-gl/dist/mapbox-gl.css';
import { cloneDeep } from 'lodash';
import './index.less';

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
      // map.showTileBoundaries=true // 瓦片
      // // 添加动态点图标
      // const redAnimationImg = getPulsingDot(map);
      // map.addImage('redAnimationImg', redAnimationImg, { pixelRatio: 2 });
      if (contextValue) {
        contextValue.map = map;
      }
      onMapLoad?.(map);
      // 添加其他图标资源
      map.images.forEach((item: any) => {
        map.loadImage(item.url, (error: any, image: any) => {
          if (!error) {
            if (!map.hasImage(item.id)) map.addImage(item.id, image);
          } else throw error;
        });
      });
    };
    map.on('styleimagemissing', (e) => {
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
