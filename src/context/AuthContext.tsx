'use client'

import useAuth from '@/hooks/useAuth'
import { SelectedUser } from '@/interfaces/SelectedUser'
import { createContext, useContext, useEffect, useState } from 'react'

export interface AuthContextState {
  loading: boolean
  error: string | null
  data: SelectedUser | null
}

interface AuthState extends AuthContextState {
  setAuthState: React.Dispatch<React.SetStateAction<AuthContextState>>
}

const AuthenticationContext = createContext<AuthState>({
  loading: false,
  error: null,
  data: null,
  setAuthState: () => {},
})

export default function AuthContext({
  children,
}: {
  children: React.ReactNode
}) {
  const [authState, setAuthState] = useState<AuthContextState>({
    loading: false,
    data: null,
    error: null,
  })

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
