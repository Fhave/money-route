<script setup>
import { computed } from 'vue'
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)

const props = defineProps({
  transactions: {
    type: Array,
    required: true,
    default: () => [],
  },
})

const hasExpenses = computed(() => {
  return props.transactions.some((t) => t.type === 'expense')
})

const chartData = computed(() => {
  const expenseTransactions = props.transactions.filter((t) => t.type === 'expense')
  const categoryTotals = {}
  expenseTransactions.forEach((t) => {
    categoryTotals[t.category] = (categoryTotals[t.category] || 0) + Number(t.amount)
  })

  return {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        backgroundColor: ['#033126', '#10b981', '#6ee7b7', '#a7f3d0', '#ecfdf5'],
        hoverBackgroundColor: ['#02231b', '#059669', '#34d399', '#86efac', '#d1fae5'],
        borderWidth: 1,
        borderColor: '#ffffff',
        data: Object.values(categoryTotals),
      },
    ],
  }
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        boxWidth: 12,
        padding: 15,
        font: {
          size: 11,
          weight: '500',
        },
        color: '#4b5563',
      },
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          return ` \u20A6${context.raw.toFixed(2)}`
        },
      },
    },
  },
}
</script>

<template>
  <div class="chart-card">
    <div class="chart-header">
      <h4>Monthly Expense Breakdown</h4>
      <i class="pi pi-chart-pie trend-icon"></i>
    </div>

    <div class="chart-wrapper">
      <Pie v-if="hasExpenses" :data="chartData" :options="chartOptions" />
      <div v-else class="empty-chart-state">
        <i class="pi pi-images"></i>
        <p>No expense data logged this month.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chart-card {
  background: white;
  border: 1px solid #f0f2f0;
  border-radius: 16px;
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
}
.chart-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.2rem;
}
.chart-header h4 {
  font-size: 0.85rem;
  color: #4b5563;
  font-weight: 700;
}
.trend-icon {
  color: #033126;
  font-size: 1.1rem;
}
.chart-wrapper {
  position: relative;
  height: 220px;
  width: 100%;
}
.empty-chart-state {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #9ca3af;
  gap: 0.5rem;
  font-size: 0.85rem;
}
.empty-chart-state i {
  font-size: 1.8rem;
}
</style>
