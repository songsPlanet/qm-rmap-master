import { TMapLayerSettting } from '@/gis/mapboxgl/typings';
import { basemap } from '@/pages/mapSetting/basemap';
import { zwfb } from '@/pages/mapSetting/zwfb';
import { field_vt } from '@/pages/mapSetting/field_vt';

const mapSetting: TMapLayerSettting = [basemap, field_vt, zwfb];
export default mapSetting;
