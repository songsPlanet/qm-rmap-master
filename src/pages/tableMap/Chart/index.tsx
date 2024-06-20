import { memo, useRef, useEffect } from 'react';
import MapWidget from '@/gis/widget/MapWidget';
import { LngLatLike } from 'mapbox-gl';
import mapSetting from './mapSetting';
import ControlPanel from '@/pages/themeMap/components/control/ControlPanel';
import MapWrapper from '@/gis/mapboxgl/MapWrapper';
import { delay, events } from '@/utils';

function Chart() {
  const mapOptions = {
    id: 'analyseMap',
    center: [115.99604988553341, 32.93512360416358] as LngLatLike, // 阜阳市
    container: '',
    zoom: 8,
    maxZoom: 20,
  };

  const mapR = useRef<MapWrapper>();

  const mapLoadHandle = (map: MapWrapper) => {
    if (!mapR.current) {
      mapR.current = map;
    }
  };

  // const locationRegionFeature = (code: string) => {
  //   getRegionFeatureApi(code).then((ctx: any) => {
  //     const feat = ctx?.data?.features[0] || null;
  //     if (feat) {
  //       mapR.current?.selectFeature(feat);
  //       const bds = getFeatureBoundingBox(feat);
  //       mapR.current?.fitBounds(bds);
  //     }
  //   });
  // };

  useEffect(() => {
    const recordChangedHandle = (record: any) => {
      // const bm = record?.xzqhdm;
      // if (bm) {
      //   locationRegionFeature(bm);
      // }
    };
    events.add('tableRecordChange', recordChangedHandle);
  }, []);

  return (
    <div style={{ height: '100%' }}>
      <MapWidget mapOptions={mapOptions} mapLayerSettting={mapSetting} onMapLoad={mapLoadHandle}>
        <ControlPanel />
      </MapWidget>
    </div>
  );
}

export default memo(Chart);
