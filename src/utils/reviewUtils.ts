import { Review } from '@prisma/client'

export const calculateReviewAvarage = (reviews: Review[]): number => {
  return reviews
    .map((review) => review.rating)
    .reduce((acc, currVal) => acc + currVal, 0)
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
