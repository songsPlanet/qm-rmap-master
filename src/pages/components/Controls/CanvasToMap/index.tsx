import { TWidgetPosition } from '@/gis/widget/BaseWidget';
import { memo, useState, useRef, useEffect } from 'react';
import { getFeatureBoundingBox } from '@/gis/utils';
import MapWrapper from '@/gis/mapboxgl/MapWrapper';
import { AimOutlined } from '@ant-design/icons';
import styles from './index.module.less';
import { CanvasUtil } from './CanvasUtil';
import { TileUtil } from './TileUtil';
import axios from '@/utils/axios';
import { Button } from 'antd';

const CanvasToMap = (props: { position: TWidgetPosition }) => {
  const { position } = props;
  const tileUtil = new TileUtil();
  const mapR = useRef<MapWrapper>();
  const [show, setShow] = useState(false);
  const lineList = useRef<any>(null);
  const canvasUtil = useRef<any>(null);
  const dataRef = useRef<any>(null);
  const dataExtentRef = useRef<any>(null);
  const url = useRef<any>({});
  const z = 16;

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
    data.features.forEach((feature: any) => {
      const { type, coordinates } = feature.geometry;
      if (type === 'LineString') {
        linesData.push({
          width: 2,
          color: 'rgba(255,0,0,0.8)',
          coords: coordinates.map((coords: any) => {
            return tileUtil.project(dataExtentRef.current, z, coords);
          }),
        });
      } else {
        coordinates.forEach((coordList: any) => {
          linesData.push({
            width: 2,
            color: 'rgba(255,0,0,0.8)',
            coords: coordList.map((coords: any) => {
              return tileUtil.project(dataExtentRef.current, z, coords);
            }),
          });
        });
      }
    });
    lineList.current = linesData;
    return canvasUtil.current.drawLines(lineList.current);
  };

  const getBaseMap = () => {
    const [xmin, ymin, xmax, ymax] = tileUtil.getTilesInExtent(z, dataExtentRef.current);
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
    console.log('urls', urls);

    url.current = urls;
  };

  useEffect(() => {
    getGeoData().then((res: any) => {
      dataRef.current = res;
      const bounds = getFeatureBoundingBox(res.features[0]);
      const extent = bounds.toArray().flat();
      dataExtentRef.current = extent;
      getBaseMap();
    });
  }, []);

  useEffect(() => {
    // 获取要绘制的数据
    if (show) {
      console.log('url.current', url.current);

      canvasUtil.current.drawImages(url.current).then(() => {
        addLines(dataRef.current).then(() => {
          canvasUtil.current.printCanvas();
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
