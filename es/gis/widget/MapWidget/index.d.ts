import type { TMapLayerSettting } from '../../mapboxgl/typings/TLayerOptions';
import React from 'react';
import MapWrapper from '../../mapboxgl/MapWrapper';
import type { MapboxOptions } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './index.less';
interface TMapProps {
    mapOptions: MapboxOptions & {
        id: string;
    };
    mapLayerSettting: TMapLayerSettting;
    children?: React.ReactNode;
    onMapLoad?: (map: MapWrapper) => void;
    className?: string;
}
declare function MapWidget(props: TMapProps): import("react/jsx-runtime").JSX.Element;
declare const _default: React.MemoExoticComponent<typeof MapWidget>;
export default _default;
