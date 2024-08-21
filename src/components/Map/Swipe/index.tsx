import type { TWidgetPosition } from '@/components/Map/BaseWidget';
import BaseWidget from '@/components/Map/BaseWidget';
import { memo, useCallback, useEffect, useState } from 'react';
import 'mapbox-gl-compare/dist/mapbox-gl-compare.css';
import { useMap } from '@/gis/context/mapContext';
import type MapWrapper from '@/gis/mapboxgl/MapWrapper';
import Compare from 'mapbox-gl-compare';
import LayerList from '@/gis/widget/LayerList';
import MapWidget from '@/gis/widget/MapWidget';
import { Modal } from 'antd';
import './index.less';

const Swipe =
  'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjcyMTk3MzE2MzYyIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9Ijk2NTIiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTUzNy4xIDkxMC4yYzAgNy44IDcuOSAwIDAgMHogbS00OS4yIDBjLTcuOSAwIDAgNy44IDAgMHogbTQzOC40LTY1Mi40Yy0yLjctMi41LTYuNC00LTEwLjEtNC0yLjggMC01LjQgMC44LTcuOCAyLjRsLTM3MS4zIDI0M1YxMjMuMWMwLTcuOC0xNi43IDAtMjQuNiAwLTcuOSAwLTI0LjYtNy44LTI0LjYgMHYzNzYuMmwtMzcxLjMtMjQzYy0yLjUtMS42LTUuMS0yLjQtNy45LTIuNC02LjkgMC0xNC40IDUuNC0xNC40IDE0LjJ2NDk3LjRjMCA4LjcgNy41IDE0LjEgMTQuNSAxNC4xIDIuNyAwIDUuNC0wLjggNy44LTIuNGwzNzEuMy0yNDN2Mzc2LjJoNDkuMlY1MzRsMzcxLjMgMjQzYzIuNSAxLjYgNS4xIDIuNCA3LjkgMi40IDMuNyAwIDcuNC0xLjUgMTAuMS00IDItMS44IDQuMy01LjEgNC4zLTEwLjFWMjY4YzAtNS4xLTIuNC04LjMtNC40LTEwLjJ6IiBmaWxsPSIjMTQwQTBBIiBwLWlkPSI5NjUzIj48L3BhdGg+PC9zdmc+';

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
    <BaseWidget name="卷帘对比" position={{ ...props.position }} icon={Swipe} openHandle={onOpenHandle}>
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
