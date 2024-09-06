import React, { useState, useEffect, useRef, memo } from 'react';
import './index.less';

let defaultXY = {
  x: 0,
  y: 0,
};
let divOffset = {
  l: 0,
  t: 0,
};

type TFlexibleContent = {
  title?: string;
  contentStyle?: any;
  children?: React.ReactNode;
  isOpenHandle?: () => void;
};

const FlexibleContent = (props: TFlexibleContent) => {
  const { isOpenHandle, children, title, contentStyle } = props;
  const popoverRef = useRef<HTMLDivElement>(null);
  const [container, setContainer] = useState(undefined as any);

  const onclickHandle = () => {
    isOpenHandle?.()
  };

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
      l: container?.offsetLeft,
      t: container?.offsetTop,
    };
    window.addEventListener('mousemove', mousemove);
  };

  const mouseup = () => {
    window.removeEventListener('mousemove', mousemove);
  };

  useEffect(() => {
    setContainer(popoverRef.current);
    return () => {
      window.removeEventListener('mousemove', mousemove);
    };
  }, []);

  return (
    <div ref={popoverRef} id="flexibleContent" className="flexibleContent">
      <div className="titlePop" style={contentStyle} onMouseDown={(e) => mousedown(e)} onMouseUp={(e) => mouseup()}>
        <div className="text">{title ?? ''}</div>
        <div className="close" onClick={onclickHandle}>
          x
        </div>
      </div>
      <div className="container">{children}</div>
    </div>
  );
};
export default memo(FlexibleContent);
