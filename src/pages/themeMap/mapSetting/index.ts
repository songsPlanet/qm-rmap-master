import { basemap } from '@/pages/themeMap/mapSetting/basemap';
import type {TMapLayerSetting } from 'qm-map-wrapper';
import { wh_sqal_sdbhq_wms } from './wh_sqal_sdbhq_wms';
import { region } from './jieshou_region_mvt';
import { field_vt } from './field_vt';

const mapSetting: TMapLayerSetting = [basemap, field_vt, wh_sqal_sdbhq_wms, region];
export default mapSetting;
