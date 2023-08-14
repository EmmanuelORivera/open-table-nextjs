import { AuthContextState, useAuthContext } from '@/context/AuthContext'
import { AuthInputs } from '@/interfaces/AuthInputs'
import { getCookieFromClient } from '@/utils/getCookieFromClient'
import axios from 'axios'

const useAuth = () => {
  const { setAuthState, data, error, loading } = useAuthContext()

  const signin = async (
    {
      email,
      password,
    }: {
      email: string
      password: string
    },
    handleClose: () => void
  ) => {
    setAuthState({ data: null, error: null, loading: true })
    try {
      const response = await axios.post(
        'http://localhost:3000/api/auth/signin',
        {
          email,
          password,
        }
      )
      setAuthState({ data: response.data, error: null, loading: false })
      handleClose()
    } catch (error: any) {
      setAuthState({
        data: null,
        error: error.response.data.errorMessage,
        loading: false,
      })
    }
  }
  const signup = async (
    { email, password, first_name, last_name, city, phone }: AuthInputs,
    handleClose: () => void
  ) => {
    setAuthState({ data: null, error: null, loading: true })
    try {
      const response = await axios.post(
        'http://localhost:3000/api/auth/signup',
        {
          email,
          password,
          first_name,
          last_name,
          city,
          phone,
        }
      )
      setAuthState({ data: response.data, error: null, loading: false })
      handleClose()
    } catch (error: any) {
      setAuthState({
        data: null,
        error: error.response.data.errorMessage,
        loading: false,
      })
    }
  }

  const fetchUser = async (
    setAuthState: React.Dispatch<React.SetStateAction<AuthContextState>>
  ) => {
    try {
      setAuthState({ data: null, error: null, loading: true })
      const jwt = getCookieFromClient('jwt')

      if (!jwt) {
        return setAuthState({ data: null, error: null, loading: false })
      }

      const response = await axios.get('http://localhost:3000/api/auth/me', {
        headers: { Authorization: `Bearer ${jwt}` },
      })

      axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`

      setAuthState({ data: response.data, error: null, loading: false })
    } catch (error: any) {
      setAuthState({
        data: null,
        error: error.response.data.errorMessage,
        loading: false,
      })
    }
  }

  return { signin, signup, fetchUser }
}

export default useAuth
