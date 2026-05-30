<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/dashboard')
}
</script>

<template>
  <div class="not-found-container">
    <div class="not-found-content">
      <div class="compass-wrapper">
        <i class="pi pi-map-marker compass-icon"></i>
      </div>
      <h1 class="error-code">404</h1>
      <h2>Lost your way?</h2>
      <p>
        The financial ledger page or pocket view you are trying to access does not exist or has been
        relocated.
      </p>

      <button class="btn-home" @click="goHome"><i class="pi pi-home"></i> Back to Dashboard</button>
    </div>
  </div>
</template>

<style scoped>
.not-found-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 75vh;
  padding: 2rem 1rem;
}

.not-found-content {
  text-align: center;
  max-width: 420px;
  background: white;
  padding: 3rem 2rem;
  border-radius: 20px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
}

.compass-wrapper {
  background-color: #f0fdf4;
  color: #10b981;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem auto;
  font-size: 1.75rem;
}

.error-code {
  font-size: 4rem;
  font-weight: 900;
  color: #033126;
  line-height: 1;
  margin-bottom: 0.5rem;
  letter-spacing: -0.05em;
}

h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.75rem;
}

p {
  font-size: 0.95rem;
  color: #6b7280;
  line-height: 1.5;
  margin-bottom: 2rem;
}

.btn-home {
  background: #033126;
  color: white;
  border: none;
  padding: 0.75rem 1.75rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: opacity 0.2s;
}

.btn-home:hover {
  opacity: 0.95;
}
</style>
