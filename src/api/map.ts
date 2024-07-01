/**
 * 地图相关数据模型
 * 当你的页面不使用 redux 进行数据状态管理，可以参考。
 */

import request from '@/utils/axios';

/**
 * 获取分类
 *
 */
export const getSearchLayerListApi = (dictTypeCode: 'table_name') => {
  return request.post(`/v1.0/sysDict/list`, { dictTypeCode });
};

/**
 * 获取新型农业主体责任人人员列表
 * @param {string} keyword  承保方姓名 、承保方证件号.
 */
export const getXXNYZTUserListApi = (keyword: string) => {
  return request.post(`/v1.0/xxnyjyzt/getXxjyztList`, { keyword });
};

/**
 * 获取作物遥感识别图斑列表
 * @param {string} objectId 承保方主键.
 * @param {string} zwType 作物类型.
 */
export const getXxjyztListDetailApi = (id: string, tableName: string) => {
  return request.post(`/v1.0/xxnyjyzt/getXxjyztListDetail`, { id, tableName });
};

// 获取统计结果
export const queryStatisticResult = (query: any) => {
  return request.post(`/v1.0/statistic/getStatistic`, query);
};

// 获取轨迹数据
export const queryTrackLineResult = () => {
  return request.post(`/v1.0/geojson/getTrackLineGeo`);
};

// 获取行政区域geojson
export const queryRegionFeature = (code: any) => {
  return request.post(`/v1.0/geojson/getqueryRegionFeature`, code);
};
