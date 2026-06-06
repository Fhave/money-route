<script setup>
import { ref } from 'vue'
import { useSettings } from '@/composables/useSettings'

const { settings, saveSettings, setPasscode, disablePasscode } = useSettings()

const isConfiguring = ref(false)

const input = ref('')
const confirm = ref('')
const error = ref('')

function startConfiguration() {
  error.value = ''
  input.value = ''
  confirm.value = ''
  isConfiguring.value = true
}

function cancelConfiguration() {
  isConfiguring.value = false
}

function handleEnablePasscode() {
  const digitsOnly = /^\d{6}$/

  if (!digitsOnly.test(input.value)) {
    error.value = 'Passcode must be 6 digits'
    return
  }

  if (!digitsOnly.test(confirm.value)) {
    error.value = 'Confirmation must be 6 digits'
    return
  }

  if (input.value !== confirm.value) {
    error.value = 'Passcodes do not match'
    return
  }

  setPasscode(input.value)

  input.value = ''
  confirm.value = ''
  error.value = ''
  isConfiguring.value = false
}

function handleDisablePasscode() {
  disablePasscode()
  isConfiguring.value = false
}
</script>

<template>
  <section class="settings-section">
    <h2>Security</h2>

    <div class="security-card">
      <h4>Passcode Protection</h4>

      <div v-if="!settings.passcodeEnabled && !isConfiguring">
        <p>Protect access to your financial data with a passcode.</p>
        <button class="primary-btn" @click="startConfiguration">Configure Passcode</button>
      </div>

      <div v-else-if="!settings.passcodeEnabled && isConfiguring">
        <p class="form-instruction">Create a secure 6-digit access code.</p>

        <div class="input-group">
          <input
            v-model="input"
            type="password"
            pattern="[0-9]*"
            inputmode="numeric"
            maxlength="6"
            placeholder="Enter 6-digit passcode"
          />
          <input
            v-model="confirm"
            type="password"
            pattern="[0-9]*"
            inputmode="numeric"
            maxlength="6"
            placeholder="Confirm passcode"
          />
        </div>

        <p v-if="error" class="error-msg">{{ error }}</p>

        <div class="action-group">
          <button class="cancel-btn" @click="cancelConfiguration">Cancel</button>
          <button class="primary-btn" @click="handleEnablePasscode">Enable Passcode</button>
        </div>
      </div>

      <div v-else>
        <p class="status-success">Passcode protection is active.</p>
        <button class="danger-btn" @click="handleDisablePasscode">Disable Passcode</button>

        <div class="security-card row">
          <div>
            <h4>Auto Lock</h4>
            <p>Lock app after inactivity</p>
          </div>

          <select v-model="settings.autoLockTime" @change="saveSettings">
            <option :value="1">1 min</option>
            <option :value="3">3 min</option>
            <option :value="5">5 min</option>
            <option :value="10">10 min</option>
          </select>
        </div>
      </div>
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

.security-card {
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.security-card.row {
  display: flex;
  margin-bottom: 0;
  margin-top: 1.5rem;
}

.security-card h4 {
  color: #033126;
  margin-top: 0;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}

.security-card p {
  color: #4b5563;
  font-size: 0.95rem;
  line-height: 1.5;
  margin: 0 0 1rem 0;
}

.form-instruction {
  font-size: 0.85rem !important;
  color: #6b7280 !important;
  margin-bottom: 0.75rem !important;
}

.input-group {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

input {
  flex: 1;
  min-width: 200px;
  padding: 0.8rem;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font-size: 0.95rem;
}

input:focus {
  outline: none;
  border-color: #033126;
}

.action-group {
  display: flex;
  gap: 0.75rem;
  margin-top: 1rem;
}

.primary-btn {
  background: #033126;
  color: white;
  border: none;
  padding: 0.85rem 1.25rem;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
}

.cancel-btn {
  background: #e2e8f0;
  color: #475569;
  border: none;
  padding: 0.85rem 1.25rem;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
}

.danger-btn {
  background: #dc2626;
  color: white;
  border: none;
  padding: 0.85rem 1.25rem;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
}

p.error-msg {
  color: #dc2626;
  font-size: 0.85rem;
  font-weight: 600;
  margin: 0.5rem 0 0 0;
}

.status-success {
  color: #15803d !important;
  font-weight: 600;
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
