import * as echarts from 'echarts';

const legend = {
  left: 10,
  top: 10,
  textStyle: {
    color: '#000000',
    fontSize: '14px',
  },
  itemWidth: 18,
  itemHeight: 12,
  itemGap: 10,
  align: 'left',
};

// x轴样式
const xAxisStyle = {
  axisLine: {
    show: true,
    lineStyle: {
      color: 'rgba(68,68,68,0.3)',
      width: 1,
      type: 'solid',
    },
  },
  axisTick: {
    show: false,
  },
  axisLabel: {
    interval: '0',
    textStyle: {
      color: '#6e6e6e',
      fontSize: 12,
    },
  },
};

const barTitle = {
  textStyle: {
    color: '#585a5c',
    fontSize: 13,
    fontWeight: 'bold',
  },
  right: 'center',
  top: 12,
};

const actionTitle = {
  textStyle: {
    color: '#666666',
    fontSize: 14,
    fontWeight: 'bold',
  },
  right: 'center',
  bottom: 12,
};

const barTooltip = {
  trigger: 'axis',
  axisPointer: {
    type: 'shadow',
  },
};

// y轴样式
const yAxisStyle = {
  axisTick: {
    show: false,
  },
  axisLine: {
    show: false,
    lineStyle: {
      color: '#999999',
      width: 1,
      type: 'solid',
    },
  },
  splitLine: {
    lineStyle: {
      type: 'dotted',
      color: 'rgba(68,68,68,0.15)',
    },
  },
};

// 网格
const grid = {
  left: '3%',
  right: '4%',
  bottom: '3%',
  containLabel: true,
};

const pieLegendText = {
  show: true,
  icon: 'circle',
  top: 'center',
  left: '70%',
  itemGap: 10,
  itemWidth: 30,
  textStyle: {
    rich: {
      title: {
        color: '#7283BB',
        width: 130,
        fontSize: 14,
      },
      pecent: {
        color: '#9f9897',
        width: 60,
        fontSize: 14,
      },
      value: {
        color: '#000000',
        fontSize: 14,
      },
    },
  },
};

const pieSeries = {
  type: 'pie',
  radius: ['15%', '51%'],
  center: ['35%', '50%'],
  label: {
    normal: {
      formatter: '{d}%',
    },
  },
  labelLine: {
    length: 5,
  },
};

const actionPieSeries = {
  type: 'pie',
  radius: ['20%', '65%'],
  center: ['30%', '50%'],
  label: {
    normal: {
      formatter: '{d}%',
    },
  },
  labelLine: {
    length: 5,
  },
};

const actionPieLegendText = {
  show: true,
  icon: 'circle',
  top: 'center',
  left: '65%',
  width: 5,
  padding: [0, 5],
  itemGap: 5,
  itemWidth: 8,
  textStyle: {
    rich: {
      title: {
        color: '#7283BB',
        fontSize: 14,
      },
      value: {
        color: '#AEBADA',
        fontSize: 14,
      },
    },
  },
};

const lineStyle = {
  type: 'line',
  smooth: true,
  showAllSymbol: true,
  symbolSize: 10,
};

// 比率曲线-黄色
const rateLine = {
  smooth: true,
  yAxisIndex: 1,
  showAllSymbol: true,
  symbolSize: 10,
  itemStyle: {
    normal: {
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        {
          offset: 0,
          color: '#FFDC02',
        },
        {
          offset: 1,
          color: '#FFB515',
        },
      ]),
      opacity: 1,
    },
  },
};

export function getBarStyle(start: any, end: any) {
  return {
    type: 'bar',
    barWidth: 15,
    barGap: 0,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: start,
          },
          {
            offset: 1,
            color: end,
          },
        ]),
        opacity: 1,
      },
    },
  };
}
const colorLib = ['#4BA9FF', '#4FCB74', '#36CACB', '#FBD438', '#F04864', '#9860E5'];

export {
  legend,
  xAxisStyle,
  yAxisStyle,
  grid,
  barTitle,
  barTooltip,
  pieLegendText,
  pieSeries,
  lineStyle,
  actionPieSeries,
  actionPieLegendText,
  actionTitle,
  rateLine,
  colorLib,
};
