import axios from 'axios'
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
  bookerOccasion: string
  bookerRequests: string
}
interface Reservation {
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
  }: FetchReservationProps) => {
    setLoading(true)

    try {
      const response = await axios.post<Reservation>(
        `http://localhost:3000/api/restaurant/${slug}/reserve`,
        {
          bookerEmail,
          bookerFirstName,
          bookerLastName,
          bookerOccasion,
          bookerPhone,
          bookerRequests,
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

      return response.data
    } catch (error: any) {
      setLoading(false)
      setError(error.response.data.errorMessage)
    }
  }

  return { loading, error, createReservation }
}
