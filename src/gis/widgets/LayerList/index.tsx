import  { LayerGroupWrapper, LayerWrapper } from 'qm-map-wrapper';
import { useState, useEffect, memo, useCallback } from 'react';
import { GISToolHelper, MapEvent } from 'qm-map-wrapper';
import type { TWidgetPosition } from '../BaseWidget';
import { useMap } from '../context/mapContext';
import type { DataNode } from 'antd/es/tree';
import BaseWidget from '../BaseWidget';
import { Tree } from 'antd';
import React from 'react';

const LayerListIcon =
  'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjcyMTMyNjkyNzI3IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9Ijg5OTAiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTg1Mi42IDQ2Mi45bDEyLjEgNy42YzI0LjggMTUuNiAzMi4zIDQ4LjMgMTYuNyA3My4yLTQuMiA2LjctOS45IDEyLjQtMTYuNyAxNi43TDU0MC40IDc2NC4xYy0xNy4zIDEwLjgtMzkuMiAxMC44LTU2LjQgMEwxNTkuMyA1NjBjLTI0LjgtMTUuNi0zMi4zLTQ4LjMtMTYuNy03My4yIDQuMi02LjcgOS45LTEyLjQgMTYuNy0xNi43bDEyLjEtNy42TDQ4My45IDY1OWMxNy4zIDEwLjggMzkuMiAxMC44IDU2LjQgMGwzMTIuMi0xOTYgMC4xLTAuMXogbTAgMTU2LjFsMTIuMSA3LjZjMjQuOCAxNS42IDMyLjMgNDguMyAxNi43IDczLjItNC4yIDYuNy05LjkgMTIuNC0xNi43IDE2LjdMNTQwLjQgOTIwLjJjLTE3LjMgMTAuOC0zOS4yIDEwLjgtNTYuNCAwTDE1OS4zIDcxNi4xYy0yNC44LTE1LjYtMzIuMy00OC4zLTE2LjctNzMuMiA0LjItNi43IDkuOS0xMi40IDE2LjctMTYuN2wxMi4xLTcuNkw0ODMuOSA4MTVjMTcuMyAxMC44IDM5LjIgMTAuOCA1Ni40IDBsMzEyLjItMTk2aDAuMXpNNTQwIDEwNi40bDMyNC42IDIwNC4xYzI0LjggMTUuNiAzMi4zIDQ4LjMgMTYuNyA3My4yLTQuMiA2LjctOS45IDEyLjQtMTYuNyAxNi43TDU0MC40IDYwNGMtMTcuMyAxMC44LTM5LjIgMTAuOC01Ni40IDBMMTU5LjMgMzk5LjhjLTI0LjgtMTUuNi0zMi4zLTQ4LjMtMTYuNy03My4yIDQuMi02LjcgOS45LTEyLjQgMTYuNy0xNi43bDMyNC40LTIwMy43YzE3LjMtMTAuOCAzOS4yLTEwLjggNTYuNCAwbC0wLjEgMC4yeiIgcC1pZD0iODk5MSI+PC9wYXRoPjwvc3ZnPg==';

const LayerList = (props: { position: TWidgetPosition; icon?: string }) => {
  const { map } = useMap();
  const [keys, setkeys] = useState<string[]>([]);
  const [data, setData] = useState<DataNode[]>([]);

  const loop = useCallback((data: Array<LayerWrapper | LayerGroupWrapper>, keys: string[]) => {
    let nodeData: any;
    const treeData: any[] = [];
    data.forEach((layer: LayerWrapper | LayerGroupWrapper) => {
      nodeData = undefined;
      if ('layers' in layer && layer.options.type === 'logicGroup') {
        nodeData = {
          title: layer.options.name,
          key: layer.options.id,
          selectable: false,
          children: loop(layer.layers, keys),
        };
      } else {
        if (!layer.options.isTemporary) {
          nodeData = {
            title: layer.options.name,
            key: layer.options.id,
            selectable: false,
          };
        }
      }
      if (nodeData) {
        treeData.push(nodeData);
      }
      if (layer.options.isAdd && layer.options.type !== 'logicGroup' && !layer.options.isTemporary) {
        keys.push(layer.options.id);
      }
    });
    return treeData;
  }, []);

  const checkedHandle = (checkedKeys: any, info: any) => {
    setkeys(checkedKeys);
    // 并集
    const union = new Set([...keys, ...checkedKeys]);
    // 差集 增加的
    const addKeys = new Set([...union].filter((x) => !keys.includes(x)));
    // 差集 减少的
    const delKeys = new Set([...union].filter((x) => !checkedKeys.includes(x)));

    addKeys.forEach((key: string) => {
      const lyr = map?.getLayerWrapper(map.layers, key);
      if (lyr && 'layers' in lyr) {
        lyr.layers.forEach((d) => {
          d.options.isAdd = true;
        });
        map?.addLayerWrapper(lyr);
      } else if (lyr) {
        lyr.options.isAdd = true;
        map?.addLayerWrapper(lyr);
        // 淡入淡出效果，同时图层需要配置对应属性
        // map?.setPaintProperty(lyr.options.id, 'fill-opacity', 0.6);
      }
    });

    delKeys.forEach((key: any) => {
      const lyr = map?.getLayerWrapper(map.layers, key);
      if (lyr && 'layers' in lyr) {
        lyr.layers.forEach((d) => {
          d.options.isAdd = false;
        });
        map?.removeLayerWrapper(lyr);
      } else if (lyr) {
        lyr.options.isAdd = false;
        map?.removeLayerWrapper(lyr);
        // map?.setPaintProperty(lyr.options.id, 'fill-opacity', 0);
      }
    });

    // 修正logicGroup isAdd属性
    map!.layers.forEach((layer) => {
      modifyMapLayers(layer);
    });
  };

  const modifyMapLayers = (layer: LayerWrapper | LayerGroupWrapper) => {
    if ('layers' in layer && layer.layers.findIndex((d) => d.options.type === 'logicGroup') > -1) {
      layer!.layers.forEach((f) => {
        modifyMapLayers(f);
      });
    } else if ('layers' in layer && layer.options.type === 'logicGroup') {
      const isAllFalse = layer.layers.findIndex((d) => d.options.isAdd) === -1;
      if (isAllFalse) {
        layer.options.isAdd = false;
      } else {
        layer.options.isAdd = true;
      }
    }
  };

  useEffect(() => {
    // 地图图层加载事件
    const init = () => {
      const loadkeys: string[] = [];
      const treeData = map ? loop(map.layers, loadkeys) : [];
      setData(treeData);
      setkeys(loadkeys);
    };
    const mapLayerChangedHandle = GISToolHelper.debounce(() => {
      init();
    }, 300);
    map?.on(MapEvent.MAPLAYERCHANGED, mapLayerChangedHandle);
    init();
    return () => {
      map?.off(MapEvent.MAPLAYERCHANGED, mapLayerChangedHandle);
    };
  }, []);

  return (
    <BaseWidget
      name="图层控制"
      width={180}
      position={props.position}
      icon={props.icon ? props.icon : LayerListIcon}
      height={keys.length * 28 < 280 ? 280 : keys.length * 28}
    >
      <Tree
        checkable
        checkedKeys={keys}
        onCheck={(checkedKeys: any, info: any) => checkedHandle(checkedKeys, info)}
        treeData={data}
        style={{ fontSize: 12, maxHeight: 400, overflowX: 'hidden', overflowY: 'auto' }}
      />
    </BaseWidget>
  );
};
export default memo(LayerList);
