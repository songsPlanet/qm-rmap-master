interface Listeners {
    [propsName: string]: Array<Function>;
}
export declare class EventEmitter {
    listeners: Listeners;
    constructor();
    emit(type: string, ...args: Array<any>): void;
    add(type: string, fn: Function): void;
    remove(type: string, fn?: Function): void;
}
declare const _default: EventEmitter;
export default _default;
