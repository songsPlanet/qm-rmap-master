import { GeoJSONSource } from 'mapbox-gl';
import { IGeoJSONResolver } from '../typings';

class GeojsonResolver implements IGeoJSONResolver {
  async load(source: GeoJSONSource) {}
}

export default GeojsonResolver;
