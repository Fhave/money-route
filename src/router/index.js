import { createRouter, createWebHistory } from 'vue-router'
import SplashPage from '@/pages/SplashPage.vue'
import DashboardPage from '@/pages/DashboardPage.vue'
import AccountsPage from '@/pages/AccountsPage.vue'
import TransactionsPage from '@/pages/TransactionsPage.vue'
import SettingsPage from '@/pages/SettingsPage.vue'
import NotFoundPage from '@/pages/NotFoundPage.vue'

const routes = [
  {
    path: '/',
    name: 'splash',
    component: SplashPage,
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardPage,
  },
  {
    path: '/accounts',
    name: 'accounts',
    component: AccountsPage,
  },
  {
    path: '/transactions',
    name: 'transactions',
    component: TransactionsPage,
  },
  {
    path: '/settings',
    name: 'settings',
    component: SettingsPage,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundPage,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
