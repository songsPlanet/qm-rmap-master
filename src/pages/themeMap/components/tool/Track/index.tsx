import type { TWidgetPosition } from '@/lib/widget/BaseWidget';
import { PlayCircleOutlined } from '@ant-design/icons';
import { cloneElement, memo, useState } from 'react';
import type { ReactElement } from 'react';
import { Button } from 'antd';

const TrackControl = (props: { position: TWidgetPosition; content: ReactElement }) => {
  const { position, content } = props;
  const [show, setShow] = useState(false);

  return (
    <>
      <Button
        style={{ ...position, position: 'absolute' }}
        icon={<PlayCircleOutlined />}
        onClick={() => setShow(!show)}
      >
        轨迹回放
      </Button>
      {show && content && cloneElement(content, { isPopOpenHandle: () => setShow(false) })}
    </>
  );
};
export default memo(TrackControl);
