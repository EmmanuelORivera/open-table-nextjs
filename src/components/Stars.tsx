import { Review } from '@prisma/client'
import { calculateReviewAvarage } from '@/utils/reviewUtils'
import Star from './Star'

const Stars = ({ reviews }: { reviews: Review[] }) => {
  const maxStars = 5
  const reviewAvarage = calculateReviewAvarage(reviews)
  const fullStars = Math.floor(reviewAvarage)

  const reviewRemainder = reviewAvarage % 1
  const hasHalfStar = reviewRemainder !== 0

  const starArray: JSX.Element[] = []

  //add full stars
  for (let index = 0; index < fullStars; index++) {
    starArray.push(<Star type="full" />)
  }

  //add half star
  if (hasHalfStar) {
    const minRemainder = 0.4
    if (reviewRemainder < minRemainder) starArray.push(<Star type="empty" />)
    else starArray.push(<Star type="half" />)
  }

  //add empty stars
  const emptyStars = maxStars - starArray.length
  for (let index = 0; index < emptyStars; index++) {
    starArray.push(<Star type="empty" />)
  }

  return <>{starArray}</>
}

export default Stars
