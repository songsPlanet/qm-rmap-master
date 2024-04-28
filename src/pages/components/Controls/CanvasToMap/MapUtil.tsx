import { CanvasUtil } from './CanvasUtil';
import { TileUtil } from './TileUtil';

const zoom = 16;

const canvasWidth = 500;

const canvasHeight = 500;

const tileUtil = new TileUtil();

const canvasUtil = new CanvasUtil(canvasWidth, canvasHeight);

class MapUtil {
  private data: any;

  private dataExtent: number[];

  private baseLayerUrls: any[];

  constructor(featCol: any, featColExtent: number[]) {
    this.data = featCol;

    this.dataExtent = featColExtent;

    this.baseLayerUrls = [];
  }

  /**
   * 获得底图切片地址对象集
   *
   */
  getBaseLayer() {
    const [xmin, ymin, xmax, ymax] = tileUtil.getTilesInExtent(zoom, this.dataExtent);
    const width = Math.ceil((xmax - xmin) * tileUtil.getTileSize());
    const height = Math.ceil((ymax - ymin) * tileUtil.getTileSize());
    const _xmax = width > canvasWidth ? xmax : xmin + Math.ceil(canvasWidth / tileUtil.getTileSize());
    const _ymax = height > canvasWidth ? ymax : ymin + Math.ceil(canvasWidth / tileUtil.getTileSize());

    let urls = [];
    for (let i = xmin; i < _xmax; i++) {
      const x = (i - xmin) * tileUtil.getTileSize();
      for (let j = ymin; j < _ymax; j++) {
        const y = (j - ymin) * tileUtil.getTileSize();
        const url = tileUtil.getTileUrl(i, j, zoom);
        urls.push({
          i,
          j,
          x,
          y,
          url,
        });
      }
    }
    this.baseLayerUrls = urls;
  }

  /**
   * 添加线矢量
   * @param featCol 线要素的geojson
   * @return {CanvasUtil}
   */
  addLines(featCol: any) {
    let linesData: any[] = [];
    featCol.features.forEach((feature: any) => {
      const { type, coordinates } = feature.geometry;
      if (type === 'LineString') {
        linesData.push({
          width: 1,
          color: 'rgba(255,0,0,0.8)',
          coords: coordinates.map((coords: any) => {
            return tileUtil.project(this.dataExtent, zoom, coords);
          }),
        });
      } else {
        coordinates.forEach((coordList: any) => {
          linesData.push({
            width: 1,
            color: 'rgba(255,0,0,0.8)',
            coords: coordList.map((coords: any) => {
              return tileUtil.project(this.dataExtent, zoom, coords);
            }),
          });
        });
      }
    });
    return canvasUtil.drawLines(linesData);
  }

  /**
   * canvas地图绘制:底图→矢量
   * @param
   */
  addCanvasLayer() {
    canvasUtil.drawImages(this.baseLayerUrls).then(() => {
      this.addLines(this.data).then(() => {
        canvasUtil.printCanvas();
      });
    });
  }
}

export { MapUtil };
