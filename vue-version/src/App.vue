<template>
  <div id="app">
    <Navbar />
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

onMounted(() => {
  authStore.initializeAuth()
})
</script>

<style>
@import './assets/shared/global.css';

#app {
  min-height: 100vh;
  background: var(--color-bg-gradient);
}
</style>

