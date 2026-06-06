<script setup>
import SecuritySection from '@/components/SecuritySection.vue'
import DataSection from '@/components/DataSection.vue'
import ApplicationSection from '@/components/ApplicationSection.vue'
import AboutSection from '@/components/AboutSection.vue'
</script>

<template>
  <div class="settings-page">
    <header class="settings-header">
      <h1>Settings</h1>
      <p>Manage your preferences, data, and application settings.</p>
    </header>

    <SecuritySection />
    <DataSection />
    <ApplicationSection />
    <AboutSection />
  </div>
</template>

<style>
.settings-page {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.settings-header h1 {
  font-size: 1.8rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 0.2rem 0;
}

.settings-header p {
    font-size: 0.9rem;
  color: #555555;
  margin: 0;
}

@media (min-width: 768px) {
  .settings-page {
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
    gap: 2rem;
  }
  .settings-header h1 {
    font-size: 2.2rem;
  }
}
</style>
