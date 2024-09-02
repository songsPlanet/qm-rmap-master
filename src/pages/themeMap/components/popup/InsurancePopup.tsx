// import { getInsuranceListApi } from '@/services/piccClaimsAnalyse';
import { Descriptions, List } from 'antd';
import React from 'react';
import { memo, useEffect, useMemo, useState } from 'react';
const InsurancePopup = (props: { data?: { dkbm: string } }) => {
  const { data } = props;
  const [list, setList] = useState([]);
  const fieldMap = useMemo(() => {
    return [
      {
        name: 'dkbm',
        text: '地块编码',
      },
      {
        name: 'policyNo',
        text: '保单号',
      },
      {
        name: 'holder',
        text: '投保人',
      },
      {
        name: 'subjectName',
        text: '承保险种',
      },
      {
        name: 'signTime',
        text: '签单日期',
      },
      {
        name: 'policyStartTime',
        text: '保险起止日期',
        func: (data: any) => `${data['policyStartTime']}-${data['policyEndTime']}`,
      },
      {
        name: 'cbfmc',
        text: '地块承包方',
      },
      {
        name: 'scmjm',
        text: '确权面积',
        func: (data: any) => `${data['scmjm']}亩`,
      },
      {
        name: 'subjectAddress',
        text: '地址',
      },
    ];
  }, []);

  // const getInsuranceList = (value: string) => {
  //   // getInsuranceListApi(value).then((ctx: any) => {
  //   //   const temp = ctx?.data || [];
  //   //   setList(temp);
  //   // });
  // };

  // useEffect(() => {
  //   if (data?.dkbm) {
  //     getInsuranceList(data?.dkbm);
  //   }
  // }, [data?.dkbm]);
  return (
    <List
      itemLayout="vertical"
      size="small"
      pagination={{
        pageSize: 1,
      }}
      loading={list.length === 0}
      dataSource={list}
      renderItem={(item: any) => (
        <List.Item key={item.insuranceNo}>
          <Descriptions column={1} layout="horizontal" bordered size="small">
            {fieldMap.map((d) => (
              <Descriptions.Item key={d.name} label={d.text}>
                {d.func ? d.func(item) : item[d.name]}
              </Descriptions.Item>
            ))}
          </Descriptions>
        </List.Item>
      )}
    />
  );
};
export default memo(InsurancePopup);
