export function exportData() {
  const data = {
    accounts: JSON.parse(localStorage.getItem('money_route_accounts') || '[]'),

    transactions: JSON.parse(localStorage.getItem('money_route_transactions') || '[]'),

    settings: JSON.parse(localStorage.getItem('money_route_settings') || '{}'),

    exportedAt: new Date().toISOString(),
  }

  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: 'application/json',
  })

  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')

  link.href = url
  link.download = `money-route-backup-${Date.now()}.json`

  link.click()

  URL.revokeObjectURL(url)
}
