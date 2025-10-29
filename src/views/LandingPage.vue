<template>
  <div class="landing-page">
    <!-- Hero Section with Wavy Background and Decorative Elements -->
    <section class="hero-section" aria-labelledby="hero-title">
      <div class="hero-decorative-circle-1" aria-hidden="true"></div>
      <div class="hero-decorative-circle-2" aria-hidden="true"></div>
      <div class="hero-decorative-dot-1" aria-hidden="true"></div>
      <div class="hero-decorative-dot-2" aria-hidden="true"></div>
      
      <div class="hero-container container">
        <div class="hero-badge">Seamless Ticket Management</div>
        <h1 id="hero-title" class="hero-title">
          Organize Everything<br />Effortlessly
        </h1>
        <p class="hero-description">
          The modern way to track, manage, and resolve tickets. Beautiful interface, powerful features, zero complexity.
        </p>
        <div class="hero-buttons">
          <Button 
            variant="primary" 
            size="lg"
            @click="openSignupModal"
          >
            Get Started Free
          </Button>
          <Button 
            variant="secondary" 
            size="lg"
            @click="openLoginModal"
          >
            Login
          </Button>
        </div>
      </div>

      <!-- Wave SVG at bottom -->
      <div class="wave-background">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" fill="white"/>
        </svg>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section">
      <div class="container">
        <h2 class="section-title">Why Choose TicketFlow?</h2>
        <p class="section-subtitle">
          Everything you need to manage tickets like a pro
        </p>

        <div class="features-grid">
          <Card class="card-hoverable">
            <div class="feature-icon-wrapper">
              <span>📊</span>
            </div>
            <h3 class="feature-title">Real-time Analytics</h3>
            <p class="feature-description">
              Track ticket status and performance with beautiful dashboards and instant insights.
            </p>
          </Card>

          <Card class="card-hoverable">
            <div class="feature-icon-wrapper">
              <span>⚡</span>
            </div>
            <h3 class="feature-title">Lightning Fast</h3>
            <p class="feature-description">
              Create, update, and resolve tickets in seconds with our intuitive interface.
            </p>
          </Card>

          <Card class="card-hoverable">
            <div class="feature-icon-wrapper">
              <span>✅</span>
            </div>
            <h3 class="feature-title">Stay Organized</h3>
            <p class="feature-description">
              Priority levels, status tracking, and smart filtering keep everything in order.
            </p>
          </Card>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <!-- Decorative Circle for CTA Section -->
      <div class="cta-decorative-circle" aria-hidden="true"></div>
      
      <div class="container">
        <div class="cta-card">
          <h2 class="cta-title">Ready to Transform Your Workflow?</h2>
          <p class="cta-description">
            Join thousands of teams already using TicketFlow to streamline their operations
          </p>
          <Button 
            variant="secondary" 
            size="lg"
            @click="openSignupModal"
          >
            Start Free Today
          </Button>
        </div>
      </div>
    </section>

    <!-- Login Modal -->
    <Modal
      :is-open="isLoginModalOpen"
      @close="closeLoginModal"
      title="Welcome Back"
      description="Log in to your account to continue"
    >
      <form @submit.prevent="handleLogin" class="modal-form" novalidate>
        <Input
          id="login-email"
          label="Email Address"
          type="email"
          placeholder="demo@ticketflow.com"
          v-model="loginForm.email"
          :error="loginErrors.email"
          required
          autocomplete="email"
        />

        <Input
          id="login-password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          v-model="loginForm.password"
          :error="loginErrors.password"
          required
          autocomplete="current-password"
        />

        <div class="modal-actions">
          <Button type="submit" full-width :is-loading="isLoggingIn">
            Log In
          </Button>
        </div>

        <p class="auth-link-text">
          Don't have an account?{' '}
          <button type="button" @click="switchToSignup" class="auth-link">
            Sign up
          </button>
        </p>
      </form>
    </Modal>

    <!-- Signup Modal -->
    <Modal
      :is-open="isSignupModalOpen"
      @close="closeSignupModal"
      title="Create Account"
      description="Sign up to get started with TicketFlow"
    >
      <form @submit.prevent="handleSignup" class="modal-form" novalidate>
        <Input
          id="signup-name"
          label="Full Name"
          type="text"
          placeholder="John Doe"
          v-model="signupForm.name"
          :error="signupErrors.name"
          required
          autocomplete="name"
        />

        <Input
          id="signup-email"
          label="Email Address"
          type="email"
          placeholder="john@example.com"
          v-model="signupForm.email"
          :error="signupErrors.email"
          required
          autocomplete="email"
        />

        <Input
          id="signup-password"
          label="Password"
          type="password"
          placeholder="At least 6 characters"
          v-model="signupForm.password"
          :error="signupErrors.password"
          required
          autocomplete="new-password"
        />

        <Input
          id="signup-confirm-password"
          label="Confirm Password"
          type="password"
          placeholder="Re-enter your password"
          v-model="signupForm.confirmPassword"
          :error="signupErrors.confirmPassword"
          required
          autocomplete="new-password"
        />

        <div class="modal-actions">
          <Button type="submit" full-width :is-loading="isSigningUp">
            Create Account
          </Button>
        </div>

        <p class="auth-link-text">
          Already have an account?{' '}
          <button type="button" @click="switchToLogin" class="auth-link">
            Log in
          </button>
        </p>
      </form>
    </Modal>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import Button from '@/components/Button.vue'
import Card from '@/components/Card.vue'
import Input from '@/components/Input.vue'
import Modal from '@/components/Modal.vue'
import Footer from '@/components/Footer.vue'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

// Modal states
const isLoginModalOpen = ref(false)
const isSignupModalOpen = ref(false)

// Form states
const loginForm = reactive({
  email: '',
  password: ''
})

const signupForm = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

// Error states
const loginErrors = reactive({
  email: '',
  password: ''
})

const signupErrors = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

// Loading states
const isLoggingIn = ref(false)
const isSigningUp = ref(false)

// Check URL params on mount and watch for changes to open modals
const checkAuthParam = () => {
  const authParam = route.query.auth
  if (authParam === 'login') {
    openLoginModal()
  } else if (authParam === 'signup') {
    openSignupModal()
  }
}

onMounted(() => {
  checkAuthParam()
})

// Watch for route query changes (e.g., when clicking login button from navbar)
watch(() => route.query.auth, () => {
  checkAuthParam()
})

const openLoginModal = () => {
  isLoginModalOpen.value = true
  isSignupModalOpen.value = false
}

const openSignupModal = () => {
  isSignupModalOpen.value = true
  isLoginModalOpen.value = false
}

const closeLoginModal = () => {
  isLoginModalOpen.value = false
  resetLoginForm()
}

const closeSignupModal = () => {
  isSignupModalOpen.value = false
  resetSignupForm()
}

const switchToSignup = () => {
  isLoginModalOpen.value = false
  isSignupModalOpen.value = true
}

const switchToLogin = () => {
  isSignupModalOpen.value = false
  isLoginModalOpen.value = true
}

const resetLoginForm = () => {
  loginForm.email = ''
  loginForm.password = ''
  loginErrors.email = ''
  loginErrors.password = ''
}

const resetSignupForm = () => {
  signupForm.name = ''
  signupForm.email = ''
  signupForm.password = ''
  signupForm.confirmPassword = ''
  signupErrors.name = ''
  signupErrors.email = ''
  signupErrors.password = ''
  signupErrors.confirmPassword = ''
}

const validateLoginForm = () => {
  loginErrors.email = ''
  loginErrors.password = ''

  if (!loginForm.email) {
    loginErrors.email = 'Email is required'
    return false
  }

  if (!loginForm.password) {
    loginErrors.password = 'Password is required'
    return false
  }

  return true
}

const validateSignupForm = () => {
  signupErrors.name = ''
  signupErrors.email = ''
  signupErrors.password = ''
  signupErrors.confirmPassword = ''

  if (!signupForm.name) {
    signupErrors.name = 'Name is required'
    return false
  }

  if (!signupForm.email) {
    signupErrors.email = 'Email is required'
    return false
  }

  if (!signupForm.password) {
    signupErrors.password = 'Password is required'
    return false
  }

  if (signupForm.password.length < 6) {
    signupErrors.password = 'Password must be at least 6 characters'
    return false
  }

  if (signupForm.password !== signupForm.confirmPassword) {
    signupErrors.confirmPassword = 'Passwords do not match'
    return false
  }

  return true
}

const handleLogin = async () => {
  if (!validateLoginForm()) return

  isLoggingIn.value = true
  
  try {
    await authStore.login(loginForm)
    closeLoginModal()
    router.push('/dashboard')
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Login failed'
    loginErrors.password = message
  } finally {
    isLoggingIn.value = false
  }
}

const handleSignup = async () => {
  if (!validateSignupForm()) return

  isSigningUp.value = true
  
  try {
    await authStore.signup(signupForm)
    closeSignupModal()
    router.push('/dashboard')
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Signup failed'
    signupErrors.email = message
  } finally {
    isSigningUp.value = false
  }
}
</script>

<style scoped>
.landing-page {
  min-height: calc(100vh - 73px); /* Subtract navbar height */
  background: linear-gradient(to bottom right, var(--color-blue-50), var(--color-sky-50), var(--color-cyan-50));
  overflow-x: hidden;
}

/* Hero Section - Bold & Modern */
.hero-section {
  position: relative;
  min-height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6rem 0 12rem;
  overflow: visible;
  background: linear-gradient(135deg, 
    #bae6fd 0%,     /* sky-200 - vibrant baby blue */
    #7dd3fc 30%,    /* sky-300 - brighter blue */
    #67e8f9 60%,    /* cyan-300 - cyan accent */
    #a5f3fc 100%    /* cyan-200 - soft cyan */
  );
}

/* Decorative Circle 1 - Large Circle Top Right (CLEARLY VISIBLE & OVERLAPPING HERO) */
.hero-decorative-circle-1 {
  position: absolute;
  top: 8rem;
  right: 5%;
  width: 16rem;
  height: 16rem;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.05));
  border: 3px solid rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  pointer-events: none;
  z-index: 1;
  box-shadow: 
    0 0 40px rgba(255, 255, 255, 0.3),
    inset 0 0 60px rgba(255, 255, 255, 0.2);
  animation: float-slow 8s ease-in-out infinite;
}

/* Decorative Circle 2 - Medium Circle Top Left (CLEARLY VISIBLE & OVERLAPPING HERO) */
.hero-decorative-circle-2 {
  position: absolute;
  top: 3rem;
  left: 5%;
  width: 12rem;
  height: 12rem;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.18), rgba(255, 255, 255, 0.08));
  border: 3px solid rgba(255, 255, 255, 0.45);
  border-radius: 50%;
  pointer-events: none;
  z-index: 1;
  box-shadow: 
    0 0 40px rgba(255, 255, 255, 0.25),
    inset 0 0 60px rgba(255, 255, 255, 0.18);
  animation: float-slow 6s ease-in-out infinite reverse;
}

/* Small Decorative Accent Dots (Additional decorative elements) */
.hero-decorative-dot-1 {
  position: absolute;
  top: 15rem;
  right: 15%;
  width: 2rem;
  height: 2rem;
  background: rgba(255, 255, 255, 0.4);
  border: 2px solid rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(255, 255, 255, 0.3);
  animation: pulse-glow 3s ease-in-out infinite;
  z-index: 1;
}

.hero-decorative-dot-2 {
  position: absolute;
  top: 20rem;
  left: 12%;
  width: 1.5rem;
  height: 1.5rem;
  background: rgba(255, 255, 255, 0.35);
  border: 2px solid rgba(255, 255, 255, 0.7);
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(255, 255, 255, 0.25);
  animation: pulse-glow 3s ease-in-out infinite 1s;
  z-index: 1;
}

/* Floating Animation for decorative circles */
@keyframes float-slow {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(5deg);
  }
}

/* Pulse Glow Animation for decorative dots */
@keyframes pulse-glow {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
}

.hero-container {
  position: relative;
  z-index: 2;
  text-align: center;
  color: var(--color-gray-900);
  max-width: 64rem;
}

/* Badge above title */
.hero-badge {
  display: inline-block;
  background: var(--color-blue-100);
  color: var(--color-blue-700);
  padding: 0.5rem 1.5rem;
  border-radius: var(--radius-full);
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
}

.hero-title {
  font-size: clamp(3.75rem, 7vw, 6rem);
  font-weight: 900;
  margin-bottom: 1.5rem;
  line-height: 1.1;
  letter-spacing: -0.03em;
  background: linear-gradient(to right, var(--color-blue-600), var(--color-cyan-600), var(--color-blue-600));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-description {
  font-size: clamp(1.125rem, 2vw, 1.25rem);
  max-width: 42rem;
  margin: 0 auto 2.5rem;
  color: var(--color-gray-600);
  line-height: 1.75;
  font-weight: 400;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

/* Wave SVG at bottom of hero */
.wave-background {
  position: absolute;
  bottom: -1px; /* Prevent gap between wave and next section */
  left: 0;
  width: 100%;
  height: auto;
  z-index: 1;
  line-height: 0;
}

.wave-background svg {
  display: block;
  width: 100%;
  height: auto;
  filter: drop-shadow(0 -4px 8px rgba(0, 0, 0, 0.08));
}

.wave-background svg path {
  fill: white;
}

/* Features Section */
.features-section {
  position: relative;
  background: white;
  padding: 6rem 0;
}

.section-title {
  font-size: clamp(2.5rem, 5vw, 3rem);
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
  color: var(--color-gray-900);
  letter-spacing: -0.02em;
}

.section-subtitle {
  font-size: clamp(1.125rem, 2vw, 1.25rem);
  text-align: center;
  color: var(--color-gray-600);
  margin-bottom: 4rem;
  max-width: 42rem;
  margin-left: auto;
  margin-right: auto;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
  position: relative;
  z-index: 2;
}

/* Feature Cards - Gradient Background */
.features-grid .card {
  background: linear-gradient(to bottom right, var(--color-blue-50), var(--color-cyan-50));
  border: 1px solid var(--color-blue-100);
  padding: 2rem;
  border-radius: var(--radius-3xl);
  box-shadow: var(--shadow-lg);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.features-grid .card:hover {
  box-shadow: var(--shadow-2xl);
  transform: translateY(-4px);
}

.feature-icon-wrapper {
  width: 4rem;
  height: 4rem;
  background: linear-gradient(to bottom right, var(--color-blue-500), var(--color-cyan-500));
  border-radius: var(--radius-2xl);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
  margin-bottom: 1.5rem;
  box-shadow: var(--shadow-lg);
}

.feature-title {
  font-size: clamp(1.25rem, 3vw, 1.5rem);
  font-weight: 700;
  margin-bottom: 0.75rem;
  color: var(--color-gray-900);
  letter-spacing: -0.01em;
}

.feature-description {
  font-size: 1rem;
  color: var(--color-gray-600);
  line-height: 1.75;
  margin: 0;
}

/* CTA Section - Gradient Background */
.cta-section {
  position: relative;
  background: linear-gradient(to bottom right, var(--color-blue-600), var(--color-cyan-600));
  padding: 6rem 0;
  overflow: hidden;
}

/* Decorative Circle in CTA Section (Additional decorative element) */
.cta-decorative-circle {
  position: absolute;
  top: 50%;
  left: 10%;
  transform: translateY(-50%);
  width: 10rem;
  height: 10rem;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05));
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  pointer-events: none;
  z-index: 1;
  box-shadow: 
    0 0 40px rgba(255, 255, 255, 0.2),
    inset 0 0 60px rgba(255, 255, 255, 0.1);
  animation: float-slow 12s ease-in-out infinite;
}

.cta-card {
  text-align: center;
  position: relative;
  z-index: 2;
}

.cta-title {
  font-size: clamp(2.5rem, 5vw, 3rem);
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: white;
  letter-spacing: -0.02em;
}

.cta-description {
  font-size: clamp(1.125rem, 2vw, 1.25rem);
  color: rgba(255, 255, 255, 0.95);
  max-width: 42rem;
  margin: 0 auto 2.5rem;
  line-height: 1.75;
}

/* Modal Form Styling */
.modal-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  padding-top: 1rem;
}

.auth-link-text {
  text-align: center;
  font-size: 0.9375rem;
  color: var(--color-gray-600);
  margin-top: 1.5rem;
}

.auth-link {
  color: var(--color-blue-600);
  font-weight: 600;
  text-decoration: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  font-size: inherit;
  font-family: inherit;
  transition: color 0.2s ease;
}

.auth-link:hover {
  color: var(--color-cyan-600);
  text-decoration: underline;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .hero-section {
    padding: 4rem 0 10rem;
  }

  .hero-decorative-circle-1,
  .hero-decorative-circle-2 {
    width: 16rem;
    height: 16rem;
  }
}

/* Tablet & Mobile Responsive */
@media (max-width: 768px) {
  .landing-page {
    overflow-x: hidden;
  }

  .hero-section {
    min-height: auto;
    padding: 2rem 1rem 8rem;
  }

  .hero-container {
    padding: 0 1rem;
  }

  .hero-badge {
    font-size: 0.75rem;
    padding: 0.375rem 1rem;
  }

  .hero-title {
    font-size: clamp(2.25rem, 10vw, 3.5rem) !important;
    line-height: 1.2;
    margin-bottom: 1rem;
  }

  .hero-description {
    font-size: 1rem;
    margin-bottom: 2rem;
    padding: 0 1rem;
  }

  /* Make decorative circles visible on mobile */
  .hero-decorative-circle-1 {
    width: 10rem;
    height: 10rem;
    top: 6rem;
    right: -2rem;
  }

  .hero-decorative-circle-2 {
    width: 8rem;
    height: 8rem;
    top: 2rem;
    left: -2rem;
  }

  .hero-decorative-dot-1,
  .hero-decorative-dot-2 {
    display: none; /* Hide small dots on mobile for cleaner look */
  }

  .cta-decorative-circle {
    width: 6rem;
    height: 6rem;
    left: -1rem;
  }

  .hero-buttons {
    flex-direction: column;
    align-items: stretch;
    width: 100%;
    max-width: 24rem;
    margin: 0 auto;
    gap: 0.75rem;
    padding: 0 1rem;
  }

  .section-title {
    font-size: clamp(1.75rem, 7vw, 2.5rem) !important;
  }

  .section-subtitle {
    font-size: 1rem;
    padding: 0 1rem;
  }

  .features-section {
    padding: 3rem 0;
  }

  .features-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 0 1rem;
  }

  .cta-section {
    padding: 3rem 1rem;
  }

  .cta-title {
    font-size: clamp(1.5rem, 6vw, 2rem) !important;
  }

  .cta-description {
    font-size: 1rem;
  }

  .modal-actions {
    flex-direction: column;
  }
}

/* Small Mobile Responsive */
@media (max-width: 480px) {
  .hero-section {
    padding: 1.5rem 0.5rem 6rem;
  }

  .hero-title {
    font-size: 2rem !important;
  }

  .hero-description {
    font-size: 0.9375rem;
  }

  .hero-buttons {
    padding: 0 0.5rem;
  }

  .features-grid {
    padding: 0 0.5rem;
  }
}
</style>

