import { useState, memo, useRef, useEffect } from 'react';
import DrawRectangle from 'mapbox-gl-draw-rectangle-mode';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import type { TWidgetPosition } from '../BaseWidget';
import GisToolHelper from '@/gis/GISToolHelper';
import mapboxDraw from '@mapbox/mapbox-gl-draw';
import { useMap } from '../context/mapContext';
import { drawToolList } from './constant';
import { Marker } from 'mapbox-gl';
import React from 'react';
import './index.less';

const DrawWidget = (props: { position: TWidgetPosition }) => {
  const { map } = useMap();
  const { position } = props;
  const controlStyle = { ...position };
  const [mode, setMode] = useState('none');
  const markerRef = useRef<Marker[]>([]);
  const featureRef = useRef<any>([{ id: '' }]);

  const selectedModeHandle = (type: any) => {
    setMode(type);
    if (map?.drawTool) {
      map?.drawTool.changeMode(type);
    }
  };

  const clearAllHandle = () => {
    setMode('simple_select');
    if (map?.drawTool) {
      map?.drawTool.deleteAll();
      map?.drawTool.changeMode('simple_select');
      markerRef.current.forEach((item: Marker) => {
        item.remove();
      });
    }
  };

  // 添加关闭按钮
  const addMarkerHandle = (e: any) => {
    let box = GisToolHelper.getFeatureBoundingBox(e.features[0]);
    let _ele = document.createElement('div');
    _ele.setAttribute('class', 'measureResultClose');
    _ele.setAttribute('id', e.features[0].id);
    _ele.innerHTML = '×';
    let closeMarker = new Marker({
      element: _ele,
      anchor: 'bottom-left',
      offset: [-5, -10],
    })
      .setLngLat(box.getCenter())
      .addTo(map!);
    markerRef.current.push(closeMarker);
    _ele.onclick = (e) => {
      e.stopPropagation();
      map?.drawTool.delete(_ele.getAttribute('id'));
      closeMarker.remove();
    };
  };

  const updatetDraw = (e: any) => {
    markerRef.current
      .filter((item: any) => {
        return item._element.getAttribute('id') === e.features[0].id;
      })
      .map((d: any) => {
        d.remove();
        return null;
      });
    addMarkerHandle(e);
  };

  const creatDraw = (e: any) => {
    if (featureRef.current[0].id !== e.features[0].id) {
      featureRef.current = e.features;
      addMarkerHandle(e);
    }
  };

  useEffect(() => {
    if (!map?.drawTool && map) {
      map.drawTool = new mapboxDraw({
        displayControlsDefault: false,
        modes: { ...mapboxDraw.modes, draw_rectangle: DrawRectangle },
        defaultMode: 'simple_select',
      });
      map.addControl(map.drawTool, 'bottom-right');
      map.on('draw.create', creatDraw);
      map.on('draw.update', updatetDraw);
    }
  }, []);

  return (
    <div className="mapboxgl-draw" style={controlStyle}>
      <div className="mapboxgl-draw-bar">
        <div>
          {drawToolList.map((item) => (
            <div
              key={item.mode}
              title={item.title}
              className="mapboxgl-draw-bar-button"
              style={{ backgroundImage: `url(${item.icon})` }}
              onClick={item.mode === 'simple_select' ? () => clearAllHandle() : () => selectedModeHandle(item.mode)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default memo(DrawWidget);
