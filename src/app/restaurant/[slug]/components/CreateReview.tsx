'use client'
import { useAuthContext } from '@/context/AuthContext'
import Title from './Title'
import InputField from '@/components/InputField'
import { useState } from 'react'
import Button from '@/components/Button'
import StarRating from '@/components/StarRating'
import { useReviewSubmission } from '@/hooks/useReviewSubmission'
import Stars from '@/components/Stars'
import { CircularProgress } from '@mui/material'

export interface ReviewData {
  first_name: string | undefined
  last_name: string | undefined
  rating: number
  text: string
  restaurantId: number
  userId: number | undefined
}

const CreateReview = ({ restaurantId }: { restaurantId: number }) => {
  const { data } = useAuthContext()
  const [value, setValue] = useState('')
  const [rating, setRating] = useState(5)
  const { error, loading, success, submitReview } = useReviewSubmission()

  const handleClick = async () => {
    const reviewData: ReviewData = {
      first_name: data?.first_name,
      last_name: data?.last_name,
      rating,
      text: value,
      restaurantId: restaurantId,
      userId: data?.id,
    }

    submitReview(reviewData)
  }
  return (
    <div>
      {success ? (
        <div>
          <Title
            className="mb-3"
            title="Thanks for sharing your thoughts !!"
          ></Title>
          <div className="flex gap-1 items-center">
            <span className="font-bold">Rate:</span>{' '}
            <Stars reviews={[]} rating={rating}></Stars>
          </div>
          <div className="flex gap-1 mt-3 items-center">
            <span className="font-bold">Comment:</span> <p>{value}</p>
          </div>
        </div>
      ) : (
        <div>
          {!!data && (
            <div>
              <Title title="Leave a Review"></Title>
              <p className="text-gray-500 my-4">
                We'd love to hear your thoughts! Your feedback helps us improve
                and provide better experiences.
              </p>
              <div className="flex gap-1 items-center">
                <span className="font-semibold">
                  Rating (1 Bad, 5 Excellent):
                </span>
                <StarRating rating={rating} setRating={setRating} />
              </div>
              <div className="flex flex-col mt-6 gap-6">
                <InputField
                  name="comment"
                  placeholder="Comments"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  type="text"
                />
                <Button
                  handleClick={handleClick}
                  type="action"
                  className="capitalize max-w-[180px] max-h-[46px] self-end"
                  disabled={loading}
                >
                  {loading ? <CircularProgress /> : 'Send Review'}
                </Button>
                {error && <p className="text-red-500">{error}</p>}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default CreateReview
