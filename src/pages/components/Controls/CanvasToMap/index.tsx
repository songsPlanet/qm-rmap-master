import { TWidgetPosition } from '@/gis/widget/BaseWidget';
import { memo, useState, useRef, useEffect } from 'react';
import { getFeatureBoundingBox } from '@/gis/utils';
import { AimOutlined } from '@ant-design/icons';
import styles from './index.module.less';
import { MapUtil } from './mapUtil';
import axios from '@/utils/axios';
import { Button } from 'antd';

const CanvasToMap = (props: { position: TWidgetPosition }) => {
  const { position } = props;
  const [show, setShow] = useState(false);
  const mapUtil = useRef<any>(null);

  const modalOpenHandle = () => {
    setShow(!show);
  };

  const getGeoData = async () => {
    const url = 'http://localhost:9999/src/pages/components/Controls/ExportTrack/aseest/Line.geojson';
    const rData = await axios.get(url).then((ctx: any) => {
      return ctx;
    });
    if (rData) {
      return rData;
    }
  };

  useEffect(() => {
    getGeoData().then((res: any) => {
      const bounds = getFeatureBoundingBox(res.features[0]);
      const extent = bounds.toArray().flat();
      mapUtil.current = new MapUtil(res, extent);
      mapUtil.current.getBaseLayer();
    });
  }, []);

  useEffect(() => {
    // 获取要绘制的数据
    if (show) {
      mapUtil.current.addCanvasLayer();
    }
  }, [show]);

  return (
    <Button style={position} className={styles.btn} icon={<AimOutlined />} onClick={modalOpenHandle}>
      canvas绘制
    </Button>
  );
};
export default memo(CanvasToMap);
