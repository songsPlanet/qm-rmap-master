/**
 * 表格页面数据模型
 *
 */
import request from '@/utils/axios';

export const getYearList = () => request.post('/v1.0/table/getYear');

export const getRegions = (query: any) => request.post('/v1.0/table/getRegions', query);

export const getRegionPageList = (query: any) => request.post('/v1.0/table/getRegionPageList', query);

export const getCropTypeList = () => request.post('/v1.0/table/getCropTypeList');
