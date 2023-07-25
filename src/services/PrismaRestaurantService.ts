import {
  Restaurant,
  RestaurantBySlug,
  RestaurantMenu,
} from '@/interfaces/Restaurant'
import { RestaurantService } from '@/interfaces/RestaurantService'
import prismaClient from './PrismaSingleton'

export class PrismaRestaurantService implements RestaurantService {
  private static instance: PrismaRestaurantService

  public static getInstance(): PrismaRestaurantService {
    if (!PrismaRestaurantService.instance) {
      PrismaRestaurantService.instance = new PrismaRestaurantService()
    }
    return PrismaRestaurantService.instance
  }

  async fetchRestaurants(): Promise<Restaurant[]> {
    const restaurants = await prismaClient.restaurant.findMany({
      select: {
        id: true,
        name: true,
        main_image: true,
        cuisine: true,
        location: true,
        price: true,
        slug: true,
      },
    })

    return restaurants
  }

  async fetchRestaurantBySlug(slug: string): Promise<RestaurantBySlug> {
    const restaurant = await prismaClient.restaurant.findUnique({
      where: {
        slug,
      },
      select: {
        id: true,
        name: true,
        images: true,
        description: true,
        slug: true,
      },
    })

    if (!restaurant) {
      throw new Error('restaurant does not exists')
    }
    return restaurant
  }

  async fetchRestaurantMenu(slug: string): Promise<RestaurantMenu> {
    const restaurant = await prismaClient.restaurant.findUnique({
      where: {
        slug,
      },
      select: {
        items: true,
      },
    })

    if (!restaurant) {
      throw new Error('unique restaurant does not exist')
    }

    return restaurant
  }

  async fetchRestaurantsByCity(city: string): Promise<Restaurant[]> {
    const restaurants = await prismaClient.restaurant.findMany({
      where: {
        location: {
          name: city.toLowerCase(),
        },
      },
      select: {
        id: true,
        name: true,
        main_image: true,
        cuisine: true,
        location: true,
        price: true,
        slug: true,
      },
    })
    console.log(restaurants)
    return restaurants
  }
}
