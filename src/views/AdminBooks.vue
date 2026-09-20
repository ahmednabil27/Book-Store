<script setup>
import { computed, onMounted, ref } from "vue";
import { storeToRefs } from "pinia";

import { useBookStore } from "@/stores/bookStore";
import { useAuthorStore } from "@/stores/AuthorStore";


/* ========================================
   STORES
======================================== */

const bookStore = useBookStore();
const authorStore = useAuthorStore();

const { allBooks } = storeToRefs(bookStore);
const { authorsNumber } = storeToRefs(authorStore);


/* ========================================
   STATE
======================================== */

const searchQuery = ref("");
const loading = ref(false);
const error = ref("");

const coverStates = ref({});


/* ========================================
   FILTERED BOOKS
======================================== */

const filteredBooks = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();

  if (!query) {
    return allBooks.value;
  }

  return allBooks.value.filter((book) => {
    const title = book.title?.toLowerCase() || "";

    const author = getAuthorName(book.authorId)
      .toLowerCase();

    const tags = book.tags
      ?.join(" ")
      .toLowerCase() || "";

    return (
      title.includes(query) ||
      author.includes(query) ||
      tags.includes(query)
    );
  });
});


/* ========================================
   AUTHOR
======================================== */

function getAuthorName(authorId) {
  const author = authorStore.getAuthorById(authorId);

  return author?.name || "Unknown Author";
}


/* ========================================
   LOAD BOOKS
======================================== */

async function loadBooks() {
  loading.value = true;
  error.value = "";

  try {
    /*
     * If your Pinia store already contains
     * a fetchBooks() action, use it here.
     *
     * Example:
     *
     * await bookStore.fetchBooks();
     *
     * If the store is already populated by the
     * application, this still gives us a proper
     * loading state.
     */

    await Promise.resolve();

  } catch (err) {
    console.error(err);

    error.value =
      err?.message || "Unable to load books.";

  } finally {
    loading.value = false;
  }
}


/* ========================================
   COVER IMAGE STATE
======================================== */

function isCoverLoading(book) {
  return coverStates.value[book.id]?.loading ?? false;
}

function isCoverError(book) {
  return coverStates.value[book.id]?.error ?? false;
}

function handleCoverLoad(book) {
  coverStates.value[book.id] = {
    loading: false,
    error: false
  };
}

function handleCoverError(book) {
  coverStates.value[book.id] = {
    loading: false,
    error: true
  };
}


/* ========================================
   INITIALIZE COVER STATES
======================================== */

function initializeCoverStates() {
  allBooks.value.forEach((book) => {
    if (coverStates.value[book.id]) {
      return;
    }

    coverStates.value[book.id] = {
      loading: !!book.coverUrl,
      error: false
    };
  });
}


/* ========================================
   LIFECYCLE
======================================== */

onMounted(async () => {
  await loadBooks();

  initializeCoverStates();
});
</script>


<template>
  <main class="admin-books-page">

    <div class="container py-5">

      <!-- =================================
           PAGE HEADER
      ================================== -->

      <header class="page-header">

        <div>
          <div class="breadcrumb">
            <RouterLink to="/admin">
              Admin
            </RouterLink>

            <span>/</span>

            <span>Books</span>
          </div>

          <span class="page-eyebrow">
            Library Management
          </span>

          <h1 class="page-title">
            Manage Books
          </h1>

          <p class="page-description">
            Manage the books in your library, update their information,
            or add new titles to your collection.
          </p>
        </div>


        <RouterLink
          to="/admin/books/new"
          class="add-book-btn"
        >
          <span class="add-icon">+</span>
          Add New Book
        </RouterLink>

      </header>


      <!-- =================================
           ERROR
      ================================== -->

      <div
        v-if="error"
        class="error-card"
      >
        <div class="error-icon">
          !
        </div>

        <div class="error-content">
          <h3>Unable to load books</h3>
          <p>{{ error }}</p>
        </div>

        <button
          type="button"
          class="retry-btn"
          @click="loadBooks"
        >
          Try Again
        </button>
      </div>


      <!-- =================================
           STATISTICS
      ================================== -->

      <section class="stats-grid">

        <!-- Books -->

        <article class="stat-card">

          <div class="stat-icon">
            📚
          </div>

          <div class="stat-content">
            <span class="stat-label">
              Total Books
            </span>

            <strong class="stat-value">
              {{ allBooks.length }}
            </strong>

            <span class="stat-note">
              Books in library
            </span>
          </div>

        </article>


        <!-- Authors -->

        <article class="stat-card">

          <div class="stat-icon">
            ✍
          </div>

          <div class="stat-content">
            <span class="stat-label">
              Authors
            </span>

            <strong class="stat-value">
              {{ authorsNumber }}
            </strong>

            <span class="stat-note">
              Book authors
            </span>
          </div>

        </article>

      </section>


      <!-- =================================
           BOOK TABLE
      ================================== -->

      <section class="books-card">

        <!-- TABLE HEADER -->

        <div class="table-header">

          <div>
            <span class="section-eyebrow">
              Collection
            </span>

            <h2 class="section-title">
              All Books
            </h2>

            <p class="section-description">
              {{
                searchQuery
                  ? `${filteredBooks.length} matching books`
                  : `${allBooks.length} books in your library`
              }}
            </p>
          </div>


          <!-- SEARCH -->

          <div class="search-wrapper">

            <span class="search-icon">
              ⌕
            </span>

            <input
              v-model="searchQuery"
              type="search"
              class="search-input"
              placeholder="Search books..."
              aria-label="Search books"
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
             LOADING STATE
        ================================== -->

        <div
          v-if="loading"
          class="loading-container"
        >

          <div
            v-for="item in 6"
            :key="item"
            class="skeleton-row"
          >

            <div class="skeleton skeleton-small"></div>

            <div class="skeleton-book">
              <div class="skeleton skeleton-cover"></div>

              <div class="skeleton-book-text">
                <div class="skeleton skeleton-title"></div>
                <div class="skeleton skeleton-id"></div>
              </div>
            </div>

            <div class="skeleton skeleton-author"></div>

            <div class="skeleton skeleton-year"></div>

            <div class="skeleton skeleton-tags"></div>

            <div class="skeleton skeleton-actions"></div>

          </div>

        </div>


        <!-- =================================
             EMPTY STATE
        ================================== -->

        <div
          v-else-if="filteredBooks.length === 0"
          class="empty-state"
        >

          <div class="empty-icon">
            {{ searchQuery ? "⌕" : "📚" }}
          </div>

          <h3>
            {{
              searchQuery
                ? "No Books Found"
                : "No Books Yet"
            }}
          </h3>

          <p>
            {{
              searchQuery
                ? "Try searching with a different title, author, or tag."
                : "Your bookstore does not have any books yet."
            }}
          </p>

          <button
            v-if="searchQuery"
            type="button"
            class="secondary-btn"
            @click="searchQuery = ''"
          >
            Clear Search
          </button>

          <RouterLink
            v-else
            to="/admin/books/new"
            class="secondary-btn"
          >
            Add Your First Book
          </RouterLink>

        </div>


        <!-- =================================
             TABLE
        ================================== -->

        <div
          v-else
          class="table-responsive"
        >

          <table class="books-table">

            <thead>
              <tr>
                <th>#</th>
                <th>Book</th>
                <th>Author</th>
                <th>Year</th>
                <th>Tags</th>
                <th class="actions-column">
                  Actions
                </th>
              </tr>
            </thead>


            <tbody>

              <tr
                v-for="(book, index) in filteredBooks"
                :key="book.id"
              >

                <!-- Number -->

                <td class="index-cell">
                  {{ index + 1 }}
                </td>


                <!-- BOOK -->

                <td>

                  <div class="book-info">

                    <div class="book-cover-wrapper">

                      <!-- Image -->

                      <img
                        v-if="
                          book.coverUrl &&
                          !isCoverError(book)
                        "
                        :src="book.coverUrl"
                        :alt="`${book.title} cover`"
                        class="book-cover"
                        :class="{
                          'image-hidden':
                            isCoverLoading(book)
                        }"
                        @load="handleCoverLoad(book)"
                        @error="handleCoverError(book)"
                      />


                      <!-- Loading -->

                      <div
                        v-if="
                          isCoverLoading(book) &&
                          !isCoverError(book)
                        "
                        class="cover-placeholder cover-loading"
                      >
                        <span>✦</span>
                      </div>


                      <!-- Fallback -->

                      <div
                        v-if="
                          !book.coverUrl ||
                          isCoverError(book)
                        "
                        class="cover-placeholder"
                      >
                        <span>
                          {{ book.title?.charAt(0)?.toUpperCase() || "?" }}
                        </span>
                      </div>

                    </div>


                    <div class="book-details">

                      <div class="book-title">
                        {{ book.title }}
                      </div>

                      <div class="book-id">
                        ID: {{ book.id }}
                      </div>

                    </div>

                  </div>

                </td>


                <!-- AUTHOR -->

                <td>

                  <span class="author-name">
                    {{ getAuthorName(book.authorId) }}
                  </span>

                </td>


                <!-- YEAR -->

                <td>

                  <span class="year-badge">
                    {{ book.year }}
                  </span>

                </td>


                <!-- TAGS -->

                <td>

                  <div class="tags">

                    <span
                      v-for="tag in book.tags"
                      :key="tag"
                      class="tag"
                    >
                      {{ tag }}
                    </span>

                    <span
                      v-if="!book.tags?.length"
                      class="no-tags"
                    >
                      No tags
                    </span>

                  </div>

                </td>


                <!-- ACTIONS -->

                <td>

                  <div class="actions">

                    <RouterLink
                      :to="`/admin/books/${book.id}/edit`"
                      class="action-btn edit-btn"
                    >
                      Edit
                    </RouterLink>

                    <button
                      type="button"
                      class="action-btn delete-btn"
                    >
                      Delete
                    </button>

                  </div>

                </td>

              </tr>

            </tbody>

          </table>

        </div>

      </section>

    </div>

  </main>
</template>


<style scoped>

/* ========================================
   PAGE
======================================== */

.admin-books-page {
  min-height: calc(100vh - 80px);

  background: #f8f4ed;
  color: #202020;

  font-family: "DM Sans", sans-serif;
}


/* ========================================
   HEADER
======================================== */

.page-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  gap: 30px;

  margin-bottom: 35px;
  padding-bottom: 25px;

  border-bottom: 1px solid #e3d9cc;
}


.breadcrumb {
  display: flex;
  align-items: center;

  gap: 7px;

  margin-bottom: 18px;

  color: #958d84;

  font-size: 0.75rem;
}

.breadcrumb a {
  color: #8b5e34;
  text-decoration: none;
  font-weight: 600;
}

.breadcrumb a:hover {
  text-decoration: underline;
}


.page-eyebrow,
.section-eyebrow {
  display: block;

  margin-bottom: 7px;

  color: #8b5e34;

  font-size: 0.7rem;
  font-weight: 700;

  letter-spacing: 0.15em;
  text-transform: uppercase;
}


.page-title {
  margin: 0;

  color: #202020;

  font-family: "Playfair Display", serif;
  font-size: clamp(2.2rem, 5vw, 3.2rem);
  font-weight: 700;

  line-height: 1.1;
}


.page-description {
  max-width: 600px;

  margin: 10px 0 0;

  color: #716b64;

  font-size: 0.9rem;
  line-height: 1.7;
}


/* ========================================
   ADD BOOK
======================================== */

.add-book-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  gap: 8px;

  padding: 11px 17px;

  border-radius: 10px;

  background: #8b5e34;
  color: #fff;

  font-size: 0.82rem;
  font-weight: 700;

  text-decoration: none;

  white-space: nowrap;

  transition:
    background 0.25s ease,
    transform 0.25s ease,
    box-shadow 0.25s ease;
}

.add-book-btn:hover {
  background: #704923;
  color: #fff;

  transform: translateY(-2px);

  box-shadow: 0 7px 20px rgba(139, 94, 52, 0.2);
}

.add-icon {
  font-size: 1.15rem;
  line-height: 1;
}


/* ========================================
   ERROR
======================================== */

.error-card {
  display: flex;
  align-items: center;

  gap: 15px;

  margin-bottom: 30px;
  padding: 17px 20px;

  border: 1px solid #e6c7c2;
  border-radius: 14px;

  background: #fff8f7;
}

.error-icon {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 38px;
  height: 38px;

  flex-shrink: 0;

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

  font-size: 0.9rem;
}

.error-content p {
  margin: 0;

  color: #805b56;

  font-size: 0.78rem;
}

.retry-btn {
  border: 0;
  border-radius: 8px;

  padding: 8px 13px;

  background: #8b5e34;
  color: #fff;

  font-size: 0.78rem;
  font-weight: 600;

  cursor: pointer;
}


/* ========================================
   STATS
======================================== */

.stats-grid {
  display: grid;

  grid-template-columns: repeat(2, minmax(0, 1fr));

  gap: 20px;

  margin-bottom: 30px;
}


.stat-card {
  display: flex;
  align-items: center;

  gap: 17px;

  padding: 21px 23px;

  border: 1px solid #e6ddd2;
  border-radius: 15px;

  background: #fff;

  box-shadow: 0 6px 22px rgba(70, 50, 30, 0.05);

  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;
}

.stat-card:hover {
  transform: translateY(-3px);

  box-shadow: 0 10px 28px rgba(70, 50, 30, 0.09);
}


.stat-icon {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 50px;
  height: 50px;

  flex-shrink: 0;

  border-radius: 13px;

  background: #f8f4ed;
  color: #8b5e34;

  font-size: 1.3rem;
}


.stat-content {
  display: flex;
  flex-direction: column;
}

.stat-label {
  color: #827b73;

  font-size: 0.72rem;
  font-weight: 600;

  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.stat-value {
  margin-top: 2px;

  color: #8b5e34;

  font-family: "Playfair Display", serif;
  font-size: 2rem;
  line-height: 1.1;
}

.stat-note {
  margin-top: 2px;

  color: #989088;

  font-size: 0.72rem;
}


/* ========================================
   BOOK CARD
======================================== */

.books-card {
  overflow: hidden;

  border: 1px solid #e6ddd2;
  border-radius: 17px;

  background: #fff;

  box-shadow: 0 8px 30px rgba(70, 50, 30, 0.06);
}


/* ========================================
   TABLE HEADER
======================================== */

.table-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  gap: 20px;

  padding: 25px;

  border-bottom: 1px solid #e9e1d8;
}


.section-title {
  margin: 0;

  color: #292521;

  font-family: "Playfair Display", serif;
  font-size: 1.6rem;
  font-weight: 700;
}

.section-description {
  margin: 5px 0 0;

  color: #8a837b;

  font-size: 0.78rem;
}


/* ========================================
   SEARCH
======================================== */

.search-wrapper {
  position: relative;

  width: 270px;
}


.search-icon {
  position: absolute;

  top: 50%;
  left: 13px;

  transform: translateY(-50%);

  color: #948c83;

  font-size: 1.2rem;

  pointer-events: none;
}


.search-input {
  width: 100%;

  padding: 10px 38px 10px 38px;

  border: 1px solid #ded5c9;
  border-radius: 10px;

  outline: none;

  background: #fcfaf7;
  color: #292521;

  font-family: "DM Sans", sans-serif;
  font-size: 0.82rem;

  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.search-input::placeholder {
  color: #a49c93;
}

.search-input:focus {
  border-color: #8b5e34;

  box-shadow: 0 0 0 3px rgba(139, 94, 52, 0.1);
}


.clear-search {
  position: absolute;

  top: 50%;
  right: 9px;

  transform: translateY(-50%);

  width: 25px;
  height: 25px;

  border: none;
  border-radius: 50%;

  background: #eee7de;
  color: #6e675f;

  font-size: 1rem;
  line-height: 1;

  cursor: pointer;
}

.clear-search:hover {
  background: #e2d7c9;
}


/* ========================================
   TABLE
======================================== */

.table-responsive {
  width: 100%;

  overflow-x: auto;
}


.books-table {
  width: 100%;

  min-width: 900px;

  border-collapse: collapse;

  color: #292521;
}


.books-table th {
  padding: 14px 20px;

  background: #fcfaf7;

  border-bottom: 1px solid #e5ddd3;

  color: #817970;

  font-size: 0.68rem;
  font-weight: 700;

  letter-spacing: 0.08em;
  text-transform: uppercase;

  text-align: left;

  white-space: nowrap;
}


.books-table td {
  padding: 15px 20px;

  border-bottom: 1px solid #eee8e0;

  vertical-align: middle;

  font-size: 0.82rem;
}


.books-table tbody tr {
  transition: background 0.2s ease;
}

.books-table tbody tr:hover {
  background: #fcfaf7;
}

.books-table tbody tr:last-child td {
  border-bottom: none;
}


.index-cell {
  width: 50px;

  color: #a29a91;

  font-size: 0.75rem !important;
}


/* ========================================
   BOOK
======================================== */

.book-info {
  display: flex;
  align-items: center;

  gap: 12px;

  min-width: 230px;
}


.book-cover-wrapper {
  position: relative;

  width: 42px;
  height: 55px;

  flex-shrink: 0;

  overflow: hidden;

  border-radius: 6px;

  background: #f8f4ed;
}


.book-cover {
  width: 100%;
  height: 100%;

  object-fit: cover;

  opacity: 1;

  transition: opacity 0.3s ease;
}

.image-hidden {
  opacity: 0;
}


.cover-placeholder {
  position: absolute;
  inset: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  background:
    radial-gradient(
      circle at center,
      #fff 0%,
      #f1e9de 100%
    );

  color: #8b5e34;

  font-family: "Playfair Display", serif;
  font-size: 1.15rem;
  font-weight: 700;
}


.cover-loading span {
  animation: coverPulse 1.1s ease-in-out infinite;
}

@keyframes coverPulse {
  0%,
  100% {
    opacity: 0.35;
    transform: scale(0.85);
  }

  50% {
    opacity: 1;
    transform: scale(1.1);
  }
}


.book-details {
  min-width: 0;
}


.book-title {
  max-width: 250px;

  overflow: hidden;

  color: #292521;

  font-family: "Playfair Display", serif;
  font-size: 0.95rem;
  font-weight: 600;

  text-overflow: ellipsis;
  white-space: nowrap;
}


.book-id {
  margin-top: 3px;

  color: #a39b92;

  font-size: 0.68rem;
}


/* ========================================
   AUTHOR
======================================== */

.author-name {
  color: #655d55;

  font-weight: 600;

  white-space: nowrap;
}


/* ========================================
   YEAR
======================================== */

.year-badge {
  display: inline-block;

  padding: 5px 9px;

  border-radius: 7px;

  background: #f8f4ed;
  color: #8b5e34;

  font-size: 0.72rem;
  font-weight: 600;
}


/* ========================================
   TAGS
======================================== */

.tags {
  display: flex;

  flex-wrap: wrap;

  gap: 5px;

  min-width: 150px;
}


.tag {
  padding: 4px 8px;

  border: 1px solid #dfd1c1;
  border-radius: 999px;

  background: #f8f4ed;
  color: #79532f;

  font-size: 0.65rem;
  font-weight: 600;
}


.no-tags {
  color: #a49c93;

  font-size: 0.7rem;
  font-style: italic;
}


/* ========================================
   ACTIONS
======================================== */

.actions {
  display: flex;

  gap: 7px;

  white-space: nowrap;
}


.action-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  padding: 7px 11px;

  border-radius: 7px;

  font-size: 0.7rem;
  font-weight: 700;

  text-decoration: none;

  cursor: pointer;

  transition:
    background 0.2s ease,
    transform 0.2s ease;
}


.action-btn:hover {
  transform: translateY(-1px);
}


.edit-btn {
  border: 1px solid #d8c5af;

  background: #f8f4ed;
  color: #79532f;
}

.edit-btn:hover {
  background: #eee5da;
  color: #684522;
}


.delete-btn {
  border: 1px solid #e5c9c4;

  background: #fff8f7;
  color: #a33f34;
}

.delete-btn:hover {
  background: #f9e9e6;
}


/* ========================================
   LOADING SKELETON
======================================== */

.loading-container {
  padding: 0;
}


.skeleton-row {
  display: grid;

  grid-template-columns:
    50px
    minmax(230px, 1.5fr)
    1fr
    80px
    1fr
    130px;

  align-items: center;

  gap: 0;

  min-width: 900px;

  padding: 14px 20px;

  border-bottom: 1px solid #eee8e0;
}


.skeleton {
  border-radius: 6px;

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


.skeleton-small {
  width: 18px;
  height: 10px;
}


.skeleton-book {
  display: flex;
  align-items: center;

  gap: 12px;
}


.skeleton-cover {
  width: 42px;
  height: 55px;

  border-radius: 6px;
}


.skeleton-book-text {
  display: flex;
  flex-direction: column;

  gap: 7px;
}


.skeleton-title {
  width: 150px;
  height: 12px;
}


.skeleton-id {
  width: 60px;
  height: 8px;
}


.skeleton-author {
  width: 100px;
  height: 10px;
}


.skeleton-year {
  width: 45px;
  height: 24px;
}


.skeleton-tags {
  width: 100px;
  height: 20px;
}


.skeleton-actions {
  width: 110px;
  height: 27px;
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
   EMPTY STATE
======================================== */

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  min-height: 320px;

  padding: 40px;

  text-align: center;
}


.empty-icon {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 65px;
  height: 65px;

  margin-bottom: 18px;

  border-radius: 50%;

  background: #f8f4ed;
  color: #8b5e34;

  font-size: 1.6rem;
}


.empty-state h3 {
  margin: 0;

  color: #292521;

  font-family: "Playfair Display", serif;
  font-size: 1.4rem;
}


.empty-state p {
  max-width: 400px;

  margin: 8px 0 20px;

  color: #817970;

  font-size: 0.82rem;
  line-height: 1.6;
}


.secondary-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  padding: 9px 14px;

  border: 1px solid #d8c5af;
  border-radius: 8px;

  background: #f8f4ed;
  color: #79532f;

  font-size: 0.78rem;
  font-weight: 700;

  text-decoration: none;
  cursor: pointer;
}

.secondary-btn:hover {
  background: #eee5da;
  color: #684522;
}


/* ========================================
   RESPONSIVE
======================================== */

@media (max-width: 991px) {

  .page-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .add-book-btn {
    width: 100%;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .table-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .search-wrapper {
    width: 100%;
  }
}


@media (max-width: 576px) {

  .admin-books-page {
    min-height: 100vh;
  }

  .page-title {
    font-size: 2.2rem;
  }

  .page-description {
    font-size: 0.82rem;
  }

  .stats-grid {
    gap: 12px;
  }

  .stat-card {
    padding: 17px;
  }

  .stat-icon {
    width: 44px;
    height: 44px;

    font-size: 1.1rem;
  }

  .stat-value {
    font-size: 1.7rem;
  }

  .table-header {
    padding: 20px;
  }
}

</style>