import type LayerGroupWrapper from '../../mapboxgl/layer/LayerGroupWrapper';
import type LayerWrapper from '../../mapboxgl/layer/LayerWrapper';
import { memo, useCallback, useEffect, useState } from 'react';
import type { TWidgetPosition } from '../BaseWidget';
import { useMap } from '../../context/mapContext';
import { MapEvent } from '../../mapboxgl/typings';
import { debounce } from '../utils';
import type { ReactNode } from 'react';
import BaseWidget from '../BaseWidget';
import './index.less';

const Legend =
  'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjcyMTEwNzAzMTU0IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjQ5NzIiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTExMiAxMTJtMzIgMGw3MzYgMHEzMiAwIDMyIDMybDAgNzM2cTAgMzItMzIgMzJsLTczNiAwcS0zMiAwLTMyLTMybDAtNzM2cTAtMzIgMzItMzJaIiBmaWxsPSIjRkZGRkZGIiBwLWlkPSI0OTczIj48L3BhdGg+PHBhdGggZD0iTTEyOCA5Nmg3NjhhMzIgMzIgMCAwIDEgMzIgMzJ2NzY4YTMyIDMyIDAgMCAxLTMyIDMySDEyOGEzMiAzMiAwIDAgMS0zMi0zMlYxMjhhMzIgMzIgMCAwIDEgMzItMzJ6IG0wIDMydjc2OGg3NjhWMTI4SDEyOHoiIGZpbGw9IiM1RDZEN0UiIHAtaWQ9IjQ5NzQiPjwvcGF0aD48cGF0aCBkPSJNMjI0IDM4NGg2NHY2NEgyMjRWMzg0eiBtMCAxMjhoNjR2NjRIMjI0di02NHogbTAgMTI4aDY0djY0SDIyNHYtNjR6IG0wIDEyOGg2NHY2NEgyMjR2LTY0ek01NDQgMzg0aDY0djY0aC02NFYzODR6IG0wIDEyOGg2NHY2NGgtNjR2LTY0eiBtMCAxMjhoNjR2NjRoLTY0di02NHogbTAgMTI4aDY0djY0aC02NHYtNjR6IiBmaWxsPSIjODA4RkExIiBwLWlkPSI0OTc1Ij48L3BhdGg+PHBhdGggZD0iTTMyMCAzODRoMTYwdjY0SDMyMFYzODR6IG0wIDEyOGgxNjB2NjRIMzIwdi02NHogbTAgMTI4aDE2MHY2NEgzMjB2LTY0eiBtMCAxMjhoMTYwdjY0SDMyMHYtNjR6TTY0MCAzODRoMTYwdjY0aC0xNjBWMzg0eiBtMCAxMjhoMTYwdjY0aC0xNjB2LTY0eiBtMCAxMjhoMTYwdjY0aC0xNjB2LTY0eiBtMCAxMjhoMTYwdjY0aC0xNjB2LTY0eiIgZmlsbD0iI0FDQjRDMCIgcC1pZD0iNDk3NiI+PC9wYXRoPjxwYXRoIGQ9Ik0yMjQgMjI0aDU3NnY5NkgyMjR6IiBmaWxsPSIjMzBBRDk4IiBwLWlkPSI0OTc3Ij48L3BhdGg+PC9zdmc+';

const LegendControl = (props: { position: TWidgetPosition; icon?: string }) => {
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
    <BaseWidget
      name="图例"
      position={props.position}
      icon={props.icon ? props.icon : Legend}
      width={180}
      height={height}
    >
      <div className="mapboxgl-legend">{listDom}</div>
    </BaseWidget>
  );
};
export default memo(LegendControl);
