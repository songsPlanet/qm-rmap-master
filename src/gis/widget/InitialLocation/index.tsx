import BaseWidget, { ControlICONS, TWidgetPosition } from '../BaseWidget';
import { useMap } from '@/gis/context/mapContext';
import { memo } from 'react';
import './index.less';

const Location = (props: { position: TWidgetPosition }) => {
  const { map } = useMap();

  const onOpenHandle = () => {
    map?.zoomHome();
    map?.clearDotIcon();
    map?.clearSelect();
  };

  return (
    <BaseWidget name="初始位置" position={{ ...props.position }} icon={ControlICONS.Initial} openHandle={onOpenHandle}>
      <div />
    </BaseWidget>
  );
};

export default memo(Location);
