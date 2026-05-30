<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  startDate: {
    type: String,
    default: '',
  },
  endDate: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:startDate', 'update:endDate', 'clear-range'])

const localStart = ref(props.startDate)
const localEnd = ref(props.endDate)

watch(localStart, (newVal) => emit('update:startDate', newVal))
watch(localEnd, (newVal) => emit('update:endDate', newVal))

const handleClear = () => {
  localStart.value = ''
  localEnd.value = ''
  emit('clear-range')
}
</script>

<template>
  <div class="calendar-filter-container">
    <div class="input-group">
      <div class="date-field">
        <label>From</label>
        <input
          type="date"
          v-model="localStart"
          :max="new Date().toISOString().split('T')[0]"
          class="date-input"
        />
      </div>

      <div class="date-field">
        <label>To</label>
        <input
          type="date"
          v-model="localEnd"
          :min="localStart"
          :max="new Date().toISOString().split('T')[0]"
          class="date-input"
        />
      </div>
    </div>

    <button v-if="localStart || localEnd" @click="handleClear" class="btn-clear" type="button">
      <i class="pi pi-refresh"></i> Clear
    </button>
  </div>
</template>

<style scoped>
.calendar-filter-container {
  display: block;
  align-items: flex-end;
  gap: 1rem;
  background: white;
  padding: 1rem;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  width: 100%;
}

.input-group {
  display: flex;
  flex: 1;
  gap: 0.75rem;
}

.date-field {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 0.25rem;
}

.date-field label {
  font-size: 0.7rem;
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.date-input {
  width: 100%;
  padding: 0.55rem 0.75rem;
  border-radius: 6px;
  border: 1px solid #cbd5e1;
  font-size: 0.85rem;
  font-family: inherit;
  color: #334155;
  outline: none;
  background: #f8fafc;
  transition: border-color 0.2s;
}

.date-input:focus {
  border-color: #033126;
  background: white;
}

.btn-clear {
  background: #f1f5f9;
  border: none;
  margin-top: 0.5rem;
  color: #475569;
  padding: 0.6rem 0.9rem;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  height: 38px;
  transition: background 0.2s;
}

.btn-clear:hover {
  background: #e2e8f0;
  color: #0f172a;
}

@media (min-width: 768px) {
  .calendar-filter-container {
    width: auto;
    display: inline-flex;
  }

  .input-group {
    flex: none;
  }

  .date-input {
    width: 160px;
  }
}
</style>
