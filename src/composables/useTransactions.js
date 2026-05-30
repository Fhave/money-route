import { ref, watch } from 'vue'

const transactions = ref([])
const isLoaded = ref(false)

const generateMockData = () => {
  const now = new Date()
  const year = now.getFullYear()

  const getRandomDateString = (day) => {
    const targetMonths = [0, 1, 2, 3, 4]
    const randomMonth = targetMonths[Math.floor(Math.random() * targetMonths.length)]

    const safeDay = randomMonth === 1 && day > 28 ? 28 : day

    const date = new Date(year, randomMonth, safeDay)
    const yyyy = date.getFullYear()
    const mm = String(date.getMonth() + 1).padStart(2, '0')
    const dd = String(date.getDate()).padStart(2, '0')
    return `${yyyy}-${mm}-${dd}`
  }

  return [
    {
      id: 'mock-1',
      date: getRandomDateString(2),
      type: 'income',
      amount: 450000,
      category: 'Income',
      accountId: 'acc-default',
      note: 'Monthly Salary Base',
    },
    {
      id: 'mock-2',
      date: getRandomDateString(15),
      type: 'income',
      amount: 75000,
      category: 'Income',
      accountId: 'acc-default',
      note: 'Freelance Design Gig',
    },
    {
      id: 'mock-3',
      date: getRandomDateString(26),
      type: 'income',
      amount: 20000,
      category: 'Income',
      accountId: 'acc-default',
      note: 'Dividends',
    },
    {
      id: 'mock-4',
      date: getRandomDateString(5),
      type: 'expense',
      amount: 35000,
      category: 'Bills',
      accountId: 'acc-default',
      note: 'Electricity & Utility',
    },
    {
      id: 'mock-5',
      date: getRandomDateString(8),
      type: 'expense',
      amount: 12000,
      category: 'Food & Drinks',
      accountId: 'acc-default',
      note: 'Grocery shopping',
    },
    {
      id: 'mock-6',
      date: getRandomDateString(12),
      type: 'expense',
      amount: 45000,
      category: 'Shopping',
      accountId: 'acc-default',
      note: 'Designer Sneakers',
    },
    {
      id: 'mock-7',
      date: getRandomDateString(18),
      type: 'expense',
      amount: 8500,
      category: 'Food & Drinks',
      accountId: 'acc-default',
      note: 'Dinner out with team',
    },
    {
      id: 'mock-8',
      date: getRandomDateString(22),
      type: 'expense',
      amount: 15000,
      category: 'Shopping',
      accountId: 'acc-default',
      note: 'Home office items',
    },
    {
      id: 'mock-9',
      date: getRandomDateString(6),
      type: 'transfer',
      amount: 50000,
      category: 'Internal Transfer',
      fromAccountId: 'acc-default',
      toAccountId: 'acc-savings',
      note: 'Monthly automated savings',
    },
    {
      id: 'mock-10',
      date: getRandomDateString(20),
      type: 'transfer',
      amount: 15000,
      category: 'Internal Transfer',
      fromAccountId: 'acc-default',
      toAccountId: 'acc-savings',
      note: 'Stashing extra cash',
    },
  ]
}

export const useTransactions = () => {
  const loadTransactions = () => {
    if (isLoaded.value) return
    const stored = localStorage.getItem('money_route_transactions')
    if (stored) {
      transactions.value = JSON.parse(stored)
    }
    isLoaded.value = true
  }

  const saveTransactions = () => {
    localStorage.setItem('money_route_transactions', JSON.stringify(transactions.value))
  }

  const addTransaction = (transaction) => {
    const newTransaction = {
      id: `tx-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      ...transaction,
      amount: Number(transaction.amount),
    }
    transactions.value.push(newTransaction)
    saveTransactions()
  }

  const updateTransaction = (id, updatedFields) => {
    const index = transactions.value.findIndex((t) => t.id === id)
    if (index !== -1) {
      transactions.value[index] = {
        ...transactions.value[index],
        ...updatedFields,
        amount: Number(updatedFields.amount),
      }
      saveTransactions()
    }
  }

  const deleteTransaction = (id) => {
    transactions.value = transactions.value.filter((t) => t.id !== id)
    saveTransactions()
  }

  const seedBulkData = () => {
    const mockRecords = generateMockData()
    transactions.value = [...transactions.value, ...mockRecords]
    localStorage.setItem('money_route_transactions', JSON.stringify(transactions.value))
  }

  return {
    transactions,
    loadTransactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    seedBulkData,
  }
}
