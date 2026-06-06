import { onMounted, onUnmounted } from 'vue'
import { useSettings } from './useSettings'

export function useAutoLock(onLock) {
  const { settings } = useSettings()

  let timer = null

  const resetTimer = () => {
    if (!settings.value.passcodeEnabled) return
    startTimer()
  }

  const startTimer = () => {
    if (!settings.value.passcodeEnabled) return

    if (timer) clearTimeout(timer)

    const minutes = settings.value.autoLockTime || 5
    const ms = minutes * 60 * 1000

    timer = setTimeout(() => {
      onLock?.()
    }, ms)
  }

  const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart']

  onMounted(() => {
    if (!settings.value.passcodeEnabled) return

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
