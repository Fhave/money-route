<script setup>
import { computed } from 'vue'
import { useTransactions } from '@/composables/useTransactions'

const { transactions } = useTransactions()

const recentTransactions = computed(() => {
  return [...transactions.value].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5)
})

const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}
</script>

<template>
  <div class="recent-transactions-card">
    <div class="card-header">
      <h3>Recent Transactions</h3>
      <router-link to="/transactions" class="view-all-link">
        View All <i class="pi pi-arrow-right"></i>
      </router-link>
    </div>

    <div class="table-container">
      <div class="table-header">
        <span>DATE</span>
        <span>CATEGORY</span>
        <span>AMOUNT</span>
      </div>

      <div class="table-body">
        <div v-for="item in recentTransactions" :key="item.id" class="table-row">
          <div class="cell date-cell">
            {{ formatDate(item.date) }}
          </div>

          <div class="cell">
            <span class="badge">
              {{ item.category }}
            </span>
          </div>

          <div class="cell amount-cell">
            <span
              :class="
                item.type === 'income'
                  ? 'amount-income'
                  : item.type === 'expense'
                    ? 'amount-expense'
                    : 'amount-transfer'
              "
            >
              {{ item.type === 'income' ? '+' : '-' }}<span>&#8358;</span
              >{{ Number(item.amount).toFixed(2) }}
            </span>
          </div>
        </div>

        <div v-if="recentTransactions.length === 0" class="empty-state">
          <i class="pi pi-inbox"></i>
          <p>No transactions logged yet.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.recent-transactions-card {
  background: white;
  border: 1px solid #eaeaea;
  border-radius: 16px;
  padding: 1.2rem;
  width: 100%;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.card-header h3 {
  font-size: 1rem;
  color: #111827;
  font-weight: 700;
}

.view-all-link {
  font-size: 0.8rem;
  color: #033126;
  text-decoration: none;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  transition: opacity 0.2s;
}

.view-all-link:hover {
  opacity: 0.8;
}

.view-all-link i {
  font-size: 0.7rem;
}

.table-container {
  border: 1px solid #f3f4f6;
  border-radius: 12px;
  overflow: hidden;
}

.table-header {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  background: #f8fafc;
  padding: 0.75rem 1rem;
  font-size: 0.7rem;
  font-weight: bold;
  color: #6b7280;
  letter-spacing: 0.05em;
  border-bottom: 1px solid #f3f4f6;
}

.table-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 0.85rem 1rem;
  border-bottom: 1px solid #f9fafb;
  align-items: center;
  transition: background-color 0.15s ease;
}

.table-row:last-child {
  border-bottom: none;
}

.table-row:hover {
  background-color: #f8fafc;
}

.cell {
  font-size: 0.85rem;
  color: #333;
}

.date-cell {
  color: #111827;
  font-weight: 500;
}

.amount-cell {
  text-align: right;
}

.table-header span:last-child {
  text-align: right;
}

.amount-income {
  color: #16a34a;
  font-weight: 600;
}

.amount-expense {
  color: #dc2626;
  font-weight: 600;
}

.badge {
  background-color: #f3f4f6;
  color: #4b5563;
  padding: 0.25rem 0.6rem;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: 600;
  display: inline-block;
}

.empty-state {
  text-align: center;
  padding: 2rem 1rem;
  color: #9ca3af;
  font-size: 0.85rem;
}

.empty-state i {
  font-size: 1.5rem;
  margin-bottom: 0.4rem;
  color: #cbd5e1;
}

@media (min-width: 768px) {
  .recent-transactions-card {
    padding: 1.5rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  }

  .card-header h3 {
    font-size: 1.1rem;
  }

  .table-header {
    padding: 0.9rem 1.2rem;
    font-size: 0.75rem;
  }

  .table-row {
    padding: 0.95rem 1.2rem;
  }
}
</style>
