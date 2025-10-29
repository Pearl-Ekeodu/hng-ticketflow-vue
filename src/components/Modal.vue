<template>
  <Teleport to="body">
    <div 
      v-if="isOpen" 
      class="modal-overlay" 
      @click="onClose"
      role="dialog" 
      aria-modal="true" 
      :aria-labelledby="titleId"
    >
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <div>
            <h2 :id="titleId" class="modal-title">{{ title }}</h2>
            <p v-if="description" class="modal-description">{{ description }}</p>
          </div>
          <button
            class="modal-close"
            @click="onClose"
            aria-label="Close modal"
            type="button"
          >
            ✕
          </button>
        </div>
        <div class="modal-body">
          <slot />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, computed } from 'vue'

interface Props {
  isOpen: boolean
  title: string
  description?: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  close: []
}>()

const titleId = computed(() => `modal-title-${Math.random().toString(36).substr(2, 9)}`)

const onClose = () => {
  emit('close')
}

const handleEscape = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    onClose()
  }
}

onMounted(() => {
  if (props.isOpen) {
    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'
  }
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
  document.body.style.overflow = 'unset'
})
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-content {
  background: white;
  border-radius: var(--radius-3xl);
  box-shadow: var(--shadow-2xl);
  width: 100%;
  max-width: 32rem;
  max-height: 90vh;
  overflow-y: auto;
  animation: modalSlideIn 0.3s ease-out;
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 2rem 2rem 1rem;
  border-bottom: 1px solid var(--color-gray-200);
}

.modal-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-gray-900);
  margin: 0 0 0.5rem 0;
  letter-spacing: -0.02em;
}

.modal-description {
  font-size: 1rem;
  color: var(--color-gray-600);
  margin: 0;
  line-height: 1.6;
}

.modal-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: var(--color-gray-400);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: var(--radius-md);
  transition: all 0.2s ease;
  line-height: 1;
}

.modal-close:hover {
  color: var(--color-gray-600);
  background: var(--color-gray-100);
}

.modal-close:focus-visible {
  outline: 2px solid var(--color-blue-500);
  outline-offset: 2px;
}

.modal-body {
  padding: 1rem 2rem 2rem;
}

/* Responsive */
@media (max-width: 768px) {
  .modal-overlay {
    padding: 0.5rem;
  }

  .modal-content {
    max-width: 100%;
    max-height: 95vh;
  }

  .modal-header {
    padding: 1.5rem 1.5rem 1rem;
  }

  .modal-title {
    font-size: 1.25rem;
  }

  .modal-description {
    font-size: 0.9375rem;
  }

  .modal-body {
    padding: 1rem 1.5rem 1.5rem;
  }
}

@media (max-width: 480px) {
  .modal-header {
    padding: 1rem 1rem 0.75rem;
  }

  .modal-title {
    font-size: 1.125rem;
  }

  .modal-body {
    padding: 0.75rem 1rem 1rem;
  }
}
</style>
