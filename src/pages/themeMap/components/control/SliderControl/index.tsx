import { TWidgetPosition } from '@/gis/widget/BaseWidget';
import { PlayCircleOutlined } from '@ant-design/icons';
import { memo, useState } from 'react';
import styles from './index.module.less';
import TimeSliderContent from './TimeSliderContent';
import { ReactElement } from 'react';
import { Button } from 'antd';

const TrackControl = (props: { position: TWidgetPosition; content: ReactElement }) => {
  const { position, content } = props;
  const [show, setShow] = useState(false);

  return (
    <>
      <Button style={position} className={styles.btn} icon={<PlayCircleOutlined />} onClick={() => setShow(!show)}>
        时间轴
      </Button>
      {show && content && <TimeSliderContent />}
    </>
  );
};
export default memo(TrackControl);
