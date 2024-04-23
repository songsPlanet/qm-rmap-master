import React, { useState, useEffect, useRef, memo } from 'react';
import classes from './index.module.less';
import LineMap from '@/pages/components/LineMap';

let defaultXY = {
  x: 0,
  y: 0,
};
let divOffset = {
  l: 0,
  t: 0,
};

const TrackPopover = (props: { isPopOpenHandle?: any }) => {
  const { isPopOpenHandle } = props;
  const [container, setContainer] = useState(undefined as any);
  const popoverRef = useRef<HTMLDivElement>(null);

  const mousemove = (e: any) => {
    // 判断鼠标是否按住
    if (container) {
      // 获取x和y
      let nx = e.clientX;
      let ny = e.clientY;
      let nl = nx - (defaultXY.x - divOffset.l);
      let nt = ny - (defaultXY.y - divOffset.t);

      container.style.left = nl + 'px';
      container.style.top = nt + 'px';
    }
  };

  const mousedown = (e: any) => {
    e.preventDefault(); // 阻止事件默认行为
    defaultXY = {
      x: e.clientX,
      y: e.clientY,
    };
    divOffset = {
      l: container.offsetLeft,
      t: container.offsetTop,
    };
    window.addEventListener('mousemove', mousemove);
  };

  const mouseup = () => {
    window.removeEventListener('mousemove', mousemove);
  };

  useEffect(() => {
    setContainer(popoverRef.current);
  }, []);

  return (
    <div ref={popoverRef} id="TrackPopover" className={classes.trackPopover}>
      <div className={classes.titlePop} onMouseDown={(e) => mousedown(e)} onMouseUp={(e) => mouseup()}>
        <div className={classes.text}>轨迹回放</div>
        <div
          className={classes.close}
          onClick={() => {
            isPopOpenHandle();
          }}
        >
          x
        </div>
      </div>
      <div className={classes.container}>
        <LineMap detailSource={{}} />
      </div>
    </div>
  );
};
export default memo(TrackPopover);
