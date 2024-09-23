import type { MapWrapper } from 'qm-map-wrapper';
export interface TMapContext {
    map: MapWrapper | null;
}
export declare const MapContext: import("react").Context<TMapContext>;
export declare const useMap: () => TMapContext;
