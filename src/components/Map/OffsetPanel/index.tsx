// https://docs.mapbox.com/mapbox-gl-js/example/offset-vanishing-point-with-padding/

import { cloneElement, memo, useState } from 'react';
import { useMap } from '@/lib/context/mapContext';
import type { ReactElement } from 'react';
import './index.less';

interface TPanelOptions {
  content: ReactElement;
}

const OffsetPanel = (props: TPanelOptions) => {
  const { content } = props;
  const { map } = useMap();
  const [open, setOpen] = useState(false);

  const toggleSidebar = (id: string) => {
    setOpen(!open);
    const elem = document.getElementById(id);
    const collapsed = elem?.classList.toggle('collapsed');
    const padding: any = {};
    padding[id] = collapsed ? 0 : 300;
    map?.easeTo({
      padding: padding,
      duration: 1000, // 毫秒为单位
    });
  };

  return (
    <div id="left" className="sidebar flex-center left collapsed">
      <div className="sidebar-content rounded-rect flex-center">
        {content && cloneElement(content)}
        <div className="sidebar-toggle rounded-rect left" onClick={() => toggleSidebar('left')}>
          &rarr;
        </div>
      </div>
    </div>
  );
};
export default memo(OffsetPanel);
