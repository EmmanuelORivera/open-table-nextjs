import { Review } from '@prisma/client'

export const calculateReviewAvarage = (reviews: Review[]): number => {
  if (!reviews.length) return 0
  return (
    reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
  )
}

export const getReviewMessage = (reviewAvarage: number) => {
  if (reviewAvarage > 4.5) {
    return 'Awesome'
  } else if (reviewAvarage >= 2 && reviewAvarage <= 4.5) {
    return 'Regular'
  } else if (reviewAvarage < 2) {
    return 'Bad'
  } else {
    return ''
  }
}
