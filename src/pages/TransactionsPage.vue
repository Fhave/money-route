<script setup>
import { ref, onMounted } from 'vue'
import { useTransactions } from '@/composables/useTransactions'
import TransactionList from '../components/TransactionList.vue'
import TransactionForm from '../components/TransactionForm.vue'

const { loadTransactions } = useTransactions()
const isFormOpen = ref(false)

onMounted(() => {
  loadTransactions()
})
</script>

<template>
  <div class="transaction-page">
    <header class="header">
      <div class="title-area">
        <h1>Transactions</h1>
        <p class="subtitle">Review, edit, and keep track of your financial ledger details.</p>
      </div>
      <button class="btn-primary" @click="isFormOpen = true">
        <i class="pi pi-plus"></i> Add New
      </button>
    </header>

    <main class="content-body">
      <TransactionList />
    </main>

    <TransactionForm v-if="isFormOpen" @close="isFormOpen = false" />
  </div>
</template>

<style scoped>
.transaction-page {
  background-color: #f8f9f8;
  min-height: 100%;
  display: flex;
  flex-direction: column;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.2rem;
}
.header h1 {
  font-size: 1.6rem;
  font-weight: 700;
  color: #111827;
}
.subtitle {
  display: none;
  font-size: 0.9rem;
  color: #6b7280;
  margin-top: 0.2rem;
}
.btn-primary {
  background-color: #033126;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
  box-shadow: 0 2px 4px rgba(3, 49, 38, 0.15);
  transition: background-color 0.2s;
}
.btn-primary:hover {
  background-color: #02231b;
}
.btn-primary i {
  font-size: 0.75rem;
}
.content-body {
  flex: 1;
  width: 100%;
}

@media (min-width: 768px) {
  .transaction-page {
    max-width: 1200px;
    margin: 0 auto;
    gap: 1.5rem;
  }

  .header {
    margin-bottom: 0.5rem;
    align-items: flex-start;
  }

  .header h1 {
    font-size: 2.2rem;
  }

  .subtitle {
    display: block;
  }

  .btn-primary {
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
  }

  .content-body :deep(.table-container) {
    box-shadow: 0 4px 18px rgba(0, 0, 0, 0.03);
    border: 1px solid #e5e7eb;
  }
}
</style>
