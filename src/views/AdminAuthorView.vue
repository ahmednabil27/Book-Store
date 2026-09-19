<script setup>
const authors = [
  {
    id: 1,
    name: "Andy Weir",
    books: 3,
    bio: "American novelist and software engineer, best known for The Martian and Project Hail Mary."
  },
  {
    id: 2,
    name: "Brandon Sanderson",
    books: 8,
    bio: "American fantasy author known for the Cosmere universe and Mistborn series."
  },
  {
    id: 3,
    name: "Agatha Christie",
    books: 12,
    bio: "English writer famous for her detective novels featuring Hercule Poirot and Miss Marple."
  },
  {
    id: 4,
    name: "J.R.R. Tolkien",
    books: 6,
    bio: "English writer and academic best known for The Hobbit and The Lord of the Rings."
  },
  {
    id: 5,
    name: "George Orwell",
    books: 4,
    bio: "English novelist and essayist known for his influential works of political fiction."
  }
];
</script>

<template>
  <div class="main-wrapper">
    <div class="container-fluid">

      <!-- Page Header -->
      <div
        class="d-flex flex-column flex-md-row justify-content-between align-items-md-end gap-3 mb-4"
      >
        <div>
          <div class="breadcrumb-text mb-2">
            Admin <span>/</span> Authors
          </div>

          <h1 class="fw-bold mb-1">
            Manage Authors
          </h1>

          <p class="text-secondary mb-0">
            View and manage all authors in your library.
          </p>
        </div>

        <button class="btn btn-primary-custom">
          + Add New Author
        </button>
      </div>

      <!-- Stats -->
      <div class="row g-3 mb-4">

        <!-- Total Authors -->
        <div class="col-12 col-sm-6 col-lg-4">
          <div class="stat-card h-100">
            <div class="stat-label">
              Total Authors
            </div>

            <div class="stat-value">
              {{ authors.length }}
            </div>

            <div class="stat-note">
              Registered authors
            </div>
          </div>
        </div>

        <!-- Total Books -->
        <div class="col-12 col-sm-6 col-lg-4">
          <div class="stat-card h-100">
            <div class="stat-label">
              Total Books
            </div>

            <div class="stat-value">
              33
            </div>

            <div class="stat-note">
              Across all authors
            </div>
          </div>
        </div>

        <!-- Active Authors -->
        <div class="col-12 col-lg-4">
          <div class="stat-card h-100">
            <div class="stat-label">
              Active Authors
            </div>

            <div class="stat-value">
              5
            </div>

            <div class="stat-note">
              Currently published
            </div>
          </div>
        </div>

      </div>

      <!-- Authors Table Card -->
      <div class="glass-card">

        <!-- Table Header -->
        <div
          class="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3 mb-4"
        >
          <div>
            <h2 class="h5 fw-bold mb-1">
              All Authors
            </h2>

            <p class="text-secondary small mb-0">
              {{ authors.length }} authors found
            </p>
          </div>

          <!-- Search UI -->
          <div class="search-box">
            <span class="search-icon">⌕</span>

            <input
              type="text"
              class="form-control dark-input"
              placeholder="Search authors..."
            />
          </div>
        </div>

        <!-- Responsive Table -->
        <div class="table-responsive">

          <table class="table custom-table align-middle mb-0">

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
                v-for="author in authors"
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
                  <div class="d-flex align-items-center gap-3">

                    <div class="author-avatar">
                      {{ author.name.charAt(0) }}
                    </div>

                    <div>
                      <div class="fw-semibold">
                        {{ author.name }}
                      </div>

                      <small class="text-secondary">
                        Author ID: {{ author.id }}
                      </small>
                    </div>

                  </div>
                </td>

                <!-- Bio -->
                <td>
                  <div class="bio-text">
                    {{ author.bio }}
                  </div>
                </td>

                <!-- Books -->
                <td>
                  <span class="books-badge">
                    {{ author.books }} books
                  </span>
                </td>

                <!-- Actions -->
                <td>
                  <div class="d-flex gap-2">

                    <button class="btn btn-sm btn-action">
                      Edit
                    </button>

                    <button class="btn btn-sm btn-delete">
                      Delete
                    </button>

                  </div>
                </td>

              </tr>

            </tbody>

          </table>

        </div>

        <!-- Empty-looking footer -->
        <div
          class="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-2 mt-4 pt-3 border-top-custom"
        >
          <small class="text-secondary">
            Showing {{ authors.length }} authors
          </small>

          <span class="badge-custom">
            Authors
          </span>
        </div>

      </div>

    </div>
  </div>
</template>

<style scoped>
.main-wrapper {
  min-height: 100vh;
  padding: 24px;
  background: #0b1020;
  color: #e9eefc;
}

.breadcrumb-text {
  font-size: 13px;
  opacity: 0.65;
}

.breadcrumb-text span {
  margin: 0 6px;
  opacity: 0.5;
}

/* =========================
   Buttons
========================= */

.btn-primary-custom {
  background: #4f7cff;
  border: 1px solid #4f7cff;
  color: #fff;
}

.btn-primary-custom:hover {
  background: #416de8;
  border-color: #416de8;
  color: #fff;
}

/* =========================
   Stats
========================= */

.stat-card {
  padding: 18px;

  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
}

.stat-label {
  font-size: 13px;
  opacity: 0.7;
}

.stat-value {
  margin-top: 5px;
  font-size: 30px;
  font-weight: 800;
}

.stat-note {
  margin-top: 3px;
  font-size: 12px;
  opacity: 0.55;
}

/* =========================
   Main Card
========================= */

.glass-card {
  padding: 24px;

  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;

  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.18);
}

/* =========================
   Search
========================= */

.search-box {
  position: relative;
  width: 280px;
}

.search-icon {
  position: absolute;
  left: 13px;
  top: 50%;
  transform: translateY(-50%);

  font-size: 20px;
  opacity: 0.55;

  z-index: 2;
}

.search-box input {
  padding-left: 38px;
}

/* =========================
   Input
========================= */

.dark-input {
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.14);
  color: #e9eefc;
}

.dark-input::placeholder {
  color: rgba(233, 238, 252, 0.45);
}

.dark-input:focus {
  background: rgba(0, 0, 0, 0.25);
  color: #e9eefc;
  border-color: #4f7cff;
  box-shadow: 0 0 0 3px rgba(79, 124, 255, 0.12);
}

/* =========================
   Table
========================= */

.custom-table {
  color: #e9eefc;
  --bs-table-bg: transparent;
  --bs-table-color: #e9eefc;
  --bs-table-border-color: rgba(255, 255, 255, 0.08);
}

.custom-table thead th {
  padding: 14px 12px;

  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;

  letter-spacing: 0.04em;

  color: rgba(233, 238, 252, 0.55);

  border-bottom: 1px solid rgba(255, 255, 255, 0.12);

  white-space: nowrap;
}

.custom-table tbody td {
  padding: 16px 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
}

.custom-table tbody tr {
  transition: background 0.2s ease;
}

.custom-table tbody tr:hover {
  background: rgba(255, 255, 255, 0.035);
}

/* =========================
   Author
========================= */

.author-id {
  font-size: 12px;
  opacity: 0.55;
}

.author-avatar {
  width: 42px;
  height: 42px;

  display: flex;
  align-items: center;
  justify-content: center;

  flex-shrink: 0;

  border-radius: 50%;

  background: rgba(79, 124, 255, 0.18);
  border: 1px solid rgba(79, 124, 255, 0.35);

  color: #dce5ff;
  font-weight: 800;
}

.bio-text {
  max-width: 380px;

  color: rgba(233, 238, 252, 0.7);

  font-size: 13px;
  line-height: 1.5;
}

/* =========================
   Books Badge
========================= */

.books-badge {
  display: inline-block;

  padding: 5px 10px;

  border-radius: 999px;

  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);

  font-size: 12px;
  white-space: nowrap;
}

/* =========================
   Action Buttons
========================= */

.btn-action {
  background: rgba(79, 124, 255, 0.12);
  border: 1px solid rgba(79, 124, 255, 0.3);
  color: #aebfff;
}

.btn-action:hover {
  background: rgba(79, 124, 255, 0.22);
  color: #fff;
}

.btn-delete {
  background: rgba(220, 53, 69, 0.1);
  border: 1px solid rgba(220, 53, 69, 0.25);
  color: #ff8f99;
}

.btn-delete:hover {
  background: rgba(220, 53, 69, 0.2);
  color: #ffb0b7;
}

/* =========================
   Badge
========================= */

.badge-custom {
  padding: 6px 12px;

  border-radius: 999px;

  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);

  font-size: 12px;
}

/* =========================
   Divider
========================= */

.border-top-custom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

/* =========================
   Mobile
========================= */

@media (max-width: 576px) {
  .main-wrapper {
    padding: 14px;
  }

  .glass-card {
    padding: 18px;
  }

  .search-box {
    width: 100%;
  }
}
</style>