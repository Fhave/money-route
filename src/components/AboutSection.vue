<script setup>
const accounts = JSON.parse(localStorage.getItem('money_route_accounts') || '[]')

const transactions = JSON.parse(localStorage.getItem('money_route_transactions') || '[]')
</script>

<template>
  <section class="settings-section">
    <h2>About Money-Route</h2>

    <div class="stats-grid">
      <div class="stat-card">
        <h3>{{ accounts.length }}</h3>
        <p>Accounts</p>
      </div>

      <div class="stat-card">
        <h3>{{ transactions.length }}</h3>
        <p>Transactions</p>
      </div>
    </div>

    <div class="version">
      <p>Version 1.0.0</p>
      <p>Built with Vue 3</p>
    </div>
  </section>
</template>

<style scoped>
.settings-section {
  background: white;
  border: 1px solid #dce5e2;
  border-radius: 16px;
  padding: 1.5rem;
}

.settings-section h2 {
  color: #033126;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1rem;
  margin: 1rem 0;
}

.stat-card {
  background: #f8faf9;
  border: 1px solid #dce5e2;
  border-radius: 12px;
  padding: 1rem;
  text-align: center;
}

.stat-card h3 {
  color: #033126;
  font-size: 1.5rem;
}

.version {
  border-top: 1px solid #eef2f1;
  padding-top: 1rem;
  color: #6b7280;
}
</style>
