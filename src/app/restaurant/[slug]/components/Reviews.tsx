import React from 'react'
import Title from './Title'
import { Review as ReviewType } from '@prisma/client'
import Review from './Review'

const Reviews = ({ reviews }: { reviews: ReviewType[] }) => {
  return (
    <div>
      <Title title="What 100 people are saying" />
      {reviews.map((review) => (
        <Review review={review} />
      ))}
    </div>
  )
}

export default Reviews
