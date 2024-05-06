import BaseWidget, { ControlICONS, TWidgetPosition } from '../BaseWidget';
import { mapOptions, useMap } from '@/gis/context/mapContext';
import { memo } from 'react';
import './index.less';

const Location = (props: { position: TWidgetPosition }) => {
  const { map } = useMap();

  const onOpenHandle = () => {
    const { center, zoom } = mapOptions;
    map?.flyTo({
      duration: 2000,
      center,
      zoom,
    });
  };

  return (
    <BaseWidget name="初始位置" position={{ ...props.position }} icon={ControlICONS.Initial} openHandle={onOpenHandle}>
      <div />
    </BaseWidget>
  );
};

export default memo(Location);
