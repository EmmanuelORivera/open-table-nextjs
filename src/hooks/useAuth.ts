import { AuthContextState, useAuthContext } from '@/context/AuthContext'
import { AuthInputs } from '@/interfaces/AuthInputs'
import { getCookieFromClient } from '@/utils/getCookieFromClient'
import axios from 'axios'

const useAuth = () => {
  const { setAuthState } = useAuthContext()

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
    try {
      setAuthState((prevState) => ({
        ...prevState,
        data: null,
        errorSignIn: null,
        loadingSignIn: true,
      }))
      const response = await axios.post(
        'http://localhost:3000/api/auth/signin',
        {
          email,
          password,
        }
      )
      setAuthState((prevState) => ({
        ...prevState,
        data: response.data,
        errorSignIn: null,
        loadingSignIn: false,
      }))

      handleClose()
    } catch (error: any) {
      setAuthState((prevState) => ({
        ...prevState,
        data: null,
        errorSignIn: error.response.data.errorMessage,
        loadingSignIn: false,
      }))
    }
  }
  const signup = async (
    { email, password, first_name, last_name, city, phone }: AuthInputs,
    handleClose: () => void
  ) => {
    setAuthState((prevState) => ({
      ...prevState,
      data: null,
      errorSignUp: null,
      loadingSignUp: true,
    }))
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

      setAuthState((prevState) => ({
        ...prevState,
        data: response.data,
        errorSignUp: null,
        loadingSignUp: false,
      }))

      handleClose()
    } catch (error: any) {
      setAuthState((prevState) => ({
        ...prevState,
        data: null,
        errorSignUp: error.response.data.errorMessage,
        loadingSignUp: false,
      }))
    }
  }

  const fetchUser = async (
    setAuthState: React.Dispatch<React.SetStateAction<AuthContextState>>
  ) => {
    try {
      setAuthState((prevState) => ({
        ...prevState,
        data: null,
        errorSignIn: null,
        errorSignUp: null,
        loadingSignUp: true,
      }))
      const jwt = getCookieFromClient('jwt')

      if (!jwt) {
        return setAuthState((prevState) => ({
          ...prevState,
          data: null,
          errorSignIn: null,
          errorSignUp: null,
          loadingSignIn: false,
          loadingSignUp: false,
        }))
      }

      const response = await axios.get('http://localhost:3000/api/auth/me', {
        headers: { Authorization: `Bearer ${jwt}` },
      })

      axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`

      setAuthState((prevState) => ({
        ...prevState,
        data: response.data,
        errorSignIn: null,
        errorSignUp: null,
        loadingSignIn: false,
        loadingSignUp: false,
      }))
    } catch (error: any) {
      setAuthState((prevState) => ({
        ...prevState,
        data: null,
        errorSignIn: error.response.data.errorMessage,
        errorSignUp: null,
        loadingSignIn: false,
        loadingSignUp: false,
      }))
    }
  }

  const signOut = () => {
    const cookieJWT = 'jwt'
    document.cookie = `${cookieJWT}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`

    setAuthState((prevState) => ({
      ...prevState,
      data: null,
      errorSignIn: null,
      errorSignUp: null,
      loadingSignIn: false,
      loadingSignUp: false,
    }))
  }

  return { signin, signup, fetchUser, signout: signOut }
}

export default useAuth
