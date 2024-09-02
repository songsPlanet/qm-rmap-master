import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import type MapWrapper from '@/gis/wrapper/MapWrapper';
import type { TWidgetPosition } from '../BaseWidget';
import './index.less';
import React from 'react';
declare const _default: React.MemoExoticComponent<(props: {
    position: TWidgetPosition;
    map: MapWrapper;
}) => React.JSX.Element>;
export default _default;
