<script setup>
defineProps({
  account: {
    type: Object,
    required: true,
  },
  isActiveEditing: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['edit', 'delete'])
</script>

<template>
  <div class="account-tile" :class="{ 'tile-active-editing': isActiveEditing }">
    <div class="tile-header">
      <span class="account-badge" :class="account.type.toLowerCase()">
        {{ account.type }}
      </span>
      <div class="tile-actions">
        <button @click="$emit('edit')" class="btn-tile-action btn-edit" title="Edit Settings">
          <i class="pi pi-pencil"></i>
        </button>
        <button
          v-if="account.id !== 'acc-default'"
          @click="$emit('delete')"
          class="btn-tile-action btn-delete"
          title="Remove Account"
        >
          <i class="pi pi-trash"></i>
        </button>
      </div>
    </div>

    <div class="tile-body">
      <h4>{{ account.name }}</h4>
      <p class="tile-balance" :class="{ 'negative-bal': account.balance < 0 }">
        <span>&#8358;</span
        >{{
          account.balance.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
        }}
      </p>
    </div>

    <div class="tile-footer">
      <span class="initial-bal-tag">
        Initial Base: <span>&#8358;</span
        >{{ account.initialBalance.toLocaleString('en-US', { minimumFractionDigits: 2 }) }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.account-tile {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 140px;
  transition: all 0.2s;
}
.account-tile:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
}
.tile-active-editing {
  border-color: #10b981;
  background-color: #f0fdf4;
}
.tile-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.account-badge {
  font-size: 0.65rem;
  font-weight: 700;
  padding: 0.2rem 0.5rem;
  border-radius: 6px;
  text-transform: uppercase;
}
.account-badge.bank {
  background: #eff6ff;
  color: #1d4ed8;
}
.account-badge.cash {
  background: #ecfdf5;
  color: #047857;
}
.account-badge.card {
  background: #fff1f2;
  color: #be123c;
}
.account-badge.investment {
  background: #f5f3ff;
  color: #6d28d9;
}

.tile-actions {
  display: flex;
  gap: 0.25rem;
}
.btn-tile-action {
  background: none;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  padding: 0.3rem;
  font-size: 0.8rem;
  border-radius: 6px;
}
.btn-edit:hover {
  color: #10b981;
  background: #e6fbf2;
}
.btn-delete:hover {
  color: #dc2626;
  background: #fef2f2;
}
.tile-body h4 {
  margin: 0.6rem 0 0.2rem 0;
  font-size: 1.05rem;
  font-weight: 700;
  color: #111827;
}
.tile-balance {
  font-size: 1.4rem;
  font-weight: 800;
  color: #033126;
  margin: 0;
}
.tile-balance.negative-bal {
  color: #dc2626;
}
.tile-footer {
  margin-top: 0.8rem;
  border-top: 1px dashed #f3f4f6;
  padding-top: 0.5rem;
}
.initial-bal-tag {
  font-size: 0.7rem;
  color: #9ca3af;
  font-weight: 500;
}
</style>
