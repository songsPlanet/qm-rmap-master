import type MapWrapper from '../mapboxgl/MapWrapper';
import { Marker } from 'mapbox-gl';
import './index.less';
declare class PolylineMeasure {
    uuid: string;
    map: MapWrapper;
    isMeasure: boolean;
    ele: any;
    tooltip: any;
    points: any[];
    markers: Marker[];
    jsonPoint: any;
    jsonLine: any;
    constructor(map: MapWrapper);
    generateId(): string;
    addPoint: (coords: any) => void;
    getLength: (coords: any) => any;
    addMeasureRes: (coords: any) => void;
    mapClickHandle: (e: any) => void;
    mapMouseMoveHandle: (e: any) => void;
    mapDbclickHandle: (e: any) => void;
    start(): void;
    clearDrawEventListener(): void;
    clearMeasure(): void;
}
export { PolylineMeasure };
