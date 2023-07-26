import { Restaurant, RestaurantBySlug, RestaurantMenu } from './Restaurant'

export interface RestaurantService {
  fetchRestaurants: () => Promise<Restaurant[]>
  fetchRestaurantBySlug: (slug: string) => Promise<RestaurantBySlug | null>
  fetchRestaurantMenu: (slug: string) => Promise<RestaurantMenu>
  fetchRestaurantsWithFilter: (
    city?: string,
    cuisine?: string
  ) => Promise<Restaurant[]>
}
