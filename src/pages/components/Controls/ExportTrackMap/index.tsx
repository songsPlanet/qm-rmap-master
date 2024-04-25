import { TWidgetPosition } from '@/gis/widget/BaseWidget';
import { AimOutlined } from '@ant-design/icons';
import styles from './index.module.less';
import { Button } from 'antd';
import { memo, useState, useRef, useEffect } from 'react';
import { Modal } from 'antd';
import axios from '@/utils/axios';
import { LngLatBoundsLike } from 'mapbox-gl';
import { getFeatureBoundingBox } from '@/gis/utils';
import { useMap } from '@/gis/context/mapContext';
import MapWidget from '@/gis/widget/MapWidget';

const ExportTrackMap = (props: { position: TWidgetPosition }) => {
  const { map } = useMap();
  const { position } = props;
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const lineList = useRef<any>(null);
  const mapOptions = useRef<any>({
    id: 'printMap',
    container: '',
    zoom: 5,
  });

  const modalOpenHandle = () => {
    setShow(true);
  };

  const modalCancelHandle = () => {
    setShow(false);
  };

  // 绘制geojson
  const modalOkHandle = () => {};

  const getGeoData = async () => {
    const url = 'http://localhost:9999/src/pages/components/Controls/ExportTrack/aseest/Line.geojson';
    const rData = await axios.get(url).then((ctx: any) => {
      return ctx;
    });
    if (rData) {
      return rData;
    }
  };

  const handleMapLoad = (map: any) => {
    setLoading(true);

    map.addSource('geoMap-ds', {
      type: 'geojson',
      data: lineList.current,
    });
    map.addLayer({
      id: 'geoMap-lyr',
      type: 'line',
      paint: {
        'line-color': 'red',
        'line-opacity': 0.6,
      },
      source: 'geoMap-ds',
    });

    const bounds = getFeatureBoundingBox(lineList.current.features[0]);
    map?.setCenter(bounds.getCenter());
    const boundsArray = bounds.toArray();

    map.fitBounds(bounds, { maxZoom: 15 });
    mapOptions.current.bounds = boundsArray;

    // map?.on('idle', () => {
    //   map?.getCanvas().toBlob((blob: any) => {
    //     // @ts-ignore
    //     saveAs(blob, 'mapPrint');
    //   });
    //   setLoading(false);
    // });
  };

  useEffect(() => {
    getGeoData().then((res: any) => {
      lineList.current = res;
    });
  }, []);

  return (
    <>
      <Button
        loading={loading}
        style={position}
        className={styles.btn}
        icon={<AimOutlined />}
        onClick={modalOpenHandle}
      >
        mapbox出图
      </Button>

      {show ? (
        <Modal
          title="导出预览"
          mask={false}
          open={show}
          width={520}
          destroyOnClose
          maskClosable={false}
          onOk={modalOkHandle}
          onCancel={modalCancelHandle}
          // style={{ display: 'none' }}
        >
          <div className={styles.printcontanier}>
            <MapWidget
              mapOptions={mapOptions.current}
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
export default memo(ExportTrackMap);
