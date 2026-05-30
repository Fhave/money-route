<script setup>
import { ref, onMounted } from 'vue'
import { useAccounts } from '@/composables/useAccounts'
import NetWealthCard from '../components/NetWealthCard.vue'
import AccountFormCard from '../components/AccountFormCard.vue'
import AccountTile from '../components/AccountTile.vue'

const {
  accountsWithBalances,
  totalNetWealth,
  loadAccounts,
  addAccount,
  updateAccount,
  deleteAccount,
} = useAccounts()

const currentEditingAccount = ref(null)

const isConfirmOpen = ref(false)
const accountToDelete = ref(null)

onMounted(() => {
  loadAccounts()
})

const handleFormSubmit = (formData) => {
  if (currentEditingAccount.value) {
    updateAccount(currentEditingAccount.value.id, formData)
  } else {
    addAccount(formData)
  }
  clearEditState()
}

const clearEditState = () => {
  currentEditingAccount.value = null
}

const openDeleteModal = (account) => {
  accountToDelete.value = account
  isConfirmOpen.value = true
}

const handleConfirmDelete = () => {
  if (accountToDelete.value) {
    const { id } = accountToDelete.value

    if (currentEditingAccount.value?.id === id) clearEditState()

    deleteAccount(id)
  }
  isConfirmOpen.value = false
  accountToDelete.value = null
}
</script>

<template>
  <div class="accounts-page">
    <header class="page-header">
      <div>
        <h1>Manage Accounts</h1>
        <p>Organize your financial pockets, banks, and liquid cash systems.</p>
      </div>
    </header>

    <div class="accounts-grid-layout">
      <div class="management-panel">
        <NetWealthCard :amount="totalNetWealth" />

        <AccountFormCard
          :editData="currentEditingAccount"
          @submit="handleFormSubmit"
          @cancel="clearEditState"
        />
      </div>

      <div class="accounts-inventory">
        <h3>Active Accounts Grid</h3>

        <div class="inventory-grid">
          <AccountTile
            v-for="account in accountsWithBalances"
            :key="account.id"
            :account="account"
            :isActiveEditing="currentEditingAccount?.id === account.id"
            @edit="currentEditingAccount = account"
            @delete="openDeleteModal(account)"
          />
        </div>
      </div>
    </div>

    <Teleport to="body">
      <Transition name="fade">
        <div v-if="isConfirmOpen" class="modal-backdrop" @click.self="isConfirmOpen = false">
          <div class="modal-content">
            <div class="modal-icon-wrapper">
              <i class="pi pi-exclamation-triangle"></i>
            </div>
            <h3>Delete {{ accountToDelete?.name }}?</h3>
            <p>
              Are you sure you want to delete this account? This won't remove past transactions but
              will alter balance calculations.
            </p>

            <div class="modal-actions">
              <button class="btn-cancel" @click="isConfirmOpen = false">Cancel</button>
              <button class="btn-danger" @click="handleConfirmDelete">Delete</button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.accounts-page {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}
.page-header h1 {
  font-size: 1.8rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 0.2rem 0;
}
.page-header p {
  font-size: 0.9rem;
  color: #555555;
  margin: 0;
}
.accounts-grid-layout {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.management-panel {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}
.accounts-inventory {
  display: flex;
  flex-direction: column;
}
.accounts-inventory h3 {
  font-size: 1rem;
  color: #111827;
  font-weight: 700;
  margin: 0;
}
.inventory-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin-top: 1.2rem;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}
.modal-content {
  background: white;
  padding: 2rem 1.5rem;
  border-radius: 16px;
  width: 90%;
  max-width: 400px;
  text-align: center;
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}
.modal-icon-wrapper {
  background-color: #fee2e2;
  color: #dc2626;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem auto;
  font-size: 1.5rem;
}
.modal-content h3 {
  font-size: 1.25rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 0.5rem 0;
}
.modal-content p {
  font-size: 0.9rem;
  color: #4b5563;
  line-height: 1.4;
  margin: 0 0 1.5rem 0;
}
.modal-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
}
.btn-cancel {
  background: #f3f4f6;
  color: #374151;
  border: 1px solid #d1d5db;
  padding: 0.65rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  flex: 1;
  transition: background 0.2s;
}
.btn-cancel:hover {
  background: #e5e7eb;
}
.btn-danger {
  background: #dc2626;
  color: white;
  border: none;
  padding: 0.65rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  flex: 1;
  transition: opacity 0.2s;
}
.btn-danger:hover {
  opacity: 0.95;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (min-width: 768px) {
  .accounts-page {
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
    gap: 2rem;
  }
  .page-header h1 {
    font-size: 2.2rem;
  }
  .accounts-grid-layout {
    display: grid;
    grid-template-columns: 380px 1fr;
    gap: 2.5rem;
    align-items: start;
  }
  .inventory-grid {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 1.2rem;
  }
}
</style>
