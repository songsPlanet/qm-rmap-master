import { getFeatureBoundingBox, convertHexToRGB } from '@/gis/utils';
import { TWidgetPosition } from '@/gis/widget/BaseWidget';
import { memo, useState, useRef, useEffect } from 'react';
import { basemap } from '@/pages/mapSetting/basemap';
import MapWrapper from '@/gis/mapboxgl/MapWrapper';
import { AimOutlined } from '@ant-design/icons';
import MapWidget from '@/gis/widget/MapWidget';
import { LngLatBoundsLike } from 'mapbox-gl';
import styles from './index.module.less';
import { Modal, Button } from 'antd';
import axios from '@/utils/axios';

const CanvasToMap = (props: { position: TWidgetPosition }) => {
  const { position } = props;
  const mapR = useRef<MapWrapper>();
  const [show, setShow] = useState(false);
  const ctx = useRef<any>(null);
  const lineList = useRef<any>(null);
  const canvasRef = useRef<any>(null);
  const mapOptions = useRef<any>({
    id: 'mapToCanvas',
    container: '',
    zoom: 5,
    bounds: [
      [115.241236, 33.006001],
      [115.528891, 33.524924],
    ] as LngLatBoundsLike,
  });

  const modalOpenHandle = () => {
    setShow(true);
  };
  const modalOkHandle = () => {
    mapR.current?.getCanvas().toBlob((blob: any) => {
      // @ts-ignore
      saveAs(blob, 'mapPrint');
    });
  };

  const mapToPixel = (coords: any) => {
    return mapR.current?.project(coords) || { x: undefined, y: undefined };
  };

  const modalCancelHandle = () => {
    setShow(false);
  };

  const showDataToMap = () => {
    const features = lineList.current.features;
    const lineStyle = {
      width: 1,
      color: '#ff0000', // 红色
      opacity: 0.5,
      dash: [0, 0],
    };
    const coords = features[0].geometry.coordinates;

    const proCoords: any = coords.map((coord: any) => {
      const { x, y } = mapToPixel(coord);
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
    }
  };

  const handleMapLoad = (map: any) => {
    mapR.current = map;
    const canvas = document.createElement('canvas');
    canvasRef.current = canvas;
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
    const boundsArray = bounds.toArray();
    map.fitBounds(bounds, { maxZoom: 15 });

    mapOptions.current.bounds = boundsArray;

    map.addSource('canvas-ds', {
      type: 'canvas',
      canvas: 'mapcanvas',
      coordinates: map.getBoundsExtent(bounds),
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
      showDataToMap();
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
        <Modal
          title="导出预览"
          maskClosable={true}
          open={show}
          width={520}
          onOk={modalOkHandle}
          onCancel={modalCancelHandle}
          destroyOnClose
        >
          <div className={styles.printcontanier1}>
            <MapWidget
              mapOptions={mapOptions.current}
              mapLayerSettting={[basemap]}
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
