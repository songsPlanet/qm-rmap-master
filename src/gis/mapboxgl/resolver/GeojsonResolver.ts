import type { GeoJSONSource } from 'mapbox-gl';
import type { IGeoJSONResolver } from '../typings';

class GeojsonResolver implements IGeoJSONResolver {
  async load(source: GeoJSONSource) {}
}

export default GeojsonResolver;
