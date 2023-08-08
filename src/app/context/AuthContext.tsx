'use client'

import { SelectedUser } from '@/interfaces/SelectedUser'
import { createContext, useState } from 'react'

interface State {
  loading: boolean
  error: string | null
  data: SelectedUser | null
}

interface AuthState extends State {
  setAuthState: React.Dispatch<React.SetStateAction<State>>
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
  const [authState, setAuthState] = useState<State>({
    loading: false,
    data: null,
    error: null,
  })

  return (
    <AuthenticationContext.Provider value={{ ...authState, setAuthState }}>
      {children}
    </AuthenticationContext.Provider>
  )
}
