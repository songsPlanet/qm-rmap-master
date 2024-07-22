// import { getInsuranceListApi } from '@/services/piccClaimsAnalyse';
import { Descriptions, List } from 'antd';
import React from 'react';
import { memo, useEffect, useMemo, useState } from 'react';
const ProtectionPopup = (props: { data?: any }) => {
  const { data } = props;
  const [list, setList] = useState([]);
  const fieldMap = useMemo(() => {
    return [
      {
        name: 'dwlx',
        text: '地物类型',
      },
      {
        name: 'jcnf',
        text: '监测年份',
      },
      {
        name: 'dwmj',
        text: '地物面积',
        func: () => `${data['dwmj']}- 亩`,
      },

      {
        name: 'XZQH',
        text: '行政区划',
        func: () => `${data['sjxzqh']}-${data['xjxzqh']}`,
      },
    ];
  }, [data]);

  // const getInsuranceList = (value: string) => {
  //   getInsuranceListApi(value).then((ctx: any) => {
  //     const temp = ctx?.data || [];
  //     setList(temp);
  //   });
  // };

  // useEffect(() => {
  //   if (data?.dkbm) {
  //     getInsuranceList(data?.dkbm);
  //   }
  // }, [data?.dkbm]);
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
export default memo(ProtectionPopup);
