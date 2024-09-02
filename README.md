# qm-rmap

qm-rmap 是一款基于 React、Mapboxgl 的地图组件

## 安装

使用 npm 或 yarn 安装

```bash
npm install qm-rmap
yarn add qm-rmap

```

## 依赖

qm-rmap 开发依赖于mapbox-gl,turf.js 库

## 初始化使用

```js
import { MapWidget } from 'qm-rmap';
import type {  LngLatLike } from 'mapbox-gl';



const mapOptions = {
  id: 'map',
  center: [115.434038, 33.347523] as LngLatLike,
  container: '',
  zoom: 11,
  maxZoom: 18,
  pitch: 45,
};

const basemap: TLayerGroupOptions = {
  id: 'base_map',
  name: '基础底图',
  type: 'logicGroup',
  layers: [
    {
      id: 'tdt_img',
      name: '天地图-影像',
      type: 'raster',
      isAdd: true,
      source: {
        type: 'raster',
        tileSize: 256,
        tiles: [
          `http://t0.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${tianditukey}`,
        ],
      },
    }]}

const mapSetting:TMapLayerSettting=[basemap]

 const mapLoadHandle: any = (map: MapWrapper) => {}// mapbox中load事件的回调
 <MapWidget mapOptions={mapOptions} mapLayerSettting={mapSetting} onMapLoad={mapLoadHandle}>
        {children}
</MapWidget>

```

## 工具条使用-作为MapWidget-children
```js

  <Legend position={{ bottom: 10, left: 10 }} />
  <Measure position={{ top: 190, right: 10 }} />
  <LayerList position={{ top: 10, left: 10 }} />
  <SwipeControl position={{top: 150,right: 10}}/>


```