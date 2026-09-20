<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter, RouterLink } from "vue-router";

import { useBookStore } from "@/stores/bookStore";
import { useAuthorStore } from "@/stores/AuthorStore";

const route = useRoute();
const router = useRouter();

const bookStore = useBookStore();
const authorStore = useAuthorStore();

/* -----------------------------
   State
----------------------------- */

const isLoading = ref(true);
const isSaving = ref(false);
const error = ref("");
const successMessage = ref("");

const book = ref(null);

const form = ref({
  title: "",
  authorId: "",
  year: "",
  coverUrl: "",
  tags: [],
  description: ""
});

const newTag = ref("");

const coverLoading = ref(false);
const coverImageError = ref(false);

/* -----------------------------
   Computed
----------------------------- */

const authors = computed(() => {
  return authorStore.allAuthors || [];
});

const bookId = computed(() => {
  return Number(route.params.id);
});

const currentYear = new Date().getFullYear();

const selectedAuthor = computed(() => {
  return authors.value.find(
    author => Number(author.id) === Number(form.value.authorId)
  );
});

const titleError = computed(() => {
  const title = form.value.title.trim();

  if (!title) {
    return "Book title is required.";
  }

  if (title.length < 3) {
    return "Title must be at least 3 characters.";
  }

  if (title.length > 100) {
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

  const year = Number(form.value.year);

  if (year < 1800 || year > currentYear) {
    return `Year must be between 1800 and ${currentYear}.`;
  }

  return "";
});

const coverError = computed(() => {
  const url = form.value.coverUrl.trim();

  if (!url) {
    return "";
  }

  try {
    new URL(url);
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

const tagsError = computed(() => {
  if (form.value.tags.length > 8) {
    return "You can select up to 8 tags.";
  }

  const invalidTag = form.value.tags.find(
    tag => tag.length < 2 || tag.length > 20
  );

  if (invalidTag) {
    return "Each tag must contain between 2 and 20 characters.";
  }

  return "";
});

const formIsValid = computed(() => {
  return (
    !titleError.value &&
    !authorError.value &&
    !yearError.value &&
    !coverError.value &&
    !descriptionError.value &&
    !tagsError.value
  );
});

const formattedCreatedAt = computed(() => {
  if (!book.value?.createdAt) {
    return "—";
  }

  return formatDate(book.value.createdAt);
});

const formattedUpdatedAt = computed(() => {
  if (!book.value?.updatedAt) {
    return "—";
  }

  return formatDate(book.value.updatedAt);
});

/* -----------------------------
   Helpers
----------------------------- */

function formatDate(date) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  }).format(new Date(date));
}

/* -----------------------------
   Load Book
----------------------------- */

async function loadBook() {
  isLoading.value = true;
  error.value = "";
  successMessage.value = "";

  try {
    const id = Number(route.params.id);

    if (!id) {
      error.value = "Invalid book ID.";
      return;
    }

    /*
     * Load authors if the store supports it.
     * This keeps the component compatible with your
     * existing Pinia store.
     */
    if (
      typeof authorStore.fetchAuthors === "function" &&
      !authorStore.allAuthors?.length
    ) {
      await authorStore.fetchAuthors();
    }

    let foundBook = null;

    if (typeof bookStore.getBookById === "function") {
      foundBook = bookStore.getBookById(id);
    }

    /*
     * If the book is not already in Pinia, try fetching it.
     */
    if (
      !foundBook &&
      typeof bookStore.fetchBookById === "function"
    ) {
      foundBook = await bookStore.fetchBookById(id);
    }

    /*
     * Final fallback: search all loaded books.
     */
    if (!foundBook && bookStore.allBooks?.length) {
      foundBook = bookStore.allBooks.find(
        item => Number(item.id) === id
      );
    }

    if (!foundBook) {
      error.value = "Book not found.";
      return;
    }

    book.value = foundBook;

    form.value = {
      title: foundBook.title || "",
      authorId: foundBook.authorId || "",
      year: foundBook.year || "",
      coverUrl: foundBook.coverUrl || "",
      tags: Array.isArray(foundBook.tags)
        ? [...foundBook.tags]
        : [],
      description: foundBook.description || ""
    };

    coverLoading.value = !!form.value.coverUrl;
    coverImageError.value = false;
  } catch (err) {
    console.error(err);
    error.value = "Unable to load the book information.";
  } finally {
    isLoading.value = false;
  }
}

/* -----------------------------
   Cover Image
----------------------------- */

function handleCoverLoad() {
  coverLoading.value = false;
  coverImageError.value = false;
}

function handleCoverError() {
  coverLoading.value = false;
  coverImageError.value = true;
}

/*
 * When the user changes the URL,
 * restart the preview loading state.
 */
watch(
  () => form.value.coverUrl,
  newUrl => {
    coverImageError.value = false;
    coverLoading.value = !!newUrl;
  }
);

/* -----------------------------
   Tags
----------------------------- */

function addTag() {
  const tag = newTag.value.trim();

  if (!tag) {
    return;
  }

  if (form.value.tags.length >= 8) {
    return;
  }

  if (tag.length < 2 || tag.length > 20) {
    return;
  }

  const alreadyExists = form.value.tags.some(
    existingTag =>
      existingTag.toLowerCase() === tag.toLowerCase()
  );

  if (alreadyExists) {
    newTag.value = "";
    return;
  }

  form.value.tags.push(tag);
  newTag.value = "";
}

function removeTag(index) {
  form.value.tags.splice(index, 1);
}

function handleTagKeydown(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addTag();
  }
}

/* -----------------------------
   Save
----------------------------- */

async function saveChanges() {
  successMessage.value = "";
  error.value = "";

  if (!formIsValid.value) {
    error.value = "Please fix the validation errors before saving.";
    return;
  }

  isSaving.value = true;

  try {
    const updatedBook = {
      ...book.value,
      title: form.value.title.trim(),
      authorId: Number(form.value.authorId),
      year: Number(form.value.year),
      coverUrl: form.value.coverUrl.trim(),
      tags: [...form.value.tags],
      description: form.value.description.trim(),
      updatedAt: new Date().toISOString()
    };

    /*
     * Use your Pinia update action if available.
     */
    if (typeof bookStore.updateBook === "function") {
      await bookStore.updateBook(bookId.value, updatedBook);
    } else if (typeof bookStore.editBook === "function") {
      await bookStore.editBook(bookId.value, updatedBook);
    } else {
      /*
       * Temporary fallback while the real store action
       * is not connected yet.
       */
      await new Promise(resolve => setTimeout(resolve, 800));
    }

    book.value = updatedBook;

    successMessage.value = "Book updated successfully.";

    /*
     * Optional small delay so the user can see
     * the success message before returning.
     */
    setTimeout(() => {
      router.push("/admin/books");
    }, 700);
  } catch (err) {
    console.error(err);
    error.value = "Unable to save the book. Please try again.";
  } finally {
    isSaving.value = false;
  }
}

function cancelEdit() {
  router.push("/admin/books");
}

/* -----------------------------
   Lifecycle
----------------------------- */

onMounted(loadBook);
</script>

<template>
  <div class="main-wrapper">
    <div class="container-fluid">

      <!-- =========================
           Loading State
      ========================== -->
      <div v-if="isLoading">

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

        <!-- Card Skeleton -->
        <div class="book-form-card">

          <div
            class="d-flex justify-content-between align-items-start gap-3 border-bottom-custom pb-3 mb-4"
          >
            <div>
              <div class="skeleton skeleton-heading mb-2"></div>
              <div class="skeleton skeleton-text"></div>
            </div>

            <div class="skeleton skeleton-badge"></div>
          </div>

          <div class="skeleton-form">

            <div class="skeleton skeleton-label mb-2"></div>
            <div class="skeleton skeleton-input mb-2"></div>
            <div class="skeleton skeleton-help mb-4"></div>

            <div class="row g-3 mb-4">
              <div class="col-md-8">
                <div class="skeleton skeleton-label mb-2"></div>
                <div class="skeleton skeleton-input"></div>
              </div>

              <div class="col-md-4">
                <div class="skeleton skeleton-label mb-2"></div>
                <div class="skeleton skeleton-input"></div>
              </div>
            </div>

            <div class="skeleton skeleton-label mb-2"></div>
            <div class="skeleton skeleton-input mb-4"></div>

            <div class="skeleton skeleton-cover mb-4"></div>

            <div class="skeleton skeleton-label mb-2"></div>
            <div class="skeleton skeleton-tags mb-4"></div>

            <div class="skeleton skeleton-label mb-2"></div>
            <div class="skeleton skeleton-textarea mb-4"></div>

          </div>
        </div>
      </div>

      <!-- =========================
           Error State
      ========================== -->
      <div v-else-if="error && !book" class="state-card">

        <div class="state-icon">
          !
        </div>

        <h2 class="state-title">
          Unable to load book
        </h2>

        <p class="text-secondary mb-4">
          {{ error }}
        </p>

        <div class="d-flex justify-content-center gap-2 flex-wrap">
          <button
            type="button"
            class="btn btn-secondary-custom"
            @click="loadBook"
          >
            Try Again
          </button>

          <button
            type="button"
            class="btn btn-primary-custom"
            @click="cancelEdit"
          >
            Back to Books
          </button>
        </div>
      </div>

      <!-- =========================
           Main Content
      ========================== -->
      <template v-else>

        <!-- Page Header -->
        <div
          class="d-flex flex-column flex-md-row justify-content-between align-items-md-end gap-3 mb-4"
        >
          <div>
            <div class="breadcrumb-text mb-2">
              Admin
              <span>/</span>
              Books
              <span>/</span>
              Edit
            </div>

            <h1 class="page-title mb-1">
              Edit Book
            </h1>

            <p class="text-secondary mb-0">
              Update the information of this book.
            </p>
          </div>

          <button
            type="button"
            class="btn btn-secondary-custom"
            :disabled="isSaving"
            @click="cancelEdit"
          >
            ← Back to Books
          </button>
        </div>

        <!-- Success Message -->
        <div
          v-if="successMessage"
          class="alert alert-success-custom mb-4"
          role="alert"
        >
          <span class="alert-icon">✓</span>
          {{ successMessage }}
        </div>

        <!-- General Error -->
        <div
          v-if="error"
          class="alert alert-error-custom mb-4"
          role="alert"
        >
          <span class="alert-icon">!</span>
          {{ error }}
        </div>

        <!-- =========================
             Book Information Card
        ========================== -->
        <div class="book-form-card">

          <!-- Card Header -->
          <div
            class="d-flex flex-column flex-sm-row justify-content-between align-items-sm-start gap-3 border-bottom-custom pb-3 mb-4"
          >
            <div>
              <h2 class="card-title mb-1">
                Book Information
              </h2>

              <p class="text-secondary small mb-0">
                Update the details of the selected book.
              </p>
            </div>

            <span class="badge-custom">
              ID: #{{ book.id }}
            </span>
          </div>

          <form @submit.prevent="saveChanges">

            <!-- =====================
                 Title
            ====================== -->
            <div class="mb-4">
              <label
                for="title"
                class="form-label-custom"
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
                placeholder="Enter book title"
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

            <!-- =====================
                 Author + Year
            ====================== -->
            <div class="row g-3 mb-4">

              <div class="col-md-8">
                <label
                  for="author"
                  class="form-label-custom"
                >
                  Author
                  <span class="required">*</span>
                </label>

                <select
                  id="author"
                  v-model="form.authorId"
                  class="form-select custom-input"
                  :class="{ 'input-error': authorError }"
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
                  class="form-label-custom"
                >
                  Publication Year
                  <span class="required">*</span>
                </label>

                <input
                  id="year"
                  v-model="form.year"
                  type="number"
                  class="form-control custom-input"
                  :class="{ 'input-error': yearError }"
                  :min="1800"
                  :max="currentYear"
                />

                <div
                  v-if="yearError"
                  class="validation-error"
                >
                  {{ yearError }}
                </div>
              </div>

            </div>

            <!-- =====================
                 Cover URL
            ====================== -->
            <div class="mb-4">
              <label
                for="cover"
                class="form-label-custom"
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

            <!-- =====================
                 Cover Preview
            ====================== -->
            <div class="mb-4">

              <label class="form-label-custom">
                Current Cover
              </label>

              <div class="cover-preview">

                <div class="cover-image-wrapper">

                  <div
                    v-if="coverLoading"
                    class="cover-loading"
                  >
                    <span
                      class="spinner-border spinner-border-sm"
                      aria-hidden="true"
                    ></span>
                  </div>

                  <img
                    v-if="form.coverUrl && !coverImageError"
                    :src="form.coverUrl"
                    :alt="form.title || 'Book cover'"
                    class="cover-image"
                    @load="handleCoverLoad"
                    @error="handleCoverError"
                  />

                  <div
                    v-else
                    class="cover-placeholder"
                  >
                    <span>📖</span>
                  </div>

                </div>

                <div class="cover-info">

                  <div class="cover-title">
                    {{ form.title || "Untitled Book" }}
                  </div>

                  <div class="cover-subtitle">
                    {{
                      coverImageError
                        ? "Unable to load cover image"
                        : "Current book cover"
                    }}
                  </div>

                  <div
                    v-if="coverImageError"
                    class="cover-warning"
                  >
                    Check the image URL and try again.
                  </div>

                </div>

              </div>
            </div>

            <!-- =====================
                 Tags
            ====================== -->
            <div class="mb-4">

              <label class="form-label-custom">
                Tags
              </label>

              <div
                class="tags-container"
                :class="{ 'input-error': tagsError }"
              >

                <span
                  v-for="(tag, index) in form.tags"
                  :key="`${tag}-${index}`"
                  class="tag-option"
                >
                  {{ tag }}

                  <button
                    type="button"
                    class="remove-tag"
                    :aria-label="`Remove ${tag}`"
                    @click="removeTag(index)"
                  >
                    ×
                  </button>
                </span>

                <div class="tag-input-wrapper">
                  <input
                    v-model="newTag"
                    type="text"
                    class="tag-input"
                    placeholder="Add tag..."
                    :disabled="form.tags.length >= 8"
                    @keydown="handleTagKeydown"
                  />

                  <button
                    type="button"
                    class="tag-add"
                    :disabled="
                      !newTag.trim() ||
                      form.tags.length >= 8
                    "
                    @click="addTag"
                  >
                    + Add
                  </button>
                </div>

              </div>

              <div
                v-if="tagsError"
                class="validation-error"
              >
                {{ tagsError }}
              </div>

              <div
                v-else
                class="form-help"
              >
                Add up to 8 tags. Press Enter or click Add.
              </div>
            </div>

            <!-- =====================
                 Description
            ====================== -->
            <div class="mb-4">

              <div
                class="d-flex justify-content-between align-items-center mb-2"
              >
                <label
                  for="description"
                  class="form-label-custom mb-0"
                >
                  Description
                </label>

                <span class="character-count">
                  {{ form.description.length }}/2000
                </span>
              </div>

              <textarea
                id="description"
                v-model="form.description"
                class="form-control custom-input"
                :class="{ 'input-error': descriptionError }"
                rows="6"
                placeholder="Enter a description for this book..."
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

            <!-- =====================
                 Metadata
            ====================== -->
            <div class="metadata-card mb-4">

              <div class="metadata-heading">
                Book Metadata
              </div>

              <div class="row g-3">

                <div class="col-sm-6">
                  <div class="metadata-label">
                    Created
                  </div>

                  <div class="metadata-value">
                    {{ formattedCreatedAt }}
                  </div>
                </div>

                <div class="col-sm-6">
                  <div class="metadata-label">
                    Last Updated
                  </div>

                  <div class="metadata-value">
                    {{ formattedUpdatedAt }}
                  </div>
                </div>

              </div>
            </div>

            <!-- =====================
                 Actions
            ====================== -->
            <div class="border-top-custom pt-3">

              <div
                class="d-flex flex-column-reverse flex-sm-row justify-content-end gap-2"
              >

                <button
                  type="button"
                  class="btn btn-secondary-custom"
                  :disabled="isSaving"
                  @click="cancelEdit"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  class="btn btn-primary-custom"
                  :disabled="isSaving || !formIsValid"
                >

                  <span
                    v-if="isSaving"
                    class="spinner-border spinner-border-sm me-2"
                    aria-hidden="true"
                  ></span>

                  {{
                    isSaving
                      ? "Saving..."
                      : "Save Changes"
                  }}

                </button>

              </div>

            </div>

          </form>
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
  color: #8b8177;
}

.breadcrumb-text span {
  margin: 0 6px;
  color: #b7aa9c;
}

/* ========================================
   Main Card
======================================== */

.book-form-card {
  background: #ffffff;
  border: 1px solid #e9e2d8;
  border-radius: 18px;
  padding: 28px;
  box-shadow: 0 12px 35px rgba(76, 54, 32, 0.08);
}

.card-title {
  font-family: "Playfair Display", serif;
  color: #2b2118;
  font-size: 1.25rem;
  font-weight: 700;
}

.border-bottom-custom {
  border-bottom: 1px solid #eee7de;
}

.border-top-custom {
  border-top: 1px solid #eee7de;
}

/* ========================================
   Badge
======================================== */

.badge-custom {
  padding: 7px 13px;
  border-radius: 999px;

  background: #f4eee6;
  border: 1px solid #e3d7c9;

  color: #76502f;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
}

/* ========================================
   Labels / Inputs
======================================== */

.form-label-custom {
  display: block;
  margin-bottom: 8px;

  color: #34281e;
  font-size: 14px;
  font-weight: 600;
}

.required {
  color: #a34b35;
}

.custom-input {
  min-height: 44px;

  background: #fff;
  border: 1px solid #ded4c8;
  border-radius: 10px;

  color: #302820;
  font-family: "DM Sans", sans-serif;

  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    background 0.2s ease;
}

.custom-input:hover {
  border-color: #cbbba9;
}

.custom-input:focus {
  background: #fff;
  color: #302820;

  border-color: #8b5e34;

  box-shadow:
    0 0 0 3px rgba(139, 94, 52, 0.12);
}

.custom-input::placeholder {
  color: #aaa096;
}

textarea.custom-input {
  min-height: 150px;
  resize: vertical;
}

select.custom-input {
  cursor: pointer;
}

.input-error {
  border-color: #b35b46 !important;
}

.input-error:focus {
  box-shadow:
    0 0 0 3px rgba(179, 91, 70, 0.12) !important;
}

.form-help {
  margin-top: 6px;
  color: #978d83;
  font-size: 12px;
}

.validation-error {
  margin-top: 6px;
  color: #a34b35;
  font-size: 12px;
  font-weight: 500;
}

.character-count {
  color: #9b9187;
  font-size: 12px;
}

/* ========================================
   Cover Preview
======================================== */

.cover-preview {
  display: flex;
  align-items: center;
  gap: 16px;

  padding: 15px;

  background: #faf8f5;
  border: 1px solid #e9e2d8;
  border-radius: 14px;
}

.cover-image-wrapper {
  position: relative;

  width: 58px;
  height: 76px;

  flex-shrink: 0;

  overflow: hidden;
  border-radius: 8px;

  background: #f1ebe3;
}

.cover-image {
  width: 100%;
  height: 100%;

  display: block;

  object-fit: cover;
}

.cover-placeholder {
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  background:
    radial-gradient(
      circle at 30% 20%,
      #ffffff 0,
      #f7f0e7 45%,
      #e9ded1 100%
    );

  color: #8b5e34;
  font-size: 24px;
}

.cover-loading {
  position: absolute;
  inset: 0;

  z-index: 2;

  display: flex;
  align-items: center;
  justify-content: center;

  background: rgba(248, 244, 237, 0.9);
  color: #8b5e34;
}

.cover-info {
  min-width: 0;
}

.cover-title {
  color: #33271d;
  font-weight: 600;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.cover-subtitle {
  margin-top: 3px;
  color: #948a80;
  font-size: 12px;
}

.cover-warning {
  margin-top: 5px;
  color: #a34b35;
  font-size: 12px;
}

/* ========================================
   Tags
======================================== */

.tags-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;

  min-height: 50px;
  padding: 9px 10px;

  background: #fff;
  border: 1px solid #ded4c8;
  border-radius: 10px;

  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.tags-container:focus-within {
  border-color: #8b5e34;
  box-shadow:
    0 0 0 3px rgba(139, 94, 52, 0.12);
}

.tags-container.input-error {
  border-color: #b35b46;
}

.tag-option {
  display: inline-flex;
  align-items: center;
  gap: 4px;

  padding: 6px 9px;

  border-radius: 999px;

  background: #f1e7dc;
  border: 1px solid #dfcdbc;

  color: #704b2c;
  font-size: 12px;
  font-weight: 600;
}

.remove-tag {
  width: 18px;
  height: 18px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  padding: 0;

  border: 0;
  border-radius: 50%;

  background: transparent;
  color: #8b5e34;

  cursor: pointer;

  transition:
    background 0.2s ease,
    color 0.2s ease;
}

.remove-tag:hover {
  background: #8b5e34;
  color: #fff;
}

.tag-input-wrapper {
  display: flex;
  align-items: center;
  gap: 5px;

  flex: 1;
  min-width: 150px;
}

.tag-input {
  min-width: 80px;
  flex: 1;

  border: 0;
  outline: none;

  background: transparent;

  color: #302820;
  font-size: 13px;
}

.tag-input::placeholder {
  color: #aaa096;
}

.tag-add {
  padding: 5px 9px;

  border: 1px solid #dfd2c4;
  border-radius: 999px;

  background: #faf7f3;
  color: #76502f;

  font-size: 12px;
  font-weight: 600;

  cursor: pointer;

  transition: all 0.2s ease;
}

.tag-add:hover:not(:disabled) {
  background: #8b5e34;
  border-color: #8b5e34;
  color: #fff;
}

.tag-add:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

/* ========================================
   Metadata
======================================== */

.metadata-card {
  padding: 18px;

  background: #faf8f5;
  border: 1px solid #e9e2d8;
  border-radius: 14px;
}

.metadata-heading {
  margin-bottom: 15px;

  color: #6d5845;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.metadata-label {
  margin-bottom: 4px;

  color: #9a9086;
  font-size: 12px;
}

.metadata-value {
  color: #392c21;
  font-size: 14px;
  font-weight: 600;
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
  min-height: 42px;

  background: #8b5e34;
  border: 1px solid #8b5e34;
  color: #fff;

  padding: 8px 18px;
}

.btn-primary-custom:hover:not(:disabled) {
  background: #754d2a;
  border-color: #754d2a;
  color: #fff;

  box-shadow: 0 6px 16px rgba(139, 94, 52, 0.18);
}

.btn-primary-custom:disabled {
  background: #c7b7a7;
  border-color: #c7b7a7;
  color: #fff;
  opacity: 0.7;
}

.btn-secondary-custom {
  min-height: 42px;

  background: #fff;
  border: 1px solid #d9cec1;
  color: #62452e;

  padding: 8px 18px;
}

.btn-secondary-custom:hover:not(:disabled) {
  background: #f6f0e9;
  border-color: #cbbbaa;
  color: #533820;
}

.btn:disabled {
  cursor: not-allowed;
}

/* ========================================
   Alerts
======================================== */

.alert-success-custom,
.alert-error-custom {
  display: flex;
  align-items: center;
  gap: 10px;

  border-radius: 12px;
  padding: 12px 15px;

  font-size: 14px;
}

.alert-success-custom {
  background: #edf6ef;
  border: 1px solid #cfe3d2;
  color: #416b49;
}

.alert-error-custom {
  background: #fbefec;
  border: 1px solid #ead0c9;
  color: #8d493a;
}

.alert-icon {
  width: 22px;
  height: 22px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  flex-shrink: 0;

  border-radius: 50%;

  background: currentColor;
  color: #fff;

  font-size: 12px;
  font-weight: 700;
}

.alert-success-custom .alert-icon {
  background: #648e6b;
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
  width: 230px;
  height: 40px;
}

.skeleton-subtitle {
  width: 280px;
  height: 15px;
}

.skeleton-button {
  width: 135px;
  height: 42px;
  border-radius: 9px;
}

.skeleton-heading {
  width: 160px;
  height: 22px;
}

.skeleton-text {
  width: 250px;
  height: 13px;
}

.skeleton-badge {
  width: 75px;
  height: 29px;
  border-radius: 999px;
}

.skeleton-label {
  width: 100px;
  height: 14px;
}

.skeleton-input {
  width: 100%;
  height: 44px;
  border-radius: 10px;
}

.skeleton-help {
  width: 260px;
  height: 11px;
}

.skeleton-cover {
  width: 100%;
  height: 105px;
  border-radius: 14px;
}

.skeleton-tags {
  width: 100%;
  height: 50px;
  border-radius: 10px;
}

.skeleton-textarea {
  width: 100%;
  height: 150px;
  border-radius: 10px;
}

/* ========================================
   Responsive
======================================== */

@media (max-width: 768px) {
  .main-wrapper {
    padding: 22px 16px;
  }

  .book-form-card {
    padding: 20px;
  }
}

@media (max-width: 576px) {
  .main-wrapper {
    padding: 16px 12px;
  }

  .book-form-card {
    padding: 17px;
    border-radius: 14px;
  }

  .page-title {
    font-size: 2rem;
  }

  .cover-preview {
    align-items: flex-start;
  }

  .tag-input-wrapper {
    width: 100%;
    flex-basis: 100%;
  }

  .tag-add {
    flex-shrink: 0;
  }
}
</style>