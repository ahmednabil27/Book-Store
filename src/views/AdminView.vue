<script setup>
import { ref } from "vue";

const stats = ref([]);
const loading = ref(false);
const error = ref("");
const status = ref("Idle");

async function loadDashboard() {
  loading.value = true;
  error.value = "";
  stats.value = [];
  status.value = "Loading…";

  try {
    // Start both requests at the same time
    const [usersRes, postsRes] = await Promise.all([
      fetch("https://jsonplaceholder.typicode.com/users"),
      fetch("https://jsonplaceholder.typicode.com/posts"),
    ]);

    if (!usersRes.ok || !postsRes.ok) {
      throw new Error("One of the requests failed.");
    }

    // Parse both responses at the same time
    const [users, posts] = await Promise.all([
      usersRes.json(),
      postsRes.json(),
    ]);

    const postsPerUser = Math.round(posts.length / users.length);

    stats.value = [
      {
        title: "Users",
        value: users.length,
        note: "Total users",
      },
      {
        title: "Posts",
        value: posts.length,
        note: "Total posts",
      },
      {
        title: "Avg posts/user",
        value: postsPerUser,
        note: "Average posts per user",
      },
    ];

    status.value = "✅ Ready";
  } catch (e) {
    status.value = "❌ Error";
    error.value = `Failed: ${e.message}`;
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="main-wrapper d-flex justify-content-center align-items-center">
    <div class="app">
      <div class="card">
        <h2 class="text-white">
          Parallel Fetch Dashboard
        </h2>

        <p class="text-white">
          Loads users + posts at the same time and shows quick stats.
        </p>

        <div class="roww">
          <button
            @click="loadDashboard"
            :disabled="loading"
          >
            {{ loading ? "Loading..." : "Load Dashboard" }}
          </button>

          <span class="pill text-white">
            {{ status }}
          </span>
        </div>

        <div class="stats">
          <div
            v-for="stat in stats"
            :key="stat.title"
            class="stat"
          >
            <div class="muted">
              {{ stat.title }}
            </div>

            <div class="stat-value">
              {{ stat.value }}
            </div>

            <div class="muted">
              {{ stat.note }}
            </div>
          </div>
        </div>

        <div class="muted text-white-50">
          {{ error }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main-wrapper {
  min-height: 100vh;
  font-family: system-ui;
  padding: 24px;
  background: #0b1020;
  color: #e9eefc;
}

.app {
  width: 80%;
  margin: 0 auto;
}

.card {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  padding: 16px;
}

.roww {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
}

button {
  border: 0;
  border-radius: 12px;
  padding: 10px 14px;
  cursor: pointer;
  background: #4f7cff;
  color: #fff;
  font-weight: 700;
}

.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 12px;
  margin-top: 12px;
}

.stat {
  padding: 14px;
  border-radius: 14px;
  background: rgba(16, 16, 16, 0.18);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.19);
}

.stat-value {
  font-size: 28px;
  font-weight: 800;
  margin-top: 6px;
}

.muted {
  opacity: 0.75;
}

.pill {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.62);
  font-size: 12px;
}
</style>