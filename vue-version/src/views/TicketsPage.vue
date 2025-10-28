<template>
  <main class="tickets-page">
    <!-- Decorative Circles for Tickets Page -->
    <div class="tickets-decorative-circle-1" aria-hidden="true"></div>
    <div class="tickets-decorative-circle-2" aria-hidden="true"></div>
    
    <div class="tickets-content">
      <div class="container">
        <header class="tickets-header">
          <div class="tickets-header-content">
            <h1 class="tickets-title">Ticket Management</h1>
            <p class="tickets-subtitle">
              Create, manage, and track all your support tickets
            </p>
          </div>
          <Button 
            variant="primary" 
            size="lg"
            @click="openCreateModal"
          >
            Create New Ticket
          </Button>
        </header>

        <!-- Filter and Search -->
        <section class="filters-section" aria-label="Ticket filters and search">
          <div class="filters-row">
            <div class="search-wrapper">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search tickets..."
                class="search-input"
                aria-label="Search tickets"
              />
              <span class="search-icon" aria-hidden="true">🔍</span>
            </div>
            
            <div class="filter-buttons">
              <button
                :class="`filter-button ${statusFilter === 'all' ? 'active' : ''}`"
                @click="setStatusFilter('all')"
                aria-label="Show all tickets"
              >
                All ({{ tickets.length }})
              </button>
              <button
                :class="`filter-button ${statusFilter === 'open' ? 'active' : ''}`"
                @click="setStatusFilter('open')"
                aria-label="Show open tickets"
              >
                Open ({{ getTicketsByStatus('open').length }})
              </button>
              <button
                :class="`filter-button ${statusFilter === 'in_progress' ? 'active' : ''}`"
                @click="setStatusFilter('in_progress')"
                aria-label="Show in progress tickets"
              >
                In Progress ({{ getTicketsByStatus('in_progress').length }})
              </button>
              <button
                :class="`filter-button ${statusFilter === 'closed' ? 'active' : ''}`"
                @click="setStatusFilter('closed')"
                aria-label="Show closed tickets"
              >
                Closed ({{ getTicketsByStatus('closed').length }})
              </button>
            </div>
          </div>
        </section>

        <!-- Tickets Grid -->
        <section class="tickets-grid" aria-label="Tickets list">
          <div v-if="filteredTickets.length === 0" class="empty-state">
            <div class="empty-state-icon">🎫</div>
            <h3>{{ searchQuery ? 'No tickets found' : 'No tickets yet' }}</h3>
            <p v-if="searchQuery">
              Try adjusting your search terms or filters
            </p>
            <p v-else>
              Create your first ticket to get started
            </p>
            <Button @click="openCreateModal">
              Create Ticket
            </Button>
          </div>

          <div v-else class="tickets-list">
            <div 
              v-for="ticket in filteredTickets" 
              :key="ticket.id" 
              class="ticket-card"
            >
              <div class="ticket-header">
                <h3 class="ticket-title">{{ ticket.title }}</h3>
                <div class="ticket-badges">
                  <StatusBadge :status="ticket.status" />
                  <span 
                    v-if="ticket.priority" 
                    :class="`priority-badge priority-${ticket.priority}`"
                  >
                    {{ ticket.priority }}
                  </span>
                </div>
              </div>

              <p v-if="ticket.description" class="ticket-description">
                {{ ticket.description.length > 150 
                  ? `${ticket.description.substring(0, 150)}...` 
                  : ticket.description
                }}
              </p>

              <div class="ticket-meta">
                <span class="ticket-date">
                  Created: {{ formatDate(ticket.createdAt) }}
                </span>
                <span v-if="ticket.updatedAt !== ticket.createdAt" class="ticket-date">
                  Updated: {{ formatDate(ticket.updatedAt) }}
                </span>
              </div>

              <div class="ticket-actions">
                <Button 
                  size="sm" 
                  variant="secondary"
                  @click="openEditModal(ticket)"
                >
                  Edit
                </Button>
                <Button 
                  size="sm" 
                  variant="danger"
                  @click="openDeleteModal(ticket)"
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>

    <!-- Create Ticket Modal -->
    <Modal
      :is-open="isCreateModalOpen"
      @close="closeCreateModal"
      title="Create New Ticket"
      description="Fill in the details to create a new support ticket."
    >
      <form @submit.prevent="handleCreateTicket" class="modal-form">
        <Input
          label="Title"
          v-model="createForm.title"
          :error="createErrors.title"
          placeholder="e.g., Database connection issue"
          required
        />
        <Textarea
          label="Description"
          v-model="createForm.description"
          :error="createErrors.description"
          placeholder="Provide a detailed description of the issue."
        />
        <div class="form-row">
          <select v-model="createForm.status" class="form-select">
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="closed">Closed</option>
          </select>
          <select v-model="createForm.priority" class="form-select">
            <option value="">Select priority (optional)</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div class="modal-actions">
          <Button type="submit" :is-loading="isCreating">
            Create Ticket
          </Button>
          <Button
            type="button"
            variant="secondary"
            @click="closeCreateModal"
          >
            Cancel
          </Button>
        </div>
      </form>
    </Modal>

    <!-- Edit Ticket Modal -->
    <Modal
      :is-open="isEditModalOpen"
      @close="closeEditModal"
      title="Edit Ticket"
      description="Update the ticket details below."
    >
      <form @submit.prevent="handleEditTicket" class="modal-form">
        <Input
          label="Title"
          v-model="editForm.title"
          :error="editErrors.title"
          placeholder="e.g., Database connection issue"
          required
        />
        <Textarea
          label="Description"
          v-model="editForm.description"
          :error="editErrors.description"
          placeholder="Provide a detailed description of the issue."
        />
        <div class="form-row">
          <select v-model="editForm.status" class="form-select">
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="closed">Closed</option>
          </select>
          <select v-model="editForm.priority" class="form-select">
            <option value="">Select priority (optional)</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div class="modal-actions">
          <Button type="submit" :is-loading="isEditing">
            Update Ticket
          </Button>
          <Button
            type="button"
            variant="secondary"
            @click="closeEditModal"
          >
            Cancel
          </Button>
        </div>
      </form>
    </Modal>

    <!-- Delete Confirmation Modal -->
    <Modal
      :is-open="isDeleteModalOpen"
      @close="closeDeleteModal"
      title="Delete Ticket"
      description="Are you sure you want to delete this ticket? This action cannot be undone."
    >
      <div class="delete-modal-content">
        <div v-if="ticketToDelete" class="ticket-preview">
          <h4>{{ ticketToDelete.title }}</h4>
          <p v-if="ticketToDelete.description">
            {{ ticketToDelete.description.length > 100 
              ? `${ticketToDelete.description.substring(0, 100)}...` 
              : ticketToDelete.description
            }}
          </p>
          <div class="ticket-preview-meta">
            <StatusBadge :status="ticketToDelete.status" />
            <span v-if="ticketToDelete.priority" :class="`priority-badge priority-${ticketToDelete.priority}`">
              {{ ticketToDelete.priority }}
            </span>
          </div>
        </div>
        
        <div class="modal-actions">
          <Button 
            type="button"
            variant="danger"
            :is-loading="isDeleting"
            @click="handleDeleteTicket"
          >
            Delete Ticket
          </Button>
          <Button
            type="button"
            variant="secondary"
            @click="closeDeleteModal"
          >
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  </main>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useTicketsStore } from '@/stores/tickets'
import Button from '@/components/Button.vue'
import StatusBadge from '@/components/StatusBadge.vue'
import Input from '@/components/Input.vue'
import Textarea from '@/components/Textarea.vue'
import Modal from '@/components/Modal.vue'
import type { Ticket, TicketFormData } from '@/types'

const ticketsStore = useTicketsStore()

// State
const searchQuery = ref('')
const statusFilter = ref<'all' | 'open' | 'in_progress' | 'closed'>('all')

// Modal states
const isCreateModalOpen = ref(false)
const isEditModalOpen = ref(false)
const isDeleteModalOpen = ref(false)

// Loading states
const isCreating = ref(false)
const isEditing = ref(false)
const isDeleting = ref(false)

// Form states
const createForm = reactive({
  title: '',
  description: '',
  status: 'open' as 'open' | 'in_progress' | 'closed',
  priority: '' as '' | 'low' | 'medium' | 'high'
})

const editForm = reactive({
  id: '',
  title: '',
  description: '',
  status: 'open' as 'open' | 'in_progress' | 'closed',
  priority: '' as '' | 'low' | 'medium' | 'high'
})

const ticketToDelete = ref<Ticket | null>(null)

// Error states
const createErrors = reactive({
  title: '',
  description: ''
})

const editErrors = reactive({
  title: '',
  description: ''
})

// Computed
const tickets = computed(() => ticketsStore.getAllTickets)

const filteredTickets = computed(() => {
  let filtered = tickets.value

  // Filter by status
  if (statusFilter.value !== 'all') {
    filtered = filtered.filter(ticket => ticket.status === statusFilter.value)
  }

  // Filter by search query
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(ticket => 
      ticket.title.toLowerCase().includes(query) ||
      ticket.description?.toLowerCase().includes(query)
    )
  }

  return filtered
})

// Methods
const setStatusFilter = (status: 'all' | 'open' | 'in_progress' | 'closed') => {
  statusFilter.value = status
}

const getTicketsByStatus = (status: 'open' | 'in_progress' | 'closed') => {
  return tickets.value.filter(ticket => ticket.status === status)
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Create Ticket
const openCreateModal = () => {
  isCreateModalOpen.value = true
}

const closeCreateModal = () => {
  isCreateModalOpen.value = false
  resetCreateForm()
}

const resetCreateForm = () => {
  createForm.title = ''
  createForm.description = ''
  createForm.status = 'open'
  createForm.priority = ''
  createErrors.title = ''
  createErrors.description = ''
}

const validateCreateForm = () => {
  createErrors.title = ''
  createErrors.description = ''

  if (!createForm.title.trim()) {
    createErrors.title = 'Title is required'
    return false
  }

  return true
}

const handleCreateTicket = async () => {
  if (!validateCreateForm()) return

  isCreating.value = true
  
  try {
    await ticketsStore.createTicket({
      title: createForm.title,
      description: createForm.description || undefined,
      status: createForm.status,
      priority: createForm.priority || undefined
    })
    
    closeCreateModal()
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to create ticket'
    createErrors.title = message
  } finally {
    isCreating.value = false
  }
}

// Edit Ticket
const openEditModal = (ticket: Ticket) => {
  editForm.id = ticket.id
  editForm.title = ticket.title
  editForm.description = ticket.description || ''
  editForm.status = ticket.status
  editForm.priority = ticket.priority || ''
  isEditModalOpen.value = true
}

const closeEditModal = () => {
  isEditModalOpen.value = false
  resetEditForm()
}

const resetEditForm = () => {
  editForm.id = ''
  editForm.title = ''
  editForm.description = ''
  editForm.status = 'open'
  editForm.priority = ''
  editErrors.title = ''
  editErrors.description = ''
}

const validateEditForm = () => {
  editErrors.title = ''
  editErrors.description = ''

  if (!editForm.title.trim()) {
    editErrors.title = 'Title is required'
    return false
  }

  return true
}

const handleEditTicket = async () => {
  if (!validateEditForm()) return

  isEditing.value = true
  
  try {
    await ticketsStore.updateTicket(editForm.id, {
      title: editForm.title,
      description: editForm.description || undefined,
      status: editForm.status,
      priority: editForm.priority || undefined
    })
    
    closeEditModal()
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to update ticket'
    editErrors.title = message
  } finally {
    isEditing.value = false
  }
}

// Delete Ticket
const openDeleteModal = (ticket: Ticket) => {
  ticketToDelete.value = ticket
  isDeleteModalOpen.value = true
}

const closeDeleteModal = () => {
  isDeleteModalOpen.value = false
  ticketToDelete.value = null
}

const handleDeleteTicket = async () => {
  if (!ticketToDelete.value) return

  isDeleting.value = true
  
  try {
    await ticketsStore.deleteTicket(ticketToDelete.value.id)
    closeDeleteModal()
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to delete ticket'
    console.error(message)
  } finally {
    isDeleting.value = false
  }
}

// Lifecycle
onMounted(async () => {
  await ticketsStore.loadTickets()
})
</script>

<style scoped>
.tickets-page {
  min-height: 100vh;
  background: linear-gradient(to bottom right, var(--color-blue-50), var(--color-sky-50), var(--color-cyan-50));
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}

/* Decorative Circle 1 - Top Right */
.tickets-decorative-circle-1 {
  position: absolute;
  top: 6rem;
  right: 8%;
  width: 12rem;
  height: 12rem;
  background: linear-gradient(135deg, rgba(34, 211, 238, 0.15), rgba(59, 130, 246, 0.15));
  border: 3px solid rgba(34, 211, 238, 0.35);
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
  box-shadow: 
    0 0 40px rgba(34, 211, 238, 0.25),
    inset 0 0 60px rgba(255, 255, 255, 0.1);
  animation: float-slow 9s ease-in-out infinite;
}

/* Decorative Circle 2 - Bottom Left */
.tickets-decorative-circle-2 {
  position: absolute;
  bottom: 6rem;
  left: 6%;
  width: 8rem;
  height: 8rem;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.12), rgba(147, 51, 234, 0.12));
  border: 3px solid rgba(59, 130, 246, 0.3);
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
  box-shadow: 
    0 0 40px rgba(59, 130, 246, 0.2),
    inset 0 0 60px rgba(255, 255, 255, 0.1);
  animation: float-slow 11s ease-in-out infinite reverse;
}

/* Floating Animation */
@keyframes float-slow {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(5deg);
  }
}

.tickets-content {
  flex: 1;
  position: relative;
  z-index: 1;
}

.tickets-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 3rem 0 2rem;
  margin-bottom: 2rem;
  gap: 2rem;
}

.tickets-header-content {
  flex: 1;
}

.tickets-title {
  font-size: clamp(2.5rem, 5vw, 3rem);
  font-weight: 700;
  color: var(--color-gray-900);
  margin: 0 0 0.5rem 0;
  letter-spacing: -0.02em;
}

.tickets-subtitle {
  font-size: 1.125rem;
  color: var(--color-gray-600);
  margin: 0;
}

/* Filters Section */
.filters-section {
  background: white;
  border: 1px solid var(--color-gray-200);
  border-radius: var(--radius-3xl);
  padding: 2rem;
  box-shadow: var(--shadow-lg);
  margin-bottom: 2rem;
}

.filters-row {
  display: flex;
  gap: 2rem;
  align-items: center;
  flex-wrap: wrap;
}

.search-wrapper {
  position: relative;
  flex: 1;
  min-width: 300px;
}

.search-input {
  width: 100%;
  padding: 0.875rem 1rem 0.875rem 3rem;
  border: 2px solid var(--color-gray-200);
  border-radius: var(--radius-lg);
  font-size: 1rem;
  font-family: inherit;
  background: white;
  transition: all 0.2s ease;
}

.search-input:focus {
  outline: none;
  border-color: var(--color-blue-500);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.125rem;
  color: var(--color-gray-400);
  pointer-events: none;
}

.filter-buttons {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.filter-button {
  background: var(--color-gray-100);
  border: 2px solid var(--color-gray-200);
  color: var(--color-gray-700);
  padding: 0.75rem 1.25rem;
  border-radius: var(--radius-lg);
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.filter-button:hover {
  background: var(--color-gray-200);
  border-color: var(--color-gray-300);
}

.filter-button:focus-visible {
  outline: 3px solid var(--color-blue-400);
  outline-offset: 2px;
}

.filter-button.active {
  background: var(--color-blue-500);
  border-color: var(--color-blue-500);
  color: white;
}

.filter-button.active:hover {
  background: var(--color-blue-600);
  border-color: var(--color-blue-600);
}

/* Tickets Grid */
.tickets-grid {
  margin-bottom: 3rem;
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border: 1px solid var(--color-gray-200);
  border-radius: var(--radius-3xl);
  box-shadow: var(--shadow-lg);
}

.empty-state-icon {
  font-size: 4rem;
  margin-bottom: 1.5rem;
  opacity: 0.6;
}

.empty-state h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-gray-900);
  margin-bottom: 0.5rem;
}

.empty-state p {
  font-size: 1rem;
  color: var(--color-gray-600);
  margin-bottom: 2rem;
}

.tickets-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 1.5rem;
}

.ticket-card {
  background: white;
  border: 1px solid var(--color-gray-200);
  border-radius: var(--radius-3xl);
  padding: 2rem;
  box-shadow: var(--shadow-lg);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.ticket-card:hover {
  box-shadow: var(--shadow-2xl);
  transform: translateY(-4px);
  border-color: var(--color-blue-200);
}

.ticket-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1rem;
}

.ticket-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-gray-900);
  margin: 0;
  flex: 1;
  line-height: 1.3;
}

.ticket-badges {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  flex-shrink: 0;
}

.priority-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.priority-badge.priority-low {
  background: var(--color-gray-100);
  color: var(--color-gray-700);
}

.priority-badge.priority-medium {
  background: var(--color-amber-100);
  color: var(--color-amber-700);
}

.priority-badge.priority-high {
  background: var(--color-rose-100);
  color: var(--color-rose-700);
}

.ticket-description {
  font-size: 0.9375rem;
  color: var(--color-gray-600);
  line-height: 1.6;
  margin: 0 0 1.5rem 0;
}

.ticket-meta {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 1.5rem;
}

.ticket-date {
  font-size: 0.875rem;
  color: var(--color-gray-500);
  font-weight: 500;
}

.ticket-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
}

/* Modal Form Styling */
.modal-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1.25rem;
}

.form-select {
  width: 100%;
  padding: 0.875rem 1rem;
  border: 2px solid var(--color-gray-200);
  border-radius: var(--radius-lg);
  font-size: 1rem;
  font-family: inherit;
  background: white;
  transition: all 0.2s ease;
}

.form-select:focus {
  outline: none;
  border-color: var(--color-blue-500);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  padding-top: 1rem;
}

/* Delete Modal Content */
.delete-modal-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.ticket-preview {
  background: var(--color-gray-50);
  border: 1px solid var(--color-gray-200);
  border-radius: var(--radius-xl);
  padding: 1.5rem;
}

.ticket-preview h4 {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-gray-900);
  margin: 0 0 0.75rem 0;
}

.ticket-preview p {
  font-size: 0.9375rem;
  color: var(--color-gray-600);
  line-height: 1.6;
  margin: 0 0 1rem 0;
}

.ticket-preview-meta {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

/* Responsive Design */
@media (max-width: 768px) {
  .tickets-page {
    padding: 1rem 0;
  }

  .tickets-content {
    padding: 0 1rem;
  }

  .tickets-header {
    flex-direction: column;
    align-items: stretch;
    padding: 2rem 0 1.5rem;
    margin-bottom: 1.5rem;
    gap: 1.5rem;
  }

  .tickets-title {
    font-size: clamp(1.75rem, 8vw, 2.5rem) !important;
    margin-bottom: 0.5rem;
  }

  .tickets-subtitle {
    font-size: 1rem;
  }

  /* Adjust decorative circles for mobile */
  .tickets-decorative-circle-1 {
    width: 8rem;
    height: 8rem;
    top: 3rem;
    right: -2rem;
  }

  .tickets-decorative-circle-2 {
    width: 6rem;
    height: 6rem;
    bottom: 3rem;
    left: -1rem;
  }

  .filters-section {
    padding: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .filters-row {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }

  .search-wrapper {
    min-width: auto;
  }

  .filter-buttons {
    justify-content: center;
    gap: 0.375rem;
  }

  .filter-button {
    padding: 0.625rem 1rem;
    font-size: 0.8125rem;
  }

  .tickets-list {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .ticket-card {
    padding: 1.5rem;
  }

  .ticket-header {
    flex-direction: column;
    align-items: stretch;
    gap: 0.75rem;
  }

  .ticket-title {
    font-size: 1.125rem;
  }

  .ticket-badges {
    justify-content: flex-start;
  }

  .ticket-actions {
    justify-content: stretch;
  }

  .ticket-actions .btn {
    flex: 1;
  }

  .empty-state {
    padding: 3rem 1.5rem;
  }

  .empty-state-icon {
    font-size: 3rem;
  }

  .empty-state h3 {
    font-size: 1.25rem;
  }

  .modal-actions {
    flex-direction: column;
  }

  .modal-actions .btn {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .tickets-content {
    padding: 0 0.75rem;
  }

  .tickets-header {
    padding: 1.5rem 0 1rem;
  }

  .tickets-title {
    font-size: 1.75rem !important;
  }

  .tickets-subtitle {
    font-size: 0.9375rem;
  }

  .filters-section {
    padding: 1.25rem;
  }

  .filter-buttons {
    flex-direction: column;
    gap: 0.5rem;
  }

  .filter-button {
    width: 100%;
    justify-content: center;
  }

  .ticket-card {
    padding: 1.25rem;
  }

  .ticket-title {
    font-size: 1rem;
  }

  .ticket-description {
    font-size: 0.875rem;
  }

  .ticket-actions {
    flex-direction: column;
    gap: 0.5rem;
  }

  .empty-state {
    padding: 2rem 1rem;
  }

  .empty-state-icon {
    font-size: 2.5rem;
  }

  .empty-state h3 {
    font-size: 1.125rem;
  }

  .ticket-preview {
    padding: 1rem;
  }

  .ticket-preview h4 {
    font-size: 1rem;
  }
}
</style>

