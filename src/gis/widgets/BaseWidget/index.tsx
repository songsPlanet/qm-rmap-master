import type { ReactNode } from 'react';
import { useState, memo } from 'react';
import './index.less';

export interface TWidgetPosition {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
}

export interface TWidgetOptions {
  position: TWidgetPosition;
  children: ReactNode;
  name?: string;
  icon: string;
  width?: number;
  height?: number;
  openHandle?: (value: boolean) => void;
}


const BaseWidget = (props: TWidgetOptions) => {
  const { position, children, name, icon, width, height, openHandle } = props;
  const [open, setOpen] = useState(false);
  const controlStyle = { width: open ? width ?? 30 : 30, height: open ? height ?? 30 : 30, ...position };

  const onClickHandle = () => {
    if (openHandle) {
      openHandle(true);
      setOpen(!open);
    } else {
      setOpen(!open);
    }
  };

  return (
    <div className="mapboxgl-control" style={controlStyle}>
      <div className="mapboxgl-bar">
        <div
          className="mapboxgl-bar-button"
          onClick={onClickHandle}
          title={name ?? ''}
          style={{ backgroundImage: `url(${icon})` }}
        />
        {name && <div className="mapboxgl-bar-title">{name}</div>}
      </div>
      {open && children}
    </div>
  );
};
export default memo(BaseWidget);
