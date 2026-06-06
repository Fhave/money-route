import { useSettings } from '../composables/useSettings'

const { settings } = useSettings()

export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: settings.value.currency || 'NGN',
  }).format(amount)
}
