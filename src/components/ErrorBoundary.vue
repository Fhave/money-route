<script setup>
import { ref, onErrorCaptured } from 'vue'

const hasError = ref(false)
const errorLog = ref('')

onErrorCaptured((error, instance, info) => {
  hasError.value = true
  errorLog.value = error.message || String(error)
  console.error('Captured by Money-Route Error Boundary:', { error, instance, info })
  return false
})

const handleReset = () => {
  hasError.value = false
  errorLog.value = ''
  window.location.reload()
}
</script>

<template>
  <div v-if="hasError" class="error-boundary-container">
    <div class="error-content-box">
      <div class="alert-icon">
        <i class="pi pi-shield"></i>
      </div>
      <h2>Something went wrong</h2>
      <p>
        Money-Route intercepted a runtime exception while processing this layout grid view panel.
      </p>

      <div class="error-details-collapsed" v-if="errorLog">
        <code>{{ errorLog }}</code>
      </div>

      <button class="btn-recovery" @click="handleReset">
        <i class="pi pi-refresh"></i> Reload Application
      </button>
    </div>
  </div>

  <slot v-else></slot>
</template>

<style scoped>
.error-boundary-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem 1.5rem;
  background-color: #fcfdfd;
  min-height: 400px;
  width: 100%;
}
.error-content-box {
  background: white;
  border: 1px solid #f1f5f9;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.02);
  padding: 2.5rem 2rem;
  border-radius: 16px;
  max-width: 460px;
  text-align: center;
  width: 100%;
}
.alert-icon {
  background-color: #fef2f2;
  color: #ef4444;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.25rem auto;
  font-size: 1.5rem;
}
h2 {
  font-size: 1.3rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 0.5rem 0;
}
p {
  font-size: 0.9rem;
  color: #64748b;
  line-height: 1.5;
  margin: 0 0 1.5rem 0;
}
.error-details-collapsed {
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  padding: 0.75rem;
  border-radius: 8px;
  text-align: left;
  margin-bottom: 1.5rem;
  max-height: 100px;
  overflow-y: auto;
}
.error-details-collapsed code {
  font-family: monospace;
  font-size: 0.8rem;
  color: #334155;
  word-break: break-all;
}
.btn-recovery {
  background: #033126;
  color: white;
  border: none;
  padding: 0.7rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: opacity 0.2s;
}
.btn-recovery:hover {
  opacity: 0.95;
}
</style>
