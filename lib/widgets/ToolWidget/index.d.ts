import { TWidgetPosition } from '@/gis/widgets/BaseWidget';
import React from 'react';
type TToolWidget = {
    title: string;
    position: TWidgetPosition;
    children: React.ReactNode;
    openHandle: (value: any) => void;
};
declare const _default: React.MemoExoticComponent<(props: TToolWidget) => React.JSX.Element>;
export default _default;
