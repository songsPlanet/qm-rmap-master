import React from 'react';
import type { ReactElement } from 'react';
interface TPopupPanel {
    ifCenter?: boolean;
    vector: {
        id: string;
        title: string;
        template: ReactElement;
    }[];
    wms?: {
        baseUrl: string;
        layers: {
            id: string;
            title: string;
            template: ReactElement;
            layerName: string;
        }[];
    };
}
declare const _default: React.MemoExoticComponent<(props: TPopupPanel) => import("react/jsx-runtime").JSX.Element>;
export default _default;
