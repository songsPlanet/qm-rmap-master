import { TMapLayerSettting } from '@/gis/mapboxgl/typings';
import { basemap } from '@/pages/mapSetting/basemap';
import { wh_sy_geo } from '@/pages/mapSetting/wh_sy_geo';
import { wh_sy_mvt } from '../mapSetting/wh_sy_mvt';
// import { region } from '../mapSetting/jieshou_region_mvt';
import { region } from '../mapSetting/jieshou_region_geo';

const mapSetting: TMapLayerSettting = [basemap, wh_sy_geo, wh_sy_mvt, region];
export default mapSetting;
