import { memo, useMemo, useEffect, ReactElement } from 'react';
import Search from './Search';
import StatisticControl from './StatisticControl';
import TrackControl from './Track';
import OffsetPanel from '@/gis/widget/OffsetPanel';
import RegionSearch from './RegionControl';
import CanvasToMap from './MapToCanvas';

interface TToolPanel {
  regionList?: any;
  searchContent?: ReactElement;
  statisticContent?: ReactElement;
  trackContent?: ReactElement;
  offsetContent?: ReactElement;
  timeSliderContent?: ReactElement;
}

const ToolPanel = (props: TToolPanel) => {
  const { searchContent, statisticContent, trackContent, offsetContent, regionList } = props;
  return (
    <div>
      {/* {timeSliderContent && <SliderControl position={{ top: 10, right: 530 }} content={timeSliderContent} />} */}
      <CanvasToMap position={{ top: 10, right: 410 }} />
      <RegionSearch position={{ top: 10, right: 530 }} regionList={regionList} />
      {offsetContent && <OffsetPanel content={offsetContent} />}
      {searchContent && <Search position={{ top: 10, right: 50 }} content={searchContent} />}
      {trackContent && <TrackControl position={{ top: 10, right: 290 }} content={trackContent} />}
      {statisticContent && <StatisticControl position={{ top: 10, right: 170 }} content={statisticContent} />}
    </div>
  );
};
export default memo(ToolPanel);
