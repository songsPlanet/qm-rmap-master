import { GeoJSONSource, Map } from 'mapbox-gl';
import { along, length } from '@turf/turf';
import MapWrapper from '@/gis/mapboxgl/MapWrapper';

const trackIcon =
  'data:image/png;base64,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';

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

class AnimationRoute {
  private map: MapWrapper | Map;
  private route: any; // 目标路径geojson
  private pauseIndex: number; // 暂停geometry下标
  private pauseStatus: boolean; // 暂停状
  private interval: number | undefined;
  private stepPoint: any[] | undefined; // 利用turf重新划分点
  private steps: number; // 步长，默认1500

  constructor(map: MapWrapper, route: any) {
    this.map = map;
    this.route = route;
    this.pauseStatus = false;
    this.pauseIndex = 0;
    this.steps = 1500;
    if (!map) return;
    this.init();
  }

  init() {
    // 路径
    this.addRouteLayer();
    // 动态点
    this.map.addSource('point', {
      type: 'geojson',
      data: pointGeojson,
    });
    this.map.addLayer({
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
    this.map.addSource('line-animate', {
      type: 'geojson',
      data: geojson,
    });

    this.map.addLayer({
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
    //  图标
    this.map.loadImage(trackIcon, (error: any, image: any) => {
      if (!error) {
        if (!this.map.hasImage('trackIcon')) this.map.addImage('trackIcon', image);
      }
    });
  }

  addRouteLayer() {
    // 添加路径图层
    this.map.addSource('line-ds', {
      type: 'geojson',
      data: this.route,
    });
    this.map.addLayer({
      id: 'line',
      type: 'line',
      source: 'line-ds',
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
    // this.map.locationFeatureByBounds(this.route);
    this.map.jumpTo({ center: this.route.features[0].geometry.coordinates[0], zoom: 15 });
  }

  getIndex() {
    if (pointGeojson.features.length !== 0) {
      this.pauseIndex = this.route.features[0].geometry.coordinates.findIndex((value: any) => {
        return value[0] === pointGeojson.features[0].id;
      });
    }
  }

  animateLine() {
    const that = this;
    let idx = 0;
    loop();
    function loop() {
      let newIndex = that.pauseStatus === false ? idx : that.pauseIndex;
      task(newIndex);
      idx++;
      that.pauseIndex++;
      that.interval = requestAnimationFrame(loop);
    }

    function task(index: any) {
      const coords = that.route.features[0].geometry.coordinates;

      geojson.features[0].geometry.coordinates.push(coords[index]);
      pointGeojson = {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            id: coords[index][0],
            geometry: {
              type: 'Point',
              coordinates: coords[index],
            },
          },
        ],
      };
      if (that.map) {
        (that.map.getSource('line-animate') as GeoJSONSource).setData(geojson);
        (that.map.getSource('point') as GeoJSONSource).setData(pointGeojson);
      }
    }
  }

  getStepsPoint() {
    const routeDist = length(this.route, { units: 'meters' });
    let points = [];
    for (let i = 0; i <= this.steps; i++) {
      const dist = (i / this.steps) * routeDist;
      const point = along(this.route.features[0], dist, { units: 'meters' });
      points.push(point.geometry.coordinates);
    }
    this.stepPoint = points;
  }

  resetTime() {
    if (this.interval) {
      cancelAnimationFrame(this.interval);
    }
  }

  resetData() {
    this.pauseIndex = 0;
    pointGeojson.features = [];
    geojson.features[0].geometry.coordinates = [];
  }

  replay() {
    this.resetData();
    this.resetTime();
    this.animateLine();
  }

  play() {
    this.getIndex();
    this.animateLine();
  }

  pause() {
    this.pauseStatus = true;
    this.getIndex();
    this.resetTime();
  }

  destory() {
    this.resetTime();
    this.resetData();
  }
}

export { AnimationRoute };
