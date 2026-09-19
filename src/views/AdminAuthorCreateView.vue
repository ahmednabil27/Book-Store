<script setup>
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
            Admin <span>/</span> Authors <span>/</span> New Author
          </div>

          <h1 class="fw-bold mb-1">
            Add New Author
          </h1>

          <p class="text-secondary mb-0">
            Create a new author and add them to your library.
          </p>
        </div>

        <RouterLink to="/admin/authors">
          <button class="btn btn-secondary-custom">
            ← Back to Authors
          </button>

        </RouterLink>
      </div>

      <!-- Form Card -->
      <div class="glass-card">

        <!-- Card Header -->
        <div
          class="d-flex flex-column flex-sm-row justify-content-between align-items-sm-start gap-3 border-bottom-custom pb-3 mb-4"
        >
          <div>
            <h2 class="h5 fw-bold mb-1">
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

        <form>

          <!-- Author Name -->
          <div class="mb-4">
            <label
              for="name"
              class="form-label fw-semibold"
            >
              Author Name
              <span class="text-danger">*</span>
            </label>

            <input
              id="name"
              type="text"
              class="form-control dark-input"
              placeholder="e.g. Andy Weir"
            />

            <div class="form-text text-secondary">
              Enter a name between 2 and 60 characters.
            </div>
          </div>

          <!-- Avatar URL -->
          <div class="mb-4">
            <label
              for="avatar"
              class="form-label fw-semibold"
            >
              Avatar URL
            </label>

            <input
              id="avatar"
              type="url"
              class="form-control dark-input"
              placeholder="https://example.com/avatar.jpg"
            />

            <div class="form-text text-secondary">
              Provide a URL for the author's avatar.
            </div>
          </div>

          <!-- Avatar Preview -->
          <div class="mb-4">

            <label class="form-label fw-semibold">
              Avatar Preview
            </label>

            <div class="avatar-preview">

              <div class="avatar-placeholder">
                👤
              </div>

              <div>
                <div class="fw-semibold">
                  Author Avatar
                </div>

                <div class="text-secondary small">
                  The avatar preview will appear here.
                </div>
              </div>

            </div>

          </div>

          <!-- Biography -->
          <div class="mb-4">

            <label
              for="bio"
              class="form-label fw-semibold"
            >
              Biography
            </label>

            <textarea
              id="bio"
              class="form-control dark-input"
              rows="7"
              placeholder="Write a short biography about the author..."
            ></textarea>

            <div class="form-text text-secondary">
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
                Create Author
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

/* Breadcrumb */

.breadcrumb-text {
  font-size: 13px;
  opacity: 0.65;
}

.breadcrumb-text span {
  margin: 0 6px;
  opacity: 0.5;
}

/* Main Card */

.glass-card {
  padding: 24px;

  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;

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

/* Avatar Preview */

.avatar-preview {
  display: flex;
  align-items: center;
  gap: 14px;

  padding: 14px;

  background: rgba(0, 0, 0, 0.18);
  border: 1px solid rgba(255, 255, 255, 0.1);

  border-radius: 12px;
}

.avatar-placeholder {
  width: 60px;
  height: 60px;

  display: flex;
  align-items: center;
  justify-content: center;

  flex-shrink: 0;

  border-radius: 50%;

  background: rgba(79, 124, 255, 0.15);
  border: 1px solid rgba(79, 124, 255, 0.35);

  font-size: 25px;
}

/* Information */

.info-card {
  padding: 16px;

  background: rgba(79, 124, 255, 0.07);
  border: 1px solid rgba(79, 124, 255, 0.18);

  border-radius: 12px;
}

.info-icon {
  width: 24px;
  height: 24px;

  display: flex;
  align-items: center;
  justify-content: center;

  flex-shrink: 0;

  border-radius: 50%;

  background: rgba(79, 124, 255, 0.2);
  color: #9db1ff;

  font-size: 13px;
  font-weight: 800;
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

/* Divider */

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