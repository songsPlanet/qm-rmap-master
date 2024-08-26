import type { LngLatLike, PopupOptions } from 'mapbox-gl';
import React from 'react';
import MapWrapper from '../../wrapper/MapWrapper';
import type { ReactNode } from 'react';
import { Popup } from 'mapbox-gl';
import './index.less';
export type PopupEvent = {
    type: 'open' | 'close';
    target: Popup;
};
export type TPopupWrapper = PopupOptions & {
    map: MapWrapper;
    children: ReactNode;
    lngLat: LngLatLike;
    enableDrag?: boolean;
    title: string;
    onOpen?: (e: PopupEvent) => void;
    onClose?: (e: any) => void;
};
declare const _default: React.MemoExoticComponent<(props: TPopupWrapper) => React.ReactPortal>;
export default _default;
