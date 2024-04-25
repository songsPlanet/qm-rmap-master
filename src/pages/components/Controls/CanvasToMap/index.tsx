import { TWidgetPosition } from '@/gis/widget/BaseWidget';
import { memo, useState, useRef, useEffect } from 'react';
import { getFeatureBoundingBox } from '@/gis/utils';
import MapWrapper from '@/gis/mapboxgl/MapWrapper';
import { AimOutlined } from '@ant-design/icons';
import styles from './index.module.less';
import { TileUtil } from './TileUtil';
import { CanvasUtil } from './CanvasUtil';
import axios from '@/utils/axios';
import { Button } from 'antd';

const CanvasToMap = (props: { position: TWidgetPosition }) => {
  const { position } = props;
  const tileUtil = new TileUtil();
  const mapR = useRef<MapWrapper>();
  const [show, setShow] = useState(false);
  const lineList = useRef<any>(null);
  const canvasUtil = useRef<any>(null);
  const url = useRef<any>({});
  const z = 15;

  const modalOpenHandle = () => {
    setShow(!show);
  };

  const getGeoData = async () => {
    const url = 'http://localhost:9999/src/pages/components/Controls/ExportTrack/aseest/Line.geojson';
    const rData = await axios.get(url).then((ctx: any) => {
      return ctx;
    });
    if (rData) {
      return rData;
    }
  };

  const addLines = (data: any) => {
    let linesData: any[] = [];
    const bounds = getFeatureBoundingBox(data.features[0]);
    const extent = bounds.toArray().flat();
    const [xmin, ymin, xmax, ymax] = tileUtil.getTilesInExtent(z, extent);
    const width = (xmax - xmin) * tileUtil.getTileSize();
    const height = (ymax - ymin) * tileUtil.getTileSize();
    canvasUtil.current = new CanvasUtil(width, height);

    data.features.forEach((feature: any) => {
      const { type, coordinates } = feature.geometry;
      if (type === 'LineString') {
        linesData.push({
          width: 2,
          color: 'rgba(255,0,0,0.8)',
          coords: coordinates.map((coords: any) => {
            return tileUtil.project(extent, z, coords);
          }),
        });
      } else {
        coordinates.forEach((coordList: any) => {
          linesData.push({
            width: 2,
            color: 'rgba(255,0,0,0.8)',
            coords: coordList.map((coords: any) => {
              return tileUtil.project(extent, z, coords);
            }),
          });
        });
      }
    });
    lineList.current = linesData;
    return canvasUtil.current.drawLines(lineList.current);
  };

  useEffect(() => {
    // 获取要绘制的数据
    if (show) {
      getGeoData().then((res: any) => {
        const bounds = getFeatureBoundingBox(res.features[0]);
        const extent = bounds.toArray().flat();
        const [xmin, ymin, xmax, ymax] = tileUtil.getTilesInExtent(z, extent);
        const width = (xmax - xmin) * tileUtil.getTileSize();
        const height = (ymax - ymin) * tileUtil.getTileSize();
        canvasUtil.current = new CanvasUtil(width, height);
        let urls = [];
        for (let i = xmin; i < xmax; i++) {
          const x = (i - xmin) * tileUtil.getTileSize();
          for (let j = ymin; j < ymax; j++) {
            const y = (j - ymin) * tileUtil.getTileSize();
            const url = tileUtil.getTileUrl(i, j, z);
            urls.push({
              i,
              j,
              x,
              y,
              url,
            });
          }
        }
        url.current = urls;
        console.log('urls', url.current);
        // addLines(res).then(() => {
        //   canvasUtil.current.printCanvas();
        // });
        canvasUtil.current.drawImages(url.current).then(() => {
          //     const base64Data=    canvasUtil.current.getDataUrl()
          //     console.log("base64Data",base64Data);
          //    // / 创建一个a元素，模拟点击进行下载
          // const link = document.createElement('a');
          // link.href = base64Data;
          // link.download = "123";
          // link.click();
          canvasUtil.current.printCanvas();

          // setTimeout(()=>{
          //   canvasUtil.current.printCanvas();

          // },1000)
          // })
        });
      });
    }
  }, [show]);

  return (
    <Button style={position} className={styles.btn} icon={<AimOutlined />} onClick={modalOpenHandle}>
      canvas绘制
    </Button>
  );
};
export default memo(CanvasToMap);
