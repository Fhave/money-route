<script setup>
import { ref } from 'vue'

const isMobileMenuOpen = ref(false)
</script>

<template>
  <nav class="navbar">
    <div class="navbar-container">
      <router-link to="/" class="navbar-brand"> Money-Route </router-link>

      <button
        @click="isMobileMenuOpen = !isMobileMenuOpen"
        class="navbar-toggle"
        aria-label="Toggle Navigation"
      >
        <span class="burger-icon" :class="{ 'is-open': isMobileMenuOpen }"></span>
      </button>

      <ul :class="['navbar-menu', { open: isMobileMenuOpen }]">
        <li>
          <router-link to="/dashboard" @click="isMobileMenuOpen = false"> Dashboard </router-link>
        </li>
        <li>
          <router-link to="/accounts" @click="isMobileMenuOpen = false"> Accounts </router-link>
        </li>
        <li>
          <router-link to="/transactions" @click="isMobileMenuOpen = false">
            Transactions
          </router-link>
        </li>
        <li>
          <router-link to="/settings" @click="isMobileMenuOpen = false"> Settings </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  background: #033126;
  color: white;
  padding: 1.2rem 1.5rem;
  position: sticky;
  top: 0;
  z-index: 50;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}

.navbar-brand {
  font-size: 1.1rem;
  font-weight: 700;
  color: #ffffff;
  text-decoration: none;
  letter-spacing: -0.02em;
}

.navbar-toggle {
  background: none;
  border: none;
  width: 24px;
  height: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.burger-icon,
.burger-icon::before,
.burger-icon::after {
  content: '';
  display: block;
  background: white;
  height: 2px;
  width: 20px;
  transition: all 0.2s ease-in-out;
  position: absolute;
}

.burger-icon::before {
  top: -6px;
  left: 0;
}
.burger-icon::after {
  bottom: -6px;
  left: 0;
}

.burger-icon.is-open {
  background: transparent;
}
.burger-icon.is-open::before {
  transform: rotate(45deg);
  top: 0;
}
.burger-icon.is-open::after {
  transform: rotate(-45deg);
  bottom: 0;
}

.navbar-menu {
  display: none;
  list-style: none;
  margin: 0;
  padding: 0.5rem 0;
  flex-direction: column;
  position: absolute;
  top: calc(100% + 1.2rem);
  left: -1.5rem;
  right: -1.5rem;
  background: #02231b;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.navbar-menu.open {
  display: flex;
}

.navbar-menu li {
  width: 100%;
}

.navbar-menu a {
  display: block;
  color: rgba(255, 255, 255, 0.75);
  text-decoration: none;
  padding: 0.8rem 1.5rem;
  font-size: 0.95rem;
  font-weight: 500;
  transition: all 0.2s;
}

.navbar-menu a.router-link-active {
  background: rgba(255, 255, 255, 0.15);
  color: white;
  font-weight: 600;
}

.disabled-link {
  opacity: 0.4;
  pointer-events: none;
}

@media (min-width: 768px) {
  .navbar {
    padding: 1rem 2rem;
  }

  .navbar-container {
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
  }

  .navbar-brand {
    font-size: 1.3rem;
  }

  .navbar-toggle {
    display: none;
  }

  .navbar-menu {
    display: flex;
    flex-direction: row;
    position: static;
    background: transparent;
    box-shadow: none;
    padding: 0;
    width: auto;
    gap: 1.5rem;
  }

  .navbar-menu li {
    width: auto;
  }

  .navbar-menu a {
    padding: 0.5rem 0.2rem;
    font-size: 0.9rem;
    position: relative;
  }

  .navbar-menu a:hover {
    color: #ffffff;
  }

  .navbar-menu a.router-link-active {
    background: transparent;
    color: #ffffff;
  }

  .navbar-menu a.router-link-active::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: #10b981;
    border-radius: 2px;
  }
}
</style>
