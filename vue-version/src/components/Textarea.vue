<template>
  <div class="textarea-wrapper">
    <label v-if="label" :for="textareaId" class="textarea-label">
      {{ label }}
      <span v-if="required" class="textarea-required">*</span>
    </label>
    <textarea
      :id="textareaId"
      ref="textareaRef"
      :class="textareaClasses"
      :aria-invalid="error ? 'true' : 'false'"
      :aria-describedby="error ? `${textareaId}-error` : undefined"
      v-bind="$attrs"
    ></textarea>
    <p v-if="error" :id="`${textareaId}-error`" class="textarea-error-text" role="alert">
      {{ error }}
    </p>
    <p v-else-if="helperText" class="textarea-helper-text">
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
const textareaRef = ref<HTMLTextAreaElement>()

const textareaId = computed(() => `textarea-${Math.random().toString(36).substr(2, 9)}`)

const textareaClasses = computed(() => [
  'textarea',
  props.error && 'textarea-error'
].filter(Boolean).join(' '))
</script>

<style scoped>
.textarea-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.textarea-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-gray-700);
  margin-bottom: 0.25rem;
}

.textarea-required {
  color: var(--color-red-500);
  margin-left: 0.25rem;
}

.textarea {
  width: 100%;
  padding: 0.875rem 1rem;
  border: 2px solid var(--color-gray-200);
  border-radius: var(--radius-lg);
  font-size: 1rem;
  font-family: inherit;
  transition: all 0.2s ease;
  background: white;
  resize: vertical;
  min-height: 120px;
  line-height: 1.6;
}

.textarea:focus {
  outline: none;
  border-color: var(--color-blue-500);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.textarea-error {
  border-color: var(--color-red-500);
}

.textarea-error:focus {
  border-color: var(--color-red-500);
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.textarea-error-text {
  font-size: 0.875rem;
  color: var(--color-red-600);
  margin: 0;
}

.textarea-helper-text {
  font-size: 0.875rem;
  color: var(--color-gray-500);
  margin: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .textarea {
    padding: 0.75rem 0.875rem;
    font-size: 0.9375rem;
    min-height: 100px;
  }
}
</style>
