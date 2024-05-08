import ControlPanel from '../components/Controls/ControlPanel';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import mapSetting from './mapSetting';
import MapWrapper from '@/gis/mapboxgl/MapWrapper';
import MapWidget from '@/gis/widget/MapWidget';
import styles from './index.module.less';
import { LngLatLike, Marker } from 'mapbox-gl';
import { memo, useRef } from 'react';
import { getFeatureBoundingBox } from '@/gis/utils';

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
  const clearHandle = () => {
    let type = 'simple_select';
    draw.current?.deleteAll();
    draw.current?.changeMode(type);
  };

  const updateArea = (e: any) => {
    let features = e.features;
    let box = getFeatureBoundingBox(features[0]);
    // 添加关闭按钮
    let _ele = document.createElement('div');
    _ele.setAttribute('class', styles.measureResultClose);
    _ele.innerHTML = '×';
    if (mapR.current) {
      let closeMarker = new Marker({
        element: _ele,
        anchor: 'bottom-left',
        offset: [-5, -10],
      })
        .setLngLat(box.getCenter())
        .addTo(mapR.current);
      _ele.onclick = (e) => {
        e.stopPropagation();
        clearHandle();
        closeMarker.remove();
      };
    }
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
