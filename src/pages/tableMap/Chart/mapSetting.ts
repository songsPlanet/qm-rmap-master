import { TMapLayerSettting } from '@/gis/mapboxgl/typings';
import { basemap } from '@/pages/mapSetting/basemap';
import { region } from '../../mapSetting/jieshou_region_geo';
// import { region } from '@/pages/mapSetting/jieshou_region_mvt';
// import { zwfb } from '@/pages/mapSetting/zwfb';
// import { field_vt } from '@/pages/mapSetting/field_vt';

const mapSetting: TMapLayerSettting = [basemap, region];
export default mapSetting;
