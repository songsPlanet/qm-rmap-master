import { memo, useState } from 'react';
import classes from './index.module.less';
import Measure from '@/gis/widget/ToolBar/Measure';
import Track from './Track';
import trackIcon from '@/assets/tools/trackIcon.png';
import measureIcon from '@/assets/tools/measureIcon.png';
import { Space } from 'antd';

const items = [
  { id: 'Track', icon: trackIcon, title: '轨迹回放' },
  {
    id: 'Measure',
    icon: measureIcon,
    title: '测量工具',
  },
];

const ToolBar = () => {
  const [open, setOpen] = useState(false);
  const [item, setitem] = useState(undefined as any);
  const [openPop, setOpenPop] = useState(false);
  const itemClickHandle = (item: any) => {
    setitem(item);
    if (item.id === 'Measure') {
      setOpen(!open);
    }
    setOpenPop(true);
  };

  let itemList = items.map((d, index) => {
    return (
      <div className={classes.item} key={index} onClick={() => itemClickHandle(d)}>
        {/* <img style={{ width: '18px', height: '18px', marginRight: '4px' }} src={d.icon} /> */}
        <span>{d.title}</span>
        {/* {index !== items.length - 1 && <div className={classes.line} />} */}
      </div>
    );
  });

  return (
    <>
      <div className={classes.container} style={{ top: 10, right: 10 }}>
        {/* <div className={classes.bar}> */}

        <Space>{itemList}</Space>
        {/* </div> */}
      </div>
      <div className={classes.panel}>{open && item?.id === 'Measure' && <Measure />}</div>
      <div className={classes.paneTransparent}>
        {openPop && item?.id === 'Track' && <Track isPopOpenHandle={() => setOpenPop(false)} />}
      </div>
    </>
  );
};

export default memo(ToolBar);
