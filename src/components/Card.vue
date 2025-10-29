<template>
  <div :class="cardClasses">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  hoverable?: boolean
  className?: string
}

const props = defineProps<Props>()

const cardClasses = computed(() => [
  'card',
  props.hoverable && 'card-hoverable',
  props.className
].filter(Boolean).join(' '))
</script>

<style scoped>
.card {
  background: white;
  border: 1px solid var(--color-gray-200);
  border-radius: var(--radius-3xl);
  box-shadow: var(--shadow-lg);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.card-hoverable:hover {
  box-shadow: var(--shadow-2xl);
  transform: translateY(-4px);
  border-color: var(--color-blue-200);
}

/* Responsive */
@media (max-width: 768px) {
  .card {
    border-radius: var(--radius-2xl);
  }
}
</style>
