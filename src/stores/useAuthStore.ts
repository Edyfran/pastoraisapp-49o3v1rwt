import React, { createContext, useContext, useState } from 'react'
import { User } from '@/types'

interface AuthState {
  user: User | null
  login: (user: User) => void
  logout: () => void
}

export const AuthContext = createContext<AuthState>({} as AuthState)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)

  const login = (userData: User) => setUser(userData)
  const logout = () => setUser(null)

  return React.createElement(AuthContext.Provider, { value: { user, login, logout } }, children)
}

export default function useAuthStore() {
  return useContext(AuthContext)
}
