import type { TWidgetPosition } from '@/gis/widget/BaseWidget';
import { cloneElement, memo, useState } from 'react';
import { PieChartOutlined } from '@ant-design/icons';
import type { ReactElement } from 'react';
import styles from './index.module.less';
import { Button, Drawer } from 'antd';

const StatisticControl = (props: { position: TWidgetPosition; content: ReactElement }) => {
  const { position, content } = props;
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className={styles.control} style={position}>
        <Button icon={<PieChartOutlined />} onClick={() => setOpen(true)}>
          空间统计
        </Button>
      </div>
      <Drawer
        title="空间统计"
        mask={false}
        placement="right"
        closable
        destroyOnClose
        onClose={() => setOpen(false)}
        open={open}
        width="auto"
      >
        {content && cloneElement(content)}
      </Drawer>
    </>
  );
};
export default memo(StatisticControl);
