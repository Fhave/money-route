export function importData(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result)

        localStorage.setItem('money_route_accounts', JSON.stringify(data.accounts || []))

        localStorage.setItem('money_route_transactions', JSON.stringify(data.transactions || []))

        localStorage.setItem('money_route_settings', JSON.stringify(data.settings || {}))

        resolve()
      } catch (err) {
        reject(err)
      }
    }

    reader.readAsText(file)
  })
}
