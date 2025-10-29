<template>
  <main class="dashboard-page">
    <!-- Decorative Circles for Dashboard -->
    <div class="dashboard-decorative-circle-1" aria-hidden="true"></div>
    <div class="dashboard-decorative-circle-2" aria-hidden="true"></div>
    
    <div class="dashboard-content">
    <div class="container">
        <header class="dashboard-header">
          <h1 class="dashboard-title">Dashboard</h1>
          <p class="dashboard-subtitle">
            Welcome back{{ user?.name ? `, ${user.name.split(' ')[0]}` : '' }}! Here's your ticket overview
          </p>
        </header>

        <!-- Dashboard Tabs -->
        <nav class="dashboard-tabs" role="tablist" aria-label="Dashboard sections">
          <button 
            :class="`tab-button ${activeTab === 'overview' ? 'active' : ''}`"
            @click="setActiveTab('overview')"
            role="tab"
            :aria-selected="activeTab === 'overview'"
            aria-controls="overview-panel"
            id="overview-tab"
          >
            Overview
          </button>
          <button 
            :class="`tab-button ${activeTab === 'activity' ? 'active' : ''}`"
            @click="setActiveTab('activity')"
            role="tab"
            :aria-selected="activeTab === 'activity'"
            aria-controls="activity-panel"
            id="activity-tab"
          >
            Recent Activity
          </button>
        </nav>

        <!-- Tab Content -->
        <div v-if="activeTab === 'overview'" role="tabpanel" id="overview-panel" aria-labelledby="overview-tab">
          <!-- Stats Grid -->
          <section class="stats-grid" aria-label="Ticket statistics">
            <div class="stat-card">
              <div class="stat-icon-wrapper">
                <span>🎫</span>
              </div>
              <p class="stat-label">Total Tickets</p>
              <p class="stat-value">{{ stats.total }}</p>
            </div>

            <div class="stat-card">
              <div class="stat-icon-wrapper">
                <span>⚠️</span>
              </div>
              <p class="stat-label">Open</p>
              <p class="stat-value">{{ stats.open }}</p>
            </div>

            <div class="stat-card">
              <div class="stat-icon-wrapper">
                <span>🕒</span>
              </div>
              <p class="stat-label">In Progress</p>
              <p class="stat-value">{{ stats.inProgress }}</p>
            </div>

            <div class="stat-card">
              <div class="stat-icon-wrapper">
                <span>✅</span>
              </div>
              <p class="stat-label">Closed</p>
              <p class="stat-value">{{ stats.closed }}</p>
            </div>
          </section>

          <!-- Quick Actions -->
          <section class="actions-section" aria-label="Quick actions">
            <h2>Quick Actions</h2>
            <div class="actions-grid">
              <Button 
                variant="primary" 
                size="lg"
                @click="router.push('/tickets')"
              >
                Manage Tickets
              </Button>
              <Button 
                variant="secondary" 
                size="lg"
                @click="openCreateModal"
              >
                Create New Ticket
              </Button>
            </div>
          </section>
        </div>

        <div v-if="activeTab === 'activity'" role="tabpanel" id="activity-panel" aria-labelledby="activity-tab">
          <section class="activity-section" aria-label="Recent ticket activity">
            <h2>Recent Activity</h2>
            <div class="activity-content">
              <div v-if="recentTickets.length === 0" class="empty-activity">
                <div class="empty-activity-icon">📝</div>
                <h3>No recent activity</h3>
                <p>Create your first ticket to see activity here</p>
                <Button @click="openCreateModal">
                  Create Ticket
                </Button>
              </div>
              <div v-else class="activity-list">
                <div v-for="ticket in recentTickets" :key="ticket.id" class="activity-item">
                  <div class="activity-item-header">
                    <h4 class="activity-item-title">{{ ticket.title }}</h4>
                    <StatusBadge :status="ticket.status" />
                  </div>
                  <p v-if="ticket.description" class="activity-item-description">
                    {{ ticket.description.length > 100 
                      ? `${ticket.description.substring(0, 100)}...` 
                      : ticket.description
                    }}
                  </p>
                  <div class="activity-item-meta">
                    <span class="activity-item-date">
                      Created: {{ formatDate(ticket.createdAt) }}
                    </span>
                    <span v-if="ticket.priority" :class="`activity-item-priority priority-${ticket.priority}`">
                      {{ ticket.priority }}
                    </span>
                  </div>
                  <div class="activity-item-actions">
                    <Button 
                      size="sm" 
                      variant="secondary"
                      @click="router.push('/tickets')"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
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
    <Footer />
  </main>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useTicketsStore } from '@/stores/tickets'
import Button from '@/components/Button.vue'
import StatusBadge from '@/components/StatusBadge.vue'
import Input from '@/components/Input.vue'
import Textarea from '@/components/Textarea.vue'
import Modal from '@/components/Modal.vue'
import Footer from '@/components/Footer.vue'

const router = useRouter()
const authStore = useAuthStore()
const ticketsStore = useTicketsStore()

// State
const activeTab = ref<'overview' | 'activity'>('overview')
const isCreateModalOpen = ref(false)
const isCreating = ref(false)

// Form state
const createForm = reactive({
  title: '',
  description: '',
  status: 'open' as 'open' | 'in_progress' | 'closed',
  priority: '' as '' | 'low' | 'medium' | 'high'
})

const createErrors = reactive({
  title: '',
  description: ''
})

// Computed
const user = computed(() => authStore.user)
const stats = computed(() => ticketsStore.getDashboardStats)
const recentTickets = computed(() => ticketsStore.getRecentTickets)

// Methods
const setActiveTab = (tab: 'overview' | 'activity') => {
  activeTab.value = tab
}

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
    router.push('/tickets')
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to create ticket'
    createErrors.title = message
  } finally {
    isCreating.value = false
  }
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

// Lifecycle
onMounted(async () => {
  await ticketsStore.loadTickets()
})
</script>

<style scoped>
.dashboard-page {
  min-height: 100vh;
  background: linear-gradient(to bottom right, var(--color-blue-50), var(--color-sky-50), var(--color-cyan-50));
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}

/* Decorative Circle 1 - Top Right */
.dashboard-decorative-circle-1 {
  position: absolute;
  top: 8rem;
  right: 10%;
  width: 14rem;
  height: 14rem;
  background: linear-gradient(135deg, rgba(34, 211, 238, 0.12), rgba(59, 130, 246, 0.12));
  border: 3px solid rgba(34, 211, 238, 0.3);
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
  box-shadow: 
    0 0 40px rgba(34, 211, 238, 0.2),
    inset 0 0 60px rgba(255, 255, 255, 0.1);
  animation: float-slow 8s ease-in-out infinite;
}

/* Decorative Circle 2 - Bottom Left */
.dashboard-decorative-circle-2 {
  position: absolute;
  bottom: 8rem;
  left: 8%;
  width: 10rem;
  height: 10rem;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1));
  border: 3px solid rgba(59, 130, 246, 0.25);
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
  box-shadow: 
    0 0 40px rgba(59, 130, 246, 0.15),
    inset 0 0 60px rgba(255, 255, 255, 0.1);
  animation: float-slow 10s ease-in-out infinite reverse;
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

.dashboard-content {
  flex: 1;
}

.dashboard-header {
  padding: 3rem 0 2rem;
  margin-bottom: 2rem;
}

.dashboard-title {
  font-size: clamp(2.5rem, 5vw, 3rem);
  font-weight: 700;
  color: var(--color-gray-900);
  margin: 0 0 0.5rem 0;
  letter-spacing: -0.02em;
}

.dashboard-subtitle {
  font-size: 1.125rem;
  color: var(--color-gray-600);
  margin: 0;
}

/* Dashboard Tabs */
.dashboard-tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
  border-bottom: 2px solid var(--color-gray-200);
}

.tab-button {
  background: none;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-gray-600);
  cursor: pointer;
  border-bottom: 3px solid transparent;
  transition: all 0.2s ease;
  position: relative;
}

.tab-button:hover {
  color: var(--color-blue-600);
  background-color: var(--color-blue-50);
}

.tab-button:focus-visible {
  outline: 3px solid var(--color-blue-400);
  outline-offset: 2px;
}

.tab-button.active {
  color: var(--color-blue-700);
  border-bottom-color: var(--color-blue-500);
  background-color: var(--color-blue-50);
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}

.stat-card {
  background: white;
  border: 1px solid var(--color-gray-100);
  padding: 2rem;
  border-radius: var(--radius-3xl);
  box-shadow: var(--shadow-lg);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.stat-card:hover {
  box-shadow: var(--shadow-2xl);
  transform: translateY(-4px);
}

.stat-icon-wrapper {
  width: 3.5rem;
  height: 3.5rem;
  background: linear-gradient(to bottom right, var(--color-blue-500), var(--color-cyan-500));
  border-radius: var(--radius-2xl);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.75rem;
  margin-bottom: 1rem;
  box-shadow: var(--shadow-md);
}

/* Different gradient colors for each stat */
.stat-card:nth-child(1) .stat-icon-wrapper {
  background: linear-gradient(to bottom right, var(--color-blue-500), var(--color-cyan-500));
}

.stat-card:nth-child(2) .stat-icon-wrapper {
  background: linear-gradient(to bottom right, var(--color-emerald-500), var(--color-emerald-600));
}

.stat-card:nth-child(3) .stat-icon-wrapper {
  background: linear-gradient(to bottom right, var(--color-amber-500), var(--color-amber-600));
}

.stat-card:nth-child(4) .stat-icon-wrapper {
  background: linear-gradient(to bottom right, var(--color-gray-500), var(--color-gray-600));
}

.stat-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-gray-600);
  margin-bottom: 0.5rem;
}

.stat-value {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--color-gray-900);
  letter-spacing: -0.02em;
}

/* Quick Actions Section */
.actions-section {
  background: linear-gradient(to bottom right, var(--color-blue-50), var(--color-cyan-50));
  border: 1px solid var(--color-blue-100);
  border-radius: var(--radius-3xl);
  padding: 2.5rem;
  box-shadow: var(--shadow-lg);
  margin-bottom: 3rem;
}

.actions-section h2 {
  font-size: 1.875rem;
  font-weight: 700;
  color: var(--color-gray-900);
  margin-bottom: 1.5rem;
  letter-spacing: -0.02em;
}

.actions-grid {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

/* Activity Section */
.activity-section {
  background: white;
  border: 1px solid var(--color-gray-200);
  border-radius: var(--radius-3xl);
  padding: 2rem;
  box-shadow: var(--shadow-lg);
  margin-bottom: 3rem;
}

.activity-section h2 {
  font-size: 1.875rem;
  font-weight: 700;
  color: var(--color-gray-900);
  margin-bottom: 1.5rem;
  letter-spacing: -0.02em;
}

.activity-content {
  min-height: 300px;
}

.empty-activity {
  text-align: center;
  padding: 3rem 2rem;
  color: var(--color-gray-600);
}

.empty-activity-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.6;
}

.empty-activity h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-gray-900);
  margin-bottom: 0.5rem;
}

.empty-activity p {
  font-size: 1rem;
  margin-bottom: 1.5rem;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.activity-item {
  background: linear-gradient(to right, var(--color-gray-50), transparent);
  border: 1px solid var(--color-gray-200);
  border-radius: var(--radius-xl);
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.activity-item:hover {
  border-color: var(--color-blue-200);
  box-shadow: var(--shadow-md);
  transform: translateY(-1px);
}

.activity-item-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 0.75rem;
}

.activity-item-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-gray-900);
  margin: 0;
  flex: 1;
}

.activity-item-description {
  font-size: 0.9375rem;
  color: var(--color-gray-600);
  line-height: 1.6;
  margin: 0 0 1rem 0;
}

.activity-item-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.activity-item-date {
  font-size: 0.875rem;
  color: var(--color-gray-500);
  font-weight: 500;
}

.activity-item-priority {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.activity-item-priority.priority-low {
  background: var(--color-gray-100);
  color: var(--color-gray-700);
}

.activity-item-priority.priority-medium {
  background: var(--color-amber-100);
  color: var(--color-amber-700);
}

.activity-item-priority.priority-high {
  background: var(--color-rose-100);
  color: var(--color-rose-700);
}

.activity-item-actions {
  display: flex;
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

/* Responsive Design */
@media (max-width: 768px) {
  .dashboard-page {
    padding: 1rem 0;
  }

  .dashboard-content {
    padding: 0 1rem;
  }

  .dashboard-header {
    padding: 2rem 0 1.5rem;
    margin-bottom: 1.5rem;
  }

  .dashboard-title {
    font-size: clamp(1.75rem, 8vw, 2.5rem) !important;
    margin-bottom: 0.5rem;
  }

  .dashboard-subtitle {
    font-size: 1rem;
  }

  /* Adjust decorative circles for mobile */
  .dashboard-decorative-circle-1 {
    width: 8rem;
    height: 8rem;
    top: 4rem;
    right: -2rem;
  }

  .dashboard-decorative-circle-2 {
    width: 6rem;
    height: 6rem;
    bottom: 4rem;
    left: -1rem;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .stat-card {
    padding: 1.5rem;
  }

  .stat-icon-wrapper {
    width: 3rem;
    height: 3rem;
    font-size: 1.5rem;
  }

  .stat-label {
    font-size: 0.8125rem;
  }

  .stat-value {
    font-size: 2rem;
  }

  .actions-section {
    padding: 1.5rem;
    margin-bottom: 2rem;
  }

  .actions-section h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  .actions-grid {
    flex-direction: column;
    gap: 0.75rem;
  }

  .actions-grid .btn {
    width: 100%;
  }

  .dashboard-tabs {
    margin-bottom: 1.5rem;
  }

  .tab-button {
    padding: 0.625rem 1rem;
    font-size: 0.9375rem;
  }

  .activity-section {
    padding: 1.5rem;
    margin-bottom: 2rem;
  }

  .activity-section h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  .activity-item {
    padding: 1.25rem;
  }

  .activity-item-header {
    flex-direction: column;
    align-items: stretch;
    gap: 0.5rem;
  }

  .activity-item-title {
    font-size: 1rem;
  }

  .activity-item-meta {
    flex-direction: column;
    align-items: flex-start;
  }

  .activity-item-actions {
    justify-content: stretch;
  }

  .activity-item-actions .btn {
    width: 100%;
  }

  .modal-actions {
    flex-direction: column;
  }

  .modal-actions .btn {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .dashboard-content {
    padding: 0 0.75rem;
  }

  .dashboard-header {
    padding: 1.5rem 0 1rem;
  }

  .dashboard-title {
    font-size: 1.75rem !important;
  }

  .dashboard-subtitle {
    font-size: 0.9375rem;
  }

  .stats-grid {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }

  .stat-card {
    padding: 1.25rem;
  }

  .stat-icon-wrapper {
    width: 2.5rem;
    height: 2.5rem;
    font-size: 1.25rem;
  }

  .stat-value {
    font-size: 1.75rem;
  }

  .actions-section {
    padding: 1.25rem;
  }

  .actions-section h2 {
    font-size: 1.25rem;
  }

  .dashboard-tabs {
    gap: 0.25rem;
  }

  .tab-button {
    padding: 0.5rem 0.75rem;
    font-size: 0.875rem;
  }

  .activity-section {
    padding: 1rem;
  }

  .activity-item {
    padding: 1rem;
  }

  .empty-activity {
    padding: 2rem 1rem;
  }

  .empty-activity-icon {
    font-size: 2.5rem;
  }

  .empty-activity h3 {
    font-size: 1.25rem;
  }
}
</style>

