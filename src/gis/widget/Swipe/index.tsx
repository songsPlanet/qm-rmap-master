import BaseWidget, { ControlICONS, TWidgetPosition } from '../BaseWidget';
import { memo, useCallback, useEffect, useState } from 'react';
import 'mapbox-gl-compare/dist/mapbox-gl-compare.css';
import { useMap } from '@/gis/context/mapContext';
import MapWrapper from '@/gis/mapboxgl/MapWrapper';
import Compare from 'mapbox-gl-compare';
import LayerList from '../LayerList';
import MapWidget from '../MapWidget';
import { Modal } from 'antd';
import './index.less';

const SwipeControl = (props: { position: TWidgetPosition }) => {
  const { map } = useMap();
  const [open, setOpen] = useState(false);
  const [beforeMap, setBeforeMap] = useState<MapWrapper | null>(null);
  const [afterMap, setAfterMap] = useState<MapWrapper | null>(null);

  const onOpenHandle = useCallback((value: boolean) => {
    setOpen(!open);
  }, []);

  useEffect(() => {
    if (beforeMap && afterMap) {
      // 卷帘
      const container = document.getElementById('swipeContainer');
      if (container) {
        const compare = new Compare(beforeMap, afterMap, container, {
          mousemove: false,
          orientation: 'vertical',
        });
        beforeMap.setCenter(map!.getCenter());
        beforeMap.setZoom(map!.getZoom());
        beforeMap.setBearing(map!.getBearing());
        afterMap.setPitch(map!.getPitch());
      }
    }
  }, [beforeMap, afterMap]);
  return (
    <BaseWidget name="卷帘对比" position={{ ...props.position }} icon={ControlICONS.Swipe} openHandle={onOpenHandle}>
      <Modal
        title="卷帘对比"
        maskClosable={false}
        open={open}
        width={1250}
        footer={null}
        onCancel={() => setOpen(false)}
        destroyOnClose
      >
        <div id="swipeContainer" className="mapboxgl-swipe">
          <MapWidget
            mapOptions={{ ...map!.options, id: 'swipeBeforeMap' }}
            mapLayerSettting={map!.mapLayerSetting}
            onMapLoad={(map) => setBeforeMap(map)}
            className="swipe-map-container"
          >
            <LayerList position={{ top: 10, left: 10 }} />
          </MapWidget>
          <MapWidget
            mapOptions={{ ...map!.options, id: 'swipeAfterMap' }}
            mapLayerSettting={map!.mapLayerSetting}
            onMapLoad={(map) => setAfterMap(map)}
            className="swipe-map-container"
          >
            <LayerList position={{ top: 10, right: 10 }} />
          </MapWidget>
        </div>
      </Modal>
    </BaseWidget>
  );
};

export default memo(SwipeControl);
