import React from 'react';
import { TMapLayerSettting } from '@/gis/typings';
import type { MapboxOptions } from 'mapbox-gl';
type TQueryGeocode = {
    open: boolean;
    image?: {
        url: string;
        id: string;
    };
    tdtkey: string;
    onOk?: (value: any) => void;
    onCancel?: () => void;
    mapSetting: TMapLayerSettting;
    mapOptions: MapboxOptions & {
        id: string;
    };
    region?: {
        bounds: number[];
        code?: number;
    };
};
export type TMapLocation = {
    location: string;
    longitude: number;
    latitude: number;
};
declare const _default: React.MemoExoticComponent<(props: TQueryGeocode) => React.JSX.Element>;
export default _default;
