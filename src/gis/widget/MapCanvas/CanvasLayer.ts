import MapWrapper from '../../mapboxgl/MapWrapper';
import { getFeatureBoundingBox, convertHexToRGB } from '@/gis/utils';

class CanvasLayer {
  private map: any;

  private width: number;

  private height: number;

  private data: any;
  private ctx: any;

  /**
   * Constructor
   * @param map MapboxMap object
   * @param width canvas.width
   * @param height canvas.height
   * @param data geojson
   * @param
   */
  constructor(map: any, data: any) {
    this.map = map;
    this.data = data;
    this.ctx = null;
    const { width, height } = this.map.getCanvas();
    this.width = width;
    this.height = height;

    const canvas = document.createElement('canvas');
    canvas.setAttribute('id', 'mapcanvas');
    canvas.width = width;
    canvas.height = height;
    canvas.style.display = 'none';
    this.map.getCanvasContainer().appendChild(canvas);
    this.ctx = canvas.getContext('2d');
  }

  /**
   * Generate and download Map image
   */
  generateMap() {
    // 定位
    const bounds = getFeatureBoundingBox(this.data.features[0]);
    this.map.setCenter(bounds.getCenter());
    this.map.locationFeatureByBounds(this.data);
    const canvasExtend = this.map.getBoundsExtent(bounds);
    this.map.addSource('canvas-ds', {
      type: 'canvas',
      canvas: 'mapcanvas',
      coordinates: canvasExtend,
    });
    this.map.addLayer({
      id: 'canvas-lyr',
      type: 'raster',
      source: 'canvas-ds',
    });

    this.map.on('movestart', () => {
      this.ctx.current?.clearRect(0, 0, this.width, this.height);
    });
    this.map.on('zoomstart', () => {
      this.ctx.current?.clearRect(0, 0, this.width, this.height);
    });
    this.map.on('moveend', () => {
      this.map.getSource('canvas-ds').setCoordinates(this.map.getMapExtent());
      this.showDataToMap();
    });
  }

  mapToPixel = (coords: any) => {
    return this.map.project(coords);
  };

  showDataToMap = () => {
    const lineStyle = {
      width: 1,
      color: '#ff0000', // 红色
      opacity: 0.5,
      dash: [0, 0],
    };
    const features = this.data.features;

    const coords = features[0].geometry.coordinates;

    const proCoords: any = coords.map((coord: any) => {
      const { x, y } = this.mapToPixel(coord);
      return [x, y];
    });
    console.log('this.ctx');

    if (this.ctx) {
      this.ctx.beginPath();
      this.ctx.strokeStyle = convertHexToRGB(lineStyle.color, lineStyle.opacity);
      this.ctx.lineWidth = lineStyle.width;
      this.ctx.setLineDash(lineStyle?.dash);
      proCoords.forEach((coord: any, index: any) => {
        index === 0 ? this.ctx.moveTo(coord[0], coord[1]) : this.ctx.lineTo(coord[0], coord[1]);
      });
      this.ctx.stroke();
    }
  };
}

export { CanvasLayer };
