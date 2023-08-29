import { PrismaReviewService } from '@/services/PrismaReviewService'
import { prisma } from '@/services/PrismaSingleton'

const Reviews = async () => {
  const reviewService = PrismaReviewService.getInstance()
  const createdReview = await reviewService.createReview(
    'Laith',
    'Harb',
    3,
    'this is a great place to eat',
    1,
    1
  )

  const specificRestaurant = await prisma.restaurant.findUnique({
    where: { id: 1 },
    include: { reviews: true },
  })

  const allReviews = await prisma.review.findMany()
  return (
    <div>
      <div className="bg-red-400">
        {JSON.stringify(specificRestaurant?.reviews)}
      </div>
      <div className="bg-green-400">{JSON.stringify(allReviews)}</div>
      <div className="bg-blue-400">{JSON.stringify(createdReview)}</div>
    </div>
  )
}

export default Reviews
