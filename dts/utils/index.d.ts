export { default as request } from '@/utils/axios';
export { default as useReducer } from './useReducer';
export { default as events } from './events';
export declare function getType(data: any): string;
export declare function isArray<T>(data: any): data is T[];
export declare function isObject(data: any): data is object;
export declare function isMap<K, V>(data: any): data is Map<K, V>;
export declare function isSet<T>(data: any): data is Set<T>;
export declare function isEmpty(data: null | undefined | object | Array<any> | Map<any, any> | Set<any>): boolean;
/**
 * 获取文件后缀名
 * @param filename 完整的文件名
 * @returns
 */
export declare function extName(filename: string): string;
export declare function objectIs(v1: any, v2: any): boolean;
export declare function shallowEqual(obj1: any, obj2: any): boolean;
/**
 * 防抖
 * @param func        防抖的方法
 * @param delay       防抖的时间间隔
 * @param immediately 是否立即执行 func
 * @returns
 */
export declare function debounce(func: Function, delay: number, immediately?: boolean): (...args: any[]) => void;
/**
 * 节流
 * @param func        节流的方法
 * @param delay       节流的时间间隔
 * @param immediately 是否立即执行 func
 * @returns
 */
export declare function throttle(func: Function, delay: number, immediately?: boolean): (...args: any[]) => void;
/**
 * 延迟执行函数
 * @param time  延迟执行的的时间
 * @param value 期望得到的值。如果 value 是一个 Error 实例则返回 rejected promise，否则返回 fulfuilled promise
 * @returns
 */
export declare function delay<T>(time: number, value: T): Promise<T>;
export declare function setLocalStorage(key: string, value: any): void;
export declare function getLocalStorage(key: string): any;
/**
 * 数字格式化，toFixed(990000000, 10000, 2) => 99000.00(单位：万)
 * @param value   需要计算的数值
 * @param divisor 格式化的单位（万：10000，百万：1000000）
 * @param float   保留的小数
 * @returns
 */
export declare function toFixed(value: string | number, divisor?: number, float?: number): string;
