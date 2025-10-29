<template>
  <nav class="navbar" role="navigation" aria-label="Main navigation">
    <div class="navbar-container">
      <div 
        class="navbar-brand" 
        @click="router.push('/')"
        role="button"
        tabindex="0"
        aria-label="TicketFlow - Go to homepage"
        @keydown="handleBrandKeydown"
      >
        <div class="navbar-logo" aria-hidden="true">
          <span>🎫</span>
        </div>
        <span class="navbar-brand-name">TicketFlow</span>
      </div>

      <div class="navbar-links" role="menubar">
        <button
          @click="router.push('/')"
          :class="`navbar-link ${isActive('/') ? 'active' : ''}`"
          role="menuitem"
          :aria-current="isActive('/') ? 'page' : undefined"
        >
          Home
        </button>

        <template v-if="authStore.isAuthenticated">
          <button
            @click="router.push('/dashboard')"
            :class="`navbar-link ${isActive('/dashboard') ? 'active' : ''}`"
            role="menuitem"
            :aria-current="isActive('/dashboard') ? 'page' : undefined"
          >
            Dashboard
          </button>
          <button
            @click="router.push('/tickets')"
            :class="`navbar-link ${isActive('/tickets') ? 'active' : ''}`"
            role="menuitem"
            :aria-current="isActive('/tickets') ? 'page' : undefined"
          >
            Tickets
          </button>
          <Button 
            variant="danger" 
            size="sm" 
            @click="handleLogout"
            aria-label="Logout from your account"
          >
            Logout
          </Button>
        </template>

        <template v-else>
          <Button
            variant="primary"
            size="sm"
            @click="router.push('/?auth=login')"
            aria-label="Login to your account"
          >
            Login
          </Button>
        </template>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import Button from './Button.vue'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const handleLogout = () => {
  authStore.logout()
  router.push('/')
}

const isActive = (path: string) => {
  return route.path === path
}

const handleBrandKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Enter' || e.key === ' ') {
    router.push('/')
  }
}
</script>

<style scoped>
.navbar {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--color-blue-100);
  position: sticky;
  top: 0;
  z-index: 40;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.navbar-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  width: 100%;
  max-width: 100%;
}

.navbar-brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  transition: opacity 0.2s;
}

.navbar-brand:hover {
  opacity: 0.8;
}

.navbar-brand:focus-visible {
  outline: 3px solid var(--color-blue-400);
  outline-offset: 2px;
  border-radius: var(--radius-md);
}

.navbar-logo {
  width: 2.5rem;
  height: 2.5rem;
  background: linear-gradient(to bottom right, var(--color-blue-400), var(--color-cyan-500));
  border-radius: var(--radius-xl);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.375rem;
  box-shadow: var(--shadow-lg);
}

.navbar-brand-name {
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(to right, var(--color-blue-600), var(--color-cyan-600));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.navbar-links {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-left: auto;
}

.navbar-link {
  color: var(--color-gray-700);
  font-weight: 500;
  font-size: 1rem;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s;
  padding: 0.5rem 0.75rem;
  border-radius: var(--radius-md);
}

.navbar-link:hover {
  color: var(--color-blue-600);
}

.navbar-link:focus-visible {
  outline: 3px solid var(--color-blue-400);
  outline-offset: 2px;
  color: var(--color-blue-600);
}

.navbar-link.active {
  color: var(--color-blue-600);
  font-weight: 600;
}

/* Responsive Navbar */
@media (max-width: 768px) {
  .navbar-container {
    padding: 0.75rem 1rem;
  }

  .navbar-brand-name {
    font-size: 1.125rem;
  }

  .navbar-links {
    gap: 0.5rem;
  }

  .navbar-link {
    font-size: 0.8125rem;
    padding: 0.375rem 0.5rem;
  }

  .navbar-logo {
    width: 2rem;
    height: 2rem;
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .navbar-container {
    padding: 0.75rem 0.75rem;
  }

  .navbar-brand-name {
    font-size: 1rem;
  }

  .navbar-links {
    gap: 0.25rem;
  }

  .navbar-link {
    font-size: 0.75rem;
    padding: 0.25rem 0.375rem;
  }

  .navbar-logo {
    width: 1.75rem;
    height: 1.75rem;
    font-size: 0.875rem;
  }

  .navbar-brand {
    gap: 0.5rem;
  }
}
</style>

