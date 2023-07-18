import { Map as IMap, is } from 'immutable';
import { LngLatBounds } from 'mapbox-gl';
import moment from 'moment';
/**
 * 浅比较
 * @param obj1
 * @param obj2
 * @returns ture or false
 */
const shollawEqual = (obj1: any, obj2: any): boolean => {
  if (obj1 === obj2) {
    return true;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) {
    return false;
  }

  for (let key of keys1) {
    if (!obj2.hasOwnProperty(key) || obj1[key] !== obj2[key]) {
      return false;
    }
  }

  return true;
};

/**
 * 深比较
 * @param obj1
 * @param obj2
 * @returns ture or false
 */
const deepEqual = (obj1: Object, obj2: Object): boolean => {
  const map1 = IMap(obj1);
  const map2 = IMap(obj2);
  return is(map1, map2);
};
/**
 * 生成UUID
 * @returns
 */
const generateUUID = () => {
  return 'FY' + moment().format('YYYYMMDDHHmmSSSS');
};

/**
 * 防抖
 * @param func：需要防抖处理的函数
 * @param delay：时间间隔
 */
const debounce = <T extends object>(func: Function, delay: number) => {
  let task: any = null;
  // 通过闭包缓存一个定时器id
  // 将debounce处理结果当做函数返回
  // 出发时间回调执行这个返回函数
  return (args: T) => {
    // 如果已经设定过定时器就清空上一次定时器
    if (task) {
      clearTimeout(task);
    }
    // 开始设定一个新的定时器，定时器结束后，执行传入的函数
    task = setTimeout(() => {
      func(args);
    }, delay);
  };
};

/**
 * 节流
 * @param func
 * @param delay
 */
const throttle = <T extends object>(func: Function, delay: number) => {
  let task: any = null;
  return (args: T) => {
    if (!task) {
      task = setTimeout(() => {
        task = null;
        func(args);
      }, delay);
    }
  };
};

/**
 * 转换树形数据为数组
 *  @param {*} list
 *  @param {*} tree
 */
const transTreeToArr = (list: any[], tree: any) => {
  if (!(Array.isArray(tree) && tree.length > 0)) return;
  tree.forEach((father) => {
    list.push(father);
    if (father.layers instanceof Array) {
      transTreeToArr(list, father.layers);
    }
  });
};

const loopBounds = (bound: LngLatBounds, coordinates: any) => {
  if (coordinates[0] instanceof Array) {
    coordinates.forEach((item: any) => {
      if (item[0] instanceof Array) {
        loopBounds(bound, item);
      } else {
        bound.extend(item);
      }
    });
  } else {
    bound.extend(coordinates);
  }
};

const getFeatureBoundingBox = (feature: any) => {
  const bounds = new LngLatBounds();
  loopBounds(bounds, feature.geometry.coordinates);
  return bounds;
};

const unique = (arr: any[], uniId: string) => {
  const res = new Map();
  return arr.filter((item) => !res.has(item[uniId]) && res.set(item[uniId], 1));
};

export { shollawEqual, deepEqual, generateUUID, debounce, throttle, transTreeToArr, getFeatureBoundingBox, unique };
