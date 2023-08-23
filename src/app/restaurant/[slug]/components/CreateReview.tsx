'use client'
import { useAuthContext } from '@/context/AuthContext'
import Title from './Title'
import InputField from '@/components/InputField'
import { useState } from 'react'
import Button from '@/components/Button'
import StarRating from '@/components/StarRating'
import axios from 'axios'

const CreateReview = ({ restaurantId }: { restaurantId: number }) => {
  const { data } = useAuthContext()
  const [value, setValue] = useState('')
  const [rating, setRating] = useState(5)

  const handleClick = async () => {
    await axios.post(
      'http://localhost:3000/api/restaurant/vivaan-fine-indian-cuisine-ottawa/review',
      {
        first_name: data?.first_name,
        last_name: data?.last_name,
        rating,
        text: value,
        restaurantId: restaurantId,
        userId: data?.id,
      }
    )
  }
  return (
    <div>
      {!!data && (
        <div>
          <Title title="Leave a Review"></Title>
          <p className="text-gray-500 my-4">
            We'd love to hear your thoughts! Your feedback helps us improve and
            provide better experiences.
          </p>
          <div className="flex gap-1 items-center">
            <span className="font-semibold">Rating (1 Bad, 5 Excellent):</span>
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
              className="capitalize max-w-[180px] self-end"
            >
              Send Review
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default CreateReview
