import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'

// 🔥 User type
type User = {
  name: string
  email: string
  password: string
}

// 🔥 Context type
type AuthContextType = {
  user: User | null
  register: (userData: User) => string | null
  login: (email: string, password: string) => boolean
  logout: () => void
  isLoggedIn: boolean
}

type Props = {
  children: ReactNode
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: Props): React.ReactElement {
  const [user, setUser] = useState<User | null>(null)

  // ✅ REGISTER
  const register = (userData: User): string | null => {
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]')

    // check if user already exists
    const exists = users.find((u) => u.email === userData.email)

    if (exists) {
      return 'User already exists'
    }

    users.push(userData)
    localStorage.setItem('users', JSON.stringify(users))

    return null
  }

  // ✅ LOGIN
  const login = (email: string, password: string): boolean => {
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]')

    const found = users.find(
      (u) => u.email === email && u.password === password
    )

    if (found) {
      setUser(found)
      return true
    }

    return false
  }

  const logout = (): void => setUser(null)
  const isLoggedIn = !!user

  return (
    <AuthContext.Provider value={{ user, register, login, logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext)

  if (!ctx) {
    throw new Error('useAuth must be used inside AuthProvider')
  }

  return ctx
}