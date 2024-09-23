import { TWidgetPosition } from '@/gis/widgets/BaseWidget';
import { AimOutlined } from '@ant-design/icons';
import React, { memo } from 'react';
import { Button } from 'antd';

type TToolWidget = {
  title: string;
  position: TWidgetPosition;
  children: React.ReactNode;
  openHandle: (value: any) => void;
};

const ToolWidget = (props: TToolWidget) => {
  const { position,  children, title, openHandle } = props;

  const onClickHandle = () => {
    openHandle(true);
  };

  return (
    <div>
      <Button icon={<AimOutlined />} onClick={onClickHandle} style={{ ...position, position: 'absolute' }}>
        {title}
      </Button>
      { children}
    </div>
  );
};
export default memo(ToolWidget);
