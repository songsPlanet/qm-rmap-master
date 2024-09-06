import React, { useRef, useEffect, memo, useState } from 'react';
import { getPulsingDot } from '@/gis/animation/pulsingDot';
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
      // 添加动态点图标
      const redAnimationImg = getPulsingDot(map);
      map.addImage('redAnimationImg', redAnimationImg, { pixelRatio: 2 });
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
    map.on('styleimagemissing', (e: any) => {
      const id = e.id;
      const prefix = 'icon-';
      // 检查缺失的图片ID是否以特定前缀开始
      if (!id.includes(prefix)) return;

      // 在自定义图片数组中查找缺失的图片
      const customImage = map.images.find((img) => img.id === id);
      if (!customImage) return; // 如果没有找到，则不做任何操作

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
