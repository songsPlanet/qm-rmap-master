import type { TWidgetPosition } from '@/components/Map/BaseWidget';
import { UserOutlined } from '@ant-design/icons';
import { cloneElement, memo, useState } from 'react';
import type { ReactElement } from 'react';
import { Button } from 'antd';

const SearchControl = (props: { position: TWidgetPosition; content: ReactElement }) => {
  const { position, content } = props;
  const [show, setShow] = useState(false);

  return (
    <>
      <Button style={{ ...position, position: 'absolute' }} icon={<UserOutlined />} onClick={() => setShow(!show)}>
        人员搜索
      </Button>
      {show && content && cloneElement(content)}
    </>
  );
};
export default memo(SearchControl);
