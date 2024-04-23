import { TWidgetPosition } from '@/gis/widget/BaseWidget';
import { AimOutlined } from '@ant-design/icons';
import { memo, useState } from 'react';
import styles from './index.module.less';
import TrackPanel from './TrackContent';
import { Button } from 'antd';
import { ReactElement } from 'react';

const TrackControl = (props: { position: TWidgetPosition; content: ReactElement }) => {
  const { position, content } = props;
  const [show, setShow] = useState(false);
  return (
    <>
      <Button style={position} className={styles.btn} icon={<AimOutlined />} onClick={() => setShow(!show)}>
        轨迹回放
      </Button>
      {show && content && <TrackPanel isPopOpenHandle={() => setShow(false)} />}
    </>
  );
};
export default memo(TrackControl);
