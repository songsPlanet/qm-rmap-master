import MapWrapper from '../wrapper/MapWrapper';
import { Marker } from 'mapbox-gl';
import './index.less';
declare class PolygonMeasure {
    uuid: string;
    map: MapWrapper;
    isMeasure: boolean;
    ele: any;
    ifMu: boolean;
    tooltip: any;
    points: any[];
    markers: Marker[];
    jsonPoint: any;
    jsonLine: any;
    constructor(map: MapWrapper, ifMu?: boolean);
    generateId(): string;
    addPoint: (coords: any) => void;
    getArea: (coords: any) => any;
    mapClickHandle: (e: any) => void;
    mapMouseMoveHandle: (e: any) => void;
    mapDbclickHandle: (e: any) => void;
    start(): void;
    clearDrawEventListener(): void;
    clearMeasure(): void;
}
export default PolygonMeasure;
