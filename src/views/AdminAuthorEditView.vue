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
            Admin <span>/</span> Authors <span>/</span> Edit
          </div>

          <h1 class="fw-bold mb-1">
            Edit Author
          </h1>

          <p class="text-secondary mb-0">
            Update the information of this author.
          </p>
        </div>

        <button class="btn btn-secondary-custom">
          ← Back to Authors
        </button>
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
              Update the details of the selected author.
            </p>
          </div>

          <span class="badge-custom">
            ID: #1
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
              value="Andy Weir"
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
              value="https://upload.wikimedia.org/wikipedia/commons/4/4b/Andy_Weir.jpg"
            />

            <div class="form-text text-secondary">
              Provide a URL for the author's avatar.
            </div>
          </div>

          <!-- Avatar Preview -->
          <div class="mb-4">

            <label class="form-label fw-semibold">
              Current Avatar
            </label>

            <div class="avatar-preview">

              <div class="avatar-placeholder">
                AW
              </div>

              <div>
                <div class="fw-semibold">
                  Andy Weir
                </div>

                <div class="text-secondary small">
                  Current author avatar
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
            >American novelist and software engineer, best known for The Martian and Project Hail Mary. His works often combine detailed scientific concepts with engaging stories and memorable characters.</textarea>

            <div class="form-text text-secondary">
              Maximum 800 characters.
            </div>

          </div>

          <!-- Author Statistics -->
          <div class="row g-3 mb-4">

            <!-- Books -->
            <div class="col-sm-6 col-lg-4">
              <div class="stat-card h-100">

                <div class="stat-label">
                  Books
                </div>

                <div class="stat-value">
                  3
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
                  #1
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

                <div class="stat-status">
                  Active
                </div>

                <div class="stat-note">
                  Currently published
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

/* Avatar */

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

  background: rgba(79, 124, 255, 0.18);
  border: 1px solid rgba(79, 124, 255, 0.35);

  color: #dce5ff;

  font-size: 18px;
  font-weight: 800;
}

/* Statistics */

.stat-card {
  padding: 16px;

  background: rgba(255, 255, 255, 0.045);
  border: 1px solid rgba(255, 255, 255, 0.1);

  border-radius: 12px;
}

.stat-label {
  font-size: 12px;
  opacity: 0.6;
}

.stat-value {
  margin-top: 5px;

  font-size: 25px;
  font-weight: 800;
}

.stat-note {
  margin-top: 3px;

  font-size: 12px;
  opacity: 0.5;
}

.stat-status {
  display: inline-block;

  margin-top: 6px;
  padding: 4px 10px;

  border-radius: 999px;

  background: rgba(25, 135, 84, 0.15);
  border: 1px solid rgba(25, 135, 84, 0.3);

  color: #75d8a7;

  font-size: 12px;
  font-weight: 700;
}

/* Metadata */

.metadata-card {
  padding: 16px;

  background: rgba(0, 0, 0, 0.16);
  border: 1px solid rgba(255, 255, 255, 0.08);

  border-radius: 12px;
}

.metadata-label {
  margin-bottom: 3px;

  font-size: 12px;
  opacity: 0.55;
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