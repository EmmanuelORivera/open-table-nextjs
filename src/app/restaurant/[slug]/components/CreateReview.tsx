'use client'
import { useAuthContext } from '@/context/AuthContext'
import Title from './Title'
import InputField from '@/components/InputField'
import { useState } from 'react'
import Button from '@/components/Button'
const CreateReview = () => {
  const { data } = useAuthContext()
  const [value, setValue] = useState('')

  return (
    <div>
      {!!data && (
        <div>
          <Title title="Make a review"></Title>

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
