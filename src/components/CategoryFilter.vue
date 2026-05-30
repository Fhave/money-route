<script setup>
defineProps({
  modelValue: {
    type: String,
    default: 'All',
  },
})

defineEmits(['update:modelValue'])
</script>

<template>
  <div class="filter-section">
    <select
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
      class="dropdown"
    >
      <option value="All">All Categories</option>
      <option value="Shopping">Shopping</option>
      <option value="Income">Income</option>
      <option value="Bills">Bills</option>
      <option value="Food & Drinks">Food & Drinks</option>
    </select>
  </div>
</template>

<style scoped>
.dropdown {
  width: 100%;
  padding: 0.7rem;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  background-color: white;
  color: #334155;
  font-weight: 500;
  outline: none;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23334155' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.7rem center;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem;
}
</style>
