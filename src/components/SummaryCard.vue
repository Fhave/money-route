<script setup>
import { computed } from 'vue'
import { formatCurrency } from '@/utils/currency'
const props = defineProps({
  type: { type: String, required: true },
  label: { type: String, required: true },
  amount: { type: Number, required: true },
})

const typeColor = computed(() => (props.type === 'income' ? 'green' : 'red'))

const formattedAmount = computed(() => formatCurrency(props.amount))
</script>

<template>
  <div class="card card-split">
    <div class="card-header-row">
      <span :class="['icon-wrapper', typeColor]">
        <i :class="['pi', type === 'expense' ? 'pi-arrow-down' : 'pi-arrow-up']"></i>
      </span>
      <span class="card-label-split">{{ label }}</span>
    </div>
    <h3 class="split-amount">{{ formattedAmount }}</h3>
    <span class="sub-period">This Month</span>
  </div>
</template>

<style scoped>
.card-split {
  background: #ffffff;
  border: 1px solid #f0f2f0;
  border-radius: 16px;
  padding: 1.2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
}
.card-header-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.6rem;
}
.icon-wrapper {
  font-size: 0.8rem;
  font-family: monospace;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-weight: bold;
}
.icon-wrapper.green {
  background-color: #a7f3d0;
  color: #047857;
}
.icon-wrapper.red {
  background-color: #fee2e2;
  color: #b91c1c;
}

.card-label-split {
  font-size: 0.8rem;
  font-weight: 600;
  color: #4b5563;
}
.split-amount {
  font-size: 1.6rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 0.2rem;
}
.sub-period {
  font-size: 0.7rem;
  color: #9ca3af;
}
.icon-wrapper i {
  font-size: 0.75rem;
}
</style>