import { Restaurant } from './Restaurant'

export interface RestaurantService {
  fetchRestaurants: () => Promise<Restaurant[]>
}
