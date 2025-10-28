import { defineStore } from 'pinia'
import type { Ticket, TicketFormData, DashboardStats } from '@/types'

const TICKETS_KEY = 'ticketapp_tickets'

// Initialize with some demo tickets (same as React version)
const INITIAL_TICKETS: Ticket[] = [
  {
    id: '1',
    title: 'Setup project repository',
    description: 'Create initial project structure and setup Git repository',
    status: 'closed',
    priority: 'high',
    createdAt: new Date('2025-10-20').toISOString(),
    updatedAt: new Date('2025-10-21').toISOString(),
  },
  {
    id: '2',
    title: 'Design landing page',
    description: 'Create wireframes and mockups for the landing page',
    status: 'in_progress',
    priority: 'high',
    createdAt: new Date('2025-10-22').toISOString(),
    updatedAt: new Date('2025-10-23').toISOString(),
  },
  {
    id: '3',
    title: 'Implement authentication',
    description: 'Add login and signup functionality with form validation',
    status: 'open',
    priority: 'medium',
    createdAt: new Date('2025-10-23').toISOString(),
    updatedAt: new Date('2025-10-23').toISOString(),
  },
]

export const useTicketsStore = defineStore('tickets', {
  state: () => ({
    tickets: [] as Ticket[],
    loading: false
  }),

  getters: {
    getAllTickets: (state) => state.tickets,
    
    getDashboardStats: (state): DashboardStats => ({
      total: state.tickets.length,
      open: state.tickets.filter((t) => t.status === 'open').length,
      inProgress: state.tickets.filter((t) => t.status === 'in_progress').length,
      closed: state.tickets.filter((t) => t.status === 'closed').length,
    }),

    getRecentTickets: (state) => state.tickets.slice(0, 5)
  },

  actions: {
    async loadTickets() {
      this.loading = true
      
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 300))
      
      const ticketsStr = localStorage.getItem(TICKETS_KEY)
      
      if (!ticketsStr) {
        // Initialize with demo tickets
        this.tickets = [...INITIAL_TICKETS]
        this.saveTickets()
      } else {
        try {
          this.tickets = JSON.parse(ticketsStr)
        } catch {
          this.tickets = [...INITIAL_TICKETS]
          this.saveTickets()
        }
      }
      
      this.loading = false
    },

    async createTicket(data: TicketFormData) {
      this.loading = true
      
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 300))

      const newTicket: Ticket = {
        id: `ticket_${Date.now()}`,
        title: data.title,
        description: data.description,
        status: data.status,
        priority: data.priority,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      this.tickets.unshift(newTicket) // Add to beginning
      this.saveTickets()
      
      this.loading = false
      return newTicket
    },

    async updateTicket(id: string, data: Partial<TicketFormData>) {
      this.loading = true
      
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 300))

      const ticketIndex = this.tickets.findIndex((t) => t.id === id)

      if (ticketIndex === -1) {
        throw new Error('Ticket not found')
      }

      const updatedTicket: Ticket = {
        ...this.tickets[ticketIndex],
        ...data,
        updatedAt: new Date().toISOString(),
      }

      this.tickets[ticketIndex] = updatedTicket
      this.saveTickets()
      
      this.loading = false
      return updatedTicket
    },

    async deleteTicket(id: string) {
      this.loading = true
      
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 300))

      const initialLength = this.tickets.length
      this.tickets = this.tickets.filter((t) => t.id !== id)

      if (this.tickets.length === initialLength) {
        throw new Error('Ticket not found')
      }

      this.saveTickets()
      this.loading = false
    },

    saveTickets() {
      localStorage.setItem(TICKETS_KEY, JSON.stringify(this.tickets))
    },

    getTicketById(id: string): Ticket | null {
      return this.tickets.find((ticket) => ticket.id === id) || null
    }
  }
})
