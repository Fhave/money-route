<script setup>
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import NavBar from './components/NavBar.vue'
import ErrorBoundary from './components/ErrorBoundary.vue'
import { useAutoLock } from '@/composables/useAutoLock'
import { useRouter } from 'vue-router'

const router = useRouter()

const route = useRoute()

const isSplashActive = computed(() => route.path === '/')

useAutoLock(() => {
  router.push('/')
})
</script>

<template>
  <div class="app-container">
    <NavBar v-if="!isSplashActive" />

    <main :class="['app-canvas', { 'full-bleed-splash': isSplashActive }]">
      <ErrorBoundary>
        <RouterView v-slot="{ Component }">
          <Transition name="route-fade" mode="out-in">
            <component :is="Component" />
          </Transition>
        </RouterView>
      </ErrorBoundary>
    </main>
  </div>
</template>

<style>
html,
body,
#app {
  min-height: 100%;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: #f9f9f9;
  font-family: system-ui, sans-serif;
}

.app-container {
  min-height: 100vh;
  background-color: #f8f9f8;
}

.app-canvas {
  padding: 1.5rem 2rem;
}

.full-bleed-splash {
  padding: 0 !important;
}

.route-fade-enter-active,
.route-fade-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.route-fade-enter-from {
  opacity: 0;
  transform: translateY(4px);
}

.route-fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
