class TileUtil {
  private tileSize: number;
  private origin: number;
  private resolutions: any[];
  private tileUrl: string;
  constructor() {
    this.tileSize = 256;
    this.origin = 20037508.34278925;
    this.resolutions = [];
    let resolution = (this.origin * 2) / this.tileSize;
    for (let i = 0; i < 23; i++) {
      this.resolutions.push(resolution);
      resolution /= 2;
    }
    this.tileUrl =
      'http://t2.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=7271c460eedd19a02b7b7bb1b19ba7ac';
  }

  /**
   * 4326转3857
   * @param lonlat
   * @return {*}?
   */
  fromLonLat(lonlat: any): any {
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
   * 获取切片大小
   * @return {number}
   */
  getTileSize() {
    return this.tileSize;
  }

  randomNum(min = 1, max = 4) {
    return Math.floor(Math.random() * max + min);
  }

  /**
   * 获取切片地址
   * @param x
   * @param y
   * @param z
   * @return {string}
   */
  getTileUrl(x: any, y: any, z: any) {
    let url = this.tileUrl.replace(/\{x\}/g, x);
    url = url.replace(/\{y\}/g, y);
    url = url.replace(/\{z\}/g, z);
    return url.replace(/\{domain\}/g, this.randomNum() as any);
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
    // 判断zoom，进行四舍五入
    const res = this.resolutions[zoom] * 256;
    const xOrigin = -this.origin;
    const yOrigin = this.origin;
    const _xmin = Math.floor((xmin - xOrigin) / res);
    const _ymin = Math.floor((yOrigin - ymax) / res);
    const _xmax = Math.ceil((xmax - xOrigin) / res);
    const _ymax = Math.ceil((yOrigin - ymin) / res);
    console.log('1', _xmin, _ymin, _xmax, _ymax);
    return [_xmin, _ymin, _xmax, _ymax];
  }

  /**
   * 由地理坐标获取行列号范围
   * @param zoom
   * @param extent
   * @return {number[]}
   */
  getTilesInExtentFromLonLat(zoom: number, extent: any): number[] {
    const _xmin = this.getTileCol(extent[0], zoom);
    const _ymin = this.getTileRow(extent[3], zoom);
    const _xmax = this.getTileCol(extent[2], zoom);
    const _ymax = this.getTileRow(extent[1], zoom);
    return [_xmin, _ymin, _xmax, _ymax];
  }

  // 纬度转行号
  getTileRow(lat: any, zoom: number) {
    return Math.floor(
      ((1 - Math.log(Math.tan((lat * Math.PI) / 180) + 1 / Math.cos((lat * Math.PI) / 180)) / Math.PI) / 2) *
        Math.pow(2, zoom),
    );
  }
  // 经度转列号
  getTileCol(lon: any, zoom: number) {
    return Math.floor(((lon + 180) / 360) * Math.pow(2, zoom));
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
    // const res=scale*0.0254/dpi
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
