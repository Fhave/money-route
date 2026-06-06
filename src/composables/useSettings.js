import { ref } from 'vue'
import { simpleHash } from '../utils/hash'

const SETTINGS_KEY = 'money_route_settings'

const defaultSettings = {
  currency: 'NGN',
  passcodeEnabled: false,
  passcodeHash: null,
  defaultAccountId: null,
}

const settings = ref(loadSettings())

function loadSettings() {
  const stored = localStorage.getItem(SETTINGS_KEY)

  if (!stored) {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(defaultSettings))

    return defaultSettings
  }

  return JSON.parse(stored)
}

function saveSettings() {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings.value))
}

export function useSettings() {
  const setPasscode = (code) => {
    if (code.length !== 6) return

    settings.value.passcodeHash = simpleHash(code)
    settings.value.passcodeEnabled = true
    saveSettings()
  }

  const verifyPasscode = (code) => {
    return settings.value.passcodeHash === simpleHash(code)
  }

  const disablePasscode = () => {
    settings.value.passcodeHash = null
    settings.value.passcodeEnabled = false
    saveSettings()
  }

  const setCurrency = (currency) => {
    settings.value.currency = currency
    saveSettings()
  }

  const currencyValues = (currency) => {
    const currencies = {
      NGN: '₦',
      USD: '$',
      EUR: '€',
      GBP: '£',
    }

    return currencies[currency]
  }

  return {
    settings,
    saveSettings,
    setPasscode,
    verifyPasscode,
    disablePasscode,
    setCurrency,
    currencyValues,
  }
}
