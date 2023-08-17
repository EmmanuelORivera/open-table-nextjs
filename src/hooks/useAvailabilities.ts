import axios, { AxiosError } from 'axios'
import { useState } from 'react'

interface FetchAvailabilitiesProps {
  slug: string
  partySize: string
  day: string
  time: string
}
export default function useAvailabilities() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)

  const fetchAvailabilities = async ({
    slug,
    partySize,
    day,
    time,
  }: FetchAvailabilitiesProps) => {
    setLoading(true)

    try {
      const response = await axios.get(
        `http://localhost:3000/api/restaurant/${slug}/availability`,
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
