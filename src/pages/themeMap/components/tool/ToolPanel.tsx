import type { ReactElement } from 'react';
import { memo, useMemo, useEffect } from 'react';
import Search from './Search';
import TrackControl from './Track';
import OffsetPanel from '@/components/Map/OffsetPanel';
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
  const { searchContent, statisticContent, trackContent, offsetContent } = props;
  return (
    <div>
      <CanvasToMap position={{ top: 10, right: 410 }} />
      {offsetContent && <OffsetPanel content={offsetContent} />}
      {searchContent && <Search position={{ top: 10, right: 50 }} content={searchContent} />}
      {trackContent && <TrackControl position={{ top: 10, right: 290 }} content={trackContent} />}
    </div>
  );
};
export default memo(ToolPanel);
