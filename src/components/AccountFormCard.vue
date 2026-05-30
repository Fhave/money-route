<script setup>
import { reactive, computed, watch } from 'vue'

const props = defineProps({
  editData: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['submit', 'cancel'])

const form = reactive({
  name: '',
  type: 'Bank',
  initialBalance: '',
})

const isEditing = computed(() => props.editData !== null)
const resetForm = () => {
  form.name = ''
  form.type = 'Bank'
  form.initialBalance = ''
}

watch(
  () => props.editData,
  (newVal) => {
    if (newVal) {
      form.name = newVal.name
      form.type = newVal.type
      form.initialBalance = newVal.initialBalance
    } else {
      resetForm()
    }
  },
  { immediate: true },
)

const handleSubmit = () => {
  emit('submit', { ...form })
  resetForm()
}
</script>

<template>
  <div class="create-account-card" :class="{ 'edit-mode-border': isEditing }">
    <div class="form-title-row">
      <h3>{{ isEditing ? 'Modify Account Settings' : 'Create New Account' }}</h3>
      <span v-if="isEditing" class="edit-pill">Edit Mode</span>
    </div>

    <form @submit.prevent="handleSubmit" class="account-form">
      <div class="form-group">
        <label for="acc-name">Account Name</label>
        <input
          id="acc-name"
          type="text"
          v-model="form.name"
          placeholder="e.g., GTBank, Cash"
          required
        />
      </div>

      <div class="form-group">
        <label for="acc-type">Account Type</label>
        <select id="acc-type" v-model="form.type">
          <option value="Bank">Bank Account</option>
          <option value="Cash">Cash / Wallet</option>
          <option value="Card">Credit Card</option>
          <option value="Investment">Investment Portal</option>
        </select>
      </div>

      <div class="form-group">
        <label for="acc-balance">Starting Balance</label>
        <div class="input-currency-wrapper">
          <span class="currency-prefix">&#8358;</span>
          <input
            id="acc-balance"
            type="number"
            step="0.01"
            v-model="form.initialBalance"
            placeholder="0.00"
          />
        </div>
      </div>

      <div class="action-buttons-wrapper">
        <button type="button" v-if="isEditing" @click="$emit('cancel')" class="btn-cancel-edit">
          Cancel
        </button>
        <button type="submit" class="btn-submit-account" :class="{ 'btn-save-changes': isEditing }">
          <i :class="['pi', isEditing ? 'pi-check' : 'pi-plus']"></i>
          {{ isEditing ? 'Save Changes' : 'Add Account' }}
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.create-account-card {
  background: white;
  border: 1px solid #eaeaea;
  border-radius: 16px;
  padding: 1.5rem;
}
.edit-mode-border {
  border-color: #10b981;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
}
.form-title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.2rem;
}
.create-account-card h3 {
  font-size: 1rem;
  color: #111827;
  font-weight: 700;
  margin: 0;
}
.edit-pill {
  font-size: 0.65rem;
  background-color: #d1fae5;
  color: #065f46;
  font-weight: 700;
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
}
.account-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}
.form-group label {
  font-size: 0.8rem;
  font-weight: 600;
  color: #4b5563;
}
.account-form input,
.account-form select {
  padding: 0.65rem;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font-size: 0.9rem;
  font-family: inherit;
  color: #334155;
  background-color: #f8fafc;
  outline: none;
  width: 100%;
}
.account-form input:focus,
.account-form select:focus {
  border-color: #033126;
  background-color: white;
}
.input-currency-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}
.currency-prefix {
  position: absolute;
  left: 0.75rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: #64748b;
}
.input-currency-wrapper input {
  padding-left: 1.8rem;
}
.action-buttons-wrapper {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.4rem;
}
.btn-submit-account {
  flex: 1;
  background: #033126;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
}
.btn-save-changes {
  background: #10b981;
}
.btn-cancel-edit {
  background: #f1f5f9;
  color: #475569;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  padding: 0.75rem 1.2rem;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
}
</style>
