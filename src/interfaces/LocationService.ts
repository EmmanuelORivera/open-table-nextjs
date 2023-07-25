import { Location } from './Location'

export interface LocationService {
  fetchLocations: () => Promise<Location[]>
}
