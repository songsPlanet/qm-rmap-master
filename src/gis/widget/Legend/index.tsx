import { useMap } from '@/gis/context/mapContext';
import type LayerGroupWrapper from '@/gis/mapboxgl/layer/LayerGroupWrapper';
import type LayerWrapper from '@/gis/mapboxgl/layer/LayerWrapper';
import { MapEvent } from '@/gis/mapboxgl/typings';
import { debounce } from '@/gis/utils';
import type { ReactNode } from 'react';
import { memo, useCallback, useEffect, useState } from 'react';
import type { TWidgetPosition } from '../BaseWidget';
import BaseWidget, { ControlICONS } from '../BaseWidget';
import './index.less';

const LegendControl = (props: { position: TWidgetPosition }) => {
  const { map } = useMap();
  const [listDom, setListDom] = useState<ReactNode[]>();
  const [height, setHeight] = useState(0);
  const loop = useCallback((layers: Array<LayerWrapper | LayerGroupWrapper>, hArr: number[], list: any[]) => {
    let nodeData: any;
    layers.forEach((layer: LayerWrapper | LayerGroupWrapper) => {
      nodeData = undefined;
      if ('layers' in layer && !layer.options.legend) {
        loop(layer.layers, hArr, list);
      } else if (
        layer.options.legend &&
        (layer.options.isAdd || ('layers' in layer && layer.layers.filter((d) => d.options.isAdd).length))
      ) {
        const { title, items } = layer.options.legend;
        if (items) {
          nodeData = (
            <div className="mapboxgl-legend-group" key={layer.options.id}>
              <div className="mapboxgl-legend-tilte">{title ? title : layer.options.name}</div>
              {items?.map((d) => {
                hArr.push(26);
                const img = map?.images.find((f) => f.id === d.imageId);
                return (
                  <div className="mapboxgl-legend-item" key={d.text}>
                    {img ? (
                      <img src={img.data} alt="" className="mapboxgl-legend-item-img" />
                    ) : (
                      <div className="mapboxgl-legend-item-geo" style={d.style} />
                    )}
                    <div className="mapboxgl-legend-item-text">{d.text}</div>
                  </div>
                );
              })}
            </div>
          );
          hArr.push(50);
        } else {
          const { style, imageId, text } = layer.options.legend;
          const img = map?.images.find((f) => f.id === imageId);
          hArr.push(26);
          nodeData = (
            <div className="mapboxgl-legend-item" key={text ? text : title ? title : layer.options.id}>
              {img ? (
                <img src={img.data} alt="" className="mapboxgl-legend-item-img" />
              ) : (
                <div className="mapboxgl-legend-item-geo" style={style} />
              )}
              <div className="mapboxgl-legend-item-text">{text ? text : layer.options.name}</div>
            </div>
          );
        }
      } else {
        nodeData = undefined;
      }
      if (nodeData) {
        list.push(nodeData);
      }
    });
  }, []);
  useEffect(() => {
    const init = () => {
      // 计算高度
      const hArr: number[] = [];
      // dom列表
      const list: any[] = [];
      loop(map!.layers, hArr, list);
      setListDom(list);
      const h = hArr.reduce((sum, cur) => {
        return sum + cur;
      }, 0);
      setHeight(h + 40);
    };
    const mapLayerChangedHandle = debounce(() => {
      init();
    }, 200);
    map?.on(MapEvent.MAPLAYERCHANGED, mapLayerChangedHandle);

    init();
    return () => {
      map?.off(MapEvent.MAPLAYERCHANGED, mapLayerChangedHandle);
    };
  }, []);
  return (
    <BaseWidget name="图例" position={props.position} icon={ControlICONS.Legend} width={180} height={height}>
      <div className="mapboxgl-legend">{listDom}</div>
    </BaseWidget>
  );
};
export default memo(LegendControl);
