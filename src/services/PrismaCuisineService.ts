import { CuisineService } from '@/interfaces/CuisineService'
import { prisma } from './PrismaSingleton'

export class PrismaCuisineService implements CuisineService {
  private static instance: PrismaCuisineService

  public static getInstance(): PrismaCuisineService {
    if (!PrismaCuisineService.instance) {
      PrismaCuisineService.instance = new PrismaCuisineService()
    }
    return PrismaCuisineService.instance
  }
  fetchCuisines() {
    const cuisines = prisma.cuisine.findMany({
      select: {
        id: true,
        name: true,
      },
    })
    return cuisines
  }
}
