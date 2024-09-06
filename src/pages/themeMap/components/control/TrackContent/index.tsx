import FlexibleContent from '@/gis/widgets/FlexibleContent';
import { TWidgetPosition } from '@/gis/widgets/BaseWidget';
import React, { memo, useState } from 'react';
import { AimOutlined } from '@ant-design/icons';
import type { ReactElement } from 'react';
import { Button } from 'antd';
import LineMap from './LineMap';
import { lineGeo } from './assets/line';

const TrackContent = (props: { position: TWidgetPosition; content?: ReactElement }) => {
  const { position, content } = props;
  const [show, setShow] = useState(false);

  return (
    <div>
      <Button icon={<AimOutlined />} onClick={() => setShow(true)} style={{ ...position, position: 'absolute' }}>
        轨迹回放
      </Button>
      {show && (
        <FlexibleContent isOpenHandle={() => setShow(false)}>
          <LineMap trackSource={lineGeo}></LineMap>
        </FlexibleContent>
      )}
    </div>
  );
};
export default memo(TrackContent);
