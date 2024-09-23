import FlexibleContent from '@/gis/widgets/FlexibleContent';
import { TWidgetPosition } from '@/gis/widgets/BaseWidget';
import ToolWidget from '@/gis/widgets/ToolWidget';
import React, { memo, useState } from 'react';
import type { ReactElement } from 'react';
import { lineGeo } from './assets/line';
import LineMap from './LineMap';

const TrackContent = (props: { position: TWidgetPosition; content?: ReactElement }) => {
  const { position, content } = props;
  const [show, setShow] = useState(false);

  const onOpenHandle = (value: any) => {
    setShow(value);
  };

  return (
      <ToolWidget position={position} title={'轨迹回放'} openHandle={onOpenHandle}>
        {show && (
          <FlexibleContent isOpenHandle={() => setShow(false)}>
            <LineMap trackSource={lineGeo}></LineMap>
          </FlexibleContent>
        )}
      </ToolWidget>
  );
};
export default memo(TrackContent);
