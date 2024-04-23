import React, { useCallback, useEffect, memo, useMemo, useRef } from 'react';
import { Table, Pagination, Spin, message } from 'antd';
import ListPageHeader, { Columns, processFormValueAccordingColumns } from '../ListPageHeader';
import classes from './index.module.less';
import useReducer from '@/utils/useReducer';
import { downLoadFile, delay, events } from '@/utils';

type RequestPageListParma = {
  pageSize: number;
  pageNum: number;
  [propName: string]: any;
};

type ListPageContentProps = {
  chart: React.ReactElement;
  // 同 Table 组件的 rowKey
  rowKey: string | ((record: any) => string);
  // 同 Table 组件的 columns
  columns: Columns;
  // 同 Table 组件的 bordered
  bordered?: boolean;
  // 同 Table 组件的 rowSelection
  rowSelection?: any;
  // 导出功能的 server-api
  dataExport?: Function;
  // 导出的文件名
  exportFileName?: string;
  // 请求页面数据的 server-api
  requestPageList: (query: RequestPageListParma) => Promise<any>;
  // 同 Pagination 组件的 onChange 事件
  onPaginationChange?: (pageNum: number, pageSize: number) => void;
  // 同 Pagination 组件的 paginationShowTotal
  paginationShowTotal?: (total: number, range: number[]) => string;
};

type OrderListItem = {
  field: string;
  direction: boolean;
};

type OrderList = OrderListItem[];

type SearchCondition = {
  orderList?: OrderList;
  [propName: string]: any;
};

const initialSearchCondition: SearchCondition = {};

function initialState() {
  return {
    pageSize: 10,
    pageNum: 1,
    loading: false,
    pageList: [],
    total: 0,
    searchCondition: initialSearchCondition,
    expandChart: true,
    spinning: false,
  };
}

function ListPageContent(props: ListPageContentProps) {
  const [state, setState] = useReducer(initialState);
  const { total, pageNum, loading, pageSize, pageList, searchCondition, spinning, expandChart } = state;
  const chartRef = useRef<any>();
  const headerRef = useRef<any>();
  const contentRef = useRef<any>();
  const {
    chart,
    rowKey,
    columns,
    bordered,
    dataExport,
    rowSelection,
    exportFileName,
    requestPageList,
    onPaginationChange,
    paginationShowTotal,
  } = props;

  useEffect(() => {
    const height = headerRef.current.offsetHeight;
    chartRef.current.style.height = `calc(100% - ${height}px)`;
  }, []);

  // Table 组件使用的 columns
  const tableColumns = useMemo(() => {
    return columns.filter((column) => !column.hideInTable);
  }, [columns]);

  // 条件查询使用的 columns
  const searchColumns = useMemo(() => {
    return columns.filter((column) => !column.hideInSearch);
  }, [columns]);

  // 请求数据
  const sendRequestPageList = useCallback(async (query: RequestPageListParma, showLoading = true) => {
    showLoading && setState({ loading: true });

    try {
      const response = await requestPageList(query);

      const { data, code } = response;
      if (code === 0) {
        const { list: pageList, total, pageSize, pageNum } = data;
        setState({ pageList, total, pageSize, pageNum });
      }
    } finally {
      setState({ loading: false });
    }
  }, []);

  useEffect(() => {
    onPaginationChange?.(pageNum, pageSize);
  }, [pageSize, pageNum]);

  const onPageSizeChange = useCallback(
    (_: any, pageSize: number) => {
      setState({ pageSize, pageNum: 1 });
      sendRequestPageList({ pageSize, pageNum: 1, ...searchCondition });
    },
    [searchCondition],
  );

  const onPageNumChange = useCallback(
    (pageNum: number) => {
      setState({ pageNum });
      sendRequestPageList({ pageSize, pageNum, ...searchCondition });
    },
    [pageSize, searchCondition],
  );

  // 开始分析
  const handleSubmit = useCallback(
    async (values: any) => {
      setState({ spinning: true });
      const condition = processFormValueAccordingColumns(values, searchColumns) as SearchCondition;
      setState({ searchCondition: condition, pageNum: 1 });
      // events.emit('searchConditionChange', condition);
      // delay(1500);
      try {
        await sendRequestPageList({ pageSize, pageNum: 1, ...condition }, false);
        handleExpand(false);
      } finally {
        setState({ spinning: false });
      }
    },
    [searchColumns, pageSize],
  );

  // 导出数据
  const handleExport = useCallback(
    async (values: any) => {
      const exportCondition = processFormValueAccordingColumns(values, searchColumns) as SearchCondition;
      try {
        const file = await dataExport!({ ...exportCondition, pageSize, pageNum });
        if (file.data.type === 'application/json') throw new Error('文件下载失败');
        downLoadFile(exportFileName! || file.fileName, file.data);
      } catch (error) {
        message.warning('文件下载失败');
      }
    },
    [dataExport, exportFileName, searchColumns, pageNum, pageSize],
  );

  // 地图展开、地图收起
  const handleExpand = useCallback((value: boolean) => {
    if (value) {
      const height = headerRef.current.offsetHeight;
      chartRef.current.style.height = `calc(100% - ${height}px)`;
      contentRef.current.scrollTop = 0;
      setTimeout(() => (contentRef.current.style.overflow = 'hidden'), 500);
    } else {
      chartRef.current.style.height = '50%';
      setTimeout(() => (contentRef.current.style.overflow = 'auto'), 500);
    }
    setState({ expandChart: value });
  }, []);

  return (
    <div className={classes.page_container}>
      <Spin spinning={spinning} tip="正在分析" className={classes.loading} />
      <div ref={chartRef} className={classes.chart}>
        {chart}
      </div>

      <div ref={contentRef} className={classes.content}>
        <ListPageHeader
          ref={headerRef}
          expand={expandChart}
          columns={searchColumns}
          onSubmit={handleSubmit}
          onExport={handleExport}
          onExpand={handleExpand}
          showExport={!!dataExport}
          initialValues={initialSearchCondition}
        />
        <div style={{ padding: '0 24px', border: 'none', background: '#fff' }}>
          <Table
            columns={tableColumns}
            dataSource={pageList}
            rowKey={rowKey || 'smid'}
            loading={loading}
            pagination={false}
            bordered={bordered}
            rowSelection={rowSelection}
          />
          {total > 0 && (
            <Pagination
              className={classes.pagination}
              total={total}
              pageSize={pageSize}
              current={pageNum}
              showSizeChanger
              showTotal={paginationShowTotal}
              onShowSizeChange={onPageSizeChange}
              onChange={onPageNumChange}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(ListPageContent);
