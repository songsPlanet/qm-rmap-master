import { TWidgetPosition } from '@/gis/widget/BaseWidget';
import { AimOutlined } from '@ant-design/icons';
import styles from './index.module.less';
import { Button } from 'antd';
import { memo, useState, useRef, useEffect } from 'react';
import { Modal } from 'antd';
import axios from '@/utils/axios';

const ExportTrack = (props: { position: TWidgetPosition }) => {
  const { position } = props;
  const canvasRef = useRef<any>(null);
  const [show, setShow] = useState(false);
  const lineList = useRef<any[]>([]);

  const modalOpenHandle = () => {
    setShow(true);
  };

  const modalCancelHandle = () => {
    setShow(false);
  };

  // 绘制geojson
  const modalOkHandle = () => {
    canvasRef.current.toBlob((blob: any) => {
      // @ts-ignore
      saveAs(blob, 'mapPrint');
    });
  };

  // 计算缩放比例
  const calcScale = (lonList: any[], latList: any[]) => {
    const lonMax = Math.max(...lonList);
    const lonMin = Math.min(...lonList);
    const latMax = Math.max(...latList);
    const latMin = Math.min(...latList);
    const width = canvasRef?.current?.offsetWidth;
    const height = canvasRef?.current?.offsetHeight;
    const xScale = width / Math.abs(lonMax - lonMin);
    const yScale = height / Math.abs(latMax - latMin);
    // 谁小用谁，因为用小的缩放比例，才能在 有限的空间下显示全
    return xScale < yScale ? xScale : yScale;
  };

  // 计算偏移度
  const calcOffset = (longitudes: any[], latitudes: any[], scale: any) => {
    // 先将经度和纬度按照scale进行缩放
    // 再用width和height去减，分别得到要x轴和y轴需要偏移的空间
    const xOffset =
      (canvasRef.current.offsetWidth - Math.abs(Math.max(...longitudes) - Math.min(...longitudes)) * scale) / 2;
    const yOffset =
      (canvasRef.current.offsetHeight - Math.abs(Math.max(...latitudes) - Math.min(...latitudes)) * scale) / 2;
    return { xOffset, yOffset };
  };

  // 将coordinates进行缩放
  // （1):每个点减去最小值，目的是为了那个点无限接近原点
  // （2）乘上缩放比例
  // （3)加上偏移度，得到最终的值
  const scaleCoordinates = (coordinates: any[][], scale: any, offset: any, longitudes: any[], latitudes: any[]) => {
    return coordinates
      .map((item) => {
        item[0] = item[0] - Math.min(...longitudes);
        // 由于屏幕坐标原点左上角，地理坐标原点右下角
        // y轴刚好相反，所以用以下公式
        item[1] = Math.max(...latitudes) - item[1];
        return item;
      })
      .map((item) => {
        item[0] = item[0] * scale;
        item[1] = item[1] * scale;
        return item;
      })
      .map((item) => {
        item[0] = item[0] + offset.xOffset;
        item[1] = item[1] + offset.yOffset;
        return item;
      });
  };

  // 将经度纬度拆分
  const getLonLat = (coordinates: any[][]) => {
    const longitudes: any[] = [];
    const latitudes: any[] = [];
    coordinates.forEach((d) => {
      longitudes.push(d[0]);
      latitudes.push(d[1]);
    });
    const scale = calcScale(longitudes, latitudes);
    const offSet = calcOffset(longitudes, latitudes, scale);
    const newList = scaleCoordinates(coordinates, scale, offSet, longitudes, latitudes);
    lineList.current = newList;
  };

  const getGeoData = async () => {
    const url = 'http://localhost:9999/src/pages/components/Controls/ExportTrack/aseest/Line.geojson';
    const rData = await axios.get(url).then((ctx: any) => {
      return ctx.features[0];
    });
    if (rData) {
      return rData;
    }
  };

  useEffect(() => {
    if (show) {
      getGeoData().then((res: any) => {
        const latlon = res.geometry.coordinates;
        if (canvasRef) {
          getLonLat(latlon);
          // 用canvas进行绘制
          const canvas = canvasRef.current;
          const ctx = canvas.getContext('2d');
          const width = canvas.offsetWidth;
          const height = canvas.offsetHeight;
          ctx.clearRect(0, 0, height, height);
          ctx.strokeStyle = 'red';
          ctx.fillStyle = 'rgba(255,0,0,0.6)';
          ctx.textAlign = 'center';
          ctx.font = '20px Helvetica, Arial';

          ctx.beginPath();
          ctx.moveTo(lineList.current[0][0], lineList.current[0][1]); // 起点
          for (let i = 1; i < lineList.current.length; i++) {
            ctx.lineTo(lineList.current[i][0], lineList.current[i][1]); // 拐点
          }
          // ctx.closePath();                //闭合
          ctx.stroke();
        }
      });
    }
  }, [show]);

  return (
    <>
      <Button style={position} className={styles.btn} icon={<AimOutlined />} onClick={modalOpenHandle}>
        绘制轨迹
      </Button>

      {show ? (
        <Modal
          title="导出预览"
          maskClosable
          open={show}
          width={460}
          onCancel={modalCancelHandle}
          onOk={modalOkHandle}
          destroyOnClose
        >
          {/* <MapWidget
            mapOptions={{ ...map!.options, id: 'swipeBeforeMap' }}
            mapLayerSettting={map!.mapLayerSetting}
            className={styles.mapContanier}
          ></MapWidget> */}
          <canvas ref={canvasRef} id="canvas" width="400" height="600" />
        </Modal>
      ) : null}
    </>
  );
};
export default memo(ExportTrack);
