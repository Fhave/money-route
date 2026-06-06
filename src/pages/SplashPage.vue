<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useSettingsStore } from '@/stores/settings'

const store = useSettingsStore()

const isLocked = computed(() => store.settings.passcodeEnabled)

const code = ref(['', '', '', '', '', ''])
const error = ref('')

const router = useRouter()
let splashTimer = null

const navigateToDashboard = () => {
  if (isLocked.value) return

  if (splashTimer) clearTimeout(splashTimer)
  router.push('/dashboard')
}

onMounted(() => {
  if (!isLocked.value) {
    splashTimer = setTimeout(() => {
      navigateToDashboard()
    }, 3000)
  } else {
    setTimeout(() => {
      document.getElementById('p-0')?.focus()
    }, 100)
  }
})

const verifyCode = () => {
  const entered = code.value.join('')
  if (entered.length !== 6) {
    return
  }

  const valid = store.verifyPasscode(entered)

  if (!valid) {
    error.value = 'Incorrect passcode'
    code.value = ['', '', '', '', '', '']
    document.getElementById('p-0')?.focus()
    return
  }
  if (splashTimer) clearTimeout(splashTimer)
  router.push('/dashboard')
}

const handleInput = (index, event) => {
  const value = event.target.value
  if (!/^\d?$/.test(value)) return
  code.value[index] = value
  error.value = ''
  if (value && index < 5) {
    const next = document.getElementById(`p-${index + 1}`)
    next?.focus()
  }
  if (code.value.every((digit) => digit !== '')) {
    verifyCode()
  }
}

const handleKeydown = (index, event) => {
  if (event.key === 'Backspace' && !code.value[index] && index > 0) {
    const prev = document.getElementById(`p-${index - 1}`)
    if (prev) {
      prev.focus()
      code.value[index - 1] = ''
    }
  }
}
</script>

<template>
  <div class="splash-screen" @click="navigateToDashboard" :class="{ 'locked-view': isLocked }">
    <div class="splash-content">
      <div class="logo-circle">
        <i class="pi pi-wallet splash-icon"></i>
      </div>
      <h1 class="splash-brand">Money-Route</h1>
      <p class="splash-tagline">Know where your money is going.</p>

      <div v-if="isLocked" class="passcode-section" @click.stop>
        <p class="passcode-title">Enter Passcode</p>

        <div class="code-inputs" :class="{ 'shake-err': error }">
          <input
            v-for="(digit, i) in code"
            :key="i"
            :id="`p-${i}`"
            maxlength="1"
            inputmode="numeric"
            type="password"
            :value="code[i]"
            @input="handleInput(i, $event)"
            @keydown="handleKeydown(i, $event)"
          />
        </div>

        <p class="error" v-if="error">{{ error }}</p>
      </div>
      <div v-else>
        <p class="splash-dismiss-tip">Tap anywhere to skip</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.splash-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #033126;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.splash-screen.locked-view {
  cursor: default;
}

.splash-content {
  text-align: center;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}
.logo-circle {
  width: 90px;
  height: 90px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}
.splash-icon {
  font-size: 2.5rem;
  color: #10b981;
}
.splash-brand {
  font-size: 2.5rem;
  font-weight: 800;
  letter-spacing: -0.04em;
}
.splash-tagline {
  font-size: 1rem;
  color: #a7f3d0;
  opacity: 0.85;
}
.splash-dismiss-tip {
  margin-top: 2.5rem;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #6ee7b7;
  opacity: 0.5;
  animation: pulse 2s infinite ease-in-out;
}
.passcode-section {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.passcode-title {
  color: #a7f3d0;
  font-size: 0.9rem;
  opacity: 0.9;
}

.code-inputs {
  display: flex;
  gap: 0.5rem;
}

.code-inputs input {
  width: 40px;
  height: 45px;
  text-align: center;
  font-size: 1.2rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.1);
  color: white;
  outline: none;
  transition: border-color 0.2s ease;
}

.code-inputs input:focus {
  border-color: #10b981;
  background: rgba(255, 255, 255, 0.15);
}

.error {
  color: #f87171;
  font-size: 0.85rem;
  font-weight: 600;
  margin-top: 0.25rem;
}

/* Red error border feedback indicator */
.shake-err input {
  border-color: #f87171;
}
.shake-err {
  animation: shake 0.4s ease-in-out;
}
@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  20%,
  60% {
    transform: translateX(-4px);
  }
  40%,
  80% {
    transform: translateX(4px);
  }
}

@keyframes pulse {
  0%,
  100% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.7;
  }
}
</style>
