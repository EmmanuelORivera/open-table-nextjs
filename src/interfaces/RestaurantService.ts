import { Restaurant, RestaurantBySlug } from './Restaurant'

export interface RestaurantService {
  fetchRestaurants: () => Promise<Restaurant[]>
  fetchRestaurantBySlug: (slug: string) => Promise<RestaurantBySlug | null>
}
