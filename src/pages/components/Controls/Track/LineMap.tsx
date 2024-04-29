import React, { memo, useEffect, useRef } from 'react';
import { PlayCircleOutlined, PauseOutlined, RedoOutlined } from '@ant-design/icons';
import { GeoJSONSource, LngLatBoundsLike } from 'mapbox-gl';
import MapWrapper from '@/gis/mapboxgl/MapWrapper';
import MapWidget from '@/gis/widget/MapWidget';
import trackIcon from './assets/trackIcon.png';
import classes from './index.module.less';
import { Button, Space, Spin } from 'antd';
import { basemap } from '@/pages/mapSetting/basemap';

const mapOptions = {
  id: 'trackMap',
  container: '',
  minZoom: 0,
  bounds: [
    [115.241236, 33.006001],
    [115.528891, 33.524924],
  ] as LngLatBoundsLike,
};

let times: any = []; // 定时器标识集合
let pauseIndex = 0; // 当前geometry下标
let map: MapWrapper;

function MapContainer(props: { trackSource: any }) {
  const { trackSource } = props;

  const geojson: any = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: [],
        },
      },
    ],
  };

  let pointGeojson: any = {
    type: 'FeatureCollection',
    features: [],
  };

  const resetData = () => {
    pauseIndex = 0;
    geojson.features[0].geometry.coordinates = [];
  };

  const resetTime = () => {
    for (let i = 0; i < times.length; i++) {
      clearTimeout(times[i]);
    }
  };

  const getIndex = () => {
    if (pointGeojson.features.length !== 0) {
      pauseIndex = trackSource.features[0].geometry.coordinates.findIndex((value: any) => {
        return value[0] === pointGeojson.features[0].id;
      });
    }
  };

  const animateLine = (index: number) => {
    const coords = trackSource.features[0].geometry.coordinates;
    if (index === coords.length) {
      resetData();
    }

    for (let i = index; i < coords.length; i++) {
      let task: any = null;
      (function (t: number, data: any) {
        task = setTimeout(() => {
          geojson.features[0].geometry.coordinates.push(data);
          pointGeojson = {
            type: 'FeatureCollection',
            features: [
              {
                id: data[0],
                type: 'Feature',
                // properties: data.properties,
                geometry: {
                  type: 'Point',
                  coordinates: data,
                },
              },
            ],
          };
          if (map) {
            (map.getSource('line-animate') as GeoJSONSource).setData(geojson);
            (map.getSource('point') as GeoJSONSource).setData(pointGeojson);
          }
        }, 100 * t);
      })(i, coords[i]);

      times.push(task);
    }
  };

  const pauseClickHandle = () => {
    getIndex();
    resetTime();
  };

  const replayClickHandle = () => {
    resetData();
    resetTime();
    animateLine(pauseIndex);
  };

  const playClickHandle = () => {
    getIndex();
    animateLine(pauseIndex);
  };

  const addLine = () => {
    // 静态线
    map.addSource('line', {
      type: 'geojson',
      data: trackSource,
    });
    map.addLayer({
      id: 'line',
      type: 'line',
      source: 'line',
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-color': 'blue',
        'line-width': 3,
        'line-opacity': 0.5,
      },
    });
    map.locationFeatureByBounds(trackSource);
  };

  const onMapLoadedHandle = (mapWrapper: MapWrapper) => {
    map = mapWrapper;
    // 静态轨迹
    addLine();

    // 动态点
    map.addSource('point', {
      type: 'geojson',
      data: pointGeojson,
    });
    map.addLayer({
      id: 'point-animation',
      type: 'symbol',
      source: 'point',
      layout: {
        'icon-image': 'trackIcon',
        'icon-size': 1,
        'icon-rotation-alignment': 'map',
        'icon-allow-overlap': true,
        'icon-offset': [0, -10],
      },
    });
    // 动态线

    map.addSource('line-animate', {
      type: 'geojson',
      data: geojson,
    });

    map.addLayer({
      id: 'line-animation',
      type: 'line',
      source: 'line-animate',
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-color': 'orange',
        'line-width': 3,
        'line-opacity': 1,
      },
    });

    map.loadImage(trackIcon, (error: any, image: any) => {
      if (!error) {
        if (!map.hasImage('trackIcon')) map.addImage('trackIcon', image);
      }
    });
  };

  useEffect(() => {
    return () => {
      resetTime();
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
      {trackSource ? (
        <MapWidget
          mapOptions={mapOptions}
          mapLayerSettting={[basemap]}
          onMapLoad={(map: MapWrapper) => onMapLoadedHandle(map)}
        />
      ) : (
        <Spin />
      )}
    </div>
  );
}
export default memo(MapContainer);
