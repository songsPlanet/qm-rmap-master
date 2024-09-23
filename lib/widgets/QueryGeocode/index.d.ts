import { TMapOptions, TMapLayerSetting } from 'qm-map-wrapper';
import React from 'react';
type TQueryGeocode = {
    open: boolean;
    tdtkey: string;
    mapOptions: TMapOptions;
    mapSetting: TMapLayerSetting;
    image?: {
        url: string;
        id: string;
    };
    region?: {
        bounds: number[];
        code?: number;
    };
    onOk?: (value: any) => void;
    onCancel?: () => void;
};
export type TMapLocation = {
    location: string;
    longitude: number;
    latitude: number;
};
declare const _default: React.MemoExoticComponent<(props: TQueryGeocode) => React.JSX.Element>;
export default _default;
