import { Review } from '@prisma/client'

export const calculateReviewAvarage = (reviews: Review[]): number => {
  return reviews.reduce((acc, review) => acc + review.rating, 0)
}

export const getReviewMessage = (reviewAvarage: number) => {
  if (reviewAvarage > 4.5) {
    return 'Awesome'
  } else if (reviewAvarage >= 2 && reviewAvarage <= 4.5) {
    return 'Regular'
  } else {
    return 'Bad'
  }
}
