import MapWrapper from '@/gis/mapboxgl/MapWrapper';

class AnimationRoute {
  declare map: any;

  declare route: any;

  constructor(map: MapWrapper, data: any) {
    this.map = map;
    this.route = data;
    this.init();
  }

  init() {
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
  }
}

export { AnimationRoute };
