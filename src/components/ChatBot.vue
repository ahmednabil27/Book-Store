```vue
<script setup>
import { ref, nextTick } from "vue";

const isOpen = ref(false);
const message = ref("");
const isTyping = ref(false);

const messages = ref([
  {
    id: 1,
    role: "assistant",
    text: "Hi! 👋 I'm your Bookstore Assistant. Ask me anything about books or authors!"
  }
]);

const suggestedQuestions = [
  "Tell me about this book",
  "Who is the author?",
  "What books do you recommend?",
  "What is this book about?"
];

const chatBody = ref(null);

function toggleChat() {
  isOpen.value = !isOpen.value;
}

function addMessage(role, text) {
  messages.value.push({
    id: Date.now(),
    role,
    text
  });
}

async function sendMessage(text = message.value) {
  const userMessage = text.trim();

  if (!userMessage || isTyping.value) return;

  addMessage("user", userMessage);
  message.value = "";

  await scrollToBottom();

  // Temporary fake response
  isTyping.value = true;

  setTimeout(async () => {
    addMessage(
      "assistant",
      "That's a great question! 🤖 I'll be able to answer questions about books and authors once the AI API is connected."
    );

    isTyping.value = false;

    await scrollToBottom();
  }, 1000);
}

async function scrollToBottom() {
  await nextTick();

  if (chatBody.value) {
    chatBody.value.scrollTop = chatBody.value.scrollHeight;
  }
}
</script>

<template>
  <!-- Floating Chat Button -->
  <button
    v-if="!isOpen"
    class="chat-toggle btn rounded-circle shadow"
    @click="toggleChat"
    aria-label="Open bookstore assistant"
  >
    <i class="bi bi-chat-dots-fill"></i>
  </button>

  <!-- Chat Window -->
  <div v-if="isOpen" class="chat-window shadow-lg">

    <!-- Header -->
    <div class="chat-header">
      <div class="d-flex align-items-center gap-2">
        <div class="bot-avatar">
          <i class="bi bi-robot"></i>
        </div>

        <div>
          <h6 class="mb-0 fw-bold">Bookstore Assistant</h6>
          <small class="text-white-50">
            <span class="online-dot"></span>
            Online
          </small>
        </div>
      </div>

      <button
        class="btn btn-sm text-white"
        @click="toggleChat"
        aria-label="Close chat"
      >
        <i class="bi bi-x-lg"></i>
      </button>
    </div>

    <!-- Messages -->
    <div ref="chatBody" class="chat-body">

      <div
        v-for="msg in messages"
        :key="msg.id"
        class="message-wrapper"
        :class="msg.role === 'user' ? 'user-wrapper' : 'assistant-wrapper'"
      >
        <div
          class="message"
          :class="msg.role === 'user' ? 'user-message' : 'assistant-message'"
        >
          {{ msg.text }}
        </div>
      </div>

      <!-- Typing indicator -->
      <div v-if="isTyping" class="message-wrapper assistant-wrapper">
        <div class="message assistant-message typing">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

    </div>

    <!-- Suggestions -->
    <div class="suggestions">
      <button
        v-for="question in suggestedQuestions"
        :key="question"
        class="btn btn-sm btn-outline-secondary suggestion-btn"
        @click="sendMessage(question)"
      >
        {{ question }}
      </button>
    </div>

    <!-- Input -->
    <div class="chat-input">
      <input
        v-model="message"
        type="text"
        class="form-control"
        placeholder="Ask about a book or author..."
        @keyup.enter="sendMessage()"
      />

      <button
        class="btn btn-primary send-btn"
        :disabled="!message.trim() || isTyping"
        @click="sendMessage()"
      >
        <i class="bi bi-send-fill"></i>
      </button>
    </div>

  </div>
</template>

<style scoped>
.chat-toggle {
  position: fixed;
  right: 25px;
  bottom: 25px;

  width: 60px;
  height: 60px;

  background-color: #212529;
  color: white;

  font-size: 1.4rem;

  z-index: 1050;

  transition: all 0.2s ease;
}

.chat-toggle:hover {
  transform: scale(1.08);
  background-color: #343a40;
}

/* Chat Window */

.chat-window {
  position: fixed;

  right: 25px;
  bottom: 25px;

  width: 380px;
  height: 600px;

  background: white;

  border-radius: 16px;
  overflow: hidden;

  z-index: 1050;

  display: flex;
  flex-direction: column;
}

/* Header */

.chat-header {
  background: #212529;
  color: white;

  padding: 15px;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

.bot-avatar {
  width: 38px;
  height: 38px;

  border-radius: 50%;

  background: white;
  color: #212529;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 1.1rem;
}

.online-dot {
  display: inline-block;

  width: 7px;
  height: 7px;

  background: #20c997;

  border-radius: 50%;

  margin-right: 4px;
}

/* Messages */

.chat-body {
  flex: 1;

  overflow-y: auto;

  padding: 15px;

  background: #f8f9fa;
}

.message-wrapper {
  display: flex;

  margin-bottom: 12px;
}

.assistant-wrapper {
  justify-content: flex-start;
}

.user-wrapper {
  justify-content: flex-end;
}

.message {
  max-width: 80%;

  padding: 10px 14px;

  border-radius: 14px;

  font-size: 0.9rem;

  line-height: 1.5;
}

.assistant-message {
  background: white;

  color: #212529;

  border: 1px solid #dee2e6;

  border-bottom-left-radius: 4px;
}

.user-message {
  background: #212529;

  color: white;

  border-bottom-right-radius: 4px;
}

/* Typing indicator */

.typing {
  display: flex;
  gap: 4px;
  align-items: center;
}

.typing span {
  width: 6px;
  height: 6px;

  background: #6c757d;

  border-radius: 50%;

  animation: typing 1.2s infinite;
}

.typing span:nth-child(2) {
  animation-delay: 0.2s;
}

.typing span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes typing {
  0%,
  60%,
  100% {
    opacity: 0.3;
    transform: translateY(0);
  }

  30% {
    opacity: 1;
    transform: translateY(-3px);
  }
}

/* Suggestions */

.suggestions {
  padding: 8px 12px;

  display: flex;
  gap: 6px;

  overflow-x: auto;

  border-top: 1px solid #dee2e6;

  background: white;
}

.suggestion-btn {
  white-space: nowrap;

  font-size: 0.75rem;

  border-radius: 20px;
}

/* Input */

.chat-input {
  display: flex;

  gap: 8px;

  padding: 12px;

  border-top: 1px solid #dee2e6;

  background: white;
}

.chat-input input {
  border-radius: 20px;
}

.send-btn {
  width: 42px;
  height: 38px;

  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;
}

/* Mobile */

@media (max-width: 576px) {
  .chat-window {
    right: 10px;
    bottom: 10px;

    width: calc(100% - 20px);
    height: calc(100vh - 80px);
  }

  .chat-toggle {
    right: 15px;
    bottom: 15px;
  }
}
</style>

