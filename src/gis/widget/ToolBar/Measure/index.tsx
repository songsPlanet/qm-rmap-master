import { PolygonMeasure } from '@/gis/mapboxgl/graphic/PolygonMeasure';
import { PolylineMeasure } from '@/gis/mapboxgl/graphic/PolylineMeasure';
import { useMap } from '@/gis/context/mapContext';
import React, { memo } from 'react';
import './index.less';
import { message, Space, Button } from 'antd';
import type { MenuProps } from 'antd';
const Measure = () => {
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
  const onClick: MenuProps['onClick'] = ({ key }) => {
    message.info(`Click on item ${key}`);
  };
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          1st menu item
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
          2nd menu item
        </a>
      ),
    },
  ];

  return (
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
  );
};

export default memo(Measure);
