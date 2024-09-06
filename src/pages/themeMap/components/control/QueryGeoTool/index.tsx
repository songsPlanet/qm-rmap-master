import { basemap, tianditukey } from '@/pages/themeMap/mapSetting/basemap';
import { TWidgetPosition } from '@/gis/widgets/BaseWidget';
import IconLocation from '@/assets/map/icon-location.png'
import { mapOptionsJS } from '@/gis/typings/TMapOptions';
import QueryGeocode from '@/gis/widgets/QueryGeocode';
import { AimOutlined } from '@ant-design/icons';
import React, { memo, useState } from 'react';
import type { ReactElement } from 'react';
import { Button } from 'antd';

const QueryGeoTool = (props: { position: TWidgetPosition; content?: ReactElement }) => {
  const { position, content } = props;
  const [show, setShow] = useState(false);
  const mapIconList = { url: IconLocation, id: 'icon-location' };
  
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

  return (
    <div>
      <Button icon={<AimOutlined />} onClick={() => setShow(true)} style={{ ...position, position: 'absolute' }}>
        地理搜索
      </Button>
      {show && (
        <QueryGeocode
          open={show}
          image={mapIconList}
          region={regionData}
          tdtkey={tianditukey}
          mapSetting={[basemap]}
          mapOptions={mapOptionsJS}
          onOk={queryOkHandle}
          onCancel={queryCancelHandle}
        />
      )}
    </div>
  );
};
export default memo(QueryGeoTool);
