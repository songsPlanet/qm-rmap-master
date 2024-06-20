import { TWidgetPosition } from '@/gis/widget/BaseWidget';
import { memo, useState, useRef, useEffect } from 'react';
import { getFeatureBoundingBox } from '@/gis/utils';
import { AimOutlined } from '@ant-design/icons';
import styles from './index.module.less';
import { MapUtil } from '@/gis/widget/Canvas/MapUtil';
import axios from '@/utils/axios';
import { Button } from 'antd';

const CanvasToMap = (props: { position: TWidgetPosition }) => {
  const mapUtil = useRef<any>(null);

  const getGeoData = async () => {
    // const url = 'http://localhost:9999/src/pages/themeMap/components/control/MapToCanvas/aseest/Line.geojson';
    const url = 'http://localhost:9999/src/gis/assets/Line.geojson';
    const rData = await axios.get(url).then((ctx: any) => {
      return ctx;
    });
    if (rData) {
      return rData;
    }
  };

  const btnClickHandle = () => {
    mapUtil.current.addCanvasLayer();
  };

  useEffect(() => {
    getGeoData().then((res: any) => {
      const bounds = getFeatureBoundingBox(res.features[0]);
      const extent = bounds.toArray().flat();
      mapUtil.current = new MapUtil(res, extent);
      mapUtil.current.getBaseLayer();
    });
  }, []);

  return (
    <Button style={props.position} className={styles.btn} icon={<AimOutlined />} onClick={btnClickHandle}>
      导出轨迹
    </Button>
  );
};
export default memo(CanvasToMap);
