import { useState } from 'react'
import axios from 'axios'
import { ReviewData } from '@/app/restaurant/[slug]/components/CreateReview'

export const useReviewSubmission = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const submitReview = async (data: ReviewData) => {
    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      await axios.post(
        'http://localhost:3000/api/restaurant/vivaan-fine-indian-cuisine-ottawa/review',
        data
      )
      setSuccess(true)
    } catch (err) {
      setError('An error occurred. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  return { loading, error, success, submitReview }
}
