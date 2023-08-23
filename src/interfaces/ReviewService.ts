import { Review } from '@prisma/client'

export interface ReviewService {
  createReview: (
    first_name: string,
    last_name: string,
    rating: number,
    text: string,
    restaurantId: number,
    userId: number
  ) => Promise<Review>
}
