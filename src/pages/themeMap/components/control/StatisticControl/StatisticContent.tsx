import React, { memo, useEffect, useRef, useState } from 'react';
import { Empty, Result, Spin, Tabs, message } from 'antd';
import { useRegion } from '@/gis/context/RegionContext';
import type { TMapSpaceStatistic } from './Detail';
import { MapEvent } from '@/gis/mapboxgl/typings';
import { useMap } from '@/gis/context/mapContext';
import StatisticDetail from './Detail';
import { debounce, isEmpty } from '@/utils';
import { queryStatisticResult } from '@/models/map';

const StatisticContent = (props: { date?: any }) => {
  const { date } = props;
  const { map } = useMap();
  const [loading, setLoading] = useState(false);
  const [layers, setLayers] = useState<any[]>([]);
  // 存储数组，减少其他图层操作引起不必要的刷新
  const prevLayers = useRef<String[]>([]);
  const [data, setData] = useState<TMapSpaceStatistic[] | []>();

  const {
    state: { currentRegion },
  } = useRegion();

  const getChartData = () => {
    setLoading(true);
    Promise.all(
      layers.map((d: any) => {
        if (d === 'insurance_field') {
          if (isEmpty(date)) {
            message.error('请选择日期范围以查看承保区域统计');
            return null;
          } else {
            const type = 2;
            const regionCode = currentRegion!.value;
            const startDate = date[0];
            const endDate = date[1];
            return queryStatisticResult({ type, regionCode, startDate, endDate });
          }
        } else {
          const type = 1;
          const regionCode = currentRegion!.value;
          return queryStatisticResult({ type, regionCode });
        }
      }),
    ).then((ctx) => {
      const temp = ctx || [];
      setData(
        temp.map((f: any) => ({
          regionName: f?.data?.regionName || '',
          area: f?.data?.area || 0,
          chartData: f?.data?.areaList || [],
          name: f?.data?.queryType || '',
        })),
      );
      setLoading(false);
    });
  };

  useEffect(() => {
    if (currentRegion?.value) {
      getChartData();
    }
  }, [currentRegion, layers, date]);

  const getLyrState = () => {
    const statisticLayer = ['filed', 'insurance_field', 'double_insurance_field'];
    const lyrs = statisticLayer.filter((d) => {
      const id = d;
      const flag = map?.getLayerList().find((f) => f.options.id === id && f.options.isAdd);
      return flag;
    });
    let flag = false;
    if (prevLayers.current.length !== lyrs.length) {
      flag = true;
    } else {
      flag = prevLayers.current.findIndex((d: any) => !lyrs.includes(d)) > -1;
    }
    prevLayers.current = lyrs;

    if (flag) {
      setLayers(lyrs);
    }
  };

  useEffect(() => {
    getLyrState();
    const mapLayerChangedHandle = debounce(() => {
      getLyrState();
    }, 200);
    map?.on(MapEvent.MAPLAYERCHANGED, mapLayerChangedHandle);
    return () => {
      map?.off(MapEvent.MAPLAYERCHANGED, mapLayerChangedHandle);
    };
  }, []);

  return layers.length ? (
    <Spin spinning={loading}>
      {data?.length ? (
        <Tabs
          defaultActiveKey="1"
          style={{ padding: 10 }}
          items={data.map((d, index) => {
            return {
              label: d.name,
              key: index.toString(),
              children: <StatisticDetail data={d} title={d.name + '面积分布'} />,
            };
          })}
        />
      ) : (
        <Empty style={{ width: 380, marginTop: '60%' }} />
      )}
    </Spin>
  ) : (
    <Result
      style={{ width: 400, marginTop: '60%' }}
      status="warning"
      title="请您在 [ 图层控制 ] 功能中选中至少一个 [ 地块 ] 图层"
    />
  );
};
export default memo(StatisticContent);
