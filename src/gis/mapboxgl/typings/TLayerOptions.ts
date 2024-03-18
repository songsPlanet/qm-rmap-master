import { AnyLayer, Layer } from 'mapbox-gl';
import { CSSProperties } from 'react';
import { IDataResolver } from './TResolver';

export type TLegendItemOptions = {
  imageId?: string;
  style?: CSSProperties;
  text?: string;
};

export type TLegendControlOptions = TLegendItemOptions & {
  title?: string;
  items?: TLegendItemOptions[];
};

export type TLayerOptions = AnyLayer &
  Layer & {
    name: string;
    isAdd?: boolean;
    legend?: TLegendControlOptions;
    LayerName?: string;
    dataResolver?: IDataResolver;
    canUpdate?: boolean;
  };

export interface TLayerGroupOptions {
  id: string;
  name: string;
  isAdd?: boolean; // 通过子图层计算而来
  type: 'layerGroup' | 'logicGroup';
  legend?: TLegendControlOptions;
  layers: Array<TLayerOptions | TLayerGroupOptions>;
}

export type TLayerSetingOptions = TLayerGroupOptions | TLayerOptions;

export type TMapLayerSettting = Array<TLayerSetingOptions>;
