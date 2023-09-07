import MapWidget from '@/gis/widget/MapWidget';
import MapWrapper from '@/gis/mapboxgl/MapWrapper';
import ControlPanel from '../Controls/ControlPanel';
// import mapSetting from '../../themeMap/mapSetting';
import { memo, useEffect, useRef } from 'react';
import { Spin } from 'antd';

interface TMapContainerProp {
  mapOptions: any;
  mapSetting: any;
}

const MapContainer = (props: TMapContainerProp) => {
  const { mapOptions, mapSetting } = props;
  const mapR = useRef<MapWrapper>();

  const mapLoadHandle = (map: MapWrapper) => {
    if (!mapR.current) {
      mapR.current = map;
    }
    // 选中并高亮
    mapR?.current?.on('click', (e) => {
      const flag: any = mapR?.current?.getLayerList().map((f) => {
        return f.options.isAdd && f.options.type !== 'raster' && f.options.type !== 'logicGroup' ? f : null;
      });
      const flag1: any = flag.filter((f: any) => f);
      const ids: any = flag1?.map((d: any) => d?.options.id);
      const features = map.queryRenderedFeatures(e.point, { layers: ids });
      // const features2 = map.querySourceFeatures('wh_sy-ds', { sourceLayer: 'wh_sqal_sy_2022_04' });
      const feature = features[0];
      map.selectFeature(feature);
    });
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <MapWidget mapOptions={mapOptions} mapLayerSettting={mapSetting} onMapLoad={mapLoadHandle}>
        <ControlPanel />
      </MapWidget>
    </div>
  );
};

export default memo(MapContainer);
