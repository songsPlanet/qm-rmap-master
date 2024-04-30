import { useState, useEffect, memo, useCallback } from 'react';
import { Tree } from 'antd';
import { useMap } from '@/gis/context/mapContext';
import LayerWrapper from '@/gis/mapboxgl/layer/LayerWrapper';
import LayerGroupWrapper from '@/gis/mapboxgl/layer/LayerGroupWrapper';
import { DataNode } from 'antd/es/tree';
import BaseWidget, { ControlICONS, TWidgetPosition } from '../BaseWidget';
import { debounce } from '@/gis/utils';
import { MapEvent } from '@/gis/mapboxgl/typings';

const LayerList = (props: { position: TWidgetPosition }) => {
  const [keys, setkeys] = useState<string[]>([]);
  const { map } = useMap();
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
        nodeData = {
          title: layer.options.name,
          key: layer.options.id,
          selectable: false,
        };
      }
      if (nodeData) {
        treeData.push(nodeData);
      }
      if (layer.options.isAdd && layer.options.type !== 'logicGroup') {
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
    const mapLayerChangedHandle = debounce(() => {
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
      position={props.position}
      icon={ControlICONS.LayerList}
      width={180}
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
