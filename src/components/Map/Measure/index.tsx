import  PolygonMeasure  from '@/gis/graphic/PolygonMeasure';
import PolylineMeasure  from '@/gis/graphic/PolylineMeasure';
import type { TWidgetPosition } from '../../../gis/widgets/BaseWidget';
import { useMap } from '../../../gis/widgets/context/mapContext';
import BaseWidget from '../../../gis/widgets/BaseWidget';
import { Space, Button } from 'antd';
import { memo } from 'react';
import './index.less';

const MeasureIcon =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAQZJREFUWEftlrENAjEMRd+NQMkKdAh6YAHGoKCnBnpaCuZgAGAAJBoYgJYhQI4SKeSCThROUuSak/7l7O+fb8sNmZ8mc34qgaIUOFk/XICNkjck7sTGnsnbV+BtP2yVCaxtHpM7RkCp+FbYcgmclSWYdl1BNg/4ztfsAjG73L/JUdQcUL76eHhfAWeOVESM2YucA9nbUNuYbuT/nISVQKjACHgCL689pGNCr4RYH+gBj6Ct/rqCAXAHjsDcBnLYDlhZ7AAsgCFws9geWAJj4OqR+IuAVCWLilRrFggghskZweWMUyaGyf+VQKcCqUZxaw64pTQVgdZSmirxVx7tqddZVCWQXYEP/oRLIWGFgyoAAAAASUVORK5CYII=';

const Measure = (props: { position: TWidgetPosition; icon?: string }) => {
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
    <BaseWidget
      name="测量工具"
      width={130}
      height={110}
      position={{ ...props.position }}
      icon={props.icon?props.icon:MeasureIcon}
    >
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
