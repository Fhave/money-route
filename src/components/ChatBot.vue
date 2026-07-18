<script setup>
import { useChat } from '@ai-sdk/vue'
import { DefaultChatTransport } from 'ai'
import { ref, watch, nextTick } from 'vue'
import { marked } from 'marked'

const isOpen = ref(false)
const input = ref('')
const containerRef = ref(null)
const errorMessage = ref('')

const renderMarkdown = (text) => {
  return marked.parse(text, { breaks: true })
}

const { messages, sendMessage, status } = useChat({
  transport: new DefaultChatTransport({
    api: import.meta.env.VITE_BACKEND_URL,
  }),
  async onError(error) {
    console.error('Chat dynamic error:', error)

    try {
      if (error && error.response) {
        const response = error.response
        const errorData = await response.json()

        if (errorData && errorData.message) {
          errorMessage.value = errorData.message
          return
        }
      }
    } catch (e) {
      errorMessage.value = 'An unexpected error occurred. Please try again later.'
      console.error('Error parsing error response:', e)
    }

    const msg = error.message?.toLowerCase() || ''
    if (msg.includes('401') || msg.includes('key')) {
      errorMessage.value = 'Authentication failure. Please check your API credentials.'
    } else if (msg.includes('429') || msg.includes('rate')) {
      errorMessage.value = 'Too many requests. Please slow down and wait a bit.'
    } else {
      errorMessage.value = 'Connection lost. Please verify your network state and retry.'
    }
  }
})

const scrollToBottom = () => {
  if (containerRef.value) {
    containerRef.value.scrollTop = containerRef.value.scrollHeight
  }
}

watch(
  [messages, status, errorMessage],
  async () => {
    await nextTick()
    scrollToBottom()
  },
  { deep: true },
)

watch(isOpen, async (newVal) => {
  if (newVal) {
    await nextTick()
    scrollToBottom()
  }
})

const toggleChat = () => {
  isOpen.value = !isOpen.value
}

const handleSubmit = (e) => {
  e.preventDefault()
  if (!input.value.trim()) return

  errorMessage.value = ''
  sendMessage({ text: input.value })
  input.value = ''
}
</script>

<template>
  <div class="floating-chat-container">
    <div v-if="isOpen" class="chat-wrapper">
      <div class="chat-header">
        <h3>App & Financial Assistant</h3>
        <button class="close-btn" @click="toggleChat">×</button>
      </div>

      <div ref="containerRef" class="messages-container">
        <div class="message-bubble assistant">
          <span class="sender-label">Assistant</span>
          <div class="text-content">
            <p>Hi, how can I help you navigate Money-Route today? 🚀</p>
          </div>
        </div>

        <div
          v-for="(m, index) in messages"
          :key="m.id || index"
          :class="['message-bubble', m.role === 'user' ? 'user' : 'assistant']"
        >
          <span class="sender-label">
            {{ m.role === 'user' ? 'You' : 'Assistant' }}
          </span>

          <div v-for="(part, pIndex) in m.parts" :key="pIndex" class="text-content">
            <div v-if="part.type === 'text'" v-html="renderMarkdown(part.text)"></div>
          </div>
        </div>

        <div v-if="status === 'submitted'" class="message-bubble assistant">
          <span class="sender-label">Assistant</span>
          <div class="text-content"><p>…</p></div>
        </div>

        <div v-if="errorMessage" class="error-banner">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="error-icon">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
          </svg>
          <div class="error-text">
            <strong>System Notification</strong>
            <p>{{ errorMessage }}</p>
          </div>
        </div>
      </div>

      <form @submit="handleSubmit" class="input-form">
        <input
          v-model="input"
          placeholder="Ask a question..."
          type="text"
          :disabled="status === 'submitted' || status === 'streaming'"
        />
        <button type="submit" :disabled="status === 'submitted' || status === 'streaming'">
          Ask
        </button>
      </form>
    </div>

    <button :class="['chat-toggle-btn', { 'btn-active': isOpen }]" @click="toggleChat">
      <svg v-if="!isOpen" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="icon"><path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" /></svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="icon"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
    </button>
  </div>
</template>

<style scoped>
.floating-chat-container {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 16px;
  font-family: sans-serif;
}

.chat-wrapper {
  width: 380px;
  max-width: calc(100vw - 48px);
  height: 500px;
  max-height: calc(100vh - 120px);
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  box-shadow:
    0 10px 25px -5px rgba(0, 0, 0, 0.1),
    0 8px 10px -6px rgba(0, 0, 0, 0.1);
}

.chat-header {
  background-color: #033126;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chat-header h3 {
  margin: 0;
  font-size: 1rem;
  color: white;
}

.close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  opacity: 0.7;
}
.close-btn:hover {
  opacity: 1;
}

.messages-container {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  background-color: #f8fafc;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.message-bubble {
  padding: 0.75rem 1rem;
  border-radius: 12px;
  max-width: 85%;
  word-wrap: break-word;
  font-size: 0.9rem;
  line-height: 1.4;
}

.message-bubble.user {
  background-color: #033126;
  color: white;
  align-self: flex-end;
  border-bottom-right-radius: 2px;
}

.message-bubble.assistant {
  background-color: #ecfdf5;
  color: #033126;
  align-self: flex-start;
  border-bottom-left-radius: 2px;
}

.sender-label {
  display: block;
  font-size: 0.7rem;
  font-weight: bold;
  margin-bottom: 0.25rem;
  opacity: 0.8;
}

.text-content :deep(p) {
  margin: 0 0 0.5rem 0;
}
.text-content :deep(p:last-child) {
  margin-bottom: 0;
}

.text-content :deep(ul), .text-content :deep(ol) {
  margin: 0.5rem 0;
  padding-left: 1.25rem;
}

.text-content :deep(li) {
  margin-bottom: 0.35rem;
}

.text-content :deep(strong) {
  font-weight: 700;
}

.error-banner {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  background-color: #fff1f2;
  border: 1px solid #ffe4e6;
  color: #9f1239;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-size: 0.85rem;
  line-height: 1.4;
  align-self: stretch;
}

.error-icon {
  width: 20px;
  height: 20px;
  color: #e11d48;
  flex-shrink: 0;
  margin-top: 2px;
}

.error-text strong {
  display: block;
  margin-bottom: 0.15rem;
}

.error-text p {
  margin: 0;
  opacity: 0.9;
}

.input-form {
  display: flex;
  border-top: 1px solid #e2e8f0;
  padding: 0.5rem;
  background: white;
}

.input-form input {
  flex: 1;
  border: none;
  padding: 0.5rem 0.75rem;
  outline: none;
  font-size: 0.9rem;
}

.input-form input:disabled {
  opacity: 0.6;
}

.input-form button {
  background-color: #033126;
  color: white;
  border: none;
  padding: 0 1.25rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
}

.input-form button:hover {
  background-color: #022a1d;
}

.input-form button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.chat-toggle-btn {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: #033126;
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 14px rgba(3, 49, 38, 0.25);
  transition:
    transform 0.2s ease,
    background-color 0.2s ease;
}

.chat-toggle-btn:hover {
  transform: scale(1.05);
  background-color: #022a1d;
}

.btn-active {
  background-color: #0f766e;
  box-shadow: 0 4px 14px rgba(15, 118, 110, 0.25);
}

.icon {
  width: 24px;
  height: 24px;
}
</style>