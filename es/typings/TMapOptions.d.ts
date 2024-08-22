import type { MapboxOptions } from 'mapbox-gl';
export type TMapOptions = MapboxOptions & {
    id: string;
};
export declare const mapOptionsJS: TMapOptions;
export declare const mapOptionsWH: TMapOptions;
