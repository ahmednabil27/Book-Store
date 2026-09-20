<script setup>
import { computed, onMounted, ref } from "vue";
import { storeToRefs } from "pinia";

import { useBookStore } from "@/stores/bookStore";
import { useAuthorStore } from "@/stores/AuthorStore";

const bookStore = useBookStore();
const authorStore = useAuthorStore();

const { allBooks } = storeToRefs(bookStore);
const { allAuthors } = storeToRefs(authorStore);

const loading = ref(false);
const error = ref("");
const status = ref("Idle");
const lastUpdated = ref(null);


/* ================================
   DASHBOARD STATISTICS
================================ */

const numberOfBooks = computed(() => {
  return allBooks.value.length;
});

const numberOfAuthors = computed(() => {
  return allAuthors.value.length;
});

const average = computed(() => {
  if (numberOfAuthors.value === 0) {
    return 0;
  }

  return Math.round(
    numberOfBooks.value / numberOfAuthors.value
  );
});


/* ================================
   LOAD DASHBOARD
================================ */

async function loadDashboard() {
  loading.value = true;
  error.value = "";
  status.value = "Loading…";

  try {
    /*
     * If your Pinia stores already have fetch actions,
     * use them here.
     *
     * Example:
     * await Promise.all([
     *   bookStore.fetchBooks(),
     *   authorStore.fetchAuthors()
     * ]);
     *
     * For now, the dashboard uses the data already
     * available in the stores.
     */

    await Promise.resolve();

    lastUpdated.value = new Date();

    status.value = "Ready";
  } catch (e) {
    console.error(e);

    status.value = "Error";
    error.value =
      e?.message || "Unable to load dashboard data.";
  } finally {
    loading.value = false;
  }
}


/* ================================
   FORMAT DATE
================================ */

const formattedLastUpdated = computed(() => {
  if (!lastUpdated.value) {
    return "Not loaded yet";
  }

  return lastUpdated.value.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });
});


/* ================================
   INITIAL LOAD
================================ */

onMounted(() => {
  loadDashboard();
});
</script>


<template>
  <main class="admin-page">

    <div class="container py-5">

      <!-- ================================
           HEADER
      ================================= -->

      <header class="dashboard-header">

        <div>
          <span class="dashboard-eyebrow">
            Administration
          </span>

          <h1 class="dashboard-title">
            Dashboard
          </h1>

          <p class="dashboard-description">
            Get an overview of your bookstore's books and authors.
          </p>
        </div>


        <div class="dashboard-actions">

          <!-- Status -->
          <span
            class="status-pill"
            :class="{
              'status-loading': loading,
              'status-ready': !loading && !error,
              'status-error': error
            }"
          >
            <span class="status-dot"></span>

            {{
              loading
                ? "Loading"
                : error
                  ? "Error"
                  : "Ready"
            }}
          </span>


          <!-- Refresh -->
           <RouterLink to="/admin">

             <button
               type="button"
               class="refresh-btn"
               :disabled="loading"
               @click="loadDashboard"
             >
               <span
                 class="refresh-icon"
                 :class="{ spinning: loading }"
               >
                 ↻
               </span>
   
               {{ loading ? "Refreshing..." : "Refresh" }}
             </button>
          </RouterLink>

        </div>

      </header>


      <!-- ================================
           ERROR
      ================================= -->

      <div
        v-if="error"
        class="error-card"
      >
        <div class="error-icon">
          !
        </div>

        <div class="error-content">
          <h3>Unable to load dashboard</h3>
          <p>{{ error }}</p>
        </div>

        <button
          type="button"
          class="retry-btn"
          @click="loadDashboard"
        >
          Try Again
        </button>
      </div>


      <!-- ================================
           STATS
      ================================= -->

      <section class="stats-section">

        <div class="section-heading">
          <div>
            <span class="section-eyebrow">
              Overview
            </span>

            <h2>
              Collection Statistics
            </h2>
          </div>

          <span class="last-updated">
            Updated {{ formattedLastUpdated }}
          </span>
        </div>


        <!-- LOADING SKELETONS -->

        <div
          v-if="loading"
          class="stats-grid"
        >

          <div
            v-for="item in 3"
            :key="item"
            class="stat-card skeleton-card"
          >
            <div class="skeleton skeleton-icon"></div>

            <div class="skeleton skeleton-label"></div>

            <div class="skeleton skeleton-number"></div>

            <div class="skeleton skeleton-note"></div>
          </div>

        </div>


        <!-- ACTUAL STATS -->

        <div
          v-else
          class="stats-grid"
        >

          <!-- BOOKS -->

          <article class="stat-card">

            <div class="stat-top">
              <div class="stat-icon">
                📚
              </div>

              <span class="stat-category">
                Collection
              </span>
            </div>

            <div class="stat-value">
              {{ numberOfBooks }}
            </div>

            <h3 class="stat-title">
              Books
            </h3>

            <p class="stat-note">
              Total books in the collection
            </p>

          </article>


          <!-- AUTHORS -->

          <article class="stat-card">

            <div class="stat-top">
              <div class="stat-icon">
                ✍
              </div>

              <span class="stat-category">
                Community
              </span>
            </div>

            <div class="stat-value">
              {{ numberOfAuthors }}
            </div>

            <h3 class="stat-title">
              Authors
            </h3>

            <p class="stat-note">
              Writers represented in the collection
            </p>

          </article>


          <!-- AVERAGE -->

          <article class="stat-card">

            <div class="stat-top">
              <div class="stat-icon">
                ◈
              </div>

              <span class="stat-category">
                Distribution
              </span>
            </div>

            <div class="stat-value">
              {{ average }}
            </div>

            <h3 class="stat-title">
              Books per Author
            </h3>

            <p class="stat-note">
              Average number of books per author
            </p>

          </article>

        </div>

      </section>


      <!-- ================================
           QUICK OVERVIEW
      ================================= -->

      <section class="quick-section">

        <div class="quick-card">

          <div class="quick-icon">
            ✦
          </div>

          <div class="quick-content">

            <span class="quick-eyebrow">
              Your Collection
            </span>

            <h2>
              Keep your bookstore organized.
            </h2>

            <p>
              Manage your books and authors from the administration area.
              Add new entries, update existing information, or remove
              outdated content.
            </p>

          </div>

        </div>

      </section>

    </div>

  </main>
</template>


<style scoped>

/* ========================================
   PAGE
======================================== */

.admin-page {
  min-height: calc(100vh - 80px);

  background: #f8f4ed;
  color: #202020;

  font-family: "DM Sans", sans-serif;
}


/* ========================================
   HEADER
======================================== */

.dashboard-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  gap: 30px;

  margin-bottom: 45px;

  padding-bottom: 25px;

  border-bottom: 1px solid #e3d9cc;
}

.dashboard-eyebrow,
.section-eyebrow,
.quick-eyebrow {
  display: block;

  margin-bottom: 8px;

  color: #8b5e34;

  font-size: 0.72rem;
  font-weight: 700;

  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.dashboard-title {
  margin: 0;

  color: #202020;

  font-family: "Playfair Display", serif;
  font-size: clamp(2.3rem, 5vw, 3.5rem);
  font-weight: 700;

  line-height: 1.1;
}

.dashboard-description {
  max-width: 550px;

  margin: 12px 0 0;

  color: #716b64;

  font-size: 0.95rem;
  line-height: 1.7;
}


/* ========================================
   HEADER ACTIONS
======================================== */

.dashboard-actions {
  display: flex;
  align-items: center;

  gap: 10px;
}


/* Status */

.status-pill {
  display: inline-flex;
  align-items: center;
  gap: 7px;

  padding: 8px 13px;

  border-radius: 999px;

  font-size: 0.75rem;
  font-weight: 600;

  border: 1px solid #ded5c9;
  background: #fff;

  color: #625c55;
}

.status-dot {
  width: 7px;
  height: 7px;

  border-radius: 50%;

  background: #8b5e34;
}

.status-loading .status-dot {
  animation: statusPulse 1s infinite;
}

.status-error .status-dot {
  background: #b44a3c;
}

@keyframes statusPulse {
  0%,
  100% {
    opacity: 0.35;
  }

  50% {
    opacity: 1;
  }
}


/* Refresh */

.refresh-btn,
.retry-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  gap: 8px;

  border: none;
  border-radius: 10px;

  padding: 9px 15px;

  background: #8b5e34;
  color: #fff;

  font-size: 0.82rem;
  font-weight: 600;

  cursor: pointer;

  transition:
    background 0.25s ease,
    transform 0.25s ease,
    box-shadow 0.25s ease;
}

.refresh-btn:hover:not(:disabled),
.retry-btn:hover {
  background: #704923;

  transform: translateY(-1px);

  box-shadow: 0 5px 15px rgba(139, 94, 52, 0.2);
}

.refresh-btn:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}

.refresh-icon {
  font-size: 1.1rem;
  line-height: 1;
}

.spinning {
  display: inline-block;

  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}


/* ========================================
   ERROR CARD
======================================== */

.error-card {
  display: flex;
  align-items: center;

  gap: 16px;

  margin-bottom: 35px;
  padding: 18px 20px;

  border: 1px solid #e6c7c2;
  border-radius: 14px;

  background: #fff8f7;
}

.error-icon {
  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 38px;
  height: 38px;

  border-radius: 50%;

  background: #f4dcd8;
  color: #a33f34;

  font-weight: 800;
}

.error-content {
  flex: 1;
}

.error-content h3 {
  margin: 0 0 3px;

  color: #63332e;

  font-size: 0.95rem;
  font-weight: 700;
}

.error-content p {
  margin: 0;

  color: #805b56;

  font-size: 0.82rem;
}


/* ========================================
   SECTION HEADING
======================================== */

.stats-section {
  margin-bottom: 45px;
}

.section-heading {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  margin-bottom: 20px;
}

.section-heading h2 {
  margin: 0;

  font-family: "Playfair Display", serif;
  font-size: 1.8rem;
  font-weight: 700;
}

.last-updated {
  color: #8a837b;

  font-size: 0.75rem;
}


/* ========================================
   STAT GRID
======================================== */

.stats-grid {
  display: grid;

  grid-template-columns: repeat(3, 1fr);

  gap: 20px;
}


/* ========================================
   STAT CARD
======================================== */

.stat-card {
  position: relative;

  padding: 25px;

  border: 1px solid #e6ddd2;
  border-radius: 16px;

  background: #fff;

  box-shadow: 0 7px 25px rgba(70, 50, 30, 0.06);

  overflow: hidden;

  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;
}

.stat-card::before {
  content: "";

  position: absolute;

  top: 0;
  left: 0;

  width: 100%;
  height: 3px;

  background: #8b5e34;

  transform: scaleX(0);
  transform-origin: left;

  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-4px);

  box-shadow: 0 12px 35px rgba(70, 50, 30, 0.1);
}

.stat-card:hover::before {
  transform: scaleX(1);
}


.stat-top {
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 20px;
}

.stat-icon {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 45px;
  height: 45px;

  border-radius: 12px;

  background: #f8f4ed;
  color: #8b5e34;

  font-size: 1.25rem;
}

.stat-category {
  color: #a19a92;

  font-size: 0.68rem;
  font-weight: 700;

  letter-spacing: 0.08em;
  text-transform: uppercase;
}


.stat-value {
  color: #8b5e34;

  font-family: "Playfair Display", serif;
  font-size: 2.7rem;
  font-weight: 700;

  line-height: 1;
}

.stat-title {
  margin: 8px 0 5px;

  color: #292521;

  font-family: "Playfair Display", serif;
  font-size: 1.1rem;
  font-weight: 600;
}

.stat-note {
  margin: 0;

  color: #817a72;

  font-size: 0.78rem;
  line-height: 1.5;
}


/* ========================================
   SKELETON LOADING
======================================== */

.skeleton-card {
  min-height: 220px;
}

.skeleton {
  border-radius: 7px;

  background:
    linear-gradient(
      90deg,
      #eee7de 25%,
      #f8f4ed 50%,
      #eee7de 75%
    );

  background-size: 200% 100%;

  animation: skeletonLoading 1.4s infinite;
}

.skeleton-icon {
  width: 45px;
  height: 45px;

  margin-bottom: 20px;

  border-radius: 12px;
}

.skeleton-label {
  width: 80px;
  height: 10px;

  margin-bottom: 14px;
}

.skeleton-number {
  width: 90px;
  height: 42px;

  margin-bottom: 10px;
}

.skeleton-note {
  width: 70%;
  height: 10px;
}

@keyframes skeletonLoading {
  from {
    background-position: 200% 0;
  }

  to {
    background-position: -200% 0;
  }
}


/* ========================================
   QUICK CARD
======================================== */

.quick-section {
  padding-bottom: 40px;
}

.quick-card {
  display: flex;
  align-items: center;

  gap: 25px;

  padding: 30px;

  border: 1px solid #e6ddd2;
  border-radius: 18px;

  background:
    linear-gradient(
      135deg,
      #fff 0%,
      #fbf8f3 100%
    );

  box-shadow: 0 7px 25px rgba(70, 50, 30, 0.05);
}

.quick-icon {
  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 55px;
  height: 55px;

  border-radius: 14px;

  background: #8b5e34;
  color: #fff;

  font-size: 1.4rem;
}

.quick-content {
  max-width: 650px;
}

.quick-content h2 {
  margin: 0;

  color: #292521;

  font-family: "Playfair Display", serif;
  font-size: 1.5rem;
}

.quick-content p {
  margin: 7px 0 0;

  color: #777068;

  font-size: 0.85rem;
  line-height: 1.7;
}


/* ========================================
   RESPONSIVE
======================================== */

@media (max-width: 991px) {
  .dashboard-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .dashboard-actions {
    width: 100%;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .stat-card {
    min-height: auto;
  }
}


@media (max-width: 576px) {
  .admin-page {
    min-height: 100vh;
  }

  .dashboard-header {
    margin-bottom: 30px;
  }

  .dashboard-actions {
    align-items: stretch;
    flex-direction: column;
  }

  .status-pill,
  .refresh-btn {
    justify-content: center;
  }

  .section-heading {
    align-items: flex-start;
    flex-direction: column;

    gap: 8px;
  }

  .section-heading h2 {
    font-size: 1.5rem;
  }

  .stat-card {
    padding: 20px;
  }

  .quick-card {
    align-items: flex-start;
    flex-direction: column;

    padding: 22px;
  }
}

</style>