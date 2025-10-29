import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// Import global styles
import './assets/shared/global.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// Initialize auth store
import { useAuthStore } from './stores/auth'
const authStore = useAuthStore()
authStore.initializeAuth()

// Add router guard
router.beforeEach((to, _from, next) => {
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ path: '/', query: { auth: 'login' } })
  } else {
    next()
  }
})

app.mount('#app')


