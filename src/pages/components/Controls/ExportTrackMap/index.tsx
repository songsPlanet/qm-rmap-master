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
const mapOptions = {
  id: 'lineMap',
  container: '',
  minZoom: 0,
  bounds: [
    [115.241236, 33.006001],
    [115.528891, 33.524924],
  ] as LngLatBoundsLike,
};
const ExportTrackMap = (props: { position: TWidgetPosition }) => {
  const { map } = useMap();
  const { position } = props;
  const [show, setShow] = useState(false);
  const lineList = useRef<any>(null);

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
      lineList.current = ctx;
      return ctx.features[0];
    });
    if (rData) {
      return rData;
    }
  };

  const handleMapLoad = (map: any) => {
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
    const center = bounds.getCenter();
    map?.setCenter(center);
    map?.locationFeatureByBounds(lineList.current);
    map?.on('idle', () => {
      map?.getCanvas().toBlob((blob: any) => {
        // @ts-ignore
        saveAs(blob, 'mapPrint');
      });
    });
  };

  useEffect(() => {
    getGeoData().then((res: any) => {
      const latlon = res.geometry.coordinates;
      const bounds = getFeatureBoundingBox(res);
    });
  }, []);

  return (
    <>
      <Button style={position} className={styles.btn} icon={<AimOutlined />} onClick={modalOpenHandle}>
        mapbox出图
      </Button>

      {show ? (
        // (
        //   <div style={{ visibility: 'hidden' }} className={styles.printcontanier}>
        //     <MapWidget
        //       mapOptions={{ ...mapOptions, id: 'printMap' }}
        //       mapLayerSettting={map!.mapLayerSetting}
        //       className={styles.mapContanier}
        //       onMapLoad={handleMapLoad}
        //     />
        //   </div>
        // )
        <Modal
          title="导出预览"
          maskClosable={true}
          open={show}
          width={520}
          onCancel={modalCancelHandle}
          onOk={modalOkHandle}
          destroyOnClose
        >
          <div className={styles.printcontanier}>
            <MapWidget
              mapOptions={{ ...mapOptions, id: 'printMap' }}
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
