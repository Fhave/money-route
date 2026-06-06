<script setup>
import { ref } from 'vue'
import { exportData } from '@/utils/exportData'
import { importData } from '@/utils/importData'

const isModalOpen = ref(false)
const confirmationText = ref('')

async function handleImport(event) {
  const file = event.target.files[0]
  if (!file) return

  try {
    await importData(file)
    alert('Import successful')
    window.location.reload()
  } catch {
    alert('Invalid backup file')
  }
}

function openResetModal() {
  confirmationText.value = ''
  isModalOpen.value = true
}

function closeResetModal() {
  isModalOpen.value = false
}

function handleReset() {
  if (confirmationText.value !== 'DELETE') return

  localStorage.clear()
  window.location.reload()
}
</script>

<template>
  <section class="settings-section">
    <h2>Data Management</h2>

    <div class="button-group">
      <button class="primary-btn" @click="exportData">Export Data</button>

      <label class="primary-btn">
        Import Data
        <input type="file" accept=".json" @change="handleImport" hidden />
      </label>

      <button class="danger-btn" @click="openResetModal">Reset All Data</button>
    </div>

    <Teleport to="body">
      <div v-if="isModalOpen" class="modal-overlay" @click.self="closeResetModal">
        <div class="modal-card">
          <h3>Are you absolutely sure?</h3>
          <p>This action cannot be undone. This will permanently delete your local database.</p>
          <p class="instruction">
            Type <strong class="warning-text">DELETE</strong> below to confirm.
          </p>

          <input v-model="confirmationText" type="text" placeholder="DELETE" class="modal-input" />

          <div class="modal-actions">
            <button class="cancel-btn" @click="closeResetModal">Cancel</button>
            <button
              class="confirm-danger-btn"
              :disabled="confirmationText !== 'DELETE'"
              @click="handleReset"
            >
              I understand, delete everything
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </section>
</template>

<style scoped>
.settings-section {
  background: white;
  border: 1px solid #dce5e2;
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.settings-section h2 {
  color: #033126;
  margin-bottom: 1rem;
}

.button-group {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
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

.primary-btn:hover {
  opacity: 0.9;
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

/* --- Modal Specific Styles --- */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(3, 49, 38, 0.4); /* Dark translucent green tone overlay */
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.modal-card {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  max-width: 450px;
  width: 90%;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.modal-card h3 {
  color: #033126;
  margin-top: 0;
  margin-bottom: 0.75rem;
}

.modal-card p {
  color: #4b5563;
  font-size: 0.95rem;
  line-height: 1.5;
}

.instruction {
  margin-top: 1rem;
  margin-bottom: 0.5rem;
}

.warning-text {
  color: #dc2626;
}

.modal-input {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #dce5e2;
  border-radius: 8px;
  font-size: 1rem;
  margin-bottom: 1.5rem;
  box-sizing: border-box;
}

.modal-input:focus {
  outline: none;
  border-color: #033126;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
}

.cancel-btn {
  background: #f3f4f6;
  color: #4b5563;
  border: none;
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
}

.confirm-danger-btn {
  background: #dc2626;
  color: white;
  border: none;
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
}

/* Visual state for disabled button */
.confirm-danger-btn:disabled {
  background: #fca5a5;
  cursor: not-allowed;
}
</style>
