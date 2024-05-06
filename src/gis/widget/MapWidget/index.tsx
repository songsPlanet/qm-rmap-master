import 'mapbox-gl/dist/mapbox-gl.css';
import { TMapLayerSettting } from '@/gis/mapboxgl/typings/TLayerOptions';
import { MapboxOptions } from 'mapbox-gl';
import MapWrapper from '@/gis/mapboxgl/MapWrapper';
import React, { useRef, useEffect, memo, useState } from 'react';
import { MapContext, TMapContext } from '@/gis/context/mapContext';
import { getPulsingDot } from '@/gis/assets/pulsingDot';
import { debounce } from '@/gis/utils';
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
      // map.showTileBoundaries=true // 瓦片
      // 添加一级预警图标
      const redAnimationImg = getPulsingDot(map);
      map.addImage('redAnimationImg', redAnimationImg, { pixelRatio: 2 });
      if (contextValue) {
        contextValue.map = map;
      }
    };
    map.on('load', loadLayers);
    // map.showTileBoundaries = true;
    map.on('click', (e) => {
      // console.log("vecterTile1",map.getStyle().layers)
      // const vecterTile=map.querySourceFeatures("wh_sy-ds")
      // const vecterTile3=map.queryRenderedFeatures()
      // console.log("vecterTile",vecterTile,vecterTile3)
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
