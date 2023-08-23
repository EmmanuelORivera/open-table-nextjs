import { ReviewService } from '@/interfaces/ReviewService'
import { prisma } from './PrismaSingleton'

export class PrismaReviewService implements ReviewService {
  private static instance: PrismaReviewService

  public static getInstance(): PrismaReviewService {
    if (!PrismaReviewService.instance) {
      PrismaReviewService.instance = new PrismaReviewService()
    }
    return PrismaReviewService.instance
  }

  async createReview(
    first_name: string,
    last_name: string,
    rating: number,
    text: string,
    restaurantId: number,
    userId: number
  ) {
    const review = prisma.review.create({
      data: {
        first_name,
        last_name,
        rating,
        text,
        restaurant: { connect: { id: restaurantId } },
        user: { connect: { id: userId } },
      },
    })

    return review
  }
}
