<script setup>
import { ref, computed } from 'vue'
import { useTransactions } from '@/composables/useTransactions'
import CategoryFilter from './CategoryFilter.vue'
import DateRangeFilter from './DateRangeFilter.vue'
import TransactionItem from './TransactionItem.vue'
import TransactionForm from './TransactionForm.vue'

const { transactions } = useTransactions()
const selectedCategory = ref('All')
const activeTab = ref('expense')
const isFormOpen = ref(false)
const selectedTransaction = ref(null)

const startDate = ref('')
const endDate = ref('')

const filteredTransactions = computed(() => {
  const filtered = transactions.value.filter((t) => {
    const matchesCategory =
      selectedCategory.value === 'All' ||
      t.category.toLowerCase() === selectedCategory.value.toLowerCase()

    let matchesDate = true
    if (t.date) {
      const itemDate = new Date(t.date).setHours(0, 0, 0, 0)

      if (startDate.value) {
        const start = new Date(startDate.value).setHours(0, 0, 0, 0)
        if (itemDate < start) matchesDate = false
      }

      if (endDate.value) {
        const end = new Date(endDate.value).setHours(23, 59, 59, 999)
        if (itemDate > end) matchesDate = false
      }
    }

    return matchesCategory && matchesDate
  })

  return [...filtered].sort((a, b) => new Date(b.date) - new Date(a.date))
})

const totalExpenses = computed(() => {
  return filteredTransactions.value
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + Number(t.amount), 0)
})

const totalIncome = computed(() => {
  return filteredTransactions.value
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + Number(t.amount), 0)
})

const currentDisplayAmount = computed(() => {
  return activeTab.value === 'expense' ? totalExpenses.value : totalIncome.value
})

const topCategory = computed(() => {
  const expenseItems = filteredTransactions.value.filter((t) => t.type === 'expense')
  if (!expenseItems.length) return 'None'

  const counts = {}
  expenseItems.forEach((t) => (counts[t.category] = (counts[t.category] || 0) + Number(t.amount)))
  return Object.keys(counts).reduce((a, b) => (counts[a] > counts[b] ? a : b))
})

const handleEditSelection = (transaction) => {
  selectedTransaction.value = transaction
  isFormOpen.value = true
}

const resetDateRange = () => {
  startDate.value = ''
  endDate.value = ''
}

const closeForm = () => {
  isFormOpen.value = false
  selectedTransaction.value = null
}
</script>

<template>
  <div class="transaction-list-container">
    <div class="filter-toolbar">
      <CategoryFilter v-model="selectedCategory" />
      <DateRangeFilter
        v-model:startDate="startDate"
        v-model:endDate="endDate"
        @clear-range="resetDateRange"
      />
    </div>

    <section class="summary-cards">
      <div class="card toggleable-card">
        <div class="toggle-headers">
          <span
            :class="['card-title-tab', { active: activeTab === 'expense' }]"
            @click="activeTab = 'expense'"
          >
            TOTAL EXPENSES
          </span>
          <span class="separator">|</span>
          <span
            :class="['card-title-tab', { active: activeTab === 'income' }]"
            @click="activeTab = 'income'"
          >
            TOTAL INCOME
          </span>
        </div>

        <h2 :class="['amount', activeTab === 'expense' ? 'text-expense' : 'text-income']">
          <i :class="['pi', activeTab === 'expense' ? 'pi-arrow-down' : 'pi-arrow-up']"></i>
          <span>&#8358;</span>{{ currentDisplayAmount.toFixed(2) }}
        </h2>

        <div class="progress-bar">
          <div
            class="fill"
            :style="{
              width: '65%',
              backgroundColor: activeTab === 'expense' ? '#dc2626' : '#16a34a',
            }"
          ></div>
        </div>
      </div>

      <div class="card">
        <span class="card-title">TOP CATEGORY</span>
        <p class="top-cat-value">
          <i class="pi pi-tag icon-accent"></i>
          <strong>{{ topCategory }}</strong>
        </p>
      </div>
    </section>

    <div class="table-container">
      <div class="table-header">
        <span>DATE</span>
        <span>AMOUNT</span>
        <span>CATEGORY</span>
        <span>NOTE</span>
        <span></span>
      </div>

      <div class="table-body">
        <TransactionItem
          v-for="item in filteredTransactions"
          :key="item.id"
          :transaction="item"
          @edit-transaction="handleEditSelection"
        />
        <div v-if="filteredTransactions.length === 0" class="empty-state">
          <i class="pi pi-folder-open empty-icon"></i>
          <p>No transactions found for this selection range.</p>
        </div>
      </div>
    </div>

    <TransactionForm v-if="isFormOpen" :edit-data="selectedTransaction" @close="closeForm" />
  </div>
</template>

<style scoped>
.transaction-list-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.filter-toolbar {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}

.summary-cards {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

.card {
  background: white;
  border: 1px solid #eaeaea;
  border-radius: 12px;
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.toggle-headers {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 0.3rem;
}

.card-title-tab,
.card-title {
  font-size: 0.7rem;
  color: #666;
  font-weight: bold;
  letter-spacing: 0.05em;
}

.card-title-tab {
  cursor: pointer;
  color: #9ca3af;
  transition: color 0.2s;
}

.card-title-tab.active {
  color: #111827;
}

.separator {
  font-size: 0.7rem;
  color: #e5e7eb;
}

.amount {
  font-size: 1.8rem;
  margin: 0.3rem 0;
  font-weight: 800;
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.text-expense {
  color: #dc2626;
}
.text-income {
  color: #16a34a;
}

.progress-bar {
  background: #eee;
  height: 4px;
  border-radius: 2px;
  margin-top: 0.5rem;
  overflow: hidden;
  width: 100%;
}

.progress-bar .fill {
  height: 100%;
  transition:
    width 0.3s ease,
    background-color 0.3s ease;
}

.top-cat-value {
  margin-top: 0.5rem;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: #111827;
}

.icon-accent {
  color: #033126;
  font-size: 0.9rem;
}

.table-container {
  background: white;
  border: 1px solid #eaeaea;
  border-radius: 12px;
  overflow: hidden;
  margin-top: 0.5rem;
}

.table-header {
  display: grid;
  grid-template-columns: 1.2fr 1fr 1.2fr 1.5fr 0.3fr;
  background: #f1f3f1;
  padding: 0.9rem 0.8rem;
  font-size: 0.75rem;
  font-weight: bold;
  color: #4b5563;
  letter-spacing: 0.05em;
}

.empty-state {
  text-align: center;
  padding: 3rem 1rem;
  color: #9ca3af;
}

.empty-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: #cbd5e1;
}

@media (min-width: 768px) {
  .transaction-list-container {
    gap: 1.5rem;
  }

  .filter-toolbar {
    flex-direction: row-reverse;
    justify-content: space-between;
    align-items: flex-end;
  }

  :deep(.filter-section) {
    width: auto;
    min-width: 220px;
    margin-bottom: 0;
  }

  .summary-cards {
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
  }

  .card {
    padding: 1.5rem;
    min-height: 110px;
  }

  .amount {
    font-size: 2.1rem;
  }

  .top-cat-value {
    font-size: 1.3rem;
  }

  .table-container {
    margin-top: 0rem;
    box-shadow:
      0 4px 6px -1px rgba(0, 0, 0, 0.05),
      0 2px 4px -1px rgba(0, 0, 0, 0.03);
    border: 1px solid #e5e7eb;
  }

  .table-header {
    padding: 1.1rem 1.2rem;
    font-size: 0.8rem;
    background: #f8fafc;
    border-bottom: 1px solid #e2e8f0;
  }

  .table-body :deep(.table-row) {
    padding: 1.1rem 1.2rem;
    transition: background-color 0.15s ease;
  }

  .table-body :deep(.table-row:hover) {
    background-color: #f8fafc;
  }
}
</style>
