import { Marker } from 'mapbox-gl';
import type MapWrapper from '../MapWrapper';
import './index.less';
import { polygon, area } from '@turf/turf';
class PolygonMeasure {
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
    let polygonPointsSourceId = 'polygonPointsSource' + this.uuid;
    let polygonPointsLayerId = 'polygonPointsLayer' + this.uuid;
    let polygonLinesSourceId = 'polygonLines' + this.uuid;
    let polygonLinesLayerId = 'polygonLinesLayer' + this.uuid;
    let polygonLinesStrokeLayerId = 'polygonLinesstrokeLayer' + this.uuid;
    this.map.addSource(polygonPointsSourceId, {
      type: 'geojson',
      data: this.jsonPoint,
    });
    this.map.addSource(polygonLinesSourceId, {
      type: 'geojson',
      data: this.jsonLine,
    });
    this.map.addLayer({
      id: polygonLinesLayerId,
      type: 'fill',
      source: polygonLinesSourceId,
      paint: {
        'fill-color': '#ff0000',
        'fill-opacity': 0.1,
      },
    });
    map.addLayer({
      id: polygonLinesStrokeLayerId,
      type: 'line',
      source: polygonLinesSourceId,
      paint: {
        'line-color': '#ff0000',
        'line-width': 2,
        'line-opacity': 0.65,
      },
    });
    this.map.addLayer({
      id: polygonPointsLayerId,
      type: 'circle',
      source: polygonPointsSourceId,
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
    let polygonPointsSourceId = 'polygonPointsSource' + this.uuid;
    this.jsonPoint.features.push({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: coords,
      },
    });
    (this.map.getSource(polygonPointsSourceId) as any).setData(this.jsonPoint);
  };

  getArea = (coords: any) => {
    let pts = this.points.concat([coords]);
    pts = pts.concat([this.points[0]]);
    let plg: any = polygon([pts]);
    let parea: any = area(plg);
    // if (parea < 1000) {
    //   parea = Math.round(parea) + 'm²';
    // } else {
    //   parea = (parea / 1000000).toFixed(4) + 'km²';
    // }
    parea = (parea * 0.0015).toFixed(4) + '亩';
    return parea;
  };

  mapClickHandle = (e: any) => {
    if (this.isMeasure) {
      let coords = [e.lngLat.lng, e.lngLat.lat];
      this.addPoint(coords);
      this.points.push(coords);
    }
  };

  mapMouseMoveHandle = (e: any) => {
    if (this.isMeasure) {
      let polygonLinesSourceId = 'polygonLines' + this.uuid;
      let coords: any = [e.lngLat.lng, e.lngLat.lat];
      let len = this.jsonPoint.features.length;
      if (len === 0) {
        this.ele.innerHTML = '点击地图开始测量';
      } else if (len === 1) {
        this.ele.innerHTML = '点击地图继续绘制';
      } else {
        let pts = this.points.concat([coords]);
        pts = pts.concat([this.points[0]]);
        let json = {
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: [pts],
          },
        };
        (this.map.getSource(polygonLinesSourceId) as any).setData(json);
        this.ele.innerHTML = this.getArea(coords);
      }
      this.tooltip.setLngLat(coords);
    }
  };

  mapDbclickHandle = (e: any) => {
    if (this.isMeasure) {
      let coords: any = [e.lngLat.lng, e.lngLat.lat];
      this.points.push(coords);
      this.isMeasure = false;
      this.ele.innerHTML = this.getArea(coords);
      this.tooltip.setLngLat(coords);
      // 添加关闭按钮
      let _ele = document.createElement('div');
      _ele.setAttribute('class', 'measureResultClose');
      _ele.innerHTML = '×';
      let closeMarker = new Marker({
        element: _ele,
        anchor: 'bottom-left',
        offset: [-5, -10],
      })
        .setLngLat(coords)
        .addTo(this.map);
      _ele.onclick = (e) => {
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
    let polygonPointsSourceId = 'polygonPointsSource' + this.uuid;
    let polygonPointsLayerId = 'polygonPointsLayer' + this.uuid;
    let polygonLinesSourceId = 'polygonLines' + this.uuid;
    let polygonLinesLayerId = 'polygonLinesLayer' + this.uuid;
    let polygonLinesStrokeLayerId = 'polygonLinesstrokeLayer' + this.uuid;
    let source = this.map.getSource(polygonPointsSourceId);
    if (source) {
      this.map.removeLayer(polygonPointsLayerId);
      this.map.removeLayer(polygonLinesLayerId);
      this.map.removeLayer(polygonLinesStrokeLayerId);
      this.map.removeSource(polygonPointsSourceId);
      this.map.removeSource(polygonLinesSourceId);
    }
    this.markers.forEach((marker) => {
      marker.remove();
    });
    this.points = [];
    this.clearDrawEventListener();
  }
}

export { PolygonMeasure };
