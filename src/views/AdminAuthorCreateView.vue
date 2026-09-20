<script setup>
import { computed, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useAuthorStore } from "@/stores/AuthorStore";

const router = useRouter();
const authorStore = useAuthorStore();

/* -----------------------------
   Form state
----------------------------- */

const form = ref({
  name: "",
  avatarUrl: "",
  bio: ""
});

const isSubmitting = ref(false);
const error = ref(null);
const successMessage = ref(null);

/* -----------------------------
   Avatar state
----------------------------- */

const avatarLoading = ref(false);
const avatarError = ref(false);

watch(
  () => form.value.avatarUrl,
  (newUrl) => {
    avatarError.value = false;

    if (!newUrl.trim()) {
      avatarLoading.value = false;
      return;
    }

    avatarLoading.value = true;
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

/* -----------------------------
   Validation
----------------------------- */

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

const avatarErrorMessage = computed(() => {
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
    !avatarErrorMessage.value &&
    !bioError.value
  );
});

/* -----------------------------
   Submit
----------------------------- */

async function createAuthor() {
  error.value = null;
  successMessage.value = null;

  if (!formIsValid.value) {
    error.value = "Please fix the validation errors before submitting.";
    return;
  }

  isSubmitting.value = true;

  try {
    const authorData = {
      name: form.value.name.trim(),
      avatarUrl: form.value.avatarUrl.trim(),
      bio: form.value.bio.trim(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    /*
      Use the store action if it exists.
      Expected store action:
      authorStore.addAuthor(authorData)
    */
    if (typeof authorStore.addAuthor === "function") {
      await authorStore.addAuthor(authorData);
    } else if (typeof authorStore.createAuthor === "function") {
      await authorStore.createAuthor(authorData);
    } else {
      throw new Error(
        "No author creation action was found in AuthorStore."
      );
    }

    successMessage.value = "Author created successfully.";

    // Give the user a moment to see the success message.
    setTimeout(() => {
      router.push("/admin/authors");
    }, 700);
  } catch (err) {
    console.error(err);

    error.value =
      err?.response?.data?.message ||
      err?.message ||
      "Unable to create the author. Please try again.";
  } finally {
    isSubmitting.value = false;
  }
}

/* -----------------------------
   Navigation
----------------------------- */

function cancel() {
  if (isSubmitting.value) return;

  router.push("/admin/authors");
}
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
            Admin
            <span>/</span>
            Authors
            <span>/</span>
            New Author
          </div>

          <h1 class="page-title mb-1">
            Add New Author
          </h1>

          <p class="page-description mb-0">
            Create a new author and add them to your library.
          </p>
        </div>

        <RouterLink
          to="/admin/authors"
          class="btn btn-secondary-custom"
        >
          ← Back to Authors
        </RouterLink>
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
              Enter the details of the new author below.
            </p>
          </div>

          <span class="badge-custom">
            New Author
          </span>
        </div>

        <!-- Error Message -->
        <div
          v-if="error"
          class="alert alert-danger-custom d-flex align-items-start gap-3"
          role="alert"
        >
          <div class="alert-icon">
            !
          </div>

          <div>
            <strong>Something went wrong</strong>
            <div class="small mt-1">
              {{ error }}
            </div>
          </div>
        </div>

        <!-- Success Message -->
        <div
          v-if="successMessage"
          class="alert alert-success-custom d-flex align-items-start gap-3"
          role="alert"
        >
          <div class="success-icon">
            ✓
          </div>

          <div>
            <strong>Author created</strong>
            <div class="small mt-1">
              {{ successMessage }}
            </div>
          </div>
        </div>

        <form @submit.prevent="createAuthor">

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
              :disabled="isSubmitting"
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
              :class="{ 'input-error': avatarErrorMessage }"
              placeholder="https://example.com/avatar.jpg"
              :disabled="isSubmitting"
            />

            <div
              v-if="avatarErrorMessage"
              class="validation-message"
            >
              {{ avatarErrorMessage }}
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
              Avatar Preview
            </label>

            <div class="avatar-preview">

              <!-- Actual Image -->
              <div class="avatar-container">
                <img
                  v-if="form.avatarUrl && !avatarError"
                  :src="form.avatarUrl"
                  alt="Author avatar preview"
                  class="avatar-image"
                  @load="handleAvatarLoad"
                  @error="handleAvatarError"
                />

                <!-- Loading -->
                <div
                  v-if="avatarLoading && !avatarError"
                  class="avatar-loading"
                >
                  <div class="spinner-border spinner-border-sm">
                  </div>
                </div>

                <!-- Fallback -->
                <div
                  v-if="!form.avatarUrl || avatarError"
                  class="avatar-placeholder"
                >
                  {{ form.name?.charAt(0)?.toUpperCase() || "A" }}
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
                    Avatar preview loaded.
                  </span>

                  <span v-else>
                    Enter an avatar URL to preview it here.
                  </span>
                </div>
              </div>

            </div>
          </div>

          <!-- Biography -->
          <div class="form-group mb-4">

            <div class="d-flex justify-content-between align-items-center">
              <label
                for="bio"
                class="form-label fw-semibold mb-0"
              >
                Biography
              </label>

              <span
                class="character-count"
                :class="{ 'count-warning': form.bio.length > 700 }"
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
              :disabled="isSubmitting"
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

          <!-- Information -->
          <div class="info-card mb-4">

            <div class="d-flex gap-3">

              <div class="info-icon">
                i
              </div>

              <div>
                <div class="fw-semibold mb-1">
                  Author information
                </div>

                <p class="text-secondary small mb-0">
                  After creating the author, books can be associated
                  with them using their author ID.
                </p>
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
                :disabled="isSubmitting"
                @click="cancel"
              >
                Cancel
              </button>

              <button
                type="submit"
                class="btn btn-primary-custom"
                :disabled="isSubmitting || !formIsValid"
              >

                <span
                  v-if="isSubmitting"
                  class="spinner-border spinner-border-sm me-2"
                  aria-hidden="true"
                ></span>

                <span>
                  {{ isSubmitting ? "Creating Author..." : "Create Author" }}
                </span>

              </button>

            </div>

          </div>

        </form>

      </div>

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
    box-shadow 0.2s ease,
    background 0.2s ease;
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
   Avatar Preview
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
   Information Card
========================================= */

.info-card {
  padding: 17px;

  background: #f8f4ed;

  border: 1px solid #e5d9ca;
  border-radius: 12px;
}

.info-icon,
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

.info-icon {
  background: #eadbca;
  color: #8b5e34;
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
}
</style>