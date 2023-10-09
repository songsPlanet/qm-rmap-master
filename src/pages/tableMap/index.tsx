import { getYearList, getRegions, getCropTypeList, getRegionPageList } from '@/models/table';
import AnalysisPageTemplate from '@/components/AnalysePageTemplate';
import { memo, useMemo, useCallback, useEffect } from 'react';
import { useReducer, isEmpty } from '@/utils';
import { message } from 'antd';
import Chart from './Chart';

type CropTypeList = { label: string; value: string }[];
type RegionList = { label: string; value: string }[];
type YearList = { label: string; value: string }[];

function initialState() {
  return {
    chartRecord: {},
    showChart: false,
    cropTypeList: [] as CropTypeList,
    regionList: [] as RegionList,
    yearList: [] as YearList,
  };
}

// 区域合规性分析
function Page() {
  const [state, setState] = useReducer(initialState);
  const { regionList, cropTypeList, yearList } = state;

  useEffect(() => {
    getYearList().then((response: any) => {
      console.log(response);
      const { code, data } = response;
      if (code === 0 && data?.length > 0) {
        setState({ yearList: data.map((value: string) => ({ label: value, value })) });
      }
    });

    getRegions(4).then((response: any) => {
      const { code, data } = response;
      if (code === 0) {
        setState({ regionList: data });
      }
    });

    getCropTypeList().then((response: any) => {
      const { code, data } = response;
      if (code === 0) {
        setState({ cropTypeList: data });
      }
    });
  }, []);

  // 查看详情
  const handleLookupDetail = useCallback((record: any) => {
    const { xzqhdm, insuranceYear, insuredCron } = record;
    const search = `xzqhdm=${xzqhdm}&insuranceYear=${insuranceYear}&insuredCron=${insuredCron}`;
    window.open(`/#/picc-insuranceAnalyse/detail/region?${search}`, '_blank');
  }, []);

  const columns = useMemo(() => {
    return [
      {
        title: '行政区',
        dataIndex: 'xzqhmc',
        name: 'xzqhdm',
        renderType: 'cascader',
        options: regionList,
      },
      {
        title: '年份',
        dataIndex: 'insuranceYear',
        hideInTable: true,
        renderType: 'select',
        options: yearList,
      },
      {
        title: '投保作物',
        dataIndex: 'insuredCronName',
        name: 'insuredCron',
        renderType: 'select',
        options: cropTypeList,
        keyNameForKey: 'description',
        keyNameForValue: 'value',
      },
      {
        title: '承保率',
        dataIndex: 'coverageRate',
        render: (rate: number) => {
          // eslint-disable-next-line
          return rate == null ? '-' : (rate * 100).toFixed(2) + '%';
        },
        hideInSearch: true,
      },
      {
        name: 'orderList',
        hideInTable: true,
        renderType: 'sorter',
        sorterList: [{ field: 'compliance', label: '合规率排序' }],
      },
    ];
  }, [regionList, cropTypeList, yearList]);

  const rowKey = useCallback((record: any) => {
    const { xzqhdm, insuranceYear, insuredCron } = record;
    return `${xzqhdm}-${insuranceYear}-${insuredCron}`;
  }, []);

  // 请求参数验证
  const validateRequestParams = useCallback((query: any) => {
    const { xzqhdm, orderList, insuranceYear, insuredCron } = query;

    if (isEmpty(query.xzqhdm) || xzqhdm?.length <= 2) {
      message.warning('请选择要查询的县或镇');
      return false;
    }

    if (!insuranceYear) {
      message.warning('请选择要查询的年分');
      return false;
    }

    if (!insuredCron) {
      message.warning('请选择要查询的投保作物');
      return false;
    }

    const params = { ...query };
    params.xzqhdm = xzqhdm[xzqhdm.length - 1];
    params.order = isEmpty(orderList) ? '' : JSON.stringify(orderList);
    delete params.orderList;
    return params;
  }, []);

  const requestPageList: any = useCallback(
    (query: any) => {
      const params = validateRequestParams(query);
      if (!params) return;
      return getRegionPageList(params);
    },
    [validateRequestParams],
  );

  // const dataExport = useCallback(
  //   (query: any) => {
  //     const params = validateRequestParams(query);
  //     if (!params) return;
  //     return downLoadRegionPageList(params);
  //   },
  //   [validateRequestParams],
  // );

  return (
    <AnalysisPageTemplate
      chart={<Chart />}
      tableRowKey={rowKey}
      tableColumns={columns}
      // dataExport={dataExport}
      exportFileName="区域分析"
      requestPageList={requestPageList}
      onLookupDetail={handleLookupDetail}
    />
  );
}

export default memo(Page);
