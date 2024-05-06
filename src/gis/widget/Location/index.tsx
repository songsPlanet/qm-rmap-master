import BaseWidget, { ControlICONS, TWidgetPosition } from '../BaseWidget';
import { Button, Radio, Form, Input, Space } from 'antd';
import { useMap } from '@/gis/context/mapContext';
import { memo, useCallback, useRef } from 'react';
import { LngLatLike } from 'mapbox-gl';
import './index.less';

const initialPosition = {
  bearing: 0,
  pitch: 0,
  center: [118.16333303406572, 31.108394692222518] as LngLatLike,
  zoom: 8.7,
};

interface TDecimalPosition {
  lon: any;
  lat: any;
}

interface TDMSPosition {
  degrees: any;
  minutes: any;
  seconds: any;
}

const Location = (props: { position: TWidgetPosition }) => {
  const { map } = useMap();
  const [form] = Form.useForm();
  const decimal = useRef<TDecimalPosition>({ lon: null, lat: null });
  const lonDMS = useRef<TDMSPosition>({ degrees: null, minutes: null, seconds: null });
  const latDMS = useRef<TDMSPosition>({ degrees: null, minutes: null, seconds: null });

  const onFinish = (values: any) => {
    const { longitude, latitude } = values;
    if (longitude && latitude) {
      map?.flyTo({
        duration: 5000,
        bearing: 0,
        center: [longitude, latitude],
        zoom: 15.5,
        pitch: 20,
      });
      addLocationIcon([longitude, latitude]);
    }
  };

  const clearIcon = () => {
    const dsId = 'dot-ds';
    const lyrId = 'dot';
    const flag = map?.getLayer(lyrId);
    if (flag) {
      map?.removeLayer(lyrId);
      map?.removeSource(dsId);
    }
  };

  const addLocationIcon = (point: number[]) => {
    clearIcon();
    if (map) {
      map?.addSource('dot-ds', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              properties: {},
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: point, // icon position [lng, lat]
              },
            },
          ],
        },
      });
      map?.addLayer({
        id: 'dot',
        type: 'symbol',
        source: 'dot-ds',
        layout: {
          'icon-image': 'redAnimationImg',
          'icon-size': 1,
          'icon-rotation-alignment': 'map',
          'icon-allow-overlap': true,
          'icon-offset': [0, 0],
        },
      });
    }
  };

  const initialLocation = () => {
    clearIcon();
    map?.flyTo(initialPosition);
  };

  const onOpenHandle = useCallback((value: boolean) => {
    clearIcon();
    form.resetFields();
  }, []);

  const onRadioChange = (e: any) => {
    lonDMS.current = map?.decimalToDMS(decimal.current.lon) as any;
    latDMS.current = map?.decimalToDMS(decimal.current.lon) as any;
  };

  const onLonChange = (e: any) => {
    decimal.current.lon = e.target.value;
  };
  const onLatChange = (e: any) => {
    decimal.current.lat = e.target.value;
  };

  return (
    <BaseWidget
      name="坐标定位"
      position={{ ...props.position }}
      icon={ControlICONS.Location}
      width={350}
      height={180}
      openHandle={onOpenHandle}
    >
      <div className="location-main">
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          layout="horizontal"
          style={{ maxWidth: 600 }}
          form={form}
          onFinish={onFinish}
        >
          <Form.Item label="类型">
            <Radio.Group defaultValue="1" onChange={onRadioChange}>
              <Radio value="1"> 十进制 </Radio>
              <Radio value="2"> 度分秒 </Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="经度" name="longitude">
            <Input placeholder="请输入经度" onChange={onLonChange} />
          </Form.Item>
          <Form.Item label="纬度" name="latitude">
            <Input placeholder="请输入纬度" onChange={onLatChange} />
          </Form.Item>

          {/* <Form.Item label="经度" name="lonDms" > 
          <Space>
            <Input placeholder="度" onChange={onLonChange} addonAfter="°"/>
            <Input placeholder="分" onChange={onLonChange} addonAfter="′"/>
            <Input placeholder="秒" onChange={onLonChange} addonAfter="″"/>
            </Space>
          </Form.Item> */}
          {/* <Form.Item label="纬度" name="latDms">
            <Input placeholder="度" onChange={onLonChange} />
            <Input placeholder="分" onChange={onLonChange} />
            <Input placeholder="秒" onChange={onLonChange} />
          </Form.Item> */}

          <Form.Item wrapperCol={{ offset: 8 }}>
            <Space>
              <Button type="primary" size="small" onClick={initialLocation}>
                初始位置
              </Button>
              <Button type="primary" size="small" htmlType="submit">
                坐标定位
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </BaseWidget>
  );
};

export default memo(Location);
