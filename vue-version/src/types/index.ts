export interface User {
  id: string
  email: string
  name: string
}

export interface Ticket {
  id: string
  title: string
  description?: string
  status: 'open' | 'in_progress' | 'closed'
  priority?: 'low' | 'medium' | 'high'
  createdAt: string
  updatedAt: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface SignupCredentials {
  email: string
  password: string
  name: string
}

export interface TicketFormData {
  title: string
  description?: string
  status: 'open' | 'in_progress' | 'closed'
  priority?: 'low' | 'medium' | 'high'
}

export interface DashboardStats {
  total: number
  open: number
  inProgress: number
  closed: number
}

