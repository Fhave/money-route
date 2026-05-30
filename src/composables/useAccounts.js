import { ref, computed } from 'vue'
import { useTransactions } from './useTransactions'

const accounts = ref([])
const isLoaded = ref(false)

export const useAccounts = () => {
  const { transactions, loadTransactions } = useTransactions()

  const loadAccounts = () => {
    loadTransactions()

    if (isLoaded.value) return
    const stored = localStorage.getItem('money_route_accounts')
    if (stored) {
      accounts.value = JSON.parse(stored)
    } else {
      accounts.value = [
        { id: 'acc-default', name: 'Main Cash Wallet', type: 'Cash', initialBalance: 0 },
      ]
      localStorage.setItem('money_route_accounts', JSON.stringify(accounts.value))
    }
    isLoaded.value = true
  }

  const saveAccounts = () => {
    localStorage.setItem('money_route_accounts', JSON.stringify(accounts.value))
  }

  const addAccount = (account) => {
    const newAccount = {
      id: `acc-${Date.now()}`,
      name: account.name,
      type: account.type || 'Bank',
      initialBalance: Number(account.initialBalance || 0),
    }
    accounts.value.push(newAccount)
    saveAccounts()
  }

  const updateAccount = (id, updates) => {
    const index = accounts.value.findIndex((a) => a.id === id)
    if (index !== -1) {
      accounts.value[index] = { ...accounts.value[index], ...updates }
      saveAccounts()
    }
  }

  const deleteAccount = (id) => {
    if (id === 'acc-default') return
    accounts.value = accounts.value.filter((a) => a.id !== id)
    saveAccounts()
  }

  const accountsWithBalances = computed(() => {
    return accounts.value.map((account) => {
      let liveBalance = Number(account.initialBalance)

      transactions.value.forEach((tx) => {
        const amount = Number(tx.amount)

        if (tx.accountId === account.id) {
          if (tx.type === 'income') liveBalance += amount
          if (tx.type === 'expense') liveBalance -= amount
        }

        if (tx.type === 'transfer') {
          if (tx.fromAccountId === account.id) liveBalance -= amount
          if (tx.toAccountId === account.id) liveBalance += amount
        }
      })

      return {
        ...account,
        balance: liveBalance,
      }
    })
  })

  const totalNetWealth = computed(() => {
    return accountsWithBalances.value.reduce((sum, acc) => sum + acc.balance, 0)
  })

  return {
    accounts,
    accountsWithBalances,
    totalNetWealth,
    loadAccounts,
    addAccount,
    updateAccount,
    deleteAccount,
  }
}
