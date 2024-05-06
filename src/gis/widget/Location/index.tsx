import BaseWidget, { ControlICONS, TWidgetPosition } from '../BaseWidget';
import { Button, Radio, Form, Input, Space } from 'antd';
import { useMap } from '@/gis/context/mapContext';
import { memo, useCallback, useState } from 'react';
import { LngLatLike } from 'mapbox-gl';
import './index.less';

const initialPosition = {
  bearing: 0,
  pitch: 0,
  center: [118.16333303406572, 31.108394692222518] as LngLatLike,
  zoom: 8.7,
};

interface TPosition {
  longitude: number;
  latitude: number;
  dmsLonDegrees: number;
  dmsLonMinutes: number;
  dmsLonSeconds: number;
  dmsLatDegrees: number;
  dmsLatMinutes: number;
  dmsLatSeconds: number;
}

const Location = (props: { position: TWidgetPosition }) => {
  const { map } = useMap();
  const [form] = Form.useForm();
  const [ifDecimal, setIfDecimal] = useState(true);
  const [positionList, setPositionList] = useState<TPosition>();

  const conversionDecimalDms = (values: any) => {
    const {
      longitude,
      latitude,
      dmsLonDegrees,
      dmsLonMinutes,
      dmsLonSeconds,
      dmsLatDegrees,
      dmsLatMinutes,
      dmsLatSeconds,
    } = values;
    if (dmsLonDegrees && dmsLonMinutes && dmsLonSeconds && dmsLatDegrees && dmsLatMinutes && dmsLatSeconds) {
      const lon = map?.dmsToDecimal(dmsLonDegrees, dmsLonMinutes, dmsLonSeconds);
      const lat = map?.dmsToDecimal(dmsLatDegrees, dmsLatMinutes, dmsLatSeconds);
      form.setFieldsValue({
        longitude: lon,
        latitude: lat,
      });
      return [lon, lat];
    }
    if (longitude && latitude) {
      const lon = map?.decimalToDms(longitude);
      const lat = map?.decimalToDms(latitude);
      form.setFieldsValue({
        dmsLonDegrees: lon?.degrees,
        dmsLonMinutes: lon?.minutes,
        dmsLonSeconds: lon?.seconds,
        dmsLatDegrees: lat?.degrees,
        dmsLatMinutes: lat?.minutes,
        dmsLatSeconds: lat?.seconds,
      });
      return [longitude, latitude];
    }
    return [longitude, latitude];
  };

  const onFinish = (values: any) => {
    setPositionList(values);
    const location: any = conversionDecimalDms(values);

    locationHandle(location);
  };

  const locationHandle = (lonlat: LngLatLike) => {
    map?.flyTo({
      duration: 5000,
      bearing: 0,
      center: lonlat,
      zoom: 15.5,
      pitch: 20,
    });
    addLocationIcon(lonlat as number[]);
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

  const resetForm = () => {
    clearIcon();
    form.resetFields();
  };

  const initialLocation = () => {
    resetForm();
    map?.flyTo(initialPosition);
  };

  const onOpenHandle = useCallback((value: boolean) => {
    resetForm();
    setIfDecimal(true);
  }, []);

  const onRadioChange = (e: any) => {
    setIfDecimal(e.target.value === '1' ? true : false);
    conversionDecimalDms(form.getFieldsValue());
  };

  return (
    <BaseWidget
      name="坐标定位"
      position={{ ...props.position }}
      icon={ControlICONS.Location}
      width={300}
      height={180}
      openHandle={onOpenHandle}
    >
      <div className="location-main">
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 18 }}
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
          {ifDecimal ? (
            <div>
              <Form.Item label="经度" name="longitude">
                <Input placeholder="请输入经度" value={positionList?.longitude} />
              </Form.Item>
              <Form.Item label="纬度" name="latitude">
                <Input placeholder="请输入纬度" value={positionList?.latitude} />
              </Form.Item>
            </div>
          ) : (
            <div>
              <Form.Item label="经度" style={{ marginBottom: 0 }}>
                <Form.Item
                  name="dmsLonDegrees"
                  style={{ display: 'inline-block', width: 'calc(34% - 8px)', marginRight: '6px' }}
                >
                  <Input placeholder="度" suffix="°" value={positionList?.dmsLonDegrees} />
                </Form.Item>
                <Form.Item
                  name="dmsLonMinutes"
                  style={{ display: 'inline-block', width: 'calc(34% - 8px)', marginRight: '6px' }}
                >
                  <Input placeholder="分" suffix="′" value={positionList?.dmsLonMinutes} />
                </Form.Item>
                <Form.Item
                  name="dmsLonSeconds"
                  style={{ display: 'inline-block', width: 'calc(34% - 8px)', marginRight: '6px' }}
                >
                  <Input placeholder="秒" suffix="″" value={positionList?.dmsLonSeconds} />
                </Form.Item>
              </Form.Item>
              <Form.Item label="经度" style={{ marginBottom: 0 }}>
                <Form.Item
                  name="dmsLatDegrees"
                  style={{ display: 'inline-block', width: 'calc(34% - 8px)', marginRight: '6px' }}
                >
                  <Input placeholder="度" suffix="°" value={positionList?.dmsLatDegrees} />
                </Form.Item>
                <Form.Item
                  name="dmsLatMinutes"
                  style={{ display: 'inline-block', width: 'calc(34% - 8px)', marginRight: '6px' }}
                >
                  <Input placeholder="分" suffix="′" value={positionList?.dmsLatMinutes} />
                </Form.Item>
                <Form.Item
                  name="dmsLatSeconds"
                  style={{ display: 'inline-block', width: 'calc(34% - 8px)', marginRight: '6px' }}
                >
                  <Input placeholder="秒" suffix="″" value={positionList?.dmsLatSeconds} />
                </Form.Item>
              </Form.Item>
            </div>
          )}

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
