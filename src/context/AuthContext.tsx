'use client'

import useAuth from '@/hooks/useAuth'
import { SelectedUser } from '@/interfaces/SelectedUser'
import { createContext, useContext, useEffect, useState } from 'react'

export interface AuthContextState {
  loadingSignIn: boolean
  loadingSignUp: boolean
  errorSignIn: string | null
  errorSignUp: string | null
  data: SelectedUser | null
}

interface AuthState extends AuthContextState {
  setAuthState: React.Dispatch<React.SetStateAction<AuthContextState>>
}

const AuthenticationContext = createContext<AuthState>({
  loadingSignIn: false,
  loadingSignUp: false,
  errorSignIn: null,
  errorSignUp: null,
  data: null,
  setAuthState: () => {},
})

export const initialState: AuthContextState = {
  loadingSignIn: true,
  loadingSignUp: true,
  data: null,
  errorSignIn: null,
  errorSignUp: null,
}

export default function AuthContext({
  children,
}: {
  children: React.ReactNode
}) {
  const [authState, setAuthState] = useState<AuthContextState>(initialState)

  const { fetchUser } = useAuth()

  useEffect(() => {
    fetchUser(setAuthState)
  }, [])

  return (
    <AuthenticationContext.Provider value={{ ...authState, setAuthState }}>
      {children}
    </AuthenticationContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthenticationContext)
