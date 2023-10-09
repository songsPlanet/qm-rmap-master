import { forwardRef, useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { Button, Col, Row, Form, Input, Select, DatePicker, Cascader } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import classes from './index.module.less';
import { throttle, isEmpty } from '@/utils';
import SorterComp from '../SorterComp';

const FormItem = Form.Item;
const SelectOption = Select.Option;
const LABEL_COL = { span: 6 };
const WRAPPER_COL = { span: 17 };

enum ColSize {
  xxl = 6,
  xl = 8,
  // eslint-disable-next-line
  lg = 8,
  sm = 12,
  // eslint-disable-next-line
  md = 12,
  xs = 24,
}
type SorterList = { field: string; label: string }[];
type OrderList = { field: string; direction: boolean }[];
// 计算屏幕的宽度
function clientWidth() {
  return window.innerWidth || document.documentElement.clientWidth;
}

// 计算一行可以盛放几个 Col 盒子
function computedColSpan(width?: number): number {
  if (!width) width = clientWidth();
  if (width > 1600) return ColSize.xxl;
  if (width > 1200) return ColSize.xl;
  if (width > 992) return ColSize.lg;
  if (width > 768) return ColSize.md;
  if (width > 576) return ColSize.sm;
  return ColSize.xs;
}

export type Column = {
  // 用作 FormItem 的 name 字段， 如果该字段没有则取 dataIndex。
  name?: string;
  // 标题
  title: string;
  // 等同 FormItem 的 label，如果没有该字段取 title
  label?: string;
  dataIndex?: string;
  // 渲染的表单类型，可以是 select、rangePicker
  renderType?: string;
  // 当 renderType === select 时，渲染 Select.Option 时的 value 取值
  keyNameForValue?: string;
  // 当 renderType === select 时，渲染 Select.Option 时的 title 取值
  keyNameForKey?: string;
  // 用来过滤 columns，
  hideInSearch?: boolean;
  hideInTable?: boolean;
  // 在 Select 组件中，用作 下拉选项的列表；其他组件时用作组件的 props 使用
  options?: any;
  // 在表单查询之前的行为，value 是 Form 表单传递的值，通过此方法可以对值进行修改。
  beforeSubmitBehavior?: (value: any) => any;
  placeholder?: string;
  sorterList?: SorterList;
};

export type Columns = Column[];

// 根据 columns 处理 Form，并得到我们需要的内容。
export function processFormValueAccordingColumns(values: any, columns: Column[]) {
  const formValue = {} as { [propName: string]: any };

  // 在对表单查询之前，我要需要遍历 columns 数组，查看是否有自定义的行为
  for (let i = 0; i < columns.length; i++) {
    const { name, dataIndex, beforeSubmitBehavior } = columns[i];
    // 通过 name/dataIndex 获取表单的值，name 优先于 dataIndex。
    const value = values[name! || dataIndex!];
    if (value === null || value === undefined) continue;

    // beforeSubmitBehavior 必须要要返回一个有效的值，并最终做为表单查询的条件。
    if (typeof beforeSubmitBehavior === 'function') {
      const fieldValue = beforeSubmitBehavior(value);
      Object.assign(formValue, fieldValue);
    } else {
      formValue[name! || dataIndex!] = value;
    }
  }
  return formValue;
}

type PageHeaderProps = {
  expand: boolean;
  columns: Columns;
  initialValues?: {};
  showExport: boolean;
  onSubmit: (values: {}) => void;
  onExport?: (values: {}) => void;
  onExpand: (value: boolean) => void;
};

function PageHeader(props: PageHeaderProps, ref: any) {
  // 每个 Col 组件的 span 值
  const [colSpan, setColSpan] = useState(() => computedColSpan());
  // 是否展开（显示所有的查询条件）
  const [expand, setExpand] = useState(props.expand);
  // 排序字段
  const [orderList, setOrderList] = useState<OrderList>([]);
  // 判断是否为内部修改
  const isModifiedInside = useRef(false);
  const { columns, onExpand, onSubmit, onExport, showExport, initialValues } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    if (isModifiedInside.current) {
      isModifiedInside.current = false;
      return;
    }
    setExpand(() => props.expand);
  }, [props.expand]);

  useEffect(() => {
    function resize() {
      const colSpan = computedColSpan();
      setColSpan(() => colSpan);
    }

    const hanleResize = throttle(resize, 200);

    window.addEventListener('resize', hanleResize, false);
    return () => {
      window.removeEventListener('resize', hanleResize, false);
    };
  }, []);

  // 排序变更
  const handleChangeOrderList = useCallback((field: string, sort: 'asc' | 'desc') => {
    const newOrderList = [...orderList];
    const target = newOrderList.find((item) => item.field === field);
    if (target) {
      target.direction = sort === 'asc';
    } else {
      newOrderList.push({ field, direction: sort === 'asc' });
    }
    setOrderList(() => newOrderList);
  }, []);

  // 渲染查询表单内容
  const renderFormContext = useMemo(() => {
    const formContext = [];
    let sorter: SorterList = [];

    for (let i = 0; i < columns.length; i++) {
      const {
        name,
        title,
        label,
        options,
        dataIndex,
        renderType,
        sorterList,
        placeholder,
        keyNameForKey,
        keyNameForValue,
      } = columns[i];

      let contextItem = null;

      if (renderType === 'sorter') {
        sorter = sorter.concat(sorterList!);
        continue;
      }

      if (renderType === 'select') {
        contextItem = (
          <Select allowClear placeholder={placeholder || `请选择您要查询的${title}`}>
            {options.map((item: any) => (
              <SelectOption value={item[keyNameForValue || 'value']} key={item[keyNameForValue || 'value']}>
                {item[keyNameForKey || 'label']}
              </SelectOption>
            ))}
          </Select>
        );
      } else if (renderType === 'cascader') {
        contextItem = (
          <Cascader
            options={options}
            placeholder={placeholder || `请选择您要查询的${title}`}
            allowClear={false}
            changeOnSelect
          />
        );
      } else if (renderType === 'rangePicker') {
        contextItem = <DatePicker.RangePicker format="YYYY-MM-DD" {...options} />;
      } else if (renderType === 'datePicker') {
        contextItem = <DatePicker format="YYYY-MM-DD" {...options} style={{ minWidth: 200, width: '100%' }} />;
      } else {
        contextItem = <Input placeholder={placeholder || `请输入要查询的${title}`} allowClear autoComplete="off" />;
      }

      formContext.push(
        <Col sm={12} md={12} lg={8} xl={8} xxl={6} key={`key-${i}`}>
          <FormItem label={label || title} name={name || dataIndex}>
            {contextItem}
          </FormItem>
        </Col>,
      );
    }

    const sorterContext = isEmpty(sorter)
      ? null
      : sorter.map((item) => {
          const direction = orderList.find((order) => order.field === item.field)?.direction ?? true;
          return (
            <SorterComp
              key={item.label}
              value={direction ? 'asc' : 'desc'}
              onChange={handleChangeOrderList}
              style={{ marginRight: 30 }}
              {...item}
            />
          );
        });

    return [formContext, sorterContext];
  }, [colSpan, expand, columns, handleChangeOrderList, orderList]);

  // 计算最后一个 Col 组件的 offset 偏移量
  const offsetColSpan = useMemo(() => {
    // 说明内部含有排序内容
    const count = renderFormContext[1] ? 2 : 1;
    // 一行可以盛放几个 Col 组件
    const cols = 24 / colSpan;

    // 排序内容存在，则将排序内容放到【开始分析】按钮那一列，所以 total 需要减一。
    const total = columns.length - (renderFormContext[1] ? 1 : 0);

    if (cols - total > count) return (cols - total - count) * colSpan;

    // 取模，表示最后一行会有几个 Col 组件
    const remainder = total % cols;
    // 计算【查询】按钮所在的 Col 组件的 offsetSpan 数。
    const offsetSpan = (cols - count - remainder) * colSpan;
    if (offsetSpan < 0) return (cols - count) * colSpan;
    return offsetSpan;
  }, [columns, colSpan, renderFormContext[1]]);

  // 展开/收起
  const handleChangeExpand = useCallback(() => {
    isModifiedInside.current = true;
    setExpand(!expand);
    onExpand?.(!expand);
  }, [onExpand, expand]);

  const handleFinish = useCallback(
    (values: {}) => onSubmit?.({ ...values, orderList: orderList }),
    [onSubmit, orderList],
  );

  // const handleReset = useCallback(() => {
  //   setOrderList(() => []);
  //   const values = form.getFieldsValue();
  //   const params: any = {};
  //   for (let key in values) {
  //     if (values.hasOwnProperty(key) && typeof values[key] !== 'undefined') {
  //       params[key] = values[key];
  //     }
  //   }
  //   onSubmit?.(params);
  // }, [onSubmit]);

  const handleExport = useCallback(() => onExport?.(form.getFieldsValue()), [form, onExport]);
  const scale = !renderFormContext[1] ? 1 : 2;
  return (
    <div className={classes.header} ref={ref}>
      <Form
        form={form}
        name="basic"
        labelCol={LABEL_COL}
        onFinish={handleFinish}
        wrapperCol={WRAPPER_COL}
        // onReset={handleReset}
        // initialValues={initialValues}
      >
        <Row className={classes.row_start}>
          {renderFormContext[0]}
          <Col
            sm={12 * scale}
            md={12 * scale}
            lg={8 * scale}
            xl={8 * scale}
            xxl={6 * scale}
            offset={offsetColSpan}
            className={classes.button_groups}
          >
            <Button type="primary" htmlType="submit" style={{ marginRight: 30 }}>
              开始分析
            </Button>
            {renderFormContext[1]}
            <Button type="link" onClick={handleChangeExpand}>
              {expand ? '收起地图' : '展开地图'}
              <span className={`${classes.expandChartIcon}${expand ? ' ' + classes.up : ''}`}>
                <DownOutlined />
              </span>
            </Button>
            {showExport && (
              <Button type="link" onClick={handleExport}>
                下载清单
              </Button>
            )}
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default forwardRef(PageHeader);
