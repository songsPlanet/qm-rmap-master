import { memo, useRef, useEffect } from 'react';
import MapWidget from '@/gis/widget/MapWidget';
import { LngLatLike } from 'mapbox-gl';
import mapSetting from './mapSetting';
import ControlPanel from '@/pages/components/Controls/ControlPanel';
import MapWrapper from '@/gis/mapboxgl/MapWrapper';
import { log } from 'console';
import { delay, events } from '@/utils';

function Chart() {
  const mapOptions = {
    id: 'analyseMap',
    center: [111.75443305352513, 27.496136672739027] as LngLatLike,
    container: '',
    zoom: 6,
    maxZoom: 17,
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
      console.log('定位按钮');

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
