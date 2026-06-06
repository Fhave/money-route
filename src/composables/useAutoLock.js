import { onMounted, onUnmounted } from 'vue'
import { useSettingsStore } from '@/stores/settings'

export function useAutoLock(onLock) {
  const store = useSettingsStore()

  let timer = null

  const resetTimer = () => {
    if (!store.settings.passcodeEnabled) return
    startTimer()
  }

  const startTimer = () => {
    if (!store.settings.passcodeEnabled) return

    if (timer) clearTimeout(timer)

    const minutes = store.settings.autoLockTime || 5
    const ms = minutes * 60 * 1000

    timer = setTimeout(() => {
      onLock?.()
    }, ms)
  }

  const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart']

  onMounted(() => {
    if (!store.settings.passcodeEnabled) return

    events.forEach((event) => window.addEventListener(event, resetTimer))

    startTimer()
  })

  onUnmounted(() => {
    events.forEach((event) => window.removeEventListener(event, resetTimer))

    if (timer) clearTimeout(timer)
  })

  return {
    resetTimer,
    startTimer,
  }
}