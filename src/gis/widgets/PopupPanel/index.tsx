import React, { cloneElement, memo, useEffect, useState } from 'react';
import { useMap } from '../context/mapContext';
import { MapWrapper } from 'qm-map-wrapper';
import type { LngLatLike } from 'mapbox-gl';
import PopupWrapper from '../PopupWrapper';
import type { ReactElement } from 'react';
import { Point } from 'mapbox-gl';
import axios from 'axios';
import './index.less';

interface TPouperData {
  properties: any;
  lngLat: LngLatLike;
  title: string;
  template: ReactElement;
}

interface TPopupPanel {
  ifCenter?: boolean;
  vector: { id: string; title: string; template: ReactElement }[];
  wms?: { baseUrl: string; layers: { id: string; title: string; template: ReactElement; layerName: string }[] };
}

const PopupPanel = (props: TPopupPanel) => {
  const { vector, wms, ifCenter } = props;
  const { map } = useMap();
  const [popupData, setPopupData] = useState<TPouperData | undefined>();

  const onCloseHandle = () => {
    map?.clearSelect();
    setPopupData(undefined);
  };
  useEffect(() => {
    // 矢量图层添加交互效果
    vector?.forEach((d) => {
      map?.on('mouseenter', d.id, () => {
        map.getCanvas().style.cursor = 'pointer';
      });
      map?.on('mouseleave', d.id, () => {
        map.getCanvas().style.cursor = '';
      });
    });

    const vectorLayerClicked = (map: MapWrapper, e: mapboxgl.MapMouseEvent & mapboxgl.EventData) => {
      if (vector) {
        const ids = vector
          .filter((d) => {
            const flag = map?.getLayerList().find((f) => f.options.id === d.id && f.options.isAdd);
            return flag;
          })
          .map((d) => d.id);
        const scale = (window as any).scale ?? 1;
        const points = new Point(e.point.x / scale, e.point.y / scale);
        const features = map.queryRenderedFeatures(points, { layers: ids });
        if (features.length) {
          const feature = features[0];
          const title = vector.find((d) => feature.layer.id === d.id)!.title;
          const template = vector.find((d) => feature.layer.id === d.id)!.template;
          map.selectFeature(feature);
          setPopupData({
            properties: feature.properties,
            lngLat: ifCenter ? map.getCenter() : map.unproject(new Point(e.point.x / scale, e.point.y / scale)),
            title,
            template,
          });
        }
      }
    };

    // geoserver请求
    const restLayerClicked = async (map: MapWrapper, e: mapboxgl.MapMouseEvent & mapboxgl.EventData) => {
      if (wms) {
        const scale = (window as any).scale ?? 1;
        const url = wms.baseUrl;
        const params: any = {
          service: 'WFS',
          version: '1.0.0',
          request: 'GetFeature',
          maxFeatures: 50,
          outputFormat: 'application/json',
          CQL_FILTER: `INTERSECTS(the_geom,Point(${e.lngLat.lng / scale} ${e.lngLat.lat / scale}))`,
        };
        const queryString = new URLSearchParams(Object.entries(params)).toString();
        const lyrIds = map
          .getLayerList()
          .filter((d) => d.options.isAdd)
          .map((l) => l.options.id);
        const openLys = wms!.layers.filter((d) => lyrIds.findIndex((f) => f === d.id) > -1);
        for (let i = 0; i < openLys.length; i++) {
          const requestUrl = `${url}?${queryString}&typeName=${openLys[i].layerName}`;
          const rData = await axios.get(requestUrl).then((ctx: any) => {
            const temp = ctx.data || {};
            const flag = temp?.features?.length > 0;
            if (flag) {
              return { layerId: openLys[i].id, data: temp.features[0], lngLat: e.lngLat };
            } else {
              return undefined;
            }
          });
          if (rData) {
            return rData;
          }
        }
      }
      return undefined;
    };

    // 添加事件监听
    map?.on('click', async (e: any) => {
      // 获取添加到地图上的rest服务图层
      const rData = await restLayerClicked(map, e);
      if (!rData) {
        vectorLayerClicked(map, e);
      } else {
        const feature = rData.data;
        const layerId = rData.layerId;
        const title = wms!.layers.find((d) => layerId === d.id)!.title;
        const template = wms!.layers.find((d) => layerId === d.id)!.template;
        map.selectFeature(feature);
        setPopupData({
          properties: feature.properties,
          lngLat: ifCenter ? map.getCenter() : rData.lngLat,
          title,
          template,
        });
      }
    });
  }, []);

  return (
    <div className={'popupMaskContainer'} id="popup-mask-container">
      <div>
        {popupData && map ? (
          <PopupWrapper
            map={map}
            ifCenter={ifCenter}
            title={popupData.title}
            lngLat={popupData.lngLat}
            closeOnClick={false}
            onClose={() => onCloseHandle()}
          >
            {popupData.template && cloneElement(popupData.template, { data: popupData.properties })}
          </PopupWrapper>
        ) : null}
      </div>
    </div>
  );
};
export default memo(PopupPanel);
