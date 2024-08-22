import type { TMapLayerSettting } from '@/gis/typings';
import { basemap } from '@/pages/themeMap/mapSetting/basemap';
import { region } from './jieshou_region_mvt';
import { wh_sqal_sdbhq_wms } from './wh_sqal_sdbhq_wms';
import { field_vt } from './field_vt';

const mapSetting: TMapLayerSettting = [basemap, field_vt, wh_sqal_sdbhq_wms, region];
export default mapSetting;
