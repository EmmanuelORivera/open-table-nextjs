import { LocationService } from '@/interfaces/LocationService'
import { prisma } from './PrismaSingleton'

export class PrismaLocationService implements LocationService {
  private static instance: PrismaLocationService

  public static getInstance(): PrismaLocationService {
    if (!PrismaLocationService.instance) {
      PrismaLocationService.instance = new PrismaLocationService()
    }
    return PrismaLocationService.instance
  }

  fetchLocations() {
    const locations = prisma.location.findMany({
      select: {
        id: true,
        name: true,
      },
    })
    return locations
  }
}
