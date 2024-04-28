import ControlPanel from '../components/Controls/ControlPanel';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import mapSetting from './mapSetting';
import MapWrapper from '@/gis/mapboxgl/MapWrapper';
import MapWidget from '@/gis/widget/MapWidget';
import styles from './index.module.less';
import { LngLatLike } from 'mapbox-gl';
import { memo, useRef } from 'react';

const EditMap = (props: any) => {
  const mapR = useRef<MapWrapper>();
  let draw = useRef<MapboxDraw | null>(null);

  const mapOptions = {
    id: 'EditMap',
    container: '',
    center: [118.16333303406572, 31.108394692222518] as LngLatLike, // 芜湖
    zoom: 8.7,
    maxZoom: 17,
  };

  const updateArea = () => {
    const data = draw.current?.getAll();
  };

  const mapLoadHandle = (map: MapWrapper) => {
    mapR.current = map;
    // 编辑
    draw.current = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: true,
        trash: true,
      },
      defaultMode: 'simple_select',
    });
    mapR.current?.addControl(draw.current, 'bottom-right');
    mapR.current?.on('draw.create', updateArea);
    mapR.current?.on('draw.delete', updateArea);
    mapR.current?.on('draw.update', updateArea);
  };

  return (
    <div className={styles.mapContainer}>
      <MapWidget mapOptions={mapOptions} mapLayerSettting={mapSetting} onMapLoad={mapLoadHandle}>
        <ControlPanel />
      </MapWidget>
    </div>
  );
};
export default memo(EditMap);
