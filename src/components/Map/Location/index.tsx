import { memo, useCallback, useEffect, useState } from 'react';
import BaseWidget from '../../../gis/widget/BaseWidget';
import { Button, Radio, Form, Input, Space } from 'antd';
import { decimalToDms, dmsToDecimal } from '@/gis/utils';
import type { TWidgetPosition } from '../../../gis/widget/BaseWidget';
import { useMap } from '@/gis/context/mapContext';
import type { LngLatLike } from 'mapbox-gl';
import './index.less';
import { createPointFeatureCollection } from '@/gis/utils';

const initialPosition = {
  bearing: 0,
  pitch: 0,
  zoom: 8.7,
  center: [118.16333303406572, 31.108394692222518] as LngLatLike,
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

const LocationIcon =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAtVJREFUWEfFlknoj0EYxz//mxI32aUQsiUuKDlYIru4oiT75S8HFApFpKzlKCciW/YQ4WDLLkvJvtzIQSnmq3k15jfzzrzvX3lqept3nuc733lm5plvE//ZmmrMPxYYCAwBRtj4q8At4B5wtgpmVQK7gEWJCXYDi3NJVCHwHOiRCfwC6Jnjm0vgGjAsB9DxuW62Y3gqJodAM7AlBRQZXw5sLYtNEdCBOxMBmAVctmMjgQMRv3FlBzNFYBWwPgAci/sZ8F0NbIhlIUXgCDDFC1b/WARwMnDUG1N/al0Cb4FOXrD67yOAHYF33pj6nf8lgQ7Axwhge+CDN/YVaFuXgFI9yQueYSrh4QjgdOCQN/YU6F2XwCZghRes1SsLIdPqlQXXrgC6JUFLHUIVEtV53x5aYnfswGBgM9Av4Dsb2FeXgOKU7mkxgMT/08D4Mp9UBhQ72rx652oSGAOcbykBxW8HllYksQNYlorJyYAwWgMPgO4pQDv+EugPfEv55xIQzkJAb32OSTPsyXGsQkB4J1OHCjgFTMiZXD5VCYRKrT9XWalu4FWVgAD0sq2MrHAjoBc023IIjAIueYjPApJLkq2X4ycdoP4F4FGMUYyAioee1jlAK7NV6wzAWgekD/DYA+0LPHH+XTTERV6myrkf2AZ8d+N8AgsASbBCUP4AbgDzAqvQPV9iwXYG6oQmn2sLWfGk37b4fzLqEpjpyCqtWBOrfSrZ0EIBlW2lMqhqqldUGZXpzfi9LW6gUrwmkO7sA5Xh2DCHS0D7rnsuU4oO2vY5A7jMpZ05A8quWnEmVCdULxrqwEQjqeY7IkSlVCVYh+imSeN9s4dSOGpf7Fc4bazq0VdtADDUplolWaVcdtxIvL1m7ETBOLZ3BRG9811amIE3RthKN/w1cYqAO2dXQNduENDNqiEpIlXFQhlJCUmo6qv2ymiIu/Zavi5bQE4hamECysN/AYtbfCHCDbyeAAAAAElFTkSuQmCC';

const Location = (props: { position: TWidgetPosition; icon?: string }) => {
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
      const lon = dmsToDecimal(dmsLonDegrees, dmsLonMinutes, dmsLonSeconds);
      const lat = dmsToDecimal(dmsLatDegrees, dmsLatMinutes, dmsLatSeconds);
      form.setFieldsValue({
        longitude: lon,
        latitude: lat,
      });
      return [lon, lat];
    }
    if (longitude && latitude) {
      const lon = decimalToDms(longitude);
      const lat = decimalToDms(latitude);
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

  const addLocationIcon = (point: number[]) => {
    map?.clearSelect('red');
    const geoPoint: any = createPointFeatureCollection(point);
    map?.selectSymbolIconFeature(geoPoint, 'red', 'redAnimationImg');
  };

  const resetForm = () => {
    map?.clearSelect('red');
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

  useEffect(() => {
    resetForm();
    setIfDecimal(true);
  }, []);

  return (
    <BaseWidget
      name="坐标定位"
      position={{ ...props.position }}
      icon={props.icon ? props.icon : LocationIcon}
      width={300}
      height={180}
      openHandle={onOpenHandle}
    >
      <div className="locationMain">
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

          <Form.Item wrapperCol={{ offset: 6 }}>
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
