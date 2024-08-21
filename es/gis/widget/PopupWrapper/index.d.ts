import type { LngLatLike, PopupOptions } from 'mapbox-gl';
import { Popup } from 'mapbox-gl';
import type { ReactNode } from 'react';
import './index.less';
export type PopupEvent = {
    type: 'open' | 'close';
    target: Popup;
};
export type TPopupWrapper = PopupOptions & {
    children: ReactNode;
    lngLat: LngLatLike;
    enableDrag?: boolean;
    title: string;
    onOpen?: (e: PopupEvent) => void;
    onClose?: (e: PopupEvent) => void;
};
declare const _default: import("react").MemoExoticComponent<(props: TPopupWrapper) => import("react").ReactPortal>;
export default _default;
