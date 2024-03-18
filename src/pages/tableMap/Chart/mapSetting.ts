import { TMapLayerSettting } from '@/gis/mapboxgl/typings';
import { basemap } from '@/pages/mapSetting/basemap';
import { region } from '../../mapSetting/region_jieshou_geo';
// import { zwfb } from '@/pages/mapSetting/zwfb';
// import { field_vt } from '@/pages/mapSetting/field_vt';

const mapSetting: TMapLayerSettting = [basemap, region];
export default mapSetting;
