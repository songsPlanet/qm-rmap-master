class TileUtil {
  private tileSize: number;
  private origin: number;
  private resolutions: any[];
  private tileUrl: string;
  constructor() {
    this.tileSize = 256;
    this.origin = 20037508.34;
    this.resolutions = [];
    let resolution = (this.origin * 2) / this.tileSize;
    for (let i = 0; i < 23; i++) {
      this.resolutions.push(resolution);
      resolution /= 2;
    }
    this.tileUrl = 'https://webst0{domain}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}';
  }

  /**
   * 4326转3857
   * @param lonlat
   * @return {*}?
   */
  fromLonLat(lonlat: any): any {
    // return proj4('EPSG:4326', 'EPSG:3857', lonlat)
    // 注意先转为为弧度制，弧度=角度*Math.PI/180，弧长=弧度*半径
    const r = 6378137;
    const x = lonlat[0] * (Math.PI / 180) * r;
    const rad = lonlat[1] * (Math.PI / 180);
    const sin = Math.sin(rad);
    const y = (r / 2) * Math.log((1 + sin) / (1 - sin));
    return [x, y];
  }

  /**
   * 处理四至
   * @param extent
   * @return {*[]}
   */
  getExtent(extent: any): any[] {
    if (extent) {
      const min = this.fromLonLat([extent[0], extent[1]]);
      const max = this.fromLonLat([extent[2], extent[3]]);
      extent = [...min, ...max];
    } else {
      extent = [-this.origin, -this.origin, this.origin, this.origin];
    }
    return extent;
  }

  /**
   * 获取范围内的切片的行列号的范围
   * @param zoom
   * @param extent
   * @return {number[]}
   */
  getTilesInExtent(zoom: number, extent: any): number[] {
    extent = this.getExtent(extent);
    const [xmin, ymin, xmax, ymax] = extent;
    const res = this.resolutions[zoom] * 256;
    const xOrigin = -this.origin;
    const yOrigin = this.origin;
    const _xmin = Math.floor((xmin - xOrigin) / res);
    const _xmax = Math.ceil((xmax - xOrigin) / res);
    const _ymin = Math.floor((yOrigin - ymax) / res);
    const _ymax = Math.ceil((yOrigin - ymin) / res);
    return [_xmin, _ymin, _xmax, _ymax];
  }

  /**
   * 地理坐标转换为屏幕坐标
   * @param extent
   * @param zoom
   * @param lonLat
   * @return {*[]}
   */
  project(extent: any, zoom: number, lonLat: any): any[] {
    const [xmin, ymin, xmax, ymax] = this.getTilesInExtent(zoom, extent);
    const res = this.resolutions[zoom];
    const resMap = this.tileSize * res;
    const topLeft = [resMap * xmin - this.origin, this.origin - resMap * ymin];
    const coords = this.fromLonLat(lonLat);
    const x = (coords[0] - topLeft[0]) / res;
    const y = (topLeft[1] - coords[1]) / res;
    return [x, y];
  }
}

export { TileUtil };
