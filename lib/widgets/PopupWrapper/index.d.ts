import type { LngLatLike, PopupOptions } from 'mapbox-gl';
import { MapWrapper } from 'qm-map-wrapper';
import type { ReactNode } from 'react';
import { Popup } from 'mapbox-gl';
import './index.less';
export type PopupEvent = {
    type: 'open' | 'close';
    target: Popup;
};
export type TPopupWrapper = PopupOptions & {
    title: string;
    map: MapWrapper;
    children: ReactNode;
    lngLat: LngLatLike;
    ifCenter?: boolean;
    enableDrag?: boolean;
    onOpen?: (e: PopupEvent) => void;
    onClose?: (e: any) => void;
};
declare const _default: import("react").MemoExoticComponent<(props: TPopupWrapper) => import("react").ReactPortal>;
export default _default;
