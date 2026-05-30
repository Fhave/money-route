<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
let splashTimer = null

const navigateToDashboard = () => {
  if (splashTimer) clearTimeout(splashTimer)
  router.push('/dashboard')
}

onMounted(() => {
  splashTimer = setTimeout(() => {
    navigateToDashboard()
  }, 3000)
})
</script>

<template>
  <div class="splash-screen" @click="navigateToDashboard">
    <div class="splash-content">
      <div class="logo-circle">
        <i class="pi pi-wallet splash-icon"></i>
      </div>
      <h1 class="splash-brand">Money-Route</h1>
      <p class="splash-tagline">Know where your money is going.</p>
      <span class="splash-dismiss-tip">Tap anywhere to skip</span>
    </div>
  </div>
</template>

<style scoped>
.splash-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #033126;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.splash-content {
  text-align: center;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}
.logo-circle {
  width: 90px;
  height: 90px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}
.splash-icon {
  font-size: 2.5rem;
  color: #10b981;
}
.splash-brand {
  font-size: 2.5rem;
  font-weight: 800;
  letter-spacing: -0.04em;
}
.splash-tagline {
  font-size: 1rem;
  color: #a7f3d0;
  opacity: 0.85;
}
.splash-dismiss-tip {
  margin-top: 2.5rem;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #6ee7b7;
  opacity: 0.5;
  animation: pulse 2s infinite ease-in-out;
}
@keyframes pulse {
  0%,
  100% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.7;
  }
}
</style>
