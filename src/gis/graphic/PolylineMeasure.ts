import type MapWrapper from '../mapboxgl/MapWrapper';
import { lineString, length } from '@turf/turf';
import { Marker } from 'mapbox-gl';
import './index.less';

class PolylineMeasure {
  uuid: string;
  map: MapWrapper;
  isMeasure: boolean;
  ele: any;
  tooltip: any;
  points: any[] = [];
  markers: Marker[] = [];
  jsonPoint: any = {
    type: 'FeatureCollection',
    features: [],
  };
  jsonLine: any = {
    type: 'FeatureCollection',
    features: [],
  };
  constructor(map: MapWrapper) {
    this.uuid = this.generateId();
    this.map = map;
    this.isMeasure = false;
    let polylinePointsSourceId = 'polylinePointsSource' + this.uuid;
    let polylinePointsLayerId = 'polylinePointsLayer' + this.uuid;
    let polylineLinesSourceId = 'polylineLines' + this.uuid;
    let polylineLinesLayerId = 'polylineLinesLayer' + this.uuid;
    let polylineMovelinesSourceId = 'polylineMovelinesSource' + this.uuid;
    let polylineMovelinesLayerId = 'polylineMovelinesLayer' + this.uuid;
    this.map.addSource(polylinePointsSourceId, {
      type: 'geojson',
      data: this.jsonPoint,
    });
    this.map.addSource(polylineLinesSourceId, {
      type: 'geojson',
      data: this.jsonLine,
    });
    this.map.addSource(polylineMovelinesSourceId, {
      type: 'geojson',
      data: this.jsonLine,
    });
    this.map.addLayer({
      id: polylineMovelinesLayerId,
      type: 'line',
      source: polylineMovelinesSourceId,
      paint: {
        'line-color': '#ff0000',
        'line-width': 2,
        'line-opacity': 0.65,
      },
    });
    this.map.addLayer({
      id: polylineLinesLayerId,
      type: 'line',
      source: polylineLinesSourceId,
      paint: {
        'line-color': '#ff0000',
        'line-width': 2,
        'line-opacity': 0.65,
      },
    });
    this.map.addLayer({
      id: polylinePointsLayerId,
      type: 'circle',
      source: polylinePointsSourceId,
      paint: {
        'circle-color': '#ffffff',
        'circle-radius': 3,
        'circle-stroke-width': 2,
        'circle-stroke-color': '#ff0000',
      },
    });
    this.ele = document.createElement('div');
    this.ele.setAttribute('class', 'measureResult');
    this.tooltip = new Marker({
      element: this.ele,
      anchor: 'left',
      offset: [8, 0],
    })
      .setLngLat([0, 0])
      .addTo(map);
    this.markers.push(this.tooltip);
  }

  generateId() {
    return (
      (Math.random() * 10000000).toString(16).substr(0, 4) +
      '-' +
      new Date().getTime() +
      '-' +
      Math.random().toString().substr(2, 5)
    );
  }

  addPoint = (coords: any) => {
    let polylinePointsSourceId = 'polylinePointsSource' + this.uuid;
    let polylineLinesSourceId = 'polylineLines' + this.uuid;
    if (this.jsonPoint.features.length > 0) {
      let prev = this.jsonPoint.features[this.jsonPoint.features.length - 1];
      this.jsonLine.features.push({
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: [prev.geometry.coordinates, coords],
        },
      });
      (this.map.getSource(polylineLinesSourceId) as any).setData(this.jsonLine);
    }
    this.jsonPoint.features.push({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: coords,
      },
    });
    (this.map.getSource(polylinePointsSourceId) as any).setData(this.jsonPoint);
  };

  getLength = (coords: any) => {
    let _points = this.points.concat([coords]);
    let line = lineString(_points);
    let len: any = length(line);
    if (len < 1) {
      len = Math.round(len * 1000) + 'm';
    } else {
      len = len.toFixed(2) + 'km';
    }
    return len;
  };

  addMeasureRes = (coords: any) => {
    const ele = document.createElement('div');
    ele.setAttribute('class', 'measureResult');

    ele.innerHTML = this.points.length === 0 ? '起点' : this.getLength(coords);
    let marker = new Marker({ element: ele, anchor: 'left', offset: [8, 0] }).setLngLat(coords).addTo(this.map);
    this.markers.push(marker);
  };

  mapClickHandle = (e: any) => {
    if (this.isMeasure) {
      let coords = [e.lngLat.lng, e.lngLat.lat];
      this.addMeasureRes(coords);
      this.addPoint(coords);
      this.points.push(coords);
    }
  };

  mapMouseMoveHandle = (e: any) => {
    let polylineMovelinesSourceId = 'polylineMovelinesSource' + this.uuid;
    if (this.isMeasure) {
      let coords = [e.lngLat.lng, e.lngLat.lat];
      if (this.jsonPoint.features.length > 0) {
        let prev = this.jsonPoint.features[this.jsonPoint.features.length - 1];
        let json = {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: [prev.geometry.coordinates, coords],
          },
        };
        (this.map.getSource(polylineMovelinesSourceId) as any).setData(json);
        this.ele.innerHTML = this.getLength(coords);
      } else {
        this.ele.innerHTML = '点击地图开始测量';
      }
      this.tooltip.setLngLat(coords);
    }
  };

  mapDbclickHandle = (e: any) => {
    if (this.isMeasure) {
      let coords: any = [e.lngLat.lng, e.lngLat.lat];
      this.addPoint(coords);
      this.isMeasure = false;
      this.map.getCanvas().style.cursor = '';
      this.jsonPoint.features = [];
      this.jsonLine.features = [];
      this.tooltip.remove();
      // 添加关闭按钮
      const ele = document.createElement('div');
      ele.setAttribute('class', 'measureResultClose');

      ele.innerHTML = 'x';
      let closeMarker = new Marker({
        element: ele,
        anchor: 'bottom-left',
        offset: [-5, -10],
      })
        .setLngLat(coords)
        .addTo(this.map);
      ele.onclick = (e) => {
        e.stopPropagation();
        this.clearMeasure();
      };
      this.markers.push(closeMarker);
    }
  };

  start() {
    this.map.doubleClickZoom.disable();
    this.map.getCanvas().style.cursor = 'crosshair';
    this.isMeasure = true;
    this.map.on('click', this.mapClickHandle);
    this.map.on('mousemove', this.mapMouseMoveHandle);
    this.map.on('dblclick', this.mapDbclickHandle);
  }

  clearDrawEventListener() {
    this.map.off('click', this.mapClickHandle);
    this.map.off('mousemove', this.mapMouseMoveHandle);
    this.map.off('dblclick', this.mapDbclickHandle);
  }

  clearMeasure() {
    this.map.doubleClickZoom.enable();
    this.map.getCanvas().style.cursor = 'pointer';
    let polylinePointsSourceId = 'polylinePointsSource' + this.uuid;
    let polylinePointsLayerId = 'polylinePointsLayer' + this.uuid;
    let polylineLinesSourceId = 'polylineLines' + this.uuid;
    let polylineLinesLayerId = 'polylineLinesLayer' + this.uuid;
    let polylineMovelinesSourceId = 'polylineMovelinesSource' + this.uuid;
    let polylineMovelinesLayerId = 'polylineMovelinesLayer' + this.uuid;
    let source = this.map.getSource(polylinePointsSourceId);
    if (source) {
      this.map.removeLayer(polylinePointsLayerId);
      this.map.removeLayer(polylineLinesLayerId);
      this.map.removeLayer(polylineMovelinesLayerId);
      this.map.removeSource(polylinePointsSourceId);
      this.map.removeSource(polylineLinesSourceId);
      this.map.removeSource(polylineMovelinesSourceId);
    }
    this.markers.forEach((marker) => {
      marker.remove();
    });
    this.points = [];
    this.clearDrawEventListener();
  }
}

export { PolylineMeasure };
