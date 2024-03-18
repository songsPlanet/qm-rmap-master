import BaseWidget, { ControlICONS, TWidgetPosition } from '../BaseWidget';
import { PolylineMeasure } from '@/gis/mapboxgl/graphic/PolylineMeasure';
import { PolygonMeasure } from '@/gis/mapboxgl/graphic/PolygonMeasure';
import { useMap } from '@/gis/context/mapContext';
import { Space, Button } from 'antd';
import { memo } from 'react';
import './index.less';

const Measure = (props: { position: TWidgetPosition }) => {
  const { map } = useMap();

  const polylineMeasureHandle = () => {
    if (map !== null) {
      let polylineMeasure = new PolylineMeasure(map);
      polylineMeasure.start();
    }
  };
  const polygonMeasureHandle = () => {
    if (map !== null) {
      let polygonMeasure = new PolygonMeasure(map);
      polygonMeasure.start();
    }
  };

  return (
    <BaseWidget name="测量工具" position={{ ...props.position }} icon={ControlICONS.Measure} width={130} height={110}>
      <div className="main">
        <Space direction="vertical">
          <Button onClick={() => polylineMeasureHandle()} block>
            测量距离
          </Button>
          <Button onClick={() => polygonMeasureHandle()} block>
            测量面积
          </Button>
        </Space>
      </div>
    </BaseWidget>
  );
};

export default memo(Measure);
