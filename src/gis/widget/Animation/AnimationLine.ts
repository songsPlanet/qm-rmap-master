/*
 * 动态线路：初始化出现，渲染完成淡出
 * map：地图
 * line：目标路径geojson[LineString]
 * stepPoint：通过turf.js平滑线路
 * steps：步长，越小平滑程度越大
 */
import MapWrapper from '@/gis/mapboxgl/MapWrapper';
import { GeoJSONSource } from 'mapbox-gl';
import { along, length, polygonToLine } from '@turf/turf';

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

class AnimationLine {
  private map: MapWrapper;
  private interval: number | undefined;
  private route: any; // 目标路径geojson
  private stepPoint: any[] | undefined; // 利用turf重新划分点
  private steps: number; // 步长，默认1500

  constructor(map: MapWrapper, route: any) {
    this.map = map;
    this.route = route;
    this.steps = 120;
    if (!map) return;
    this.init();
  }
  init() {
    // 动态线
    this.map.addSource('line-animate-ds', {
      type: 'geojson',
      data: geojson,
    });

    this.map.addLayer({
      id: 'line-animation',
      type: 'line',
      source: 'line-animate-ds',
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-color': 'orange',
        'line-width': 3,
        'line-opacity': 1,
        'line-opacity-transition': { duration: 1000 }, // 500 milliseconds = 1/2 seconds
      },
    });
    this.getStepsPoint();
    this.animateLine();
  }

  getStepsPoint() {
    const line: any = polygonToLine(this.route.features[0]);
    const routeDist = length(line, { units: 'meters' });

    let points = [];
    for (let i = 0; i <= this.steps; i++) {
      const dist = (i / this.steps) * routeDist;
      const point = along(line.features[0], dist, { units: 'meters' });
      points.push(point.geometry.coordinates);
    }
    this.stepPoint = points;
  }
  animateLine() {
    const that = this;
    that.map.setPaintProperty('jieshou_xian', 'line-opacity', 0);
    let idx = 0;
    loop();
    function loop() {
      task(idx);
      idx++;
      that.interval = requestAnimationFrame(loop);
      if (idx === that.stepPoint?.length && that.interval) {
        cancelAnimationFrame(that.interval);
        const source = that.map.getSource('line-animate-ds');

        if (source) {
          that.map.setPaintProperty('line-animation', 'line-opacity', 0);
          that.map.setPaintProperty('jieshou_xian', 'line-opacity-transition', { duration: 500 });
          that.map.setPaintProperty('jieshou_xian', 'line-opacity', 1);
          that.map.removeLayer('line-animation');
          that.map.removeSource('line-animate-ds');
        }
      }
    }

    function task(index: any) {
      if (that.stepPoint) {
        geojson.features[0].geometry.coordinates.push(that.stepPoint[index]);
      }

      if (that.map) {
        (that.map.getSource('line-animate-ds') as GeoJSONSource).setData(geojson);
      }
    }
  }
}

export { AnimationLine };
