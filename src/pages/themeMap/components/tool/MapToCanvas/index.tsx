import type { TWidgetPosition } from '@/gis/widget/BaseWidget';
import { getFeatureBoundingBox } from '@/gis/utils';
import { queryTrackLineResult } from '@/api/map';
import { memo, useRef, useEffect } from 'react';
import { AimOutlined } from '@ant-design/icons';
import { MapUtil } from 'qm-map-canvas';
import { Button } from 'antd';

const key = '7271c460eedd19a02b7b7bb1b19ba7ac';
const tdtUrl =
  'http://t2.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=' +
  key;

const CanvasToMap = (props: { position: TWidgetPosition }) => {
  const { position } = props;
  const mapUtil = useRef<any>(null);

  const btnClickHandle = () => {
    mapUtil.current.addLineCanvasLayer();
  };

  useEffect(() => {
    queryTrackLineResult().then((res: any) => {
      const bounds = getFeatureBoundingBox(res.data.features[0]);
      const boundsArray = bounds.toArray().flat();
      mapUtil.current = new MapUtil({ mapData: res.data, mapBaseUrl: tdtUrl, mapDataExtent: boundsArray });
      mapUtil.current.getBaseLayer();
    });
  }, []);

  return (
    <Button style={{ ...position, position: 'absolute' }} icon={<AimOutlined />} onClick={btnClickHandle}>
      导出轨迹
    </Button>
  );
};
export default memo(CanvasToMap);
