import { Descriptions, List, Space, Select, Spin, Empty } from 'antd';
import { getXXNYZTUserListApi, getSearchLayerListApi } from '@/api/map';
import { memo, useEffect, useState } from 'react';
import { getXxjyztListDetailApi } from '@/api/map';
import { useMap } from '@/lib/context/mapContext';
import { getFeatureBoundingBox } from '@/lib/utils';
import styles from './index.module.less';
import { debounce } from '@/utils';
import GeoMap from './GeoMap';

interface TField {
  fzr: string;
  zjhm: string;
  dkNum: number;
  dkArea: number;
  tgmj: number;
  dkList: {
    dkmc: string;
    dkmj: number;
    zzzw: string;
    mj: number;
    geo: GeoJSON.Feature<GeoJSON.Geometry> | GeoJSON.FeatureCollection<GeoJSON.Geometry> | string;
  }[];
}

interface TUser {
  id: number;
  fzr: string;
  zjhm: string;
}
const SearchDetail = () => {
  const { map } = useMap();
  const [type, setType] = useState<string>();
  const [field, setField] = useState<TField>();
  const [layerList, setLayerList] = useState<any>();
  const [objectID, setObjectID] = useState<string>();
  const [userList, setUserList] = useState<TUser[]>([]);
  const [userSearching, setUserSearching] = useState<boolean>(false);
  const [fieldSearching, setFieldSearching] = useState<boolean>(false);

  const getXXNYZTUserList: any = debounce((keyWord: string) => {
    setUserSearching(true);
    getXXNYZTUserListApi(keyWord || '').then((ctx: any) => {
      setUserList(ctx?.data || []);
      setUserSearching(false);
    });
  }, 500);

  const getFieldList = (objectID: string, type: string) => {
    setFieldSearching(true);
    getXxjyztListDetailApi(objectID, type).then((ctx: any) => {
      const flag: any = type.split('_')[0];
      const data = ctx?.data || undefined;
      const dkList = (data?.dkSpatials.features || []).map((d: any) => {
        return {
          dkmc: d?.properties.dkmc,
          dkmj: d?.properties.dkmj,
          zzzw:
            flag === 'zzjgbh'
              ? d?.properties.zzjgName
              : flag === 'lzxg'
              ? d?.properties.lzxglx
              : flag === 'clyc'
              ? d?.properties.ygcl
              : flag === 'zwzs'
              ? d?.properties.zwzs
              : d?.properties.zzzw,
          mj: d?.properties.mj,
          geo: {
            type: 'Feature',
            id: d?.id,
            properties: {},
            geometry: d?.geometry,
          },
        };
      });
      if (data) {
        data.dkList = dkList || [];
      }
      setField(data);
      setFieldSearching(false);
    });
  };

  const handleSearch = (newValue: string) => {
    if (newValue) {
      getXXNYZTUserList(newValue);
    } else {
      setUserList([]);
    }
  };

  const handleChange = (id: string) => {
    setObjectID(id);
  };

  useEffect(() => {
    getSearchLayerListApi('table_name').then((ctx: any) => {
      const list = (ctx?.data || []).map((d: any) => {
        return {
          value: d.value,
          label: d.dictName,
        };
      });
      setLayerList(list);
    });
    return () => {
      map?.clearSelect();
    };
  }, []);

  useEffect(() => {
    if (objectID && type) {
      getFieldList(objectID, type);
    } else {
      setField(undefined);
    }
  }, [objectID, type]);

  const itemClickHandle = (data: any) => {
    map?.selectFeature(data);
    const bounds = getFeatureBoundingBox(data);
    map?.fitBounds(bounds);
  };

  return (
    <Space
      direction="vertical"
      size="large"
      className={styles.panel}
      style={{
        width: 400,
        maxHeight: 700,
        overflowY: 'auto',
        padding: 20,
        position: 'absolute',
        right: 10,
        top: 45,
      }}
    >
      <>
        <Select
          placeholder="请选择分类"
          style={{ width: '100%' }}
          onChange={(value) => setType(value)}
          options={layerList}
        />
        <Spin spinning={userSearching}>
          <Select
            className={styles.antd_select}
            allowClear
            showSearch
            value={objectID}
            style={{ width: '100%' }}
            placeholder="请输入人员姓名或者证件号码"
            defaultActiveFirstOption={false}
            showArrow={false}
            filterOption={false}
            onSearch={handleSearch}
            onChange={handleChange}
            options={(userList || []).map((d) => ({
              value: d.id,
              label: `${d.fzr}-${d.zjhm}`,
            }))}
          />
        </Spin>

        <Spin spinning={fieldSearching}>
          {field ? (
            <>
              <Descriptions column={1} bordered title="用户基本信息" size="small">
                <Descriptions.Item label="姓名">{field?.fzr}</Descriptions.Item>
                <Descriptions.Item label="证件号">{field?.zjhm}</Descriptions.Item>
                <Descriptions.Item label="地块数量">{field?.dkNum}</Descriptions.Item>
                <Descriptions.Item label="流转面积">{field?.dkArea?.toFixed(2)}亩</Descriptions.Item>
                <Descriptions.Item label="托管面积">{field?.tgmj?.toFixed(2)}亩</Descriptions.Item>
              </Descriptions>
              <List
                itemLayout="vertical"
                size="small"
                pagination={{
                  simple: true,
                  pageSize: 5,
                }}
                dataSource={field?.dkList}
                renderItem={(item) => (
                  <List.Item style={{ cursor: 'pointer' }} onClick={() => itemClickHandle(item.geo)}>
                    <Space>
                      <GeoMap data={item.geo} style={{ width: 100, height: 100, border: '1px solid #fff' }} />
                      <div>
                        <p>田块名称：{item?.dkmc}</p>
                        <p>确权面积：{item?.dkmj?.toFixed(2)} 亩</p>
                        <p>种植作物：{item?.zzzw}</p>
                        <p>作物面积：{item?.mj?.toFixed(2)} 亩</p>
                      </div>
                    </Space>
                  </List.Item>
                )}
              />
            </>
          ) : (
            <Empty style={{ marginTop: '80%' }} />
          )}
        </Spin>
      </>
    </Space>
  );
};
export default memo(SearchDetail);
