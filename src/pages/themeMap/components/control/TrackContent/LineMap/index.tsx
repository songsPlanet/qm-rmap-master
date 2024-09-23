import { PlayCircleOutlined, PauseOutlined, RedoOutlined } from '@ant-design/icons';
// import AnimationRoute from '@/gis/animation/AnimationRoute';
import { AnimationRoute, MapWrapper } from 'qm-map-wrapper';
import { basemap } from '@/pages/themeMap/mapSetting/basemap';
import React, { memo, useEffect, useRef } from 'react';
// import MapWrapper from '@/gis/wrapper/MapWrapper';
import type { LngLatBoundsLike } from 'mapbox-gl';
import MapWidget from '@/gis/widgets/MapWidget';
import classes from './index.module.less';
import { Button, Space } from 'antd';

const mapOptions = {
  id: 'trackMap',
  container: '',
  minZoom: 0,
  bounds: [
    [115.241236, 33.006001],
    [115.528891, 33.524924],
  ] as LngLatBoundsLike,
};

function LineMap(props: { trackSource: any }) {
  const { trackSource } = props;
  const animationRoute = useRef<any>();

  const pauseClickHandle = () => {
    animationRoute.current.pause();
  };

  const replayClickHandle = () => {
    animationRoute.current.replay();
  };

  const playClickHandle = () => {
    animationRoute.current.play();
  };

  const onMapLoadedHandle = (map: MapWrapper) => {
    map.images.push();
    animationRoute.current = new AnimationRoute(map, trackSource);
  };

  useEffect(() => {
    return () => {
      animationRoute.current.destory();
    };
  }, []);

  return (
    <div style={{ width: '100%', height: '100%' }} className={classes.trackContainer}>
      <div className={classes.buttonBar}>
        <Space.Compact block>
          <Button size="small" icon={<PlayCircleOutlined />} onClick={playClickHandle} />
          <Button size="small" icon={<PauseOutlined />} onClick={pauseClickHandle} />
          <Button size="small" icon={<RedoOutlined />} onClick={replayClickHandle} />
        </Space.Compact>
      </div>
      <MapWidget
        mapOptions={mapOptions}
        mapLayerSettting={[basemap]}
        onMapLoad={(map: MapWrapper) => onMapLoadedHandle(map)}
      />
    </div>
  );
}
export default memo(LineMap);
