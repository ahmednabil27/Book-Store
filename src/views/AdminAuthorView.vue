<script setup>
import { computed, onMounted, ref } from "vue";
import { RouterLink } from "vue-router";
import { storeToRefs } from "pinia";

import { useBookStore } from "@/stores/bookStore";
import { useAuthorStore } from "@/stores/AuthorStore";

const authorStore = useAuthorStore();
const bookStore = useBookStore();

const { authorsNumber, allAuthors } = storeToRefs(authorStore);
const { booksNumber, allBooks } = storeToRefs(bookStore);

/* ========================================
   State
======================================== */

const isLoading = ref(true);
const error = ref("");
const searchQuery = ref("");

const avatarStates = ref({});

/* ========================================
   Computed
======================================== */

const filteredAuthors = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();

  if (!query) {
    return allAuthors.value;
  }

  return allAuthors.value.filter(author => {
    return (
      author.name?.toLowerCase().includes(query) ||
      author.bio?.toLowerCase().includes(query)
    );
  });
});

const activeAuthors = computed(() => {
  return allAuthors.value.filter(author => {
    return getAuthorBookCount(author.id) > 0;
  }).length;
});

const eachAuthorBooks = computed(() => {
  const result = {};

  allAuthors.value.forEach(author => {
    result[author.id] = allBooks.value.filter(
      book => Number(book.authorId) === Number(author.id)
    ).length;
  });

  return result;
});

const displayedCountText = computed(() => {
  const count = filteredAuthors.value.length;

  if (searchQuery.value.trim()) {
    return `${count} ${count === 1 ? "author" : "authors"} found`;
  }

  return `${count} ${count === 1 ? "author" : "authors"} found`;
});

/* ========================================
   Helpers
======================================== */

function getAuthorBookCount(authorId) {
  return eachAuthorBooks.value[authorId] || 0;
}

function getInitial(name) {
  return name?.charAt(0)?.toUpperCase() || "?";
}

/* ========================================
   Avatar State
======================================== */

function initializeAvatar(author) {
  if (!avatarStates.value[author.id]) {
    avatarStates.value[author.id] = {
      loading: !!(author.imageUrl || author.avatarUrl),
      error: false
    };
  }
}

function handleAvatarLoad(authorId) {
  if (!avatarStates.value[authorId]) {
    avatarStates.value[authorId] = {};
  }

  avatarStates.value[authorId].loading = false;
  avatarStates.value[authorId].error = false;
}

function handleAvatarError(author, event) {
  const state =
    avatarStates.value[author.id] ||
    (avatarStates.value[author.id] = {});

  /*
   * If imageUrl fails, try avatarUrl as fallback.
   */
  if (
    author.avatarUrl &&
    event.target.src !== author.avatarUrl
  ) {
    state.loading = true;
    state.error = false;
    event.target.src = author.avatarUrl;
    return;
  }

  state.loading = false;
  state.error = true;
}

/* ========================================
   Load Data
======================================== */

async function loadAuthors() {
  isLoading.value = true;
  error.value = "";

  try {
    /*
     * Use the Pinia fetch actions when available.
     * This keeps the component compatible with the
     * store architecture you already have.
     */
    const requests = [];

    if (typeof authorStore.fetchAuthors === "function") {
      requests.push(authorStore.fetchAuthors());
    }

    if (
      typeof bookStore.fetchBooks === "function" &&
      !allBooks.value.length
    ) {
      requests.push(bookStore.fetchBooks());
    }

    if (requests.length > 0) {
      await Promise.all(requests);
    }

    /*
     * Initialize avatar loading states after
     * the authors have been loaded.
     */
    avatarStates.value = {};

    allAuthors.value.forEach(author => {
      initializeAvatar(author);
    });
  } catch (err) {
    console.error(err);
    error.value =
      "Unable to load authors. Please try again.";
  } finally {
    isLoading.value = false;
  }
}

function retryLoad() {
  loadAuthors();
}

/* ========================================
   Lifecycle
======================================== */

onMounted(loadAuthors);
</script>

<template>
  <div class="main-wrapper">
    <div class="container-fluid">

      <!-- =================================
           Loading State
      ================================== -->
      <template v-if="isLoading">

        <!-- Header Skeleton -->
        <div
          class="d-flex flex-column flex-md-row justify-content-between align-items-md-end gap-3 mb-4"
        >
          <div>
            <div class="skeleton skeleton-breadcrumb mb-2"></div>
            <div class="skeleton skeleton-title mb-2"></div>
            <div class="skeleton skeleton-subtitle"></div>
          </div>

          <div class="skeleton skeleton-button"></div>
        </div>

        <!-- Stats Skeleton -->
        <div class="row g-3 mb-4">

          <div
            v-for="index in 3"
            :key="index"
            class="col-12 col-sm-6 col-lg-4"
          >
            <div class="stat-card skeleton-card">
              <div class="skeleton skeleton-stat-label"></div>
              <div class="skeleton skeleton-stat-value"></div>
              <div class="skeleton skeleton-stat-note"></div>
            </div>
          </div>

        </div>

        <!-- Table Skeleton -->
        <div class="authors-card">

          <div
            class="d-flex flex-column flex-lg-row justify-content-between gap-3 mb-4"
          >
            <div>
              <div class="skeleton skeleton-heading mb-2"></div>
              <div class="skeleton skeleton-text"></div>
            </div>

            <div class="skeleton skeleton-search"></div>
          </div>

          <div class="table-responsive">
            <table class="table custom-table mb-0">
              <tbody>

                <tr
                  v-for="index in 5"
                  :key="index"
                >
                  <td>
                    <div class="skeleton skeleton-id"></div>
                  </td>

                  <td>
                    <div class="d-flex align-items-center gap-3">
                      <div class="skeleton skeleton-avatar"></div>

                      <div>
                        <div class="skeleton skeleton-name mb-2"></div>
                        <div class="skeleton skeleton-small"></div>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div class="skeleton skeleton-bio"></div>
                  </td>

                  <td>
                    <div class="skeleton skeleton-books"></div>
                  </td>

                  <td>
                    <div class="d-flex gap-2">
                      <div class="skeleton skeleton-action"></div>
                      <div class="skeleton skeleton-action"></div>
                    </div>
                  </td>
                </tr>

              </tbody>
            </table>
          </div>

        </div>
      </template>

      <!-- =================================
           Error State
      ================================== -->
      <template v-else-if="error">

        <div class="state-card">

          <div class="state-icon">
            !
          </div>

          <h2 class="state-title">
            Unable to load authors
          </h2>

          <p class="text-secondary mb-4">
            {{ error }}
          </p>

          <div
            class="d-flex justify-content-center gap-2 flex-wrap"
          >
            <button
              type="button"
              class="btn btn-primary-custom"
              @click="retryLoad"
            >
              Try Again
            </button>

            <RouterLink
              to="/admin"
              class="btn btn-secondary-custom"
            >
              Back to Dashboard
            </RouterLink>
          </div>

        </div>
      </template>

      <!-- =================================
           Main Content
      ================================== -->
      <template v-else>

        <!-- =================================
             Page Header
        ================================== -->
        <div
          class="d-flex flex-column flex-md-row justify-content-between align-items-md-end gap-3 mb-4"
        >
          <div>

            <div class="breadcrumb-text mb-2">
              Admin
              <span>/</span>
              Authors
            </div>

            <h1 class="page-title mb-1">
              Manage Authors
            </h1>

            <p class="text-secondary mb-0">
              View and manage all authors in your library.
            </p>

          </div>

          <RouterLink
            to="/admin/authors/new"
            class="btn btn-primary-custom"
          >
            + Add New Author
          </RouterLink>

        </div>

        <!-- =================================
             Stats
        ================================== -->
        <div class="row g-3 mb-4">

          <!-- Total Authors -->
          <div class="col-12 col-sm-6 col-lg-4">
            <div class="stat-card h-100">

              <div class="stat-icon">
                ✦
              </div>

              <div class="stat-label">
                Total Authors
              </div>

              <div class="stat-value">
                {{ authorsNumber }}
              </div>

              <div class="stat-note">
                Registered authors
              </div>

            </div>
          </div>

          <!-- Total Books -->
          <div class="col-12 col-sm-6 col-lg-4">
            <div class="stat-card h-100">

              <div class="stat-icon">
                ▤
              </div>

              <div class="stat-label">
                Total Books
              </div>

              <div class="stat-value">
                {{ booksNumber }}
              </div>

              <div class="stat-note">
                Across all authors
              </div>

            </div>
          </div>

          <!-- Active Authors -->
          <div class="col-12 col-lg-4">
            <div class="stat-card h-100">

              <div class="stat-icon">
                ●
              </div>

              <div class="stat-label">
                Active Authors
              </div>

              <div class="stat-value">
                {{ activeAuthors }}
              </div>

              <div class="stat-note">
                Authors with published books
              </div>

            </div>
          </div>

        </div>

        <!-- =================================
             Authors Card
        ================================== -->
        <div class="authors-card">

          <!-- Table Header -->
          <div
            class="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3 mb-4"
          >

            <div>
              <h2 class="section-title mb-1">
                All Authors
              </h2>

              <p class="text-secondary small mb-0">
                {{ displayedCountText }}
              </p>
            </div>

            <!-- Search -->
            <div class="search-box">

              <span class="search-icon">
                ⌕
              </span>

              <input
                v-model="searchQuery"
                type="search"
                class="form-control custom-input"
                placeholder="Search authors..."
                aria-label="Search authors"
              />

              <button
                v-if="searchQuery"
                type="button"
                class="clear-search"
                aria-label="Clear search"
                @click="searchQuery = ''"
              >
                ×
              </button>

            </div>

          </div>

          <!-- =================================
               Empty State
          ================================== -->
          <div
            v-if="filteredAuthors.length === 0"
            class="empty-state"
          >

            <div class="empty-icon">
              ♡
            </div>

            <h3 class="empty-title">
              {{
                searchQuery
                  ? "No authors found"
                  : "No authors yet"
              }}
            </h3>

            <p class="text-secondary mb-3">
              {{
                searchQuery
                  ? "Try changing your search term."
                  : "Start building your author library."
              }}
            </p>

            <button
              v-if="searchQuery"
              type="button"
              class="btn btn-secondary-custom"
              @click="searchQuery = ''"
            >
              Clear Search
            </button>

            <RouterLink
              v-else
              to="/admin/authors/new"
              class="btn btn-primary-custom"
            >
              + Add First Author
            </RouterLink>

          </div>

          <!-- =================================
               Responsive Table
          ================================== -->
          <div
            v-else
            class="table-responsive"
          >

            <table
              class="table custom-table align-middle mb-0"
            >

              <thead>
                <tr>
                  <th>#</th>
                  <th>Author</th>
                  <th>Bio</th>
                  <th>Books</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>

                <tr
                  v-for="author in filteredAuthors"
                  :key="author.id"
                >

                  <!-- ID -->
                  <td>
                    <span class="author-id">
                      #{{ author.id }}
                    </span>
                  </td>

                  <!-- Author -->
                  <td>
                    <div
                      class="d-flex align-items-center gap-3"
                    >

                      <!-- Avatar -->
                      <div class="avatar-wrapper">

                        <div
                          v-if="
                            avatarStates[author.id]?.loading
                          "
                          class="avatar-loading"
                        >
                          <span
                            class="spinner-border spinner-border-sm"
                          ></span>
                        </div>

                        <img
                          v-if="
                            (author.imageUrl ||
                              author.avatarUrl) &&
                            !avatarStates[author.id]?.error
                          "
                          :src="
                            author.imageUrl ||
                            author.avatarUrl
                          "
                          :alt="author.name"
                          class="author-avatar-image"
                          @load="
                            handleAvatarLoad(author.id)
                          "
                          @error="
                            handleAvatarError(
                              author,
                              $event
                            )
                          "
                        />

                        <div
                          v-else
                          class="author-avatar"
                        >
                          {{ getInitial(author.name) }}
                        </div>

                      </div>

                      <div>
                        <div class="author-name">
                          {{ author.name }}
                        </div>

                        <small class="author-meta">
                          Author ID: {{ author.id }}
                        </small>
                      </div>

                    </div>
                  </td>

                  <!-- Bio -->
                  <td>
                    <div class="bio-text">
                      {{ author.bio || "No biography available." }}
                    </div>
                  </td>

                  <!-- Books -->
                  <td>
                    <span class="books-badge">
                      {{ getAuthorBookCount(author.id) }}
                      {{
                        getAuthorBookCount(author.id) === 1
                          ? "book"
                          : "books"
                      }}
                    </span>
                  </td>

                  <!-- Actions -->
                  <td>
                    <div class="action-buttons">

                      <RouterLink
                        :to="`/admin/authors/${author.id}/edit`"
                        class="btn btn-sm btn-action"
                      >
                        Edit
                      </RouterLink>

                      <button
                        type="button"
                        class="btn btn-sm btn-delete"
                      >
                        Delete
                      </button>

                    </div>
                  </td>

                </tr>

              </tbody>
            </table>

          </div>

          <!-- Footer -->
          <div
            class="authors-footer d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-2 mt-4 pt-3"
          >

            <small class="text-secondary">
              Showing {{ filteredAuthors.length }}
              of {{ allAuthors.length }} authors
            </small>

            <span class="badge-custom">
              Authors
            </span>

          </div>

        </div>

      </template>

    </div>
  </div>
</template>

<style scoped>
/* ========================================
   Page
======================================== */

.main-wrapper {
  min-height: 100vh;
  padding: 28px 24px;
  background: #f8f4ed;
  color: #202020;
}

.page-title {
  font-family: "Playfair Display", serif;
  font-size: clamp(2rem, 4vw, 2.7rem);
  font-weight: 700;
  color: #2b2118;
}

.breadcrumb-text {
  font-size: 13px;
  color: #8f857b;
}

.breadcrumb-text span {
  margin: 0 6px;
  color: #b9aea3;
}

/* ========================================
   Buttons
======================================== */

.btn {
  border-radius: 9px;
  font-weight: 600;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    background 0.2s ease;
}

.btn:not(:disabled):hover {
  transform: translateY(-1px);
}

.btn-primary-custom {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  min-height: 42px;
  padding: 8px 17px;

  background: #8b5e34;
  border: 1px solid #8b5e34;
  color: #fff;

  text-decoration: none;
}

.btn-primary-custom:hover {
  background: #754d2a;
  border-color: #754d2a;
  color: #fff;

  box-shadow: 0 6px 16px rgba(139, 94, 52, 0.18);
}

.btn-secondary-custom {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  min-height: 42px;
  padding: 8px 17px;

  background: #fff;
  border: 1px solid #d9cec1;
  color: #62452e;

  text-decoration: none;
}

.btn-secondary-custom:hover {
  background: #f6f0e9;
  border-color: #cbbbaa;
  color: #533820;
}

/* ========================================
   Stats
======================================== */

.stat-card {
  position: relative;

  padding: 20px;

  background: #fff;
  border: 1px solid #e9e2d8;
  border-radius: 16px;

  box-shadow: 0 8px 25px rgba(76, 54, 32, 0.06);

  overflow: hidden;

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 30px rgba(76, 54, 32, 0.09);
}

.stat-icon {
  position: absolute;
  top: 17px;
  right: 18px;

  width: 35px;
  height: 35px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 10px;

  background: #f4ebe1;
  color: #8b5e34;

  font-size: 16px;
  font-weight: 700;
}

.stat-label {
  color: #857a70;
  font-size: 13px;
}

.stat-value {
  margin-top: 5px;

  color: #2f251d;

  font-family: "Playfair Display", serif;
  font-size: 32px;
  font-weight: 700;
}

.stat-note {
  margin-top: 2px;

  color: #a1988f;
  font-size: 12px;
}

/* ========================================
   Main Card
======================================== */

.authors-card {
  padding: 26px;

  background: #fff;
  border: 1px solid #e9e2d8;
  border-radius: 18px;

  box-shadow: 0 12px 35px rgba(76, 54, 32, 0.07);
}

.section-title {
  font-family: "Playfair Display", serif;
  color: #33271d;
  font-size: 1.3rem;
  font-weight: 700;
}

/* ========================================
   Search
======================================== */

.search-box {
  position: relative;
  width: 290px;
}

.search-icon {
  position: absolute;
  left: 13px;
  top: 50%;

  z-index: 2;

  transform: translateY(-50%);

  color: #9a8f85;
  font-size: 20px;
  line-height: 1;
  pointer-events: none;
}

.search-box input {
  padding-left: 40px;
  padding-right: 38px;
}

.clear-search {
  position: absolute;
  right: 9px;
  top: 50%;

  width: 25px;
  height: 25px;

  transform: translateY(-50%);

  display: flex;
  align-items: center;
  justify-content: center;

  border: 0;
  border-radius: 50%;

  background: #f0e9e1;
  color: #76502f;

  font-size: 16px;
  line-height: 1;

  cursor: pointer;
}

.clear-search:hover {
  background: #e7dbcd;
}

/* ========================================
   Input
======================================== */

.custom-input {
  min-height: 44px;

  background: #fff;
  border: 1px solid #ded4c8;
  border-radius: 10px;

  color: #302820;

  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.custom-input::placeholder {
  color: #aaa096;
}

.custom-input:focus {
  background: #fff;
  color: #302820;

  border-color: #8b5e34;

  box-shadow:
    0 0 0 3px rgba(139, 94, 52, 0.12);
}

/* ========================================
   Table
======================================== */

.custom-table {
  color: #302820;

  --bs-table-bg: transparent;
  --bs-table-color: #302820;
  --bs-table-border-color: #eee7de;
}

.custom-table thead th {
  padding: 14px 12px;

  color: #897e74;

  border-bottom: 1px solid #e9e2d8;

  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;

  white-space: nowrap;
}

.custom-table tbody td {
  padding: 17px 12px;

  border-bottom: 1px solid #f0ebe5;
}

.custom-table tbody tr {
  transition: background 0.2s ease;
}

.custom-table tbody tr:hover {
  background: #fcfaf7;
}

.custom-table tbody tr:last-child td {
  border-bottom: 0;
}

/* ========================================
   Author
======================================== */

.author-id {
  color: #9a9086;
  font-size: 12px;
}

.author-name {
  color: #33271d;
  font-weight: 600;
}

.author-meta {
  color: #9b9187;
  font-size: 11px;
}

.avatar-wrapper {
  position: relative;

  width: 44px;
  height: 44px;

  flex-shrink: 0;
}

.author-avatar-image,
.author-avatar {
  width: 44px;
  height: 44px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  object-fit: cover;
}

.author-avatar {
  background:
    linear-gradient(
      135deg,
      #eadbc9,
      #f6eee5
    );

  border: 1px solid #ddcdbb;

  color: #79512f;

  font-size: 16px;
  font-weight: 700;
}

.avatar-loading {
  position: absolute;
  inset: 0;

  z-index: 2;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  background: rgba(248, 244, 237, 0.9);
  color: #8b5e34;
}

/* ========================================
   Bio
======================================== */

.bio-text {
  max-width: 400px;

  color: #776e66;

  font-size: 13px;
  line-height: 1.55;

  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;

  overflow: hidden;
}

/* ========================================
   Books Badge
======================================== */

.books-badge {
  display: inline-block;

  padding: 6px 11px;

  border-radius: 999px;

  background: #f3ebe2;
  border: 1px solid #e3d4c4;

  color: #76502f;

  font-size: 12px;
  font-weight: 600;

  white-space: nowrap;
}

/* ========================================
   Actions
======================================== */

.action-buttons {
  display: flex;
  gap: 7px;
  flex-wrap: wrap;
}

.btn-action {
  background: #f4eee7;
  border: 1px solid #dfd1c2;
  color: #76502f;

  text-decoration: none;
}

.btn-action:hover {
  background: #e9ddcf;
  border-color: #ccb9a4;
  color: #5d3d24;
}

.btn-delete {
  background: #fbefec;
  border: 1px solid #ead0c9;
  color: #9b4e3e;
}

.btn-delete:hover {
  background: #f5dfda;
  border-color: #dfb8ae;
  color: #813c30;
}

/* ========================================
   Footer
======================================== */

.authors-footer {
  border-top: 1px solid #eee7de;
}

.badge-custom {
  padding: 6px 12px;

  border-radius: 999px;

  background: #f4eee6;
  border: 1px solid #e3d7c9;

  color: #76502f;

  font-size: 12px;
  font-weight: 600;
}

/* ========================================
   Empty State
======================================== */

.empty-state {
  padding: 55px 20px;

  text-align: center;

  border: 1px dashed #ddcfc0;
  border-radius: 14px;

  background: #fcfaf7;
}

.empty-icon {
  width: 55px;
  height: 55px;

  margin: 0 auto 15px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  background: #f3e9de;
  color: #8b5e34;

  font-size: 22px;
}

.empty-title {
  margin-bottom: 6px;

  font-family: "Playfair Display", serif;
  color: #33271d;
}

/* ========================================
   Error State
======================================== */

.state-card {
  max-width: 600px;

  margin: 60px auto;
  padding: 45px 30px;

  text-align: center;

  background: #fff;
  border: 1px solid #e9e2d8;
  border-radius: 18px;

  box-shadow: 0 12px 35px rgba(76, 54, 32, 0.08);
}

.state-icon {
  width: 55px;
  height: 55px;

  margin: 0 auto 18px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  background: #fbefec;
  color: #a34b35;

  font-size: 24px;
  font-weight: 700;
}

.state-title {
  margin-bottom: 8px;

  font-family: "Playfair Display", serif;
  color: #33271d;
}

/* ========================================
   Skeleton Loading
======================================== */

.skeleton {
  position: relative;

  overflow: hidden;

  border-radius: 7px;

  background: #ebe5dd;
}

.skeleton::after {
  content: "";

  position: absolute;
  inset: 0;

  transform: translateX(-100%);

  background:
    linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.65),
      transparent
    );

  animation: skeleton-shimmer 1.5s infinite;
}

@keyframes skeleton-shimmer {
  100% {
    transform: translateX(100%);
  }
}

.skeleton-breadcrumb {
  width: 150px;
  height: 13px;
}

.skeleton-title {
  width: 245px;
  height: 40px;
}

.skeleton-subtitle {
  width: 300px;
  height: 15px;
}

.skeleton-button {
  width: 145px;
  height: 42px;

  border-radius: 9px;
}

.skeleton-card {
  min-height: 130px;
}

.skeleton-stat-label {
  width: 100px;
  height: 13px;
}

.skeleton-stat-value {
  width: 60px;
  height: 35px;

  margin-top: 8px;
}

.skeleton-stat-note {
  width: 130px;
  height: 11px;

  margin-top: 7px;
}

.skeleton-heading {
  width: 130px;
  height: 22px;
}

.skeleton-text {
  width: 180px;
  height: 12px;
}

.skeleton-search {
  width: 290px;
  height: 44px;

  border-radius: 10px;
}

.skeleton-id {
  width: 35px;
  height: 13px;
}

.skeleton-avatar {
  width: 44px;
  height: 44px;

  border-radius: 50%;
}

.skeleton-name {
  width: 110px;
  height: 14px;
}

.skeleton-small {
  width: 80px;
  height: 10px;
}

.skeleton-bio {
  width: 260px;
  height: 35px;
}

.skeleton-books {
  width: 70px;
  height: 27px;

  border-radius: 999px;
}

.skeleton-action {
  width: 45px;
  height: 31px;

  border-radius: 7px;
}

/* ========================================
   Responsive
======================================== */

@media (max-width: 992px) {
  .search-box {
    width: 100%;
  }

  .bio-text {
    max-width: 300px;
  }
}

@media (max-width: 768px) {
  .main-wrapper {
    padding: 22px 16px;
  }

  .authors-card {
    padding: 20px;
  }

  .custom-table {
    min-width: 850px;
  }
}

@media (max-width: 576px) {
  .main-wrapper {
    padding: 16px 12px;
  }

  .authors-card {
    padding: 17px;
    border-radius: 14px;
  }

  .page-title {
    font-size: 2rem;
  }

  .stat-card {
    padding: 17px;
  }

  .state-card {
    margin: 35px auto;
    padding: 35px 20px;
  }
}
</style>