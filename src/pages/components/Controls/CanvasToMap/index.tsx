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
  const canvasUtil = new CanvasUtil();
  const mapR = useRef<MapWrapper>();
  const [show, setShow] = useState(false);
  const lineList = useRef<any>(null);
  const z = 18;

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

  const addLines = () => {
    const data = getGeoData().then((res: any) => {
      let linesData: any[] = [];
      const bounds = getFeatureBoundingBox(res.features[0]);
      const extent = bounds.toArray().flat();
      res.features.forEach((feature: any) => {
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
      return canvasUtil.drawLines(lineList.current);
    });
    return data;
  };

  useEffect(() => {
    // 获取要绘制的数据
    if (show) {
      addLines().then(() => {
        canvasUtil.printCanvas();
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
