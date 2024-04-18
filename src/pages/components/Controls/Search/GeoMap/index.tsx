import { getFeatureBoundingBox } from '@/gis/utils';
import { Map } from 'mapbox-gl';
import { CSSProperties, memo, useEffect, useRef } from 'react';
interface TGeoMap {
  style: CSSProperties;
  data: GeoJSON.Feature<GeoJSON.Geometry> | GeoJSON.FeatureCollection<GeoJSON.Geometry> | string;
}
const GeoMap = (props: TGeoMap) => {
  const { data, style } = props;
  useEffect(() => {
    const map = new Map({
      pitch: 0,
      bearing: 0,
      attributionControl: false,
      renderWorldCopies: false,
      trackResize: true,
      preserveDrawingBuffer: true,
      container: mapDom.current as HTMLElement,
      interactive: false,
      dragPan: false,
      dragRotate: false,
      doubleClickZoom: false,
      style: {
        version: 8,
        glyphs: '/font/{fontstack}/{range}.pbf',
        sources: {},
        layers: [],
      },
    });
    const loadLayers = () => {
      map.addSource('geoMap-ds', {
        type: 'geojson',
        data: data,
      });
      map.addLayer({
        id: 'geoMap-lyr',
        type: 'fill',
        paint: {
          'fill-color': '#f29327',
          'fill-opacity': 0.6,
          'fill-outline-color': '#e94c08',
        },
        source: 'geoMap-ds',
      });

      const bounds = getFeatureBoundingBox(data);
      const center = bounds.getCenter();
      map.setCenter(center);
      map.setZoom(16.5);
    };
    map.on('load', loadLayers);
  }, []);
  return <div ref={mapDom} style={style} />;
};
export default memo(GeoMap);
