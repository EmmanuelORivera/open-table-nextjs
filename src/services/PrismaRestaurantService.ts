import {
  Restaurant,
  RestaurantBySlug,
  RestaurantMenu,
} from '@/interfaces/Restaurant'
import { RestaurantService } from '@/interfaces/RestaurantService'
import { PrismaClient } from '@prisma/client'

export class PrismaRestaurantService implements RestaurantService {
  private static instance: PrismaRestaurantService
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  public static getInstance(): PrismaRestaurantService {
    if (!PrismaRestaurantService.instance) {
      PrismaRestaurantService.instance = new PrismaRestaurantService()
    }
    return PrismaRestaurantService.instance
  }

  async fetchRestaurants(): Promise<Restaurant[]> {
    const restaurants = await this.prisma.restaurant.findMany({
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
    const restaurant = await this.prisma.restaurant.findUnique({
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
    const restaurant = await this.prisma.restaurant.findUnique({
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
}
