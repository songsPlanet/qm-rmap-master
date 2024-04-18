import { TMapLayerSettting } from '@/gis/mapboxgl/typings';
import { basemap } from '@/pages/mapSetting/basemap';
import { wh_sy_geo } from '@/pages/mapSetting/wh_sy_geo';
import { wh_sy_mvt } from '../mapSetting/wh_sy_mvt';
import { wh_sy_zoomfive } from '../mapSetting/wh_sy_zoomfive';
import { region } from '../mapSetting/region_jieshou_geo';
const mapSetting: TMapLayerSettting = [basemap, wh_sy_geo, wh_sy_mvt, wh_sy_zoomfive, region];
export default mapSetting;
