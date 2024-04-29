import { TWidgetPosition } from '@/gis/widget/BaseWidget';
import { PlayCircleOutlined } from '@ant-design/icons';
import { memo, useState } from 'react';
import styles from './index.module.less';
import TrackContent from './TrackContent';
import { Button } from 'antd';
import { ReactElement } from 'react';

const TrackControl = (props: { position: TWidgetPosition; content: ReactElement }) => {
  const { position, content } = props;
  const [show, setShow] = useState(false);

  return (
    <>
      <Button style={position} className={styles.btn} icon={<PlayCircleOutlined />} onClick={() => setShow(!show)}>
        轨迹回放
      </Button>
      {show && content && <TrackContent isPopOpenHandle={() => setShow(false)} />}
    </>
  );
};
export default memo(TrackControl);
