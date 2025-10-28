<template>
  <div class="input-wrapper">
    <label v-if="label" :for="inputId" class="input-label">
      {{ label }}
      <span v-if="required" class="input-required">*</span>
    </label>
    <input
      :id="inputId"
      ref="inputRef"
      :class="inputClasses"
      :aria-invalid="error ? 'true' : 'false'"
      :aria-describedby="error ? `${inputId}-error` : undefined"
      v-bind="$attrs"
    />
    <p v-if="error" :id="`${inputId}-error`" class="input-error-text" role="alert">
      {{ error }}
    </p>
    <p v-else-if="helperText" class="input-helper-text">
      {{ helperText }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

interface Props {
  label?: string
  error?: string
  helperText?: string
  required?: boolean
}

const props = defineProps<Props>()
const inputRef = ref<HTMLInputElement>()

const inputId = computed(() => `input-${Math.random().toString(36).substr(2, 9)}`)

const inputClasses = computed(() => [
  'input',
  props.error && 'input-error'
].filter(Boolean).join(' '))
</script>

<style scoped>
.input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.input-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-gray-700);
  margin-bottom: 0.25rem;
}

.input-required {
  color: var(--color-red-500);
  margin-left: 0.25rem;
}

.input {
  width: 100%;
  padding: 0.875rem 1rem;
  border: 2px solid var(--color-gray-200);
  border-radius: var(--radius-lg);
  font-size: 1rem;
  font-family: inherit;
  transition: all 0.2s ease;
  background: white;
}

.input:focus {
  outline: none;
  border-color: var(--color-blue-500);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.input-error {
  border-color: var(--color-red-500);
}

.input-error:focus {
  border-color: var(--color-red-500);
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.input-error-text {
  font-size: 0.875rem;
  color: var(--color-red-600);
  margin: 0;
}

.input-helper-text {
  font-size: 0.875rem;
  color: var(--color-gray-500);
  margin: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .input {
    padding: 0.75rem 0.875rem;
    font-size: 0.9375rem;
  }
}
</style>
