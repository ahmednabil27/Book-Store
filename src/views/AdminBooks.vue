<script setup>
import { ref } from "vue";
import { useBookStore } from "@/stores/bookStore";
import { useAuthorStore } from "@/stores/AuthorStore";
import { storeToRefs } from "pinia";

const { allBooks } = storeToRefs(useBookStore());
const { authorsNumber } = storeToRefs(useAuthorStore());
let { getAuthorById } = useAuthorStore();


</script>

<template>
  <div class="main-wrapper">
    <div class="app">
      <!-- Page Header -->
      <div class="header-row">
        <div>
          <div class="breadcrumb text-white-50">Admin / Books</div>

          <h2 class="text-white mb-1">Manage Books</h2>

          <p class="text-white-50 mb-0">Manage the books in your library.</p>
        </div>

        <RouterLink to="/admin/books/new">
          <button class="add-btn">+ Add New Book</button>
        </RouterLink>
      </div>

      <!-- Stats -->
      <div class="stats">
        <div class="stat">
          <div class="muted">Total Books</div>

          <div class="stat-value">
            {{ allBooks.length }}
          </div>

          <div class="muted">Books in library</div>
        </div>

        <div class="stat">
          <div class="muted">Authors</div>

          <div class="stat-value">
            {{ authorsNumber }}
          </div>

          <div class="muted">Book authors</div>
        </div>
      </div>

      <!-- Table Card -->
      <div class="card table-card">
        <!-- Table Header -->
        <div class="table-header">
          <div>
            <h4 class="text-white mb-1">All Books</h4>

            <p class="text-white-50 mb-0">{{ allBooks.length }} books found</p>
          </div>

          <div class="search-box">
            <input type="text" placeholder="Search books..." />
          </div>
        </div>

        <!-- Table -->
        <div class="table-responsive">
          <table class="books-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Book</th>
                <th>Author</th>
                <th>Year</th>
                <th>Tags</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="book in allBooks" :key="book.id">
                <td class="muted">
                  {{ book.id }}
                </td>

                <td>
                  <div class="book-info">
                    <div class="book-cover">📖</div>

                    <div>
                      <div class="book-title">
                        {{ book.title }}
                      </div>

                      <div class="book-id">ID: {{ book.id }}</div>
                    </div>
                  </div>
                </td>

                <td>
                  <span class="author">
                    {{ getAuthorById(book.authorId).name }}
                  </span>
                </td>

                <td>
                  {{ book.year }}
                </td>

                <td>
                  <div class="tags">
                    <span v-for="tag in book.tags" :key="tag" class="tag">
                      {{ tag }}
                    </span>
                  </div>
                </td>

                <td>
                  <div class="actions">
                    <button class="action-btn edit-btn">Edit</button>

                    <button class="action-btn delete-btn">Delete</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
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

/* Card */

.card {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  padding: 16px;
}

/* Header */

.header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.breadcrumb {
  font-size: 13px;
  margin-bottom: 8px;
}

/* Buttons */

button {
  border: 0;
  border-radius: 12px;
  padding: 10px 14px;
  cursor: pointer;
  color: #fff;
  font-weight: 700;
}

.add-btn {
  background: #4f7cff;
}

.action-btn {
  padding: 7px 11px;
  font-size: 13px;
}

.edit-btn {
  background: rgba(79, 124, 255, 0.8);
}

.delete-btn {
  background: rgba(220, 70, 70, 0.8);
}

/* Stats */

.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 12px;
  margin: 20px 0;
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

/* Table */

.table-card {
  padding: 0;
  overflow: hidden;
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 18px;
  flex-wrap: wrap;
}

.search-box input {
  width: 260px;
  padding: 10px 14px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(255, 255, 255, 0.07);
  color: #fff;
  outline: none;
}

.search-box input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.search-box input:focus {
  border-color: rgba(79, 124, 255, 0.8);
}

/* Table */

.table-responsive {
  overflow-x: auto;
}

.books-table {
  width: 100%;
  border-collapse: collapse;
  color: #fff;
}

.books-table th {
  position: sticky;
  top: 0;
  background: rgba(11, 16, 32, 0.95);
  padding: 14px 18px;
  text-align: left;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.65);
  white-space: nowrap;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
}

.books-table td {
  padding: 15px 18px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  vertical-align: middle;
}

.books-table tbody tr:hover {
  background: rgba(255, 255, 255, 0.04);
}

/* Book */

.book-info {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 220px;
}

.book-cover {
  width: 42px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.15);
  font-size: 20px;
}

.book-title {
  font-weight: 700;
}

.book-id {
  margin-top: 3px;
  font-size: 12px;
  opacity: 0.5;
}

.author {
  white-space: nowrap;
}

/* Tags */

.tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  min-width: 150px;
}

.tag {
  padding: 4px 9px;
  border-radius: 999px;
  background: rgba(79, 124, 255, 0.2);
  border: 1px solid rgba(79, 124, 255, 0.4);
  font-size: 12px;
}

/* Actions */

.actions {
  display: flex;
  gap: 7px;
  white-space: nowrap;
}

/* Mobile */

@media (max-width: 768px) {
  .main-wrapper {
    padding: 16px;
  }

  .app {
    width: 100%;
  }

  .header-row {
    align-items: flex-start;
  }

  .add-btn {
    width: 100%;
  }

  .search-box {
    width: 100%;
  }

  .search-box input {
    width: 100%;
  }
}
</style>
