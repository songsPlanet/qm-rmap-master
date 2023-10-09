import React, { memo, useMemo, useCallback, useRef, useLayoutEffect } from 'react';
import { Button, Space } from 'antd';
import ListPageContent from './ListPageContent';
import classes from './index.module.less';
import { delay, events } from '@/utils';

function initialState() {
  return {
    chartRecord: {} as any,
  };
}

type AnalysisPageTemplateProps = {
  tableRowKey: string | ((record: any) => string);
  tableColumns: any[];
  dataExport?: Function; // 下载
  exportFileName?: string;
  chart: React.ReactElement;
  onLookupDetail: (record: any) => void;
  requestPageList: (query: any) => Promise<any>; // 开始分析
};

/**
 * 分析页面模板，适用于以下页面
 * 保险合规性分析-区域合规性分析
 * 保险合规性分析-保单合规性分析
 * 理赔合规性分析-区域合规性分析
 * 理赔合规性分析-保单合规性分析
 */
function AnalysisPageTemplate(props: AnalysisPageTemplateProps) {
  // const [state, setState] = useReducer(initialState);
  // const { chartRecord } = state;
  const { tableRowKey, tableColumns, requestPageList, onLookupDetail, chart, dataExport, exportFileName } = props;

  // 地图定位
  const handleMapPositioning = useCallback((record: any) => {
    // setState({ chartRecord: record });
    events.emit('tableRecordChange', record);
  }, []);

  // 开始分析
  const handleStartAnalysis = useCallback(
    async (query: any) => {
      // await delay(1500);
      return requestPageList(query);
    },
    [requestPageList],
  );

  const columns = useMemo(() => {
    const operation = {
      title: '操作',
      width: 220,
      dataIndex: tableRowKey,
      hideInSearch: true,
      render: (_: string, record: any) => {
        return (
          <Space style={{ marginLeft: -16 }}>
            <Button type="link" onClick={() => handleMapPositioning(record)}>
              地图定位
            </Button>
            <Button type="link" onClick={() => onLookupDetail(record)}>
              查看详情
            </Button>
          </Space>
        );
      },
    };
    return tableColumns.concat(operation);
  }, [tableRowKey, tableColumns, handleMapPositioning, onLookupDetail]);

  return (
    <div className={classes.page}>
      <ListPageContent
        bordered
        columns={columns}
        rowKey={tableRowKey}
        dataExport={dataExport}
        exportFileName={exportFileName}
        requestPageList={handleStartAnalysis}
        chart={chart}
      />
    </div>
  );
}

export default memo(AnalysisPageTemplate);
