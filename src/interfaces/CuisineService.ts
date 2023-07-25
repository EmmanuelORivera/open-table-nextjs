import { Cuisine } from './Cuisine'

export interface CuisineService {
  fetchCuisines: () => Promise<Cuisine[]>
}
