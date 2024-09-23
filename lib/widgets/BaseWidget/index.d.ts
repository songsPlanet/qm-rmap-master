import React from 'react';
import type { ReactNode } from 'react';
import './index.less';
export interface TWidgetPosition {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
}
export interface TWidgetOptions {
    position: TWidgetPosition;
    children: ReactNode;
    name?: string;
    icon: string;
    width?: number;
    height?: number;
    openHandle?: (value: boolean) => void;
}
declare const _default: React.MemoExoticComponent<(props: TWidgetOptions) => React.JSX.Element>;
export default _default;
