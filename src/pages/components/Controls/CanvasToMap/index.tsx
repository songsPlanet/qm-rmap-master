import { TWidgetPosition } from '@/gis/widget/BaseWidget';
import { AimOutlined } from '@ant-design/icons';
import styles from './index.module.less';
import { Button } from 'antd';
import { memo, useState, useRef, useEffect } from 'react';
import { Modal } from 'antd';
import axios from '@/utils/axios';
import { LngLatBoundsLike } from 'mapbox-gl';
import { getFeatureBoundingBox, convertHexToRGB } from '@/gis/utils';
import { useMap } from '@/gis/context/mapContext';
import MapWidget from '@/gis/widget/MapWidget';

const mapOptions = {
  id: 'lineMap',
  container: '',
  minZoom: 0,
  bounds: [
    [115.241236, 33.006001],
    [115.528891, 33.524924],
  ] as LngLatBoundsLike,
};
const CanvasToMap = (props: { position: TWidgetPosition }) => {
  const { map } = useMap();
  const { position } = props;
  const [show, setShow] = useState(false);
  const lineList = useRef<any>(null);
  const ctx = useRef<any>(null);
  const isDrawing = useRef(false);

  const modalOpenHandle = () => {
    setShow(true);
  };

  const mapToPixel = (coords: any, map: any) => {
    return map?.project(coords);
  };

  const showDataToMap = (map: any) => {
    const features = lineList.current.features;
    // drawLine(features, map);
    const lineStyle = {
      width: 1,
      color: '#ff0000', // 红色
      opacity: 0.5,
      dash: [0, 0],
    };
    const coords = features[0].geometry.coordinates;

    const proCoords: any = coords.map((coord: any) => {
      const { x, y } = mapToPixel(coord, map);
      return [x, y];
    });
    if (ctx) {
      ctx.current.beginPath();
      ctx.current.strokeStyle = convertHexToRGB(lineStyle.color, lineStyle.opacity);
      ctx.current.lineWidth = lineStyle.width;
      ctx.current.setLineDash(lineStyle?.dash);
      proCoords.forEach((coord: any, index: any) => {
        index === 0 ? ctx.current.moveTo(coord[0], coord[1]) : ctx.current.lineTo(coord[0], coord[1]);
      });
      ctx.current.stroke();
      isDrawing.current = false;
    }
  };

  const handleMapLoad = (map: any) => {
    const canvas = document.createElement('canvas');
    canvas.setAttribute('id', 'mapcanvas');
    const { width, height } = map.getCanvas();
    canvas.width = width;
    canvas.height = height;
    map.getCanvasContainer().appendChild(canvas);
    canvas.style.display = 'none';
    ctx.current = canvas.getContext('2d');

    // 定位
    const bounds = getFeatureBoundingBox(lineList.current.features[0]);
    map?.setCenter(bounds.getCenter());
    map?.locationFeatureByBounds(lineList.current);

    const canvasExtend = map.getBoundsExtent(bounds);

    map.addSource('canvas-ds', {
      type: 'canvas',
      canvas: 'mapcanvas',
      coordinates: canvasExtend,
    });
    map.addLayer({
      id: 'canvas-lyr',
      type: 'raster',
      source: 'canvas-ds',
    });

    map.on('movestart', () => {
      ctx.current?.clearRect(0, 0, canvas.width, canvas.height);
    });
    map.on('zoomstart', () => {
      ctx.current?.clearRect(0, 0, canvas.width, canvas.height);
    });
    map.on('moveend', () => {
      map.getSource('canvas-ds').setCoordinates(map.getMapExtent());
      showDataToMap(map);
    });
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

  useEffect(() => {
    // 获取要绘制的数据
    getGeoData().then((res: any) => {
      lineList.current = res;
    });
  }, []);

  return (
    <>
      <Button style={position} className={styles.btn} icon={<AimOutlined />} onClick={modalOpenHandle}>
        canvas绘制
      </Button>

      {show ? (
        <Modal title="导出预览" maskClosable={true} open={show} width={520} destroyOnClose>
          <div className={styles.printcontanier1}>
            <MapWidget
              mapOptions={{ ...mapOptions, id: 'mapToCanvas' }}
              mapLayerSettting={map!.mapLayerSetting}
              className={styles.mapContanier}
              onMapLoad={handleMapLoad}
            />
          </div>
        </Modal>
      ) : null}
    </>
  );
};
export default memo(CanvasToMap);
