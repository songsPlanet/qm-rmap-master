/**
 * 动画效果函数
 * @params t { number } 动画已执行次数
 * @params b { number } 当前位置
 * @params c { number } 变化量 目标位置 - 当前位置
 * @params d { number } 动画共需要执行多少次
 * @return { number }
 * @author shenxuxiang
 */
export declare const linear: (t: number, b: number, c: number, d: number) => number;
export declare const easeIn: (t: number, b: number, c: number, d: number) => number;
export declare const easeOut: (t: number, b: number, c: number, d: number) => number;
export declare const easeInOut: (t: number, b: number, c: number, d: number) => number;
export declare function QuadEaseIn(t: number, b: number, c: number, d: number): number;
export declare function QuadEaseOut(t: number, b: number, c: number, d: number): number;
export declare function QuadEaseInOut(t: number, b: number, c: number, d: number): number;
export type TweenAttrNames = 'linear' | 'easeIn' | 'easeOut' | 'easeInOut' | 'QuadEaseIn' | 'QuadEaseOut' | 'QuadEaseInOut';
declare const _default: {
    linear: (t: number, b: number, c: number, d: number) => number;
    easeIn: (t: number, b: number, c: number, d: number) => number;
    easeOut: (t: number, b: number, c: number, d: number) => number;
    easeInOut: (t: number, b: number, c: number, d: number) => number;
    QuadEaseIn: typeof QuadEaseIn;
    QuadEaseOut: typeof QuadEaseOut;
    QuadEaseInOut: typeof QuadEaseInOut;
};
export default _default;
