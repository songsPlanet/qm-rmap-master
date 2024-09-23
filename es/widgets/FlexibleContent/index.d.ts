import React from 'react';
import './index.less';
type TFlexibleContent = {
    title?: string;
    contentStyle?: any;
    children?: React.ReactNode;
    isOpenHandle?: () => void;
};
declare const _default: React.MemoExoticComponent<(props: TFlexibleContent) => React.JSX.Element>;
export default _default;
