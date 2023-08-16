import { Price } from '@prisma/client'
import {
  Restaurant,
  RestaurantBySlug,
  RestaurantMenu,
  RestaurantWithTables,
} from './Restaurant'

export interface RestaurantService {
  fetchRestaurants: () => Promise<Restaurant[]>
  fetchRestaurantBySlug: (slug: string) => Promise<RestaurantBySlug | null>
  fetchRestaurantMenu: (slug: string) => Promise<RestaurantMenu>
  fetchRestaurantsWithFilter: (
    city?: string,
    cuisine?: string,
    price?: Price
  ) => Promise<Restaurant[]>
  fetchRestaurantWithTables: (
    slug: string
  ) => Promise<RestaurantWithTables | null>
}
