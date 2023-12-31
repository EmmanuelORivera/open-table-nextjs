import api from '@/app/api'
import { useState } from 'react'

interface FetchReservationProps {
  slug: string
  partySize: string
  day: string
  time: string
  bookerFirstName: string
  bookerLastName: string
  bookerPhone: string
  bookerEmail: string
  setDidBook: React.Dispatch<React.SetStateAction<boolean>>
  bookerOccasion?: string
  bookerRequests?: string
}
export interface Reservation {
  id: number
  number_of_people: number
  booking_time: string
  booker_email: string
  booker_phone: string
  booker_first_name: string
  booker_last_name: string
  booker_occasion: string
  booker_request: string
  restaurant_id: number
  created_at: string
  updated_at: string
}

export default function useReservation() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const createReservation = async ({
    slug,
    partySize,
    day,
    time,
    bookerEmail,
    bookerFirstName,
    bookerLastName,
    bookerOccasion,
    bookerPhone,
    bookerRequests,
    setDidBook,
  }: FetchReservationProps) => {
    setLoading(true)

    try {
      const response = await api.post<Reservation>(
        `/api/restaurant/${slug}/reserve`,
        {
          email: bookerEmail,
          first_name: bookerFirstName,
          last_name: bookerLastName,
          occasion: bookerOccasion,
          phone: bookerPhone,
          request: bookerRequests,
        },
        {
          params: {
            day,
            time,
            partySize,
          },
        }
      )
      setLoading(false)
      setError(null)
      setDidBook(true)

      return response.data
    } catch (error: any) {
      setLoading(false)
      setError(error.response.data.errorMessage)
    }
  }

  return { loading, error, createReservation }
}
