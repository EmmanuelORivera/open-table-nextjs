'use client'
import { useAuthContext } from '@/context/AuthContext'
import Title from './Title'
import InputField from '@/components/InputField'
import { useState } from 'react'
import Button from '@/components/Button'
import StarRating from '@/components/StarRating'
const CreateReview = () => {
  const { data } = useAuthContext()
  const [value, setValue] = useState('')
  const [rating, setRating] = useState(5)

  return (
    <div>
      {!!data && (
        <div>
          <Title title="Leave a Review"></Title>
          <p className="text-gray-500 my-4">
            We'd love to hear your thoughts! Your feedback helps us improve and
            provide better experiences.
          </p>
          <p className="flex gap-1 items-center">
            <span className="font-semibold">Rating (1 Bad, 5 Excellent):</span>
            <StarRating rating={rating} setRating={setRating} />
          </p>
          <div className="flex flex-col mt-6 gap-6">
            <InputField
              name="comment"
              placeholder="Comments"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              type="text"
            />
            <Button
              handleClick={() => {}}
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
