<script setup>
import { ref, nextTick, computed } from "vue";

const props = defineProps(['book', 'author']);


const author = computed(()=>{
    return props.author?.name || 'Mark Twien';
});

const book = computed(()=>{
    return props.book?.title || '';
});

const tag = computed(()=>{
    return props.book?.tags[0] || '';
})
// ---------------------------------------
// OpenRouter configuration
// ---------------------------------------

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

const MODEL = "openrouter/free";

// ---------------------------------------
// Chat state
// ---------------------------------------

const isOpen = ref(false);
const message = ref("");
const isTyping = ref(false);

const chatBody = ref(null);

// ---------------------------------------
// Conversation history
// ---------------------------------------

const conversation = ref([
  {
    role: "assistant",
    content:
      "Hi! 👋 I'm your Bookstore Assistant. Ask me anything about books or authors!",
  },
]);

// ---------------------------------------
// Suggested questions
// ---------------------------------------

let msg2 = ``;
if(props.book){
  msg2 = `What makes a good book?`;
}
// this is mine. the main issue here is that we lose the reactive dependency.
// const suggestedQuestions = ref([
//   `Tell me about ${book.value || "what the best science-fiction novel is"}`,
//   `Who is ${author.value}?`,
//   `Recommend a ${tag.value|| 'science-fiction'} book`,
//   msg2
// ]);


// this is chatgpt's one.
// computed is the best here. as it's derieved from other states.
const suggestedQuestions = computed(() => {
  const questions = [
    `Tell me about ${
      book.value || "what the best science-fiction novel is"
    }`,

    `Who is ${author.value}?`,

    `Recommend a ${
      tag.value || "science-fiction"
    } book`,
  ];

  if (props.book) {
    questions.push("What makes a good book?");
  }

  return questions;
});


// ---------------------------------------
// System instruction
// ---------------------------------------

const systemInstruction = `
You are the AI assistant for a bookstore website.

Your name is Bookstore Assistant.

Your job is to help users with questions about:

- Books
- Authors
- Book genres
- Book recommendations
- Book summaries
- Themes and characters
- General literature questions

Be friendly, concise, and helpful.

If the user asks about a book or author that you don't know,
be honest and say that you don't have enough information.

Do not invent specific facts about books or authors.

When recommending books, briefly explain why you recommend them.

Keep answers suitable for a bookstore website.
`;

// ---------------------------------------
// Open / close chatbot
// ---------------------------------------

function toggleChat() {
  isOpen.value = !isOpen.value;
}

// ---------------------------------------
// Add message to conversation
// ---------------------------------------

function addMessage(role, content) {
  conversation.value.push({
    role,
    content,
  });
}

// ---------------------------------------
// Send message to OpenRouter
// ---------------------------------------

async function sendMessage(text = message.value) {
  const userMessage = text.trim();

  // Prevent empty messages
  // or multiple requests at the same time
  if (!userMessage || isTyping.value) {
    return;
  }

  // Add user's message
  addMessage("user", userMessage);

  // Clear input
  message.value = "";

  await scrollToBottom();

  // Show typing indicator
  isTyping.value = true;

  try {
    const response = await fetch(OPENROUTER_API_URL, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${OPENROUTER_API_KEY}`,

        // Optional OpenRouter metadata
        "HTTP-Referer": window.location.origin,
        "X-Title": "Bookstore AI Assistant",
      },

      body: JSON.stringify({
        model: MODEL,

        messages: [
          {
            role: "system",
            content: systemInstruction,
          },

          // Send previous conversation
          ...conversation.value,
        ],
      }),
    });

    // ---------------------------------------
    // Handle HTTP errors
    // ---------------------------------------

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);

      console.error("OpenRouter API error:", errorData);

      if (response.status === 429) {
        throw new Error("RATE_LIMIT");
      }

      if (response.status === 401) {
        throw new Error("INVALID_API_KEY");
      }

      if (response.status === 402) {
        throw new Error("INSUFFICIENT_CREDITS");
      }

      throw new Error("API_ERROR");
    }

    // ---------------------------------------
    // Parse response
    // ---------------------------------------

    const data = await response.json();

    console.log("OpenRouter response:", data);

    const aiResponse = data?.choices?.[0]?.message?.content;

    if (!aiResponse) {
      throw new Error("EMPTY_RESPONSE");
    }

    // ---------------------------------------
    // Add AI response to conversation
    // ---------------------------------------

    addMessage("assistant", aiResponse);
  } catch (error) {
    console.error("OpenRouter error:", error);

    // ---------------------------------------
    // User-friendly errors
    // ---------------------------------------

    let errorMessage = "Sorry, something went wrong while contacting the AI.";

    if (error.message === "RATE_LIMIT") {
      errorMessage =
        "⏳ The AI service is temporarily rate-limited. Please try again in a little while.";
    } else if (error.message === "INVALID_API_KEY") {
      errorMessage = "🔑 There is a problem with the OpenRouter API key.";
    } else if (error.message === "INSUFFICIENT_CREDITS") {
      errorMessage =
        "💳 The OpenRouter account doesn't have enough available credits for this request.";
    } else if (error.message === "EMPTY_RESPONSE") {
      errorMessage =
        "🤖 The AI didn't return an answer. Please try asking again.";
    }

    addMessage("assistant", errorMessage);
  } finally {
    isTyping.value = false;

    await scrollToBottom();
  }
}

// ---------------------------------------
// Scroll chat to bottom
// ---------------------------------------

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
            AI Assistant
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
    <!-- Messages -->
    <div ref="chatBody" class="chat-body">
      <div
        v-for="(msg, index) in conversation"
        :key="index"
        class="message-wrapper"
        :class="msg.role === 'user' ? 'user-wrapper' : 'assistant-wrapper'"
      >
        <div
          class="message"
          :class="msg.role === 'user' ? 'user-message' : 'assistant-message'"
        >
          {{ msg.content }}
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
        :disabled="isTyping"
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
        :disabled="isTyping"
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

  width: 360px;
  height: 500px;

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

  white-space: pre-wrap;
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

/* Typing */

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
