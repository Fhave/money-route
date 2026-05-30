<script setup>
defineProps({
  amount: {
    type: Number,
    required: true,
    default: 0,
  },
})
</script>

<template>
  <div class="net-wealth-card">
    <span class="card-label">TOTAL NET WEALTH</span>
    <h2 class="wealth-amount">
      <span>&#8358;</span
      >{{ amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}
    </h2>
  </div>
</template>

<style scoped>
.net-wealth-card {
  background: #033126;
  color: white;
  padding: 1.5rem;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(3, 49, 38, 0.15);
}
.card-label {
  font-size: 0.7rem;
  font-weight: 700;
  color: #a7f3d0;
  letter-spacing: 0.05em;
}
.wealth-amount {
  font-size: 2rem;
  font-weight: 800;
  margin: 0.4rem 0 0 0;
}
</style>
