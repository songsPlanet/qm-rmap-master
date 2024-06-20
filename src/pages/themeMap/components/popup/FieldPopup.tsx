import { Descriptions } from 'antd';
import { memo, useMemo } from 'react';

const FieldPopup = (props: { data?: any }) => {
  const { data } = props;
  const fieldMap = useMemo(() => {
    return [
      {
        name: 'dkbm',
        text: '地块编码',
      },
      {
        name: 'dkmc',
        text: '地块名称',
      },
      {
        name: 'zjrxm',
        text: '确权人名称',
      },
      {
        name: 'scmjm',
        text: '实测面积',
        func: () => `${data['scmjm']}亩`,
      },
      {
        name: 'XZQH',
        text: '行政区划',
        func: () => `${data['sjxzqh']}-${data['xjxzqh']}-${data['xzxzqh']}-${data['cjxzqh']}`,
      },
    ];
  }, [data]);
  return (
    <Descriptions column={1} layout="horizontal" bordered size="small">
      {fieldMap.map((d) => (
        <Descriptions.Item key={d.name} label={d.text}>
          {d.func ? d.func() : data[d.name]}
        </Descriptions.Item>
      ))}
    </Descriptions>
  );
};
export default memo(FieldPopup);
