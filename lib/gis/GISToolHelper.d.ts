import { LngLatBounds } from 'mapbox-gl';
declare class GisToolHelper {
    /**
 * 浅比较
 * @param obj1
 * @param obj2
 * @returns ture or false
 */
    static shollawEqual: (obj1: any, obj2: any) => boolean;
    /**
     * 深比较
     * @param obj1
     * @param obj2
     * @returns ture or false
     */
    static deepEqual: (obj1: Object, obj2: Object) => boolean;
    /**
     * 生成UUID
     * @returns
     */
    static generateUUID: () => string;
    /**
 * 防抖
 * @param func：需要防抖处理的函数
 * @param delay：时间间隔
 */
    static debounce: <T extends object>(func: Function, delay: number) => (args: T) => void;
    /**
 * 节流
 * @param func
 * @param delay
 */
    static throttle: <T extends object>(func: Function, delay: number) => (args: T) => void;
    /**
 * 转换树形数据为数组
 *  @param {*} list
 *  @param {*} tree
 */
    static transTreeToArr: (list: any[], tree: any) => void;
    static loopBounds: (bound: LngLatBounds, coordinates: any) => void;
    /**
     * 获取边界：
     * return：LngLatBounds
     */
    static getFeatureBoundingBox: (feature: any) => LngLatBounds;
    /**
 * 16位转换为rgba
 * @param color
 * @param opacity
 * @returns {string}
 * @private
 */
    static convertHexToRGB: (color: any, opacity?: number) => string;
    /**
* 16位转换为rgba
* @param color
* @param opacity
* @returns {string}
* @private
*/
    static unique: (arr: any[], uniId: string) => any[];
    /**
 *十进制转度分秒
 * @returns {{}}
 */
    static decimalToDms: (decimal: any) => {
        degrees: number;
        minutes: number;
        seconds: number;
    };
    /**
     * 已知一点经纬度，方位角，距离求另一点的坐标
     *  @param  {number[]} 已知点经纬度
     *  @param  {number}  方位角
     *  @param  {number} 距离
     */
    static calcPointByPointAndDistance: (pointA: number[], brng: number, dist: number) => number[];
    /**
     * 度换成弧度
     * @param  {number} d 度
     * @return {number} 弧度
     */
    static rad: (d: number) => number;
    /**
     * 弧度换成度
     * @param  {number} x 弧度
     * @return {number}   度
     */
    static deg: (x: number) => number;
    /**
     *创建Polygon的geojson 数据
     * coords ：[[],[],...]
     * @returns {{}}
     */
    static createPolygonFeatureCollection: (coords: any) => {
        type: string;
        features: {
            type: string;
            geometry: {
                type: string;
                coordinates: any[];
            };
        }[];
    };
    /**
     * 创建Point的FeatureCollection
     * @param lonlat 经纬度数组
     * lat: 纬度
     * @returns {{}}
     */
    static createPointFeatureCollection: (lonlat: number[]) => {
        type: string;
        features: {
            type: string;
            geometry: {
                type: string;
                coordinates: number[];
            };
        }[];
    };
    /**
     *创建lineString的geojson 数据
     * coordinates ：[[],[],...]
     * @returns {{}}
     */
    static createLineFeatureCollection: (coords: any) => {
        type: string;
        features: {
            type: string;
            geometry: {
                type: string;
                coordinates: any;
            };
        }[];
    };
}
export default GisToolHelper;
