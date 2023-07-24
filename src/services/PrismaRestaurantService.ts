import { Restaurant } from '@/interfaces/Restaurant'
import { Restaurant as PrismaRestaurant } from '@prisma/client'
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

  async fetchRestaurant(slug: string): Promise<PrismaRestaurant | null> {
    const restaurant = await this.prisma.restaurant.findUnique({
      where: {
        slug,
      },
    })

    return restaurant
  }
}
