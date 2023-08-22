import { Review } from '@prisma/client'
import { calculateReviewAvarage } from '@/utils/reviewUtils'
import Star from './Star'

const Stars = ({ reviews, rating }: { reviews: Review[]; rating?: number }) => {
  const maxStars = 5
  const reviewAvarage = rating || calculateReviewAvarage(reviews)
  const fullStars = Math.floor(reviewAvarage)

  const reviewRemainder = reviewAvarage % 1
  const hasHalfStar = reviewRemainder !== 0

  const starArray: JSX.Element[] = []

  //add full stars
  for (let index = 0; index < fullStars; index++) {
    starArray.push(<Star key={`full-${index}`} type="full" />)
  }

  //add half star
  if (hasHalfStar) {
    const minRemainder = 0.4
    if (reviewRemainder < minRemainder)
      starArray.push(<Star key={`empty-${fullStars}`} type="empty" />)
    else starArray.push(<Star key={`half-${fullStars}`} type="half" />)
  }

  //add empty stars
  const emptyStars = maxStars - starArray.length
  for (let index = 0; index < emptyStars; index++) {
    starArray.push(<Star key={`empty-${index}`} type="empty" />)
  }

  return <div className="flex gap-1">{starArray}</div>
}

export default Stars
