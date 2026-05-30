<script setup>
import { computed } from 'vue'

const props = defineProps({
  balance: { type: Number, required: true },
})

const formattedBalance = computed(() => {
  return props.balance.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
})
</script>

<template>
  <div class="card card-hero">
    <span class="card-label">CURRENT BALANCE</span>
    <h2 class="balance-amount"><span>&#8358;</span>{{ formattedBalance }}</h2>
    <span class="trend-badge positive">
      <i class="pi pi-arrow-up-right icon"></i> +4.2% from last month
    </span>
    <div class="deco-circle"></div>
  </div>
</template>

<style scoped>
.card-hero {
  background: #ffffff;
  border: 1px solid #eef1ee;
  border-radius: 16px;
  padding: 1.8rem 1.4rem;
  position: relative;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
}
.card-label {
  font-size: 0.7rem;
  font-weight: 700;
  color: #6b7280;
  letter-spacing: 0.05em;
  display: block;
  margin-bottom: 0.5rem;
}
.balance-amount {
  font-size: 2.3rem;
  font-weight: 800;
  color: #033126;
  margin-bottom: 0.8rem;
  letter-spacing: -0.02em;
  position: relative;
  z-index: 1;
}
.trend-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.2rem;
  font-size: 0.7rem;
  font-weight: 600;
  padding: 0.3rem 0.6rem;
  border-radius: 20px;
  background-color: #d1fae5;
  color: #065f46;
  position: relative;
  z-index: 1;
}
.deco-circle {
  position: absolute;
  width: 140px;
  height: 140px;
  background: #f4f7f4;
  border-radius: 50%;
  right: -30px;
  bottom: -30px;
  z-index: 0;
}
.trend-badge .icon {
  font-size: 0.75rem;
  margin-right: 2px;
}
</style>
