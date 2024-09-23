import { Modal, Form, Input, Select, Spin, Row, Col, message, Space, Button } from 'antd';
import { MapWrapper, TMapOptions, TMapLayerSetting, GISToolHelper } from 'qm-map-wrapper';
import React, { useState, useRef, memo } from 'react';
import MapWidget from '../MapWidget';
import axios from 'axios';

type TQueryGeocode = {
  open: boolean;
  tdtkey: string;
  mapOptions: TMapOptions;
  mapSetting: TMapLayerSetting;
  image?: {
    url: string;
    id: string;
  };
  region?: {
    bounds: number[];
    code?: number;
  };
  onOk?: (value: any) => void;
  onCancel?: () => void;
};

type TsearchResultPois = {
  hotPointID: string;
  lonlat: string;
  name: string;
};

export type TMapLocation = {
  location: string;
  longitude: number;
  latitude: number;
};

const QueryGeocode = (props: TQueryGeocode) => {
  const { region, tdtkey, image, open, mapSetting, mapOptions, onOk, onCancel } = props;
  const [form] = Form.useForm();
  const mapR = useRef<MapWrapper | null>();
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState('');
  const [searchResultPois, setSearchResultPois] = useState<TsearchResultPois[]>([]);

  const handleRest = () => {
    setLoading(false);
    setLocation('');
    form.resetFields();
  };

  const handleOk = (value: any) => {
    onOk?.(value);
    handleRest();
  };

  const handleCancel = () => {
    onCancel?.();
    handleRest();
  };

  const fetchSearchDataByKeyWord: any = GISToolHelper.debounce(async () => {
    try {
      const { location } = form.getFieldsValue();
      const params = {
        keyWord: location, // 关键字
        mapBound: region?.bounds.join(',') || '-180,-90,180,90', // 查询范围(“minx,miny,maxx,maxy”)
        level: 18, // 查询级别
        start: 0, // 返回结果起始位
        count: 10, // 返回结果的条数
        queryType: 1, // 1-普通搜索，7-地名搜索
        specify: region?.code || undefined, // 行政区国标码
      };
      const url = `http://api.tianditu.gov.cn/v2/search?type=query&postStr=${JSON.stringify(params)}&tk=${tdtkey}`;
      const searchData = await axios.get(url);
      if (searchData.data) setLoading(false);

      const { pois } = searchData.data;
      if (!pois) {
        message.warning('当前区域没有查询到结果');
      } else {
        setSearchResultPois(pois);
      }
    } catch (error) {
      setLoading(false);
      console.error('请求失败:', error);
    }
  }, 1000);

  const addLocationLayer = (lonlat: any) => {
    mapR.current?.setCenter(lonlat);
    mapR.current?.setZoom(15);
    const geo: any = GISToolHelper.createPointFeatureCollection(lonlat, {});
    if (image) {
      mapR.current?.selectSymbolIconFeature(geo, 'queryGeoIcon', 'icon-location');
    } else {
      mapR.current?.selectCircleFeature(geo, 'queryGeoIcon');
    }
  };

  const fetchSearchDataByLonLat = async (point: { lng: number; lat: number }) => {
    try {
      const params = {
        lon: point.lng,
        lat: point.lat,
        ver: 1, // 接口版本
      };
      const url = `http://api.tianditu.gov.cn/geocoder?type=geocode&postStr=${JSON.stringify(params)}&tk=${tdtkey}`;
      const searchData = await axios.get(url);

      if (searchData.data) setLoading(false);
      const { lon, lat } = searchData.data.result.location;
      const location = searchData.data.result['formatted_address'];
      const resObject: TMapLocation = {
        location,
        longitude: lon,
        latitude: lat,
      };
      setLocation(location);
      form.setFieldsValue(resObject);
      addLocationLayer([lon, lat]);
    } catch (error) {
      console.error('请求失败:', error);
      setLoading(false);
    }
  };

  const handleSearch = (value: any) => {
    setSearchResultPois([]);
    if (value && mapR.current) {
      setLoading(true);
      fetchSearchDataByKeyWord();
    } else {
      setSearchResultPois([]);
    }
  };

  const handleChange = (value: any) => {
    const selectPois = searchResultPois.filter((d) => d.hotPointID === value);
    // select清除状态
    if (selectPois.length === 0) {
      setLocation('');
      form.resetFields();
      mapR.current?.clearSelect(`queryGeoIcon`);
      return;
    }
    const { name, lonlat } = selectPois[0];
    const lonlatStr = lonlat.split(',');
    const lonlatArray: any = lonlatStr.map(parseFloat);

    const resObject: TMapLocation = {
      location: name,
      longitude: lonlatArray[0],
      latitude: lonlatArray[1],
    };
    setLocation(name);
    form.setFieldsValue(resObject);
    addLocationLayer(lonlatArray);
  };

  const mapLoadHandle = (map: MapWrapper) => {
    mapR.current = map;
    map.images.push(image!);
    map.on('click', (e: any) => {
      setLoading(true);
      fetchSearchDataByLonLat(e.lngLat);
    });
  };

  return (
    <Modal
      open={open}
      width={1200}
      okText="提交"
      title="地图页面"
      destroyOnClose
      maskClosable={false}
      footer={false}
      closable={false}
    >
      <Form form={form} layout="horizontal" onFinish={handleOk}>
        <div style={{ fontSize: '16px', color: '#584B4B', fontWeight: 'bold', marginBottom: '20px' }}>
          获取经纬度和地址 ：
        </div>
        <Row>
          <Col offset={1} span={6}>
            <Form.Item name="location" label="请输入:" rules={[{ required: true, message: '请选择地址!' }]}>
              <Spin spinning={loading}>
                <Select
                  allowClear
                  showSearch
                  filterOption={false}
                  placeholder="请输入地名"
                  style={{ width: '400px' }}
                  defaultActiveFirstOption={false}
                  value={location}
                  onChange={handleChange}
                  onSearch={handleSearch}
                  options={searchResultPois.map((d: any) => ({
                    value: d.hotPointID,
                    label: d.name,
                  }))}
                />
              </Spin>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col offset={1} span={6}>
            <Form.Item name="longitude" label="东经：" rules={[{ required: true, message: '请选择地址!' }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col offset={1} span={6}>
            <Form.Item name="latitude" label="北纬：" rules={[{ required: true, message: '请选择地址!' }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col offset={1} span={23}>
            <div style={{ height: 400, width: '100%' }}>
              <MapWidget mapLayerSettting={mapSetting!} mapOptions={mapOptions!} onMapLoad={mapLoadHandle} />
            </div>
          </Col>
        </Row>
        <Form.Item wrapperCol={{ offset: 21 }}>
          <Space style={{ marginTop: 40 }}>
            <Button type="primary" htmlType="submit">
              确定
            </Button>
            <Button htmlType="button" onClick={handleCancel}>
              取消
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default memo(QueryGeocode);
