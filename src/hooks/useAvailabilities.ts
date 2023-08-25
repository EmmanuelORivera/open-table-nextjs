import api from '@/app/api'
import { Time } from '@/utils/convertToDisplayTime'
import { useState } from 'react'

interface FetchAvailabilitiesProps {
  slug: string
  partySize: string
  day: string
  time: string
}
interface Availabilities {
  time: Time
  available: boolean
}

export default function useAvailabilities() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState<Availabilities[] | null>(null)

  const fetchAvailabilities = async ({
    slug,
    partySize,
    day,
    time,
  }: FetchAvailabilitiesProps) => {
    setLoading(true)

    try {
      const response = await api.get<Availabilities[]>(
        `/api/restaurant/${slug}/availability`,
        {
          params: {
            day,
            time,
            partySize,
          },
        }
      )
      setLoading(false)
      setData(response.data)
    } catch (error: any) {
      setLoading(false)
      setError(error.response.data.errorMessage)
    }
  }

  return { loading, data, error, fetchAvailabilities }
}
