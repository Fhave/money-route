<script setup>
import { reactive, ref, computed, onMounted } from 'vue'
import { useTransactions } from '@/composables/useTransactions'
import { useAccounts } from '@/composables/useAccounts'
import { formatCurrency } from '@/utils/currency'

const props = defineProps({
  editData: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['close'])
const { addTransaction, updateTransaction } = useTransactions()
const { accounts, accountsWithBalances, loadAccounts } = useAccounts()

const isEditing = computed(() => !!props.editData)
const errorMessage = ref('')

const getTodayString = () => {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
}

const form = reactive({
  type: 'expense',
  amount: '',
  category: 'Shopping',
  accountId: 'acc-default',
  fromAccountId: '',
  toAccountId: '',
  note: '',
  date: getTodayString(),
})

onMounted(() => {
  loadAccounts()
  if (isEditing.value) {
    form.type = props.editData.type
    form.amount = props.editData.amount
    form.category = props.editData.category
    form.accountId = props.editData.accountId || 'acc-default'
    form.fromAccountId = props.editData.fromAccountId || ''
    form.toAccountId = props.editData.toAccountId || ''
    form.note = props.editData.note
    form.date = props.editData.date ? props.editData.date.slice(0, 10) : getTodayString()
  }
})

const getAccountBalance = (id) => {
  const target = accountsWithBalances.value.find((acc) => acc.id === id)
  return target ? target.balance : 0
}

const handleSubmit = () => {
  errorMessage.value = ''
  const inputAmount = Number(form.amount)

  if (!form.amount || isNaN(inputAmount) || inputAmount <= 0) {
    errorMessage.value = 'Please enter a valid amount greater than 0.'
    return
  }

  if (form.type === 'transfer') {
    if (!form.fromAccountId || !form.toAccountId) {
      errorMessage.value = 'Please select both source and destination accounts for transfer.'
      return
    }
    if (form.fromAccountId === form.toAccountId) {
      errorMessage.value = 'Source and destination accounts must be different.'
      return
    }
  } else {
    if (!form.accountId) {
      errorMessage.value = 'Please select an account.'
      return
    }
  }

  const structuralAdjustment = (targetId, currentType) => {
    if (!isEditing.value || props.editData.type !== currentType) return 0

    if (props.editData.accountId === targetId || props.editData.fromAccountId === targetId) {
      return Number(props.editData.amount)
    }
    return 0
  }

  if (form.type === 'expense') {
    const currentBalance = getAccountBalance(form.accountId)
    const transitionalOverhead = structuralAdjustment(form.accountId, 'expense')
    const totalAvailable = currentBalance + transitionalOverhead

    if (inputAmount > totalAvailable) {
      errorMessage.value = `Insufficient funds! Available balance is ${formatCurrency(totalAvailable)}`
      return
    }
  }

  if (form.type === 'transfer') {
    const sourceBalance = getAccountBalance(form.fromAccountId)
    const transitionalOverhead = structuralAdjustment(form.fromAccountId, 'transfer')
    const totalAvailable = sourceBalance + transitionalOverhead

    if (inputAmount > totalAvailable) {
      errorMessage.value = `Insufficient funds in source account! Available balance is ${formatCurrency(totalAvailable)}`
      return
    }
  }

  const payload = {
    type: form.type,
    amount: inputAmount,
    note: form.note,
    date: form.date,
  }

  if (form.type === 'transfer') {
    payload.fromAccountId = form.fromAccountId
    payload.toAccountId = form.toAccountId
    payload.category = 'Internal Transfer'
  } else {
    payload.accountId = form.accountId
    payload.category = form.category
  }

  if (isEditing.value) {
    updateTransaction(props.editData.id, payload)
  } else {
    addTransaction(payload)
  }
  emit('close')
}
</script>

<template>
  <div class="modal-backdrop" @click.self="$emit('close')">
    <div class="modal-content">
      <h3>{{ isEditing ? 'Edit Transaction' : 'Add Transaction' }}</h3>

      <form @submit.prevent="handleSubmit" noValidate>
        <label>Type</label>
        <select class="dropdown" v-model="form.type">
          <option value="expense">Expense</option>
          <option value="income">Income</option>
          <option value="transfer">Transfer between Accounts</option>
        </select>

        <label>Amount</label>
        <input type="number" step="0.01" v-model="form.amount" required />

        <template v-if="form.type !== 'transfer'">
          <label>Account</label>
          <select class="dropdown" v-model="form.accountId" required>
            <option v-for="acc in accounts" :key="acc.id" :value="acc.id">
              {{ acc.name }}
            </option>
          </select>

          <label>Category</label>
          <select class="dropdown" v-model="form.category">
            <option value="All">All Categories</option>
            <option value="Shopping">Shopping</option>
            <option value="Income">Income</option>
            <option value="Bills">Bills</option>
            <option value="Food & Drinks">Food & Drinks</option>
            <option value="Rent">Rent</option>
            <option value="Utilities">Utilities</option>
            <option value="Groceries">Groceries</option>
            <option value="Transportation">Transportation</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Salary">Salary</option>
            <option value="Bonuses">Bonuses</option>
            <option value="Investments">Investments</option>
            <option value="Taxes">Taxes</option>
            <option value="Debt">Debt</option>
          </select>
        </template>

        <template v-else>
          <label>From Account (Source)</label>
          <select class="dropdown" v-model="form.fromAccountId" required>
            <option
              v-for="acc in accounts"
              :key="acc.id"
              :value="acc.id"
              :disabled="acc.id === form.toAccountId"
            >
              {{ acc.name }}
            </option>
          </select>

          <label>To Account (Destination)</label>
          <select class="dropdown" v-model="form.toAccountId" required>
            <option
              v-for="acc in accounts"
              :key="acc.id"
              :value="acc.id"
              :disabled="acc.id === form.fromAccountId"
            >
              {{ acc.name }}
            </option>
          </select>
        </template>

        <label>Date</label>
        <input
          type="date"
          v-model="form.date"
          :max="new Date().toISOString().split('T')[0]"
          required
        />

        <label>Note</label>
        <input type="text" v-model="form.note" placeholder="E.g., Groceries..." />

        <div v-if="errorMessage" class="error-banner">
          <i class="pi pi-times-circle"></i>
          <span>{{ errorMessage }}</span>
        </div>

        <div class="actions">
          <button type="button" class="btn-cancel" @click="$emit('close')">Cancel</button>
          <button type="submit" class="btn-submit">
            {{ isEditing ? 'Save Changes' : 'Add' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}
.modal-content {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  width: 90%;
  max-width: 380px;
}
h3 {
  margin-top: 0;
  margin-bottom: 1rem;
  color: #111827;
}
form {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}
label {
  font-size: 0.8rem;
  font-weight: 600;
  color: #4b5563;
  margin-top: 0.2rem;
}
input,
select {
  padding: 0.6rem;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 0.9rem;
  outline: none;
  font-family: inherit;
  color: #334155;
  background-color: #f8fafc;
}
input:focus,
select:focus {
  border-color: #033126;
  background-color: #ffffff;
}
.actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 1.2rem;
}
.btn-cancel {
  background: #f1f5f9;
  color: #475569;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.btn-cancel:hover {
  background: #e2e8f0;
}
.btn-submit {
  background: #033126;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;
}
.btn-submit:hover {
  opacity: 0.9;
}
.dropdown {
  outline: none;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23334155' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.7rem center;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem;
}

.error-banner {
  background-color: #fef2f2;
  border: 1px solid #fee2e2;
  color: #dc2626;
  padding: 0.65rem;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-top: 0.5rem;
}
</style>