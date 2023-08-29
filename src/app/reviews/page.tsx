import { prisma } from '@/services/PrismaSingleton'

const Reviews = async () => {
  const specificRestaurant = await prisma.restaurant.findUnique({
    where: { id: 1 },
    include: { reviews: true },
  })

  const allReviews = await prisma.review.findMany()
  return (
    <div>
      {JSON.stringify(specificRestaurant?.reviews)}
      {JSON.stringify(allReviews)}
    </div>
  )
}

export default Reviews
