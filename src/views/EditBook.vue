<script setup>
const authors = [
  { id: 1, name: "Andy Weir" },
  { id: 2, name: "Brandon Sanderson" },
  { id: 3, name: "Agatha Christie" },
  { id: 4, name: "J.R.R. Tolkien" }
];

const selectedTags = [
  "Sci-Fi",
  "Space"
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
            Admin <span>/</span> Books <span>/</span> Edit
          </div>

          <h1 class="fw-bold mb-1">
            Edit Book
          </h1>

          <p class="text-secondary mb-0">
            Update the information of this book.
          </p>
        </div>

        <button class="btn btn-secondary-custom">
          ← Back to Books
        </button>
      </div>

      <!-- Book Information Card -->
      <div class="glass-card">

        <!-- Card Header -->
        <div
          class="d-flex flex-column flex-sm-row justify-content-between align-items-sm-start gap-3 border-bottom-custom pb-3 mb-4"
        >
          <div>
            <h2 class="h5 fw-bold mb-1">
              Book Information
            </h2>

            <p class="text-secondary small mb-0">
              Update the details of the selected book.
            </p>
          </div>

          <span class="badge-custom">
            ID: #10
          </span>
        </div>

        <form>

          <!-- Title -->
          <div class="mb-4">
            <label for="title" class="form-label fw-semibold">
              Book Title
              <span class="text-danger">*</span>
            </label>

            <input
              id="title"
              type="text"
              class="form-control dark-input"
              value="Project Hail Mary"
            />

            <div class="form-text text-secondary">
              Enter a title between 3 and 100 characters.
            </div>
          </div>

          <!-- Author + Year -->
          <div class="row g-3 mb-4">

            <div class="col-md-8">
              <label for="author" class="form-label fw-semibold">
                Author
                <span class="text-danger">*</span>
              </label>

              <select
                id="author"
                class="form-select dark-input"
              >
                <option
                  v-for="author in authors"
                  :key="author.id"
                  :value="author.id"
                  :selected="author.id === 1"
                >
                  {{ author.name }}
                </option>
              </select>
            </div>

            <div class="col-md-4">
              <label for="year" class="form-label fw-semibold">
                Publication Year
                <span class="text-danger">*</span>
              </label>

              <input
                id="year"
                type="number"
                class="form-control dark-input"
                value="2021"
              />
            </div>

          </div>

          <!-- Cover URL -->
          <div class="mb-4">
            <label for="cover" class="form-label fw-semibold">
              Cover Image URL
            </label>

            <input
              id="cover"
              type="url"
              class="form-control dark-input"
              value="https://example.com/project-hail-mary.jpg"
            />

            <div class="form-text text-secondary">
              Provide a URL to the book cover image.
            </div>
          </div>

          <!-- Current Cover Preview -->
          <div class="mb-4">
            <label class="form-label fw-semibold">
              Current Cover
            </label>

            <div class="cover-preview">
              <div class="cover-placeholder">
                📖
              </div>

              <div>
                <div class="fw-semibold">
                  Project Hail Mary
                </div>

                <div class="text-secondary small">
                  Current book cover
                </div>
              </div>
            </div>
          </div>

          <!-- Tags -->
          <div class="mb-4">
            <label class="form-label fw-semibold">
              Tags
            </label>

            <div class="tags-container">

              <span
                v-for="tag in selectedTags"
                :key="tag"
                class="tag-option selected"
              >
                {{ tag }}
                <span class="remove-tag">×</span>
              </span>

              <span class="tag-add">
                + Add tag
              </span>

            </div>

            <div class="form-text text-secondary">
              Select up to 8 tags.
            </div>
          </div>

          <!-- Description -->
          <div class="mb-4">
            <label for="description" class="form-label fw-semibold">
              Description
            </label>

            <textarea
              id="description"
              class="form-control dark-input"
              rows="6"
            >A lone astronaut wakes up with no memory of how he got there. Far from Earth, he must solve an impossible scientific problem to save humanity.</textarea>

            <div class="form-text text-secondary">
              Maximum 2000 characters.
            </div>
          </div>

          <!-- Metadata -->
          <div class="metadata-card mb-4">
            <div class="row g-3">

              <div class="col-sm-6">
                <div class="metadata-label">
                  Created
                </div>

                <div class="metadata-value">
                  January 1, 2025
                </div>
              </div>

              <div class="col-sm-6">
                <div class="metadata-label">
                  Last Updated
                </div>

                <div class="metadata-value">
                  September 18, 2026
                </div>
              </div>

            </div>
          </div>

          <!-- Actions -->
          <div class="border-top-custom pt-3">
            <div
              class="d-flex flex-column-reverse flex-sm-row justify-content-end gap-2"
            >

              <button
                type="button"
                class="btn btn-secondary-custom"
              >
                Cancel
              </button>

              <button
                type="submit"
                class="btn btn-primary-custom"
              >
                Save Changes
              </button>

            </div>
          </div>

        </form>
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

/* Card */

.glass-card {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.18);
}

/* Inputs */

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

.dark-input option {
  background: #151b2d;
  color: #e9eefc;
}

.form-label {
  font-size: 14px;
}

.form-text {
  font-size: 12px;
}

/* Badge */

.badge-custom {
  padding: 6px 12px;
  border-radius: 999px;

  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.35);

  font-size: 12px;
  white-space: nowrap;
}

/* Cover Preview */

.cover-preview {
  display: flex;
  align-items: center;
  gap: 14px;

  padding: 14px;

  background: rgba(0, 0, 0, 0.18);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
}

.cover-placeholder {
  width: 55px;
  height: 70px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 8px;
  background: rgba(79, 124, 255, 0.15);

  font-size: 25px;
}

/* Tags */

.tags-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;

  padding: 12px;
  min-height: 48px;

  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 12px;
}

.tag-option {
  padding: 6px 10px;

  border-radius: 999px;

  background: rgba(79, 124, 255, 0.18);
  border: 1px solid rgba(79, 124, 255, 0.4);

  font-size: 12px;
}

.remove-tag {
  margin-left: 5px;
  opacity: 0.7;
}

.tag-add {
  padding: 6px 10px;

  border-radius: 999px;

  background: rgba(255, 255, 255, 0.07);
  border: 1px dashed rgba(255, 255, 255, 0.25);

  font-size: 12px;
  cursor: pointer;
}

/* Metadata */

.metadata-card {
  padding: 16px;

  background: rgba(0, 0, 0, 0.16);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
}

.metadata-label {
  font-size: 12px;
  opacity: 0.55;
  margin-bottom: 3px;
}

.metadata-value {
  font-size: 14px;
  font-weight: 600;
}

/* Buttons */

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

.btn-secondary-custom {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.14);
  color: #e9eefc;
}

.btn-secondary-custom:hover {
  background: rgba(255, 255, 255, 0.13);
  color: #fff;
}

/* Dividers */

.border-top-custom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.border-bottom-custom {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

/* Mobile */

@media (max-width: 576px) {
  .main-wrapper {
    padding: 14px;
  }

  .glass-card {
    padding: 18px;
  }
}

</style>