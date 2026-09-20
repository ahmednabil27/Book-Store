<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";

import { useAuthorStore } from "@/stores/AuthorStore";
import { useBookStore } from "@/stores/bookStore";

const route = useRoute();
const router = useRouter();

const authorStore = useAuthorStore();
const bookStore = useBookStore();

const { allAuthors } = storeToRefs(authorStore);
const { allBooks } = storeToRefs(bookStore);

/* =========================================
   Page State
========================================= */

const author = ref(null);

const isLoading = ref(true);
const isSaving = ref(false);

const error = ref(null);
const successMessage = ref(null);

/* =========================================
   Form
========================================= */

const form = ref({
  name: "",
  avatarUrl: "",
  bio: ""
});

/* =========================================
   Avatar State
========================================= */

const avatarLoading = ref(false);
const avatarError = ref(false);

/* =========================================
   Route ID
========================================= */

const authorId = computed(() => {
  const id = Number(route.params.id);

  return Number.isInteger(id) && id > 0 ? id : null;
});

/* =========================================
   Load Author
========================================= */

async function loadAuthor() {
  isLoading.value = true;
  error.value = null;
  successMessage.value = null;
  author.value = null;

  try {
    if (!authorId.value) {
      error.value = "Invalid author ID.";
      return;
    }

    /*
      Fetch authors if the store provides the action.
      This keeps the component compatible with
      the store-based architecture.
    */
    if (typeof authorStore.fetchAuthors === "function") {
      await authorStore.fetchAuthors();
    }

    /*
      Fetch books if necessary so the statistics
      can be calculated correctly.
    */
    if (
      typeof bookStore.fetchBooks === "function" &&
      allBooks.value.length === 0
    ) {
      await bookStore.fetchBooks();
    }

    const foundAuthor =
      typeof authorStore.getAuthorById === "function"
        ? authorStore.getAuthorById(authorId.value)
        : allAuthors.value.find(
            (item) => Number(item.id) === authorId.value
          );

    if (!foundAuthor) {
      error.value = "Author not found.";
      return;
    }

    author.value = foundAuthor;

    form.value = {
      name: foundAuthor.name || "",
      avatarUrl:
        foundAuthor.imageUrl ||
        foundAuthor.avatarUrl ||
        "",
      bio: foundAuthor.bio || ""
    };

    if (form.value.avatarUrl) {
      avatarLoading.value = true;
    }
  } catch (err) {
    console.error(err);

    error.value =
      err?.message ||
      "Unable to load author information.";
  } finally {
    isLoading.value = false;
  }
}

/* =========================================
   Avatar
========================================= */

watch(
  () => form.value.avatarUrl,
  (newUrl, oldUrl) => {
    avatarError.value = false;

    if (!newUrl.trim()) {
      avatarLoading.value = false;
      return;
    }

    if (newUrl !== oldUrl) {
      avatarLoading.value = true;
    }
  }
);

function handleAvatarLoad() {
  avatarLoading.value = false;
  avatarError.value = false;
}

function handleAvatarError() {
  avatarLoading.value = false;
  avatarError.value = true;
}

/* =========================================
   Validation
========================================= */

const nameError = computed(() => {
  const name = form.value.name.trim();

  if (!name) {
    return "Author name is required.";
  }

  if (name.length < 2) {
    return "Name must be at least 2 characters.";
  }

  if (name.length > 60) {
    return "Name must not exceed 60 characters.";
  }

  return "";
});

const avatarUrlError = computed(() => {
  const url = form.value.avatarUrl.trim();

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

const bioError = computed(() => {
  if (form.value.bio.length > 800) {
    return "Biography must not exceed 800 characters.";
  }

  return "";
});

const formIsValid = computed(() => {
  return (
    !nameError.value &&
    !avatarUrlError.value &&
    !bioError.value
  );
});

/* =========================================
   Statistics
========================================= */

const authorBooks = computed(() => {
  if (!author.value) {
    return [];
  }

  return allBooks.value.filter(
    (book) =>
      Number(book.authorId) === Number(author.value.id)
  );
});

const booksCount = computed(() => {
  return authorBooks.value.length;
});

const authorStatus = computed(() => {
  return booksCount.value > 0 ? "Active" : "No Books";
});

/* =========================================
   Metadata
========================================= */

function formatDate(date) {
  if (!date) {
    return "—";
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "—";
  }

  return parsedDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}

/* =========================================
   Save
========================================= */

async function saveAuthor() {
  error.value = null;
  successMessage.value = null;

  if (!formIsValid.value) {
    error.value =
      "Please fix the validation errors before saving.";
    return;
  }

  if (!author.value) {
    error.value = "Author information is unavailable.";
    return;
  }

  isSaving.value = true;

  try {
    const updatedAuthor = {
      ...author.value,

      name: form.value.name.trim(),

      avatarUrl: form.value.avatarUrl.trim(),

      bio: form.value.bio.trim(),

      updatedAt: new Date().toISOString()
    };

    /*
      Support whichever update action exists
      in your AuthorStore.
    */
    if (typeof authorStore.updateAuthor === "function") {
      await authorStore.updateAuthor(
        author.value.id,
        updatedAuthor
      );
    } else if (
      typeof authorStore.editAuthor === "function"
    ) {
      await authorStore.editAuthor(
        author.value.id,
        updatedAuthor
      );
    } else {
      throw new Error(
        "No author update action was found in AuthorStore."
      );
    }

    /*
      Keep local state synchronized.
    */
    author.value = {
      ...author.value,
      ...updatedAuthor
    };

    successMessage.value =
      "Author information updated successfully.";

    setTimeout(() => {
      router.push("/admin/authors");
    }, 700);
  } catch (err) {
    console.error(err);

    error.value =
      err?.response?.data?.message ||
      err?.message ||
      "Unable to update the author. Please try again.";
  } finally {
    isSaving.value = false;
  }
}

/* =========================================
   Navigation
========================================= */

function goBack() {
  if (isSaving.value) {
    return;
  }

  router.push("/admin/authors");
}

function cancel() {
  if (isSaving.value) {
    return;
  }

  router.push("/admin/authors");
}

/* =========================================
   Initial Load
========================================= */

onMounted(loadAuthor);
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
            <div class="skeleton skeleton-breadcrumb mb-3"></div>

            <div class="skeleton skeleton-title mb-2"></div>

            <div class="skeleton skeleton-description"></div>
          </div>

          <div class="skeleton skeleton-button"></div>
        </div>

        <!-- Card Skeleton -->
        <div class="form-card">

          <div
            class="d-flex justify-content-between gap-3 border-bottom-custom pb-4 mb-4"
          >
            <div class="w-50">
              <div class="skeleton skeleton-section-title mb-2"></div>
              <div class="skeleton skeleton-text"></div>
            </div>

            <div class="skeleton skeleton-badge"></div>
          </div>

          <div
            v-for="index in 5"
            :key="index"
            class="mb-4"
          >
            <div class="skeleton skeleton-label mb-2"></div>
            <div class="skeleton skeleton-input"></div>
          </div>

        </div>

      </template>

      <!-- =================================
           Error State
      ================================== -->

      <template v-else-if="error && !author">

        <div class="state-card">

          <div class="state-icon">
            !
          </div>

          <h2 class="state-title">
            Unable to load author
          </h2>

          <p class="text-secondary mb-4">
            {{ error }}
          </p>

          <div class="d-flex justify-content-center gap-2">

            <button
              type="button"
              class="btn btn-secondary-custom"
              @click="goBack"
            >
              ← Back to Authors
            </button>

            <button
              type="button"
              class="btn btn-primary-custom"
              @click="loadAuthor"
            >
              Try Again
            </button>

          </div>

        </div>

      </template>

      <!-- =================================
           Edit Form
      ================================== -->

      <template v-else>

        <!-- Page Header -->
        <div
          class="d-flex flex-column flex-md-row justify-content-between align-items-md-end gap-3 mb-4"
        >
          <div>

            <div class="breadcrumb-text mb-2">
              Admin
              <span>/</span>
              Authors
              <span>/</span>
              Edit
            </div>

            <h1 class="page-title mb-1">
              Edit Author
            </h1>

            <p class="page-description mb-0">
              Update the information of this author.
            </p>

          </div>

          <button
            type="button"
            class="btn btn-secondary-custom"
            :disabled="isSaving"
            @click="goBack"
          >
            ← Back to Authors
          </button>

        </div>

        <!-- Form Card -->
        <div class="form-card">

          <!-- Card Header -->
          <div
            class="card-header-custom d-flex flex-column flex-sm-row justify-content-between align-items-sm-start gap-3"
          >
            <div>

              <h2 class="section-title mb-1">
                Author Information
              </h2>

              <p class="text-secondary small mb-0">
                Update the details of the selected author.
              </p>

            </div>

            <span class="badge-custom">
              ID: #{{ author.id }}
            </span>

          </div>

          <!-- Error -->
          <div
            v-if="error"
            class="alert alert-danger-custom d-flex align-items-start gap-3"
            role="alert"
          >

            <div class="alert-icon">
              !
            </div>

            <div>
              <strong>Unable to save changes</strong>

              <div class="small mt-1">
                {{ error }}
              </div>
            </div>

          </div>

          <!-- Success -->
          <div
            v-if="successMessage"
            class="alert alert-success-custom d-flex align-items-start gap-3"
            role="alert"
          >

            <div class="success-icon">
              ✓
            </div>

            <div>
              <strong>Changes saved</strong>

              <div class="small mt-1">
                {{ successMessage }}
              </div>
            </div>

          </div>

          <form @submit.prevent="saveAuthor">

            <!-- Author Name -->
            <div class="form-group mb-4">

              <label
                for="name"
                class="form-label fw-semibold"
              >
                Author Name
                <span class="required">*</span>
              </label>

              <input
                id="name"
                v-model="form.name"
                type="text"
                class="form-control custom-input"
                :class="{ 'input-error': nameError }"
                placeholder="e.g. Andy Weir"
                maxlength="60"
                :disabled="isSaving"
              />

              <div
                v-if="nameError"
                class="validation-message"
              >
                {{ nameError }}
              </div>

              <div
                v-else
                class="form-hint"
              >
                Enter a name between 2 and 60 characters.
              </div>

            </div>

            <!-- Avatar URL -->
            <div class="form-group mb-4">

              <label
                for="avatar"
                class="form-label fw-semibold"
              >
                Avatar URL
              </label>

              <input
                id="avatar"
                v-model="form.avatarUrl"
                type="url"
                class="form-control custom-input"
                :class="{
                  'input-error': avatarUrlError
                }"
                placeholder="https://example.com/avatar.jpg"
                :disabled="isSaving"
              />

              <div
                v-if="avatarUrlError"
                class="validation-message"
              >
                {{ avatarUrlError }}
              </div>

              <div
                v-else
                class="form-hint"
              >
                Provide a URL for the author's avatar.
              </div>

            </div>

            <!-- Avatar Preview -->
            <div class="form-group mb-4">

              <label class="form-label fw-semibold">
                Current Avatar
              </label>

              <div class="avatar-preview">

                <div class="avatar-container">

                  <img
                    v-if="
                      form.avatarUrl &&
                      !avatarError
                    "
                    :src="form.avatarUrl"
                    :alt="`${form.name} avatar`"
                    class="avatar-image"
                    @load="handleAvatarLoad"
                    @error="handleAvatarError"
                  />

                  <div
                    v-if="
                      avatarLoading &&
                      !avatarError
                    "
                    class="avatar-loading"
                  >
                    <div
                      class="spinner-border spinner-border-sm"
                    ></div>
                  </div>

                  <div
                    v-if="
                      !form.avatarUrl ||
                      avatarError
                    "
                    class="avatar-placeholder"
                  >
                    {{
                      form.name?.charAt(0)?.toUpperCase()
                      || "A"
                    }}
                  </div>

                </div>

                <div class="avatar-info">

                  <div class="fw-semibold">
                    {{ form.name || "Author Avatar" }}
                  </div>

                  <div class="text-secondary small mt-1">

                    <span v-if="avatarLoading">
                      Loading image...
                    </span>

                    <span v-else-if="avatarError">
                      Unable to load image. Using fallback.
                    </span>

                    <span v-else-if="form.avatarUrl">
                      Current avatar preview.
                    </span>

                    <span v-else>
                      No avatar URL provided.
                    </span>

                  </div>

                </div>

              </div>

            </div>

            <!-- Biography -->
            <div class="form-group mb-4">

              <div
                class="d-flex justify-content-between align-items-center"
              >

                <label
                  for="bio"
                  class="form-label fw-semibold mb-0"
                >
                  Biography
                </label>

                <span
                  class="character-count"
                  :class="{
                    'count-warning':
                      form.bio.length > 700
                  }"
                >
                  {{ form.bio.length }}/800
                </span>

              </div>

              <textarea
                id="bio"
                v-model="form.bio"
                class="form-control custom-input mt-2"
                :class="{ 'input-error': bioError }"
                rows="7"
                maxlength="800"
                placeholder="Write a short biography about the author..."
                :disabled="isSaving"
              ></textarea>

              <div
                v-if="bioError"
                class="validation-message"
              >
                {{ bioError }}
              </div>

              <div
                v-else
                class="form-hint"
              >
                Maximum 800 characters.
              </div>

            </div>

            <!-- Statistics -->
            <div class="row g-3 mb-4">

              <!-- Books -->
              <div class="col-sm-6 col-lg-4">

                <div class="stat-card h-100">

                  <div class="stat-label">
                    Books
                  </div>

                  <div class="stat-value">
                    {{ booksCount }}
                  </div>

                  <div class="stat-note">
                    Books by this author
                  </div>

                </div>

              </div>

              <!-- Author ID -->
              <div class="col-sm-6 col-lg-4">

                <div class="stat-card h-100">

                  <div class="stat-label">
                    Author ID
                  </div>

                  <div class="stat-value">
                    #{{ author.id }}
                  </div>

                  <div class="stat-note">
                    Unique identifier
                  </div>

                </div>

              </div>

              <!-- Status -->
              <div class="col-sm-6 col-lg-4">

                <div class="stat-card h-100">

                  <div class="stat-label">
                    Status
                  </div>

                  <div
                    class="stat-status"
                    :class="{
                      'status-empty':
                        booksCount === 0
                    }"
                  >
                    {{ authorStatus }}
                  </div>

                  <div class="stat-note">
                    {{
                      booksCount > 0
                        ? "Currently published"
                        : "No books associated"
                    }}
                  </div>

                </div>

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
                    {{ formatDate(author.createdAt) }}
                  </div>

                </div>

                <div class="col-sm-6">

                  <div class="metadata-label">
                    Last Updated
                  </div>

                  <div class="metadata-value">
                    {{ formatDate(author.updatedAt) }}
                  </div>

                </div>

              </div>

            </div>

            <!-- Actions -->
            <div class="actions-wrapper pt-3">

              <div
                class="d-flex flex-column-reverse flex-sm-row justify-content-end gap-2"
              >

                <button
                  type="button"
                  class="btn btn-secondary-custom"
                  :disabled="isSaving"
                  @click="cancel"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  class="btn btn-primary-custom"
                  :disabled="
                    isSaving ||
                    !formIsValid
                  "
                >

                  <span
                    v-if="isSaving"
                    class="spinner-border spinner-border-sm me-2"
                    aria-hidden="true"
                  ></span>

                  {{
                    isSaving
                      ? "Saving Changes..."
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
/* =========================================
   Page
========================================= */

.main-wrapper {
  min-height: 100vh;
  padding: 32px 24px;

  background: #f8f4ed;
  color: #202020;
}

.page-title {
  font-family: "Playfair Display", serif;
  font-size: 2.2rem;
  font-weight: 700;
  color: #202020;
}

.page-description {
  color: #777;
}

.breadcrumb-text {
  font-size: 13px;
  color: #8b5e34;
  font-weight: 600;
}

.breadcrumb-text span {
  margin: 0 7px;
  color: #aaa;
}

/* =========================================
   Main Card
========================================= */

.form-card {
  max-width: 1000px;
  margin: 0 auto;

  padding: 28px;

  background: #fff;

  border: 1px solid #e9e2d8;
  border-radius: 18px;

  box-shadow: 0 12px 35px rgba(72, 48, 28, 0.08);
}

.card-header-custom {
  padding-bottom: 20px;
  margin-bottom: 26px;

  border-bottom: 1px solid #eee7de;
}

.section-title {
  font-family: "Playfair Display", serif;
  font-weight: 700;
  color: #202020;
}

/* =========================================
   Badge
========================================= */

.badge-custom {
  padding: 7px 13px;

  border-radius: 999px;

  background: #f3ebe1;
  border: 1px solid #e3d5c5;

  color: #8b5e34;

  font-size: 12px;
  font-weight: 700;

  white-space: nowrap;
}

/* =========================================
   Inputs
========================================= */

.form-label {
  font-size: 14px;
  color: #302820;
}

.required {
  color: #b84b4b;
}

.custom-input {
  padding: 11px 13px;

  background: #fff;
  border: 1px solid #dcd3c8;

  border-radius: 10px;

  color: #202020;

  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.custom-input::placeholder {
  color: #aaa;
}

.custom-input:hover {
  border-color: #cbbca9;
}

.custom-input:focus {
  background: #fff;

  border-color: #8b5e34;

  box-shadow: 0 0 0 3px rgba(139, 94, 52, 0.1);

  color: #202020;
}

.custom-input:disabled {
  background: #f5f1eb;
  cursor: not-allowed;
}

.input-error {
  border-color: #c75b5b !important;
}

.input-error:focus {
  box-shadow: 0 0 0 3px rgba(199, 91, 91, 0.1);
}

.form-hint {
  margin-top: 6px;

  font-size: 12px;
  color: #8a8178;
}

.validation-message {
  margin-top: 6px;

  font-size: 12px;
  color: #b84b4b;
}

/* =========================================
   Character Counter
========================================= */

.character-count {
  font-size: 12px;
  color: #8a8178;
}

.count-warning {
  color: #b06a32;
  font-weight: 600;
}

/* =========================================
   Avatar
========================================= */

.avatar-preview {
  display: flex;
  align-items: center;
  gap: 16px;

  padding: 16px;

  background: #faf7f2;

  border: 1px solid #e9e2d8;
  border-radius: 14px;
}

.avatar-container {
  position: relative;

  width: 68px;
  height: 68px;

  flex-shrink: 0;
}

.avatar-image,
.avatar-placeholder {
  width: 68px;
  height: 68px;

  border-radius: 50%;
}

.avatar-image {
  display: block;

  object-fit: cover;

  border: 2px solid #e3d5c5;
}

.avatar-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;

  background: #f0e5d7;
  border: 2px solid #dfcdb9;

  color: #8b5e34;

  font-family: "Playfair Display", serif;
  font-size: 25px;
  font-weight: 700;
}

.avatar-loading {
  position: absolute;
  inset: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  background: rgba(248, 244, 237, 0.82);

  color: #8b5e34;
}

.avatar-info {
  min-width: 0;
}

/* =========================================
   Statistics
========================================= */

.stat-card {
  padding: 17px;

  background: #faf7f2;

  border: 1px solid #e9e2d8;
  border-radius: 12px;

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.stat-card:hover {
  transform: translateY(-2px);

  box-shadow: 0 7px 18px rgba(72, 48, 28, 0.07);
}

.stat-label {
  font-size: 12px;
  color: #8a8178;
  font-weight: 600;
}

.stat-value {
  margin-top: 5px;

  color: #2b2118;

  font-family: "Playfair Display", serif;
  font-size: 25px;
  font-weight: 700;
}

.stat-note {
  margin-top: 3px;

  font-size: 12px;
  color: #8a8178;
}

.stat-status {
  display: inline-block;

  margin-top: 6px;
  padding: 5px 10px;

  border-radius: 999px;

  background: #edf6ee;
  border: 1px solid #cce2ce;

  color: #3f7146;

  font-size: 12px;
  font-weight: 700;
}

.status-empty {
  background: #f7f1e8;
  border-color: #e6d6c3;
  color: #8b5e34;
}

/* =========================================
   Metadata
========================================= */

.metadata-card {
  padding: 17px;

  background: #f8f4ed;

  border: 1px solid #e5d9ca;

  border-radius: 12px;
}

.metadata-label {
  margin-bottom: 3px;

  font-size: 12px;
  color: #8a8178;
}

.metadata-value {
  font-size: 14px;
  font-weight: 600;
  color: #3a3027;
}

/* =========================================
   Alerts
========================================= */

.alert {
  border-radius: 12px;
  margin-bottom: 24px;
}

.alert-danger-custom {
  padding: 14px;

  background: #fff4f3;
  border: 1px solid #efc9c5;

  color: #8f3d37;
}

.alert-icon,
.success-icon {
  width: 26px;
  height: 26px;

  display: flex;
  align-items: center;
  justify-content: center;

  flex-shrink: 0;

  border-radius: 50%;

  font-size: 13px;
  font-weight: 800;
}

.alert-icon {
  background: #f1d3cf;
  color: #a5463f;
}

.alert-success-custom {
  padding: 14px;

  background: #f2f8f2;
  border: 1px solid #cfe1cf;

  color: #3e6b43;
}

.success-icon {
  background: #dcebdc;
  color: #3e6b43;
}

/* =========================================
   Actions
========================================= */

.actions-wrapper {
  border-top: 1px solid #eee7de;
}

.btn {
  border-radius: 9px;
  font-weight: 600;

  transition:
    transform 0.2s ease,
    background 0.2s ease,
    box-shadow 0.2s ease;
}

.btn:hover:not(:disabled) {
  transform: translateY(-1px);
}

.btn:disabled {
  cursor: not-allowed;
}

/* Primary */

.btn-primary-custom {
  padding: 10px 18px;

  background: #8b5e34;
  border: 1px solid #8b5e34;

  color: #fff;
}

.btn-primary-custom:hover:not(:disabled) {
  background: #754d2b;
  border-color: #754d2b;

  color: #fff;

  box-shadow: 0 5px 14px rgba(139, 94, 52, 0.2);
}

.btn-primary-custom:disabled {
  background: #c7b6a4;
  border-color: #c7b6a4;
  color: #fff;
}

/* Secondary */

.btn-secondary-custom {
  padding: 10px 17px;

  background: #fff;

  border: 1px solid #d8cec2;

  color: #5d5146;
}

.btn-secondary-custom:hover:not(:disabled) {
  background: #f8f4ed;

  border-color: #c9b8a6;

  color: #8b5e34;
}

/* =========================================
   Error State
========================================= */

.state-card {
  max-width: 650px;

  margin: 80px auto;
  padding: 40px;

  text-align: center;

  background: #fff;

  border: 1px solid #e9e2d8;
  border-radius: 18px;

  box-shadow: 0 12px 35px rgba(72, 48, 28, 0.08);
}

.state-icon {
  width: 54px;
  height: 54px;

  display: flex;
  align-items: center;
  justify-content: center;

  margin: 0 auto 18px;

  border-radius: 50%;

  background: #f8e6e3;
  color: #a5463f;

  font-size: 22px;
  font-weight: 800;
}

.state-title {
  font-family: "Playfair Display", serif;
  font-weight: 700;
}

/* =========================================
   Loading Skeleton
========================================= */

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

@keyframes skeleton-loading {
  100% {
    transform: translateX(100%);
  }
}

.skeleton-breadcrumb {
  width: 190px;
  height: 14px;
}

.skeleton-title {
  width: 230px;
  height: 38px;
}

.skeleton-description {
  width: 320px;
  height: 17px;
}

.skeleton-button {
  width: 150px;
  height: 42px;
}

.skeleton-section-title {
  width: 180px;
  height: 23px;
}

.skeleton-text {
  width: 280px;
  height: 14px;
}

.skeleton-badge {
  width: 70px;
  height: 30px;
  border-radius: 999px;
}

.skeleton-label {
  width: 120px;
  height: 15px;
}

.skeleton-input {
  width: 100%;
  height: 44px;
}

/* =========================================
   Responsive
========================================= */

@media (max-width: 768px) {
  .main-wrapper {
    padding: 24px 16px;
  }

  .form-card {
    padding: 22px;
  }

  .page-title {
    font-size: 1.9rem;
  }
}

@media (max-width: 576px) {
  .main-wrapper {
    padding: 16px 12px;
  }

  .form-card {
    padding: 18px;
    border-radius: 14px;
  }

  .page-title {
    font-size: 1.7rem;
  }

  .avatar-preview {
    align-items: flex-start;
  }

  .actions-wrapper .btn {
    width: 100%;
  }

  .state-card {
    margin: 50px auto;
    padding: 28px 20px;
  }
}
</style>