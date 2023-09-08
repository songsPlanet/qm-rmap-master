import React, { memo, useEffect } from 'react';
import { PlayCircleOutlined, PauseOutlined, RedoOutlined } from '@ant-design/icons';
import { GeoJSONSource, LngLatBoundsLike } from 'mapbox-gl';
import MapWrapper from '@/gis/mapboxgl/MapWrapper';
import { getFeatureBoundingBox } from '@/gis/utils';
import MapWidget from '@/gis/widget/MapWidget';
import trackIcon from './assets/trackIcon.png';
import classes from './index.module.less';
import { Button, Space } from 'antd';
import mapSetting from './mapSetting';

interface PatrolLineProps {
  id: string;
  geometry: {
    coordinates: [longitude: number, latitude: number];
  };
  properties: {};
}

const mapOptions = {
  id: 'lineMap',
  container: '',
  minZoom: 0,
  bounds: [
    [115.241236, 33.006001],
    [115.528891, 33.524924],
  ] as LngLatBoundsLike,
};

let times: any = []; // 定时器标识集合
let index = 0; // 当前geometry下标
let map: MapWrapper;

function MapContainer(props: { detailSource: any }) {
  const { detailSource } = props;

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

  const addLine = () => {
    const lineSource: any = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: detailSource?.points?.features?.map((d: any) => [
              d.properties.longitude,
              d.properties.latitude,
            ]),
          },
        },
      ],
    };
    (map.getSource('line') as GeoJSONSource).setData(lineSource);
    let bounds = getFeatureBoundingBox(lineSource.features[0]);
    if (bounds) {
      map.fitBounds(bounds, { maxZoom: 15 });
    }
  };

  const resetData = () => {
    index = 0;
    geojson.features[0].geometry.coordinates = [];
  };

  const resetTime = () => {
    for (let i = 0; i < times.length; i++) {
      clearTimeout(times[i]);
    }
  };

  const getIndex = () => {
    if (pointGeojson.features.length !== 0) {
      index = detailSource.points.features.findIndex((value: any) => {
        return value.id === pointGeojson.features[0].id;
      });
    }
  };

  const animateLine = (index: number) => {
    if (index === detailSource.points.features.length) {
      resetData();
    }
    for (let i = index; i < detailSource.points.features.length; i++) {
      let task: any = null;
      (function (t: number, data: PatrolLineProps) {
        task = setTimeout(() => {
          geojson.features[0].geometry.coordinates.push(data.geometry.coordinates);
          pointGeojson = {
            type: 'FeatureCollection',
            features: [
              {
                id: data.id,
                type: 'Feature',
                properties: data.properties,
                geometry: {
                  type: 'Point',
                  coordinates: data.geometry.coordinates,
                },
              },
            ],
          };
          if (map) {
            (map.getSource('line-animate') as GeoJSONSource).setData(geojson);
            (map.getSource('point') as GeoJSONSource).setData(pointGeojson);
          }
        }, 100 * t);
      })(i, detailSource.points.features[i]);

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
    animateLine(index);
  };

  const playClickHandle = () => {
    getIndex();
    animateLine(index);
  };

  const onMapLoadedHandle = (mapWrapper: MapWrapper) => {
    map = mapWrapper;
    map.addSource('line', {
      type: 'geojson',
      data: geojson,
    });
    map.addSource('line-animate', {
      type: 'geojson',
      data: geojson,
    });
    map.addSource('point', {
      type: 'geojson',
      data: pointGeojson,
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
    // 静态轨迹
    addLine();
  };

  useEffect(() => {
    return () => {
      for (let i = 0; i < times.length; i++) {
        clearTimeout(times[i]);
      }
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
        mapLayerSettting={mapSetting}
        onMapLoad={(map: MapWrapper) => onMapLoadedHandle(map)}
      />
    </div>
  );
}
export default memo(MapContainer);
