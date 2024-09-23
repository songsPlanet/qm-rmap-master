import { basemap, tianditukey } from '@/pages/themeMap/mapSetting/basemap';
import { TWidgetPosition } from '@/gis/widgets/BaseWidget';
import IconLocation from '@/assets/map/icon-location.png';
import { TMapOptions } from 'qm-map-wrapper';
import { LngLatLike } from 'mapbox-gl';
import QueryGeocode from '@/gis/widgets/QueryGeocode';
import React, { memo, useState } from 'react';
import type { ReactElement } from 'react';
import ToolWidget from '@/gis/widgets/ToolWidget';

const QueryGeoTool = (props: { position: TWidgetPosition }) => {
  const { position} = props;
  const [show, setShow] = useState(false);
  const mapIconList = { url: IconLocation, id: 'icon-location' };
  const mapOptions: TMapOptions = {
    id: 'jsmap_query',
    container: '',
    center: [115.345459, 33.260307] as LngLatLike, // 界首市
    zoom: 9.6,
    maxZoom: 20,
  };

  const regionData = {
    bounds: [113.96022440625006, 29.87937173587207, 120.59596659374938, 33.88468752718174], // 界首
    code: 156341282, // 界首市行政区编码9位国际码
  };

  const queryOkHandle = () => {
    setShow(false);
  };

  const queryCancelHandle = () => {
    setShow(false);
  };

  const onOpenHandle = (value: any) => {
    setShow(value);
  };

  return (
    <ToolWidget position={position} title={'地理搜索'} openHandle={onOpenHandle}>
      <QueryGeocode
        open={show}
        image={mapIconList}
        region={regionData}
        tdtkey={tianditukey}
        mapSetting={[basemap]}
        mapOptions={mapOptions}
        onOk={queryOkHandle}
        onCancel={queryCancelHandle}
      />
    </ToolWidget>
  );
};
export default memo(QueryGeoTool);
