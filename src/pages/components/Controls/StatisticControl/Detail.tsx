import { colorLib, pieLegendText } from '@/utils/chart.config';
import { memo, useEffect, useRef } from 'react';
import { Descriptions, Space } from 'antd';
import type { ECharts } from 'echarts';
import * as echarts from 'echarts';
import { isEmpty } from '@/utils';

export interface TMapSpaceStatistic {
  regionName: string;
  area: number;
  chartData: { regionName: string; area: number }[];
  name?: string;
}

export interface TStatisticDetail {
  data: TMapSpaceStatistic;
  title?: string;
}

const StatisticDetail = (props: TStatisticDetail) => {
  const { area, regionName, chartData } = props.data;
  const chartType = useRef<HTMLDivElement | null>(null);
  const pieChart = useRef<ECharts | undefined>();

  useEffect(() => {
    if (chartType.current && !pieChart.current) {
      pieChart.current = echarts.init(chartType.current);
    }
    const statistics = chartData || [];
    const amount =
      statistics.reduce((sum, cur) => {
        return sum + cur.area;
      }, 0) || 0;
    const option: any = {
      color: colorLib,
      title: [
        {
          text: props.title,
          left: 'center',
          textStyle: {
            fontSize: 14,
            fontWeight: 'bolder',
            color: '#000',
          },
        },
        {
          text: '面积',
          top: '20%',
          left: 'center',
          textStyle: {
            fontSize: 15,
            fontWeight: 'bolder',
            color: '#000',
          },
        },
        {
          text: amount ? amount.toFixed(2) : 0,
          top: '25%',
          left: 'center',
          textStyle: {
            fontSize: 18,
            color: '#000000',
          },
        },
      ],
      legend: {
        ...pieLegendText,
        type: 'scroll',
        orient: 'vertical',
        left: '10%',
        top: '50%',
        align: 'left',
        formatter: (name: any) => {
          const value = chartData.find((d) => d.regionName === name)?.area || 0;
          const r = Number(value / amount) * 100 || 0;
          return [`{title|${name}} {pecent|${r.toFixed(2) || 0}%}     {value|${value.toFixed(2)}}`];
        },
      },
      tooltip: {
        trigger: 'item',
      },
      series: [
        {
          data: chartData.map((d) => ({ name: d.regionName, value: d.area.toFixed(2) })),
          type: 'pie',
          radius: ['50%', '60%'],
          center: ['50%', '25%'], // 图形位置
          label: {
            // 鼠标悬浮具体数据显示
            show: false,
          },
        },
      ],
    };
    if (isEmpty(chartData)) {
      // 镇级统计不显示饼状图
      pieChart.current = undefined;
    } else {
      pieChart.current?.setOption(option);
    }
  }, [chartData]);

  const handleResize = () => {
    if (pieChart?.current) {
      pieChart.current.resize();
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Space style={{ width: 380 }} direction="vertical">
      <Descriptions column={2} layout="vertical" bordered style={{ textAlign: 'center' }}>
        <Descriptions.Item label="区划" style={{ textAlign: 'center' }}>
          {regionName}
        </Descriptions.Item>
        <Descriptions.Item label="面积" style={{ textAlign: 'center' }}>
          {area ? area.toFixed(2) : 0} 亩
        </Descriptions.Item>
      </Descriptions>
      <div ref={chartType} style={{ width: 'auto', height: 640, marginTop: 10 }} />
    </Space>
  );
};

export default memo(StatisticDetail);
