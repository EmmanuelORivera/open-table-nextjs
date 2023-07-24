import { Restaurant as PrismaRestaurant } from '@prisma/client'
import { Restaurant } from './Restaurant'

export interface RestaurantService {
  fetchRestaurants: () => Promise<Restaurant[]>
  fetchRestaurant: (slug: string) => Promise<PrismaRestaurant | null>
}
