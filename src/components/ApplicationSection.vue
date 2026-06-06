<script setup>
import { useSettings } from '@/composables/useSettings'

const { settings, saveSettings } = useSettings()
</script>

<template>
  <section class="settings-section">
    <h2>Application</h2>

    <div class="setting-row">
      <div>
        <h4>Currency</h4>
        <p>Select your preferred currency</p>
      </div>

      <select v-model="settings.currency" @change="saveSettings">
        <option value="NGN">₦ NGN</option>
        <option value="USD">$ USD</option>
        <option value="GBP">£ GBP</option>
        <option value="EUR">€ EUR</option>
      </select>
    </div>
  </section>
</template>

<style scoped>
.settings-section {
  background: white;
  border: 1px solid #dce5e2;
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  font-family: sans-serif;
}

.settings-section h2 {
  color: #033126;
  margin-bottom: 1rem;
  margin-top: 0;
}

.setting-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.setting-row h4 {
  color: #033126;
  margin-top: 0;
  margin-bottom: 0.75rem;
}

.setting-row p {
  color: #6b7280;
  font-size: 0.9rem;
  margin: 0;
}

select {
  padding: 0.75rem 2rem 0.75rem 0.75rem;
  border: 1px solid #dce5e2;
  border-radius: 10px;
  background: white;
  color: #033126;
  font-weight: 600;
  font-size: 0.95rem;
  outline: none;
  cursor: pointer;
  transition: border-color 0.2s ease;
}

select:focus {
  border-color: #033126;
}
</style>
