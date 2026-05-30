<script setup>
import { ref } from 'vue'
import { useTransactions } from '@/composables/useTransactions'

const props = defineProps({
  transaction: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['edit-transaction'])
const { deleteTransaction } = useTransactions()

const isConfirmOpen = ref(false)

const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

const confirmDelete = () => {
  deleteTransaction(props.transaction.id)
  isConfirmOpen.value = false
}

const handleEdit = () => {
  emit('edit-transaction', props.transaction)
}
</script>

<template>
  <div class="table-row">
    <div class="cell date-cell">
      {{ formatDate(transaction.date) }}
    </div>

    <div class="cell amount-cell">
      <span
        :class="
          transaction.type === 'income'
            ? 'amount-income'
            : transaction.type === 'expense'
              ? 'amount-expense'
              : 'amount-transfer'
        "
      >
        {{ transaction.type === 'income' ? '+' : transaction.type === 'expense' ? '-' : ''
        }}<span>&#8358;</span>{{ Number(transaction.amount).toFixed(2) }}
      </span>
    </div>

    <div class="cell">
      <span class="badge">
        {{ transaction.category }}
      </span>
    </div>

    <div class="cell note-cell">
      {{ transaction.note || '—' }}
    </div>

    <div class="cell actions-cell">
      <i class="pi pi-pencil" @click="handleEdit"></i>
      <i class="pi pi-trash" @click="isConfirmOpen = true"></i>
    </div>

    <Teleport to="body">
      <Transition name="fade">
        <div v-if="isConfirmOpen" class="modal-backdrop" @click.self="isConfirmOpen = false">
          <div class="modal-content">
            <div class="modal-icon-wrapper">
              <i class="pi pi-exclamation-triangle"></i>
            </div>
            <h3>Delete Transaction?</h3>
            <p>Are you sure you want to delete this record? This action cannot be undone.</p>

            <div class="modal-actions">
              <button class="btn-cancel" @click="isConfirmOpen = false">Cancel</button>
              <button class="btn-danger" @click="confirmDelete">Delete</button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.table-row {
  display: grid;
  grid-template-columns: 1.1fr 1fr 1.1fr 1.4fr 0.4fr;
  padding: 0.9rem 0.8rem;
  border-bottom: 1px solid #f5f5f5;
  align-items: center;
}
.cell {
  font-size: 0.85rem;
  color: #333;
}
.date-cell {
  line-height: 1.3;
  color: #111;
  font-weight: 500;
}
.amount-income {
  color: #16a34a;
  font-weight: 600;
}
.amount-expense {
  color: #dc2626;
  font-weight: 600;
}
.amount-transfer {
  font-weight: 600;
}
.note-cell {
  color: #4b5563;
  word-break: break-word;
}
.actions-cell {
  display: flex;
  gap: 0.6rem;
  justify-content: flex-end;
}
.actions-cell i {
  color: #888;
  cursor: pointer;
  font-size: 0.85rem;
  transition: color 0.2s;
}
.pi-trash:hover {
  color: #dc2626;
}
.pi-pencil:hover {
  color: #033126;
}
.badge {
  background-color: #e4e6e4;
  color: #4b5563;
  padding: 0.25rem 0.6rem;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: 600;
  display: inline-block;
}
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(3px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99999;
}
.modal-content {
  background: white;
  padding: 1.5rem;
  border-radius: 16px;
  width: 90%;
  max-width: 340px;
  text-align: center;
  box-shadow:
    0 10px 25px -5px rgba(0, 0, 0, 0.1),
    0 8px 10px -6px rgba(0, 0, 0, 0.1);
}
.modal-icon-wrapper {
  width: 48px;
  height: 48px;
  background-color: #fee2e2;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem auto;
}
.modal-icon-wrapper i {
  color: #dc2626;
  font-size: 1.25rem;
}
.modal-content h3 {
  font-size: 1.15rem;
  color: #111827;
  font-weight: 700;
  margin-bottom: 0.5rem;
}
.modal-content p {
  font-size: 0.875rem;
  color: #4b5563;
  line-height: 1.4;
  margin-bottom: 1.5rem;
}
.modal-actions {
  display: flex;
  gap: 0.75rem;
}
.modal-actions button {
  flex: 1;
  padding: 0.6rem 1rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: opacity 0.2s;
}
.modal-actions button:hover {
  opacity: 0.9;
}
.btn-cancel {
  background-color: #f3f4f6;
  color: #4b5563;
}
.btn-danger {
  background-color: #dc2626;
  color: white;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
