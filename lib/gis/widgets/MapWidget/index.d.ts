import React from 'react';
import { TMapLayerSettting } from '@/gis/typings';
import MapWrapper from '../../wrapper/MapWrapper';
import type { MapboxOptions } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './index.less';
interface TMapProps {
    mapOptions: MapboxOptions & {
        id: string;
    };
    mapLayerSettting: TMapLayerSettting;
    className?: string;
    children?: React.ReactNode;
    onMapLoad?: (map: MapWrapper) => void;
}
declare function MapWidget(props: TMapProps): import("react/jsx-runtime").JSX.Element;
declare const _default: React.MemoExoticComponent<typeof MapWidget>;
export default _default;
