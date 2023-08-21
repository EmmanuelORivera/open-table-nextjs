import {
  Restaurant,
  RestaurantBySlug,
  RestaurantMenu,
  RestaurantWithTables,
} from '@/interfaces/Restaurant'
import { RestaurantService } from '@/interfaces/RestaurantService'
import { prisma } from './PrismaSingleton'
import { Price, Prisma } from '@prisma/client'

export class PrismaRestaurantService implements RestaurantService {
  private static instance: PrismaRestaurantService

  public static getInstance(): PrismaRestaurantService {
    if (!PrismaRestaurantService.instance) {
      PrismaRestaurantService.instance = new PrismaRestaurantService()
    }
    return PrismaRestaurantService.instance
  }

  async fetchRestaurants(): Promise<Restaurant[]> {
    const restaurants = await prisma.restaurant.findMany({
      select: {
        id: true,
        name: true,
        main_image: true,
        cuisine: true,
        location: true,
        price: true,
        slug: true,
        reviews: true,
      },
    })

    return restaurants
  }

  async fetchRestaurantBySlug(slug: string): Promise<RestaurantBySlug> {
    const restaurant = await prisma.restaurant.findUnique({
      where: {
        slug,
      },
      select: {
        id: true,
        name: true,
        images: true,
        description: true,
        slug: true,
        reviews: true,
        open_time: true,
        close_time: true,
        main_image: true,
      },
    })

    if (!restaurant) {
      throw new Error('restaurant does not exists')
    }
    return restaurant
  }

  async fetchRestaurantMenu(slug: string): Promise<RestaurantMenu> {
    const restaurant = await prisma.restaurant.findUnique({
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

  async fetchRestaurantsWithFilter(
    city?: string,
    cuisine?: string,
    price?: Price
  ): Promise<Restaurant[]> {
    if (!city && !cuisine && !price) return this.fetchRestaurants()

    const where: Prisma.RestaurantWhereInput = {}

    if (city) {
      where.location = {
        name: city.toLowerCase(),
      }
    }

    if (cuisine) {
      where.cuisine = {
        name: cuisine.toLowerCase(),
      }
    }

    if (price) {
      where.price = {
        equals: price,
      }
    }

    const restaurants = await prisma.restaurant.findMany({
      where,
      select: {
        id: true,
        name: true,
        main_image: true,
        cuisine: true,
        location: true,
        price: true,
        slug: true,
        reviews: true,
      },
    })
    return restaurants
  }

  async fetchRestaurantWithTables(
    slug: string
  ): Promise<RestaurantWithTables | null> {
    const restaurant = prisma.restaurant.findUnique({
      where: {
        slug,
      },
      select: {
        id: true,
        table: true,
        open_time: true,
        close_time: true,
      },
    })

    return restaurant
  }
}
