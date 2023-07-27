import React from 'react'
import Title from './Title'
import { Review as ReviewType } from '@prisma/client'
import Review from './Review'

const Reviews = ({ reviews }: { reviews: ReviewType[] }) => {
  const textDisplayed = reviews.length <= 1 ? 'person' : 'people'
  return (
    <div>
      {reviews.length === 0 ? (
        <Title title="There is no reviews yet" />
      ) : (
        <Title title={`What ${reviews.length} ${textDisplayed} are saying`} />
      )}

      {reviews.map((review) => (
        <Review review={review} />
      ))}
    </div>
  )
}

export default Reviews
