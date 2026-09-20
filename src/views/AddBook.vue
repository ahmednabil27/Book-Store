<script setup>
import { ref, computed, onMounted } from "vue";
import { useAuthorStore } from "@/stores/AuthorStore";
import { useBookStore } from "@/stores/bookStore";

const authorStore = useAuthorStore();
const bookStore = useBookStore();

/* -----------------------------
   Form state
----------------------------- */

const form = ref({
  title: "",
  authorId: "",
  year: "",
  coverUrl: "",
  tags: [],
  description: ""
});

const availableTags = [
  "Fantasy",
  "Sci-Fi",
  "Mystery",
  "Crime",
  "Adventure",
  "Romance",
  "Thriller",
  "Horror"
];

/* -----------------------------
   Loading / error state
----------------------------- */

const isLoading = ref(true);
const isSubmitting = ref(false);
const error = ref(null);
const submitError = ref(null);
const successMessage = ref(null);

/* -----------------------------
   Authors
----------------------------- */

const authors = computed(() => authorStore.allAuthors || []);

/* -----------------------------
   Validation
----------------------------- */

const titleError = computed(() => {
  if (!form.value.title) return "Book title is required.";
  if (form.value.title.length < 3) {
    return "Title must be at least 3 characters.";
  }
  if (form.value.title.length > 100) {
    return "Title must not exceed 100 characters.";
  }

  return "";
});

const authorError = computed(() => {
  if (!form.value.authorId) {
    return "Please select an author.";
  }

  return "";
});

const yearError = computed(() => {
  if (!form.value.year) {
    return "Publication year is required.";
  }

  const currentYear = new Date().getFullYear();

  if (form.value.year < 1800 || form.value.year > currentYear) {
    return `Year must be between 1800 and ${currentYear}.`;
  }

  return "";
});

const coverError = computed(() => {
  if (!form.value.coverUrl) return "";

  try {
    new URL(form.value.coverUrl);
    return "";
  } catch {
    return "Please enter a valid URL.";
  }
});

const descriptionError = computed(() => {
  if (form.value.description.length > 2000) {
    return "Description must not exceed 2000 characters.";
  }

  return "";
});

const formIsValid = computed(() => {
  return (
    !titleError.value &&
    !authorError.value &&
    !yearError.value &&
    !coverError.value &&
    !descriptionError.value
  );
});

/* -----------------------------
   Tags
----------------------------- */

function toggleTag(tag) {
  if (isSubmitting.value) return;

  const index = form.value.tags.indexOf(tag);

  if (index !== -1) {
    form.value.tags.splice(index, 1);
    return;
  }

  if (form.value.tags.length >= 8) return;

  form.value.tags.push(tag);
}

/* -----------------------------
   Load authors
----------------------------- */

async function loadAuthors() {
  isLoading.value = true;
  error.value = null;

  try {
    /*
     * Use the store action if your AuthorStore already
     * provides one.
     */
    if (typeof authorStore.fetchAuthors === "function") {
      await authorStore.fetchAuthors();
    }
  } catch (err) {
    console.error(err);
    error.value = "Unable to load authors. Please try again.";
  } finally {
    isLoading.value = false;
  }
}

/* -----------------------------
   Submit
----------------------------- */

async function createBook() {
  submitError.value = null;
  successMessage.value = null;

  if (!formIsValid.value) {
    return;
  }

  isSubmitting.value = true;

  try {
    const bookData = {
      title: form.value.title.trim(),
      authorId: Number(form.value.authorId),
      year: Number(form.value.year),
      tags: [...form.value.tags],
      coverUrl: form.value.coverUrl.trim(),
      description: form.value.description.trim(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    /*
     * Use the store action if your BookStore already
     * provides one.
     */
    if (typeof bookStore.addBook === "function") {
      await bookStore.addBook(bookData);
    } else if (typeof bookStore.createBook === "function") {
      await bookStore.createBook(bookData);
    } else {
      /*
       * Temporary fallback while the store action
       * is not implemented yet.
       */
      await new Promise((resolve) => setTimeout(resolve, 800));
    }

    successMessage.value = "Book created successfully.";

    resetForm();
  } catch (err) {
    console.error(err);
    submitError.value = "Unable to create the book. Please try again.";
  } finally {
    isSubmitting.value = false;
  }
}

/* -----------------------------
   Reset
----------------------------- */

function resetForm() {
  form.value = {
    title: "",
    authorId: "",
    year: "",
    coverUrl: "",
    tags: [],
    description: ""
  };
}

onMounted(loadAuthors);
</script>

<template>
  <div class="main-wrapper">
    <div class="container-fluid">

      <!-- Page Header -->
      <div
        class="page-header d-flex flex-column flex-md-row justify-content-between align-items-md-end gap-3 mb-4"
      >
        <div>
          <div class="breadcrumb-text mb-2">
            Admin <span>/</span> Books <span>/</span> New Book
          </div>

          <h1 class="page-title mb-1">
            Add New Book
          </h1>

          <p class="page-description mb-0">
            Create a new book and add it to your library.
          </p>
        </div>

        <RouterLink
          to="/admin/books"
          class="btn secondary-btn"
        >
          <span>←</span>
          Back to Books
        </RouterLink>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="form-card">

        <div class="loading-header">
          <div>
            <div class="skeleton skeleton-title"></div>
            <div class="skeleton skeleton-subtitle"></div>
          </div>

          <div class="skeleton skeleton-badge"></div>
        </div>

        <div class="skeleton-form">

          <div class="skeleton-field">
            <div class="skeleton skeleton-label"></div>
            <div class="skeleton skeleton-input"></div>
          </div>

          <div class="row g-3">
            <div class="col-md-8">
              <div class="skeleton-field">
                <div class="skeleton skeleton-label"></div>
                <div class="skeleton skeleton-input"></div>
              </div>
            </div>

            <div class="col-md-4">
              <div class="skeleton-field">
                <div class="skeleton skeleton-label"></div>
                <div class="skeleton skeleton-input"></div>
              </div>
            </div>
          </div>

          <div class="skeleton-field">
            <div class="skeleton skeleton-label"></div>
            <div class="skeleton skeleton-input"></div>
          </div>

          <div class="skeleton-field">
            <div class="skeleton skeleton-label"></div>
            <div class="skeleton skeleton-tags"></div>
          </div>

          <div class="skeleton-field">
            <div class="skeleton skeleton-label"></div>
            <div class="skeleton skeleton-textarea"></div>
          </div>

        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="error-card">

        <div class="error-icon">
          !
        </div>

        <div>
          <h3>Unable to load the form</h3>
          <p>{{ error }}</p>

          <button
            type="button"
            class="btn primary-btn"
            @click="loadAuthors"
          >
            Try Again
          </button>
        </div>

      </div>

      <!-- Form -->
      <div v-else class="form-card">

        <!-- Card Header -->
        <div class="card-header-custom">

          <div>
            <div class="section-eyebrow">
              Library Management
            </div>

            <h2 class="form-title">
              Book Information
            </h2>

            <p class="form-subtitle">
              Enter the details of the book below.
            </p>
          </div>

          <span class="new-badge">
            New Book
          </span>

        </div>

        <!-- Success -->
        <div
          v-if="successMessage"
          class="alert-custom success-alert"
        >
          <span class="alert-icon">✓</span>
          {{ successMessage }}
        </div>

        <!-- Submit Error -->
        <div
          v-if="submitError"
          class="alert-custom error-alert"
        >
          <span class="alert-icon">!</span>
          {{ submitError }}
        </div>

        <form @submit.prevent="createBook">

          <!-- Title -->
          <div class="form-group mb-4">

            <label
              for="title"
              class="form-label"
            >
              Book Title
              <span class="required">*</span>
            </label>

            <input
              id="title"
              v-model="form.title"
              type="text"
              class="form-control custom-input"
              :class="{ 'input-error': titleError }"
              placeholder="e.g. Project Hail Mary"
              :disabled="isSubmitting"
            />

            <div
              v-if="titleError"
              class="validation-error"
            >
              {{ titleError }}
            </div>

            <div
              v-else
              class="form-help"
            >
              Enter a title between 3 and 100 characters.
            </div>

          </div>

          <!-- Author + Year -->
          <div class="row g-3 mb-4">

            <div class="col-md-8">

              <label
                for="author"
                class="form-label"
              >
                Author
                <span class="required">*</span>
              </label>

              <select
                id="author"
                v-model="form.authorId"
                class="form-select custom-input"
                :class="{ 'input-error': authorError }"
                :disabled="isSubmitting"
              >
                <option value="" disabled>
                  Select an author
                </option>

                <option
                  v-for="author in authors"
                  :key="author.id"
                  :value="author.id"
                >
                  {{ author.name }}
                </option>
              </select>

              <div
                v-if="authorError"
                class="validation-error"
              >
                {{ authorError }}
              </div>

            </div>

            <div class="col-md-4">

              <label
                for="year"
                class="form-label"
              >
                Publication Year
                <span class="required">*</span>
              </label>

              <input
                id="year"
                v-model.number="form.year"
                type="number"
                min="1800"
                :max="new Date().getFullYear()"
                class="form-control custom-input"
                :class="{ 'input-error': yearError }"
                placeholder="e.g. 2021"
                :disabled="isSubmitting"
              />

              <div
                v-if="yearError"
                class="validation-error"
              >
                {{ yearError }}
              </div>

            </div>

          </div>

          <!-- Cover URL -->
          <div class="form-group mb-4">

            <label
              for="cover"
              class="form-label"
            >
              Cover Image URL
            </label>

            <input
              id="cover"
              v-model="form.coverUrl"
              type="url"
              class="form-control custom-input"
              :class="{ 'input-error': coverError }"
              placeholder="https://example.com/book-cover.jpg"
              :disabled="isSubmitting"
            />

            <div
              v-if="coverError"
              class="validation-error"
            >
              {{ coverError }}
            </div>

            <div
              v-else
              class="form-help"
            >
              Provide a URL to the book cover image.
            </div>

          </div>

          <!-- Tags -->
          <div class="form-group mb-4">

            <div class="d-flex justify-content-between align-items-center mb-2">

              <label class="form-label mb-0">
                Tags
              </label>

              <span class="tag-counter">
                {{ form.tags.length }}/8 selected
              </span>

            </div>

            <div class="tags-container">

              <button
                v-for="tag in availableTags"
                :key="tag"
                type="button"
                class="tag-option"
                :class="{ selected: form.tags.includes(tag) }"
                :disabled="
                  isSubmitting ||
                  (!form.tags.includes(tag) && form.tags.length >= 8)
                "
                @click="toggleTag(tag)"
              >
                <span v-if="form.tags.includes(tag)">✓</span>
                {{ tag }}
              </button>

            </div>

            <div class="form-help">
              Select up to 8 tags.
            </div>

          </div>

          <!-- Description -->
          <div class="form-group mb-4">

            <div class="d-flex justify-content-between align-items-center mb-2">

              <label
                for="description"
                class="form-label mb-0"
              >
                Description
              </label>

              <span
                class="character-counter"
                :class="{
                  warning: form.description.length > 1800,
                  danger: form.description.length >= 2000
                }"
              >
                {{ form.description.length }}/2000
              </span>

            </div>

            <textarea
              id="description"
              v-model="form.description"
              class="form-control custom-input"
              :class="{ 'input-error': descriptionError }"
              rows="6"
              placeholder="Write a short description of the book..."
              :disabled="isSubmitting"
            ></textarea>

            <div
              v-if="descriptionError"
              class="validation-error"
            >
              {{ descriptionError }}
            </div>

            <div
              v-else
              class="form-help"
            >
              Maximum 2000 characters.
            </div>

          </div>

          <!-- Actions -->
          <div class="form-actions">

            <RouterLink
              to="/admin/books"
              class="btn secondary-btn"
              :class="{ disabled: isSubmitting }"
            >
              Cancel
            </RouterLink>

            <button
              type="submit"
              class="btn primary-btn"
              :disabled="!formIsValid || isSubmitting"
            >

              <span
                v-if="isSubmitting"
                class="spinner-border spinner-border-sm"
                aria-hidden="true"
              ></span>

              <span>
                {{ isSubmitting ? "Creating Book..." : "Create Book" }}
              </span>

            </button>

          </div>

        </form>

      </div>

    </div>
  </div>
</template>

<style scoped>
/* ================================
   Main
================================ */

.main-wrapper {
  min-height: 100vh;
  padding: 28px;
  background: #f8f4ed;
  color: #29251f;
  font-family: "DM Sans", sans-serif;
}

/* ================================
   Header
================================ */

.page-title,
.form-title {
  font-family: "Playfair Display", serif;
  color: #2c241c;
}

.page-title {
  font-size: 2rem;
  font-weight: 700;
}

.page-description,
.form-subtitle {
  color: #766e64;
}

.breadcrumb-text {
  color: #8b5e34;
  font-size: 0.8rem;
  font-weight: 600;
}

.breadcrumb-text span {
  margin: 0 7px;
  color: #b7aa9c;
}

/* ================================
   Card
================================ */

.form-card {
  background: #ffffff;
  border: 1px solid #e9e2d8;
  border-radius: 18px;
  padding: 28px;
  box-shadow: 0 10px 30px rgba(75, 55, 35, 0.07);
}

.card-header-custom {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
  padding-bottom: 20px;
  margin-bottom: 28px;
  border-bottom: 1px solid #eee7de;
}

.section-eyebrow {
  margin-bottom: 5px;
  color: #8b5e34;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.form-title {
  margin-bottom: 4px;
  font-size: 1.45rem;
}

.form-subtitle {
  margin: 0;
  font-size: 0.88rem;
}

.new-badge {
  flex-shrink: 0;
  padding: 7px 13px;
  border-radius: 999px;
  background: #f4ede4;
  border: 1px solid #e5d7c8;
  color: #8b5e34;
  font-size: 0.75rem;
  font-weight: 700;
}

/* ================================
   Form
================================ */

.form-label {
  margin-bottom: 8px;
  color: #39322b;
  font-size: 0.88rem;
  font-weight: 600;
}

.required {
  color: #b94a48;
}

.custom-input {
  min-height: 44px;
  background: #fffdf9;
  border: 1px solid #ddd3c7;
  border-radius: 10px;
  color: #29251f;
  font-size: 0.9rem;
  transition: all 0.2s ease;
}

.custom-input::placeholder {
  color: #aaa097;
}

.custom-input:focus {
  background: #ffffff;
  border-color: #8b5e34;
  color: #29251f;
  box-shadow: 0 0 0 3px rgba(139, 94, 52, 0.1);
}

.custom-input:disabled {
  background: #f5f1eb;
  cursor: not-allowed;
}

.custom-input option {
  color: #29251f;
  background: #ffffff;
}

.input-error {
  border-color: #c56a67 !important;
}

.input-error:focus {
  box-shadow: 0 0 0 3px rgba(197, 106, 103, 0.1);
}

.form-help {
  margin-top: 6px;
  color: #978e84;
  font-size: 0.74rem;
}

.validation-error {
  margin-top: 6px;
  color: #b64d49;
  font-size: 0.74rem;
}

/* ================================
   Tags
================================ */

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 14px;
  min-height: 55px;
  background: #fffdf9;
  border: 1px solid #ddd3c7;
  border-radius: 12px;
}

.tag-option {
  padding: 7px 13px;
  border: 1px solid #ded4c8;
  border-radius: 999px;
  background: #ffffff;
  color: #665c52;
  font-size: 0.76rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.tag-option:hover:not(:disabled) {
  border-color: #8b5e34;
  color: #8b5e34;
  background: #f8f1e8;
}

.tag-option.selected {
  background: #8b5e34;
  border-color: #8b5e34;
  color: #ffffff;
}

.tag-option:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.tag-counter,
.character-counter {
  color: #978e84;
  font-size: 0.72rem;
  font-weight: 600;
}

.character-counter.warning {
  color: #a77732;
}

.character-counter.danger {
  color: #b64d49;
}

/* ================================
   Alerts
================================ */

.alert-custom {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 22px;
  padding: 12px 15px;
  border-radius: 10px;
  font-size: 0.84rem;
}

.alert-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  border-radius: 50%;
  font-weight: 700;
}

.success-alert {
  background: #edf7ef;
  border: 1px solid #cfe6d2;
  color: #3d7045;
}

.success-alert .alert-icon {
  background: #d8edda;
}

.error-alert {
  background: #fbefee;
  border: 1px solid #ebcfcc;
  color: #a24c48;
}

.error-alert .alert-icon {
  background: #f3d9d6;
}

/* ================================
   Buttons
================================ */

.primary-btn,
.secondary-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 42px;
  padding: 9px 17px;
  border-radius: 9px;
  font-size: 0.84rem;
  font-weight: 600;
  transition: all 0.2s ease;
  text-decoration: none;
}

.primary-btn {
  background: #8b5e34;
  border: 1px solid #8b5e34;
  color: #ffffff;
}

.primary-btn:hover:not(:disabled) {
  background: #754d2b;
  border-color: #754d2b;
  color: #ffffff;
  transform: translateY(-1px);
}

.primary-btn:disabled {
  background: #b8a899;
  border-color: #b8a899;
  color: #ffffff;
  opacity: 0.7;
  cursor: not-allowed;
}

.secondary-btn {
  background: #ffffff;
  border: 1px solid #dcd2c6;
  color: #5e554d;
}

.secondary-btn:hover {
  background: #f5eee6;
  border-color: #cbb9a6;
  color: #8b5e34;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding-top: 20px;
  border-top: 1px solid #eee7de;
}

/* ================================
   Error State
================================ */

.error-card {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 25px;
  background: #ffffff;
  border: 1px solid #ead8d5;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(75, 55, 35, 0.06);
}

.error-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  flex-shrink: 0;
  border-radius: 50%;
  background: #f8e8e6;
  color: #b64d49;
  font-weight: 700;
}

.error-card h3 {
  margin-bottom: 5px;
  font-family: "Playfair Display", serif;
  font-size: 1.2rem;
}

.error-card p {
  margin-bottom: 15px;
  color: #766e64;
  font-size: 0.85rem;
}

/* ================================
   Loading Skeleton
================================ */

.loading-header {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding-bottom: 20px;
  margin-bottom: 28px;
  border-bottom: 1px solid #eee7de;
}

.skeleton {
  position: relative;
  overflow: hidden;
  background: #eee8df;
  border-radius: 7px;
}

.skeleton::after {
  content: "";
  position: absolute;
  inset: 0;
  transform: translateX(-100%);
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.65),
    transparent
  );
  animation: skeleton-loading 1.4s infinite;
}

.skeleton-title {
  width: 190px;
  height: 24px;
  margin-bottom: 8px;
}

.skeleton-subtitle {
  width: 280px;
  height: 14px;
}

.skeleton-badge {
  width: 85px;
  height: 30px;
  border-radius: 999px;
}

.skeleton-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.skeleton-field {
  width: 100%;
}

.skeleton-label {
  width: 90px;
  height: 14px;
  margin-bottom: 9px;
}

.skeleton-input {
  width: 100%;
  height: 44px;
  border-radius: 10px;
}

.skeleton-tags {
  width: 100%;
  height: 75px;
  border-radius: 12px;
}

.skeleton-textarea {
  width: 100%;
  height: 140px;
  border-radius: 10px;
}

@keyframes skeleton-loading {
  100% {
    transform: translateX(100%);
  }
}

/* ================================
   Mobile
================================ */

@media (max-width: 768px) {
  .main-wrapper {
    padding: 18px;
  }

  .form-card {
    padding: 20px;
  }

  .page-title {
    font-size: 1.7rem;
  }

  .card-header-custom {
    flex-direction: column;
  }

  .new-badge {
    align-self: flex-start;
  }
}

@media (max-width: 576px) {
  .main-wrapper {
    padding: 14px;
  }

  .form-card {
    padding: 17px;
    border-radius: 14px;
  }

  .page-title {
    font-size: 1.5rem;
  }

  .form-actions {
    flex-direction: column-reverse;
  }

  .form-actions .btn {
    width: 100%;
  }

  .error-card {
    flex-direction: column;
  }
}
</style>