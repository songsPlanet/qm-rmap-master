import { TMapLayerSettting } from '@/gis/mapboxgl/typings';
import { basemap } from '@/pages/themeMap/mapSetting/basemap';
import { region } from '@/pages/themeMap/mapSetting/jieshou_region_mvt';

const mapSetting: TMapLayerSettting = [basemap, region];
export default mapSetting;
