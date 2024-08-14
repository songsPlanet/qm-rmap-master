import { Slider } from 'antd';
import { useEffect } from 'react';
// import { useMap } from '@/gis/context/mapContext';
import styles from './index.module.less';

const sliderLayers = [
  { key: 0, title: '2015', value: 'img-201605m' },
  { key: 1, title: '2016', value: 'img-201605m' },
  { key: 2, title: '2017', value: 'img-201708m' },
  { key: 3, title: '2018', value: 'img-201808M' },
  { key: 4, title: '2019', value: 'img-201908M' },
  { key: 5, title: '2020', value: 'img-WH_2020_08M_03' },
  { key: 6, title: '2021', value: 'img-WH_2021_08M_01' },
  { key: 7, title: '2022', value: 'img-WH_2022_08M_01' },
  { key: 8, title: '2022', value: 'img-WH_2022_08M_01' },
  { key: 9, title: '2022', value: 'img-WH_2022_08M_01' },
  { key: 10, title: '2022', value: 'img-WH_2022_08M_01' },
];
// let lastItem: any;

const TimeSliderContent = () => {
  // const { map } = useMap();
  const marks: any = {};
  sliderLayers.forEach((d) => {
    marks[d.key] = d.title;
  });
  const onChangedHandler = (v) => {
    // let currentItem = sliderLayers.find((d) => d.key === value);
    // let lyrItem: any;
    // if (lastItem) {
    //   //移除上一个
    //   lyrItem = map?.layers.find((d: any) => d.id === lastItem.value);
    //   map?.removeLayerWrapper(lyrItem);
    // }
    // //添加
    // lyrItem = map?.layers.find((d: any) => d.id === currentItem?.value);
    // map?.addLayerWrapper(lyrItem);
    // //记录最近Item
    // lastItem = currentItem;
  };
  useEffect(() => {
    // 移除所有的影像数据
    // let imglist = map?.layers.filter((d: any) => d.id.startsWith('img') && d.type !== 'logicGroup');
    // imglist?.forEach((d: any) => {
    //   map?.removeLayerWrapper(d);
    // });
    // //添加第一个imglayer
    // let firstLyrItem = map?.layers.find((d: any) => d.id === sliderLayers[0].value);
    // if (firstLyrItem) {
    //   let layer = map?.addLayerWrapper(firstLyrItem);
    //   //记录最近Item
    //   lastItem = sliderLayers[0];
    // }
    // window.addEventListener('toolClosedEvent', (event: any) => {
    //   let { detail } = event;
    //   if (detail.id === 'TimeSlider') {
    //     //移除所有的影像数据
    //     imglist?.forEach((d: any) => {
    //       map?.removeLayerWrapper(d);
    //     });
    //   }
    // });
  }, []);

  return (
    <div className={styles.container}>
      <Slider
        marks={marks}
        step={1}
        max={8}
        onChange={(value: any) => onChangedHandler(value)}
        className={styles.slider}
      />
    </div>
  );
};

export default TimeSliderContent;
