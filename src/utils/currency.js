import { useSettingsStore } from '@/stores/settings'

export function formatCurrency(amount) {
  const store = useSettingsStore()

  const activeCurrency = store.settings?.currency || 'NGN'

  const localeMap = {
    NGN: 'en-NG',
    USD: 'en-US',
    EUR: 'de-DE',
    GBP: 'en-GB'
  }

  const activeLocale = localeMap[activeCurrency] || 'en-NG'

  return new Intl.NumberFormat(activeLocale, {
    style: 'currency',
    currency: activeCurrency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount)
}