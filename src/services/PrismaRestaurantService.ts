import { Restaurant } from '@/interfaces/Restaurant'
import { RestaurantService } from '@/interfaces/RestaurantService'
import { PrismaClient } from '@prisma/client'

export class PrismaRestaurantService implements RestaurantService {
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
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
}
