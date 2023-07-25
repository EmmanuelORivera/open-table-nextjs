import { Restaurant, RestaurantBySlug, RestaurantMenu } from './Restaurant'

export interface RestaurantService {
  fetchRestaurants: () => Promise<Restaurant[]>
  fetchRestaurantBySlug: (slug: string) => Promise<RestaurantBySlug | null>
  fetchRestaurantMenu: (slug: string) => Promise<RestaurantMenu>
  fetchRestaurantsByCity: (city: string) => Promise<Restaurant[]>
}
