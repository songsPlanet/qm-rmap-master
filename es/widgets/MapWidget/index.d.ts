import { TMapLayerSetting, MapWrapper } from 'qm-map-wrapper';
import React from 'react';
import type { MapboxOptions } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './index.less';
interface TMapProps {
    mapOptions: MapboxOptions & {
        id: string;
    };
    mapLayerSettting: TMapLayerSetting;
    className?: string;
    children?: React.ReactNode;
    onMapLoad?: (map: MapWrapper) => void;
}
declare function MapWidget(props: TMapProps): React.JSX.Element;
declare const _default: React.MemoExoticComponent<typeof MapWidget>;
export default _default;
