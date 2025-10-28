import { defineStore } from 'pinia'
import type { User, LoginCredentials, SignupCredentials } from '@/types'

// Mock user database (same as React version)
const MOCK_USERS = [
  {
    id: '1',
    name: 'Demo User',
    email: 'demo@ticketapp.com',
    password: 'demo123',
  },
  {
    id: '2',
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
  },
]

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    token: null as string | null,
    isInitialized: false
  }),

  getters: {
    isAuthenticated: (state) => !!state.user && !!state.token
  },

  actions: {
    async login(credentials: LoginCredentials) {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      const user = MOCK_USERS.find(
        (u) => u.email === credentials.email && u.password === credentials.password
      )

      if (!user) {
        throw new Error('Invalid email or password')
      }

      const sessionData = {
        token: `mock_token_${Date.now()}`,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      }

      this.user = sessionData.user
      this.token = sessionData.token
      this.saveSession(sessionData)
      return sessionData
    },

    async signup(credentials: SignupCredentials) {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Check if user already exists
      const existingUser = MOCK_USERS.find((u) => u.email === credentials.email)
      if (existingUser) {
        throw new Error('User with this email already exists')
      }

      // Create new user
      const newUser = {
        id: `${Date.now()}`,
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      }

      MOCK_USERS.push(newUser)

      const sessionData = {
        token: `mock_token_${Date.now()}`,
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
        },
      }

      this.user = sessionData.user
      this.token = sessionData.token
      this.saveSession(sessionData)
      return sessionData
    },

    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('ticketapp_session')
    },

    saveSession(sessionData: { token: string; user: User }) {
      localStorage.setItem('ticketapp_session', JSON.stringify(sessionData))
    },

    loadSession() {
      try {
        const session = localStorage.getItem('ticketapp_session')
        if (session) {
          const sessionData = JSON.parse(session)
          this.user = sessionData.user
          this.token = sessionData.token
        }
      } catch (error) {
        console.error('Error loading session:', error)
        localStorage.removeItem('ticketapp_session')
      }
    },

    initializeAuth() {
      this.loadSession()
      this.isInitialized = true
    }
  }
})

