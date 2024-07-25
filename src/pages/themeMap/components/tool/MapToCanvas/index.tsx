import { TWidgetPosition } from '@/gis/widget/BaseWidget';
import { MapUtil } from '@/gis/widget/Canvas/MapUtil';
import { getFeatureBoundingBox } from '@/gis/utils';
import { queryTrackLineResult } from '@/api/map';
import { memo, useRef, useEffect } from 'react';
import { AimOutlined } from '@ant-design/icons';
import { Button } from 'antd';

const CanvasToMap = (props: { position: TWidgetPosition }) => {
  const { position } = props;
  const mapUtil = useRef<any>(null);

  const btnClickHandle = () => {
    mapUtil.current.addCanvasLayer();
  };

  useEffect(() => {
    queryTrackLineResult().then((res: any) => {
      const bounds = getFeatureBoundingBox(res.data.features[0]);
      const extent = bounds.toArray().flat();
      mapUtil.current = new MapUtil(res.data, extent);
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
