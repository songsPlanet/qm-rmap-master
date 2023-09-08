import MapWidget from '@/gis/widget/MapWidget';
import MapWrapper from '@/gis/mapboxgl/MapWrapper';
import ControlPanel from '../../../gis/widget/Controls/ControlPanel';
import { memo, useEffect, useRef, useState } from 'react';
import MapTools from '../../../gis/widget/ToolBar';
import { ToolPanel } from '../ToolPanel';

interface TMapContainerProp {
  mapOptions: any;
  mapSetting: any;
  toolSetting: any;
}
const MapContainer = (props: TMapContainerProp) => {
  const { mapOptions, mapSetting, toolSetting } = props;
  const mapR = useRef<MapWrapper>();

  const mapLoadHandle = (map: MapWrapper) => {
    // if (!mapR.current) {
    mapR.current = map;
    // }
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
        <ToolPanel toolsSetting={toolSetting} />
      </MapWidget>
    </div>
  );
};

export default memo(MapContainer);
