import { TWidgetPosition } from '@/gis/widget/BaseWidget';
import { UserOutlined } from '@ant-design/icons';
import { memo, useState } from 'react';
import styles from './index.module.less';
import SearchPanel from './SearchContent';
import { Button } from 'antd';
import { ReactElement } from 'react';
const SearchControl = (props: { position: TWidgetPosition; content: ReactElement }) => {
  const { position, content } = props;
  const [show, setShow] = useState(false);
  return (
    <>
      <Button style={position} className={styles.btn} icon={<UserOutlined />} onClick={() => setShow(!show)}>
        人员搜索
      </Button>
      {show && content && <SearchPanel />}
    </>
  );
};
export default memo(SearchControl);
