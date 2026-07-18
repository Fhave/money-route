<script setup>
import { ref, computed, onMounted } from 'vue'
import { useTransactions } from '@/composables/useTransactions'
import { useAccounts } from '@/composables/useAccounts'
import BalanceCard from '../components/BalanceCard.vue'
import SummaryCard from '../components/SummaryCard.vue'
import ExpenseChart from '../components/ExpenseChart.vue'
import TransactionForm from '../components/TransactionForm.vue'
import RecentTransactions from '../components/RecentTransactions.vue'
import ChatBot from '../components/ChatBot.vue'

const { transactions, loadTransactions, seedBulkData } = useTransactions()
const { totalNetWealth, loadAccounts } = useAccounts()
const isFormOpen = ref(false)

onMounted(() => {
  loadTransactions()
  loadAccounts()
})

const handleBulkSeed = () => {
  seedBulkData()
}

const monthlyTransactions = computed(() => {
  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).setHours(0, 0, 0, 0)
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).setHours(23, 59, 59, 999)

  return transactions.value.filter((t) => {
    if (!t.date) return false
    const transactionDate = new Date(t.date).getTime()
    return transactionDate >= startOfMonth && transactionDate <= endOfMonth
  })
})

const totalIncome = computed(() =>
  monthlyTransactions.value
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + Number(t.amount), 0),
)

const totalExpenses = computed(() =>
  monthlyTransactions.value
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + Number(t.amount), 0),
)

const currentBalance = computed(() => totalNetWealth.value)
</script>

<template>
  <div class="dashboard-page">
    <header class="app-header">
      <div>
        <h1>Financial Overview</h1>
        <p>Welcome back, here's what's happening with your wealth this month.</p>
      </div>
      <div class="header-actions">
        <button class="btn-seed" @click="handleBulkSeed">
          <i class="pi pi-database"></i> Seed Data
        </button>

        <button class="btn-add-header" @click="isFormOpen = true">
          <i class="pi pi-plus"></i> Add Transaction
        </button>
      </div>
    </header>

    <div class="dashboard-grid-layout">
      <BalanceCard :balance="currentBalance" />

      <section class="metrics-split-grid">
        <SummaryCard type="income" label="This Month's Income" :amount="totalIncome" />
        <SummaryCard type="expense" label="This Month's Expenses" :amount="totalExpenses" />
      </section>

      <ExpenseChart :transactions="monthlyTransactions" />

      <RecentTransactions />
    </div>

    <div class="bottom-spacer"></div>
    <nav class="bottom-nav"></nav>
    <TransactionForm v-if="isFormOpen" @close="isFormOpen = false" />

    <ChatBot />
  </div>
</template>

<style scoped>
.dashboard-page {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}
.dashboard-page h1 {
  font-size: 1.8rem;
  font-weight: 700;
  padding-bottom: 0.2rem;
  color: #111827;
}
.dashboard-page p {
  font-size: 0.9rem;
  color: #555555;
}
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 0.5rem;
}
.header-actions {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}
.btn-add-header {
  background-color: #033126;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.dashboard-grid-layout {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}
.metrics-split-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.bottom-spacer {
  height: 60px;
}

.btn-seed {
  background-color: #f1f5f9;
  color: #475569;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  transition: all 0.2s;
}
.btn-seed:hover {
  background-color: #e2e8f0;
  color: #0f172a;
}

@media (min-width: 768px) {
  .dashboard-page {
    max-width: 1200px;
    margin: 0 auto;
    gap: 2rem;
  }

  .dashboard-page h1 {
    font-size: 2.2rem;
  }

  .dashboard-grid-layout {
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    gap: 2rem;
    align-items: start;
  }

  .metrics-split-grid {
    flex-direction: row;
  }
  .metrics-split-grid > * {
    flex: 1;
  }

  .bottom-spacer,
  .bottom-nav {
    display: none !important;
  }
}
</style>
