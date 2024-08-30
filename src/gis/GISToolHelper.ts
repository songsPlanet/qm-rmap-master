import { Map as IMap, is } from 'immutable';
import { LngLatBounds } from 'mapbox-gl';
import moment from 'moment';

class GisToolHelper {
    /**
 * 浅比较
 * @param obj1
 * @param obj2
 * @returns ture or false
 */
    public static shollawEqual = (obj1: any, obj2: any): boolean => {
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
    public static deepEqual = (obj1: Object, obj2: Object): boolean => {
        const map1 = IMap(obj1);
        const map2 = IMap(obj2);
        return is(map1, map2);
    };

    /**
     * 生成UUID
     * @returns
     */
    public static generateUUID = () => {
        return 'FY' + moment().format('YYYYMMDDHHmmSSSS');
    };

    /**
 * 防抖
 * @param func：需要防抖处理的函数
 * @param delay：时间间隔
 */
    public static debounce = <T extends object>(func: Function, delay: number) => {
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
    public static throttle = <T extends object>(func: Function, delay: number) => {
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

    public static transTreeToArr = (list: any[], tree: any) => {
        if (!(Array.isArray(tree) && tree.length > 0)) return;
        tree.forEach((father) => {
            list.push(father);
            if (father.layers instanceof Array) {
                this.transTreeToArr(list, father.layers);
            }
        });
    };

    public static loopBounds = (bound: LngLatBounds, coordinates: any) => {
        if (coordinates[0] instanceof Array) {
            coordinates.forEach((item: any) => {
                if (item[0] instanceof Array) {
                    this.loopBounds(bound, item);
                } else {
                    bound.extend(item);
                }
            });
        } else {
            bound.extend(coordinates);
        }
    };

    /**
     * 获取边界：
     * return：LngLatBounds
     */
    public static getFeatureBoundingBox = (feature: any) => {
        const bounds = new LngLatBounds();
        this.loopBounds(bounds, feature.geometry.coordinates);
        return bounds;
    };

    /**
 * 16位转换为rgba
 * @param color
 * @param opacity
 * @returns {string}
 * @private
 */
    public static convertHexToRGB = (color: any, opacity = 1) => {
        if (color.length === 4) {
            let extendedColor = '#';
            for (let i = 1; i < color.length; i++) {
                extendedColor += color.charAt(i) + color.charAt(i);
            }
            color = extendedColor;
        }
        const values = {
            r: parseInt(color.substr(1, 2), 16),
            g: parseInt(color.substr(3, 2), 16),
            b: parseInt(color.substr(5, 2), 16),
        };
        return `rgba(${values.r}, ${values.g}, ${values.b}, ${opacity})`;
    };

    /**
* 16位转换为rgba
* @param color
* @param opacity
* @returns {string}
* @private
*/
    public static unique = (arr: any[], uniId: string) => {
        const res = new Map();
        return arr.filter((item) => !res.has(item[uniId]) && res.set(item[uniId], 1));
    };

    /**
 *十进制转度分秒
 * @returns {{}}
 */
    public static decimalToDms = (decimal: any) => {
        // 提取整数部分
        const degrees = Math.floor(decimal);
        // 计算小数部分并转换为百分比
        const minutesAndSeconds = (decimal - degrees) * 60;
        // 提取分钟部分
        const minutes = Math.floor(minutesAndSeconds);
        // 计算秒钟部分
        const seconds = Math.round((minutesAndSeconds - minutes) * 60);

        return { degrees, minutes, seconds };
    };

    /**
     * 已知一点经纬度，方位角，距离求另一点的坐标
     *  @param  {number[]} 已知点经纬度
     *  @param  {number}  方位角
     *  @param  {number} 距离
     */
    public static calcPointByPointAndDistance = (pointA: number[], brng: number, dist: number) => {
        const VincentyConstants = {
            a: 6378137,
            b: 6356752.3142,
            f: 1 / 298.257223563,
        };
        const a = VincentyConstants.a;
        const b = VincentyConstants.b;
        const f = VincentyConstants.f;

        const lon1 = pointA[0];
        const lat1 = pointA[1];

        const s = dist;

        const alpha1 = this.rad(brng);
        const sinAlpha1 = Math.sin(alpha1);
        const cosAlpha1 = Math.cos(alpha1);

        const tanU1 = (1 - f) * Math.tan(this.rad(lat1));
        const cosU1 = 1 / Math.sqrt(1 + tanU1 * tanU1);
        const sinU1 = tanU1 * cosU1;
        const sigma1 = Math.atan2(tanU1, cosAlpha1);
        const sinAlpha = cosU1 * sinAlpha1;
        const cosSqAlpha = 1 - sinAlpha * sinAlpha;
        const uSq = (cosSqAlpha * (a * a - b * b)) / (b * b);
        const A = 1 + (uSq / 16384) * (4096 + uSq * (-768 + uSq * (320 - 175 * uSq)));
        const B = (uSq / 1024) * (256 + uSq * (-128 + uSq * (74 - 47 * uSq)));

        let sigma = s / (b * A);
        let sigmaP = 2 * Math.PI;
        let cosSigma: any;
        let sinSigma: any;
        let cos2SigmaM: any;
        while (Math.abs(sigma - sigmaP) > 1e-12) {
            cos2SigmaM = Math.cos(2 * sigma1 + sigma);
            sinSigma = Math.sin(sigma);
            cosSigma = Math.cos(sigma);
            let deltaSigma =
                B *
                sinSigma *
                (cos2SigmaM +
                    (B / 4) *
                    (cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM) -
                        (B / 6) * cos2SigmaM * (-3 + 4 * sinSigma * sinSigma) * (-3 + 4 * cos2SigmaM * cos2SigmaM)));
            sigmaP = sigma;
            sigma = s / (b * A) + deltaSigma;
        }

        let tmp = sinU1 * sinSigma - cosU1 * cosSigma * cosAlpha1;
        let lat2 = Math.atan2(
            sinU1 * cosSigma + cosU1 * sinSigma * cosAlpha1,
            (1 - f) * Math.sqrt(sinAlpha * sinAlpha + tmp * tmp),
        );
        let lambda = Math.atan2(sinSigma * sinAlpha1, cosU1 * cosSigma - sinU1 * sinSigma * cosAlpha1);
        let C = (f / 16) * cosSqAlpha * (4 + f * (4 - 3 * cosSqAlpha));
        let L =
            lambda -
            (1 - C) * f * sinAlpha * (sigma + C * sinSigma * (cos2SigmaM + C * cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM)));

        let revAz = Math.atan2(sinAlpha, -tmp); // final bearing

        return [lon1 + this.deg(L), this.deg(lat2)];
    };

    /**
     * 度换成弧度
     * @param  {number} d 度
     * @return {number} 弧度
     */
    public static rad = (d: number) => {
        return (d * Math.PI) / 180.0;
    };
    /**
     * 弧度换成度
     * @param  {number} x 弧度
     * @return {number}   度
     */
    public static deg = (x: number) => {
        return (x * 180) / Math.PI;
    };

    /**
     *创建Polygon的geojson 数据
     * coords ：[[],[],...]
     * @returns {{}}
     */
    public static createPolygonFeatureCollection = (coords: any, prop: any) => {
        return {
            type: 'FeatureCollection',
            features: [
                {
                    type: 'Feature',
                    geometry: {
                        type: 'Polygon',
                        coordinates: [coords],
                    },
                    properties: prop
                },
            ],
        };
    };

    /**
     * 创建Point的FeatureCollection
     * @param lonlat 经纬度数组
     * lat: 纬度
     * @returns {{}}
     */

    public static createPointFeatureCollection = (lonlat: number[],prop:any) => {
        return {
            type: 'FeatureCollection',
            features: [
                {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: lonlat,
                    },
                    properties: prop,
                },
            ],
        };
    };

    /**
     *创建lineString的geojson 数据
     * coordinates ：[[],[],...]
     * @returns {{}}
     */
    public static createLineFeatureCollection = (coords: any, prop: any) => {
        return {
            type: 'FeatureCollection',
            features: [
                {
                    type: 'Feature',
                    geometry: {
                        type: 'LineString',
                        coordinates: coords,
                    },
                    properties: prop
                },
            ],
        };
    };
}

export default GisToolHelper;