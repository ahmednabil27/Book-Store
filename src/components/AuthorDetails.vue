<script setup>
import BooksSection from "./BooksSection.vue";
import ChatBot from "./ChatBot.vue";

import { useAuthorStore } from "@/stores/AuthorStore.js";
import { useRoute } from "vue-router";
import { ref, computed, watch } from "vue";

const route = useRoute();
const authorStore = useAuthorStore();

const author = ref(null);
const isLoading = ref(true);
const error = ref(null);

/* ========================================
   AUTHOR IMAGE STATE
======================================== */

const imageSrc = ref("");
const imageLoading = ref(false);
const imageError = ref(false);


/* ========================================
   AUTHOR
======================================== */

async function loadAuthor() {
  isLoading.value = true;
  error.value = null;
  author.value = null;

  // Reset image state
  imageSrc.value = "";
  imageLoading.value = false;
  imageError.value = false;

  try {
    const id = Number(route.params.id);

    if (!id) {
      error.value = "Invalid author ID.";
      return;
    }

    const foundAuthor = authorStore.getAuthorById(id);

    if (!foundAuthor) {
      error.value = "Author not found.";
      return;
    }

    author.value = foundAuthor;

    // Pick the best available image
    imageSrc.value =
      foundAuthor.imageUrl ||
      foundAuthor.avatarUrl ||
      "";

    imageLoading.value = !!imageSrc.value;

  } catch (err) {
    console.error(err);
    error.value = "Unable to load author information.";
  } finally {
    isLoading.value = false;
  }
}


/* ========================================
   IMAGE HANDLERS
======================================== */

function handleImageLoad() {
  imageLoading.value = false;
  imageError.value = false;
}

function handleImageError() {
  // Try avatarUrl if imageUrl failed
  if (
    author.value?.avatarUrl &&
    imageSrc.value !== author.value.avatarUrl
  ) {
    imageSrc.value = author.value.avatarUrl;
    imageLoading.value = true;
    imageError.value = false;

    return;
  }

  // Both images failed
  imageLoading.value = false;
  imageError.value = true;
}


/* ========================================
   AUTHOR INITIAL
======================================== */

const authorInitial = computed(() => {
  return author.value?.name?.charAt(0)?.toUpperCase() || "?";
});


/* ========================================
   WATCH ROUTE
======================================== */

watch(
  () => route.params.id,
  loadAuthor,
  { immediate: true }
);
</script>


<template>

  <main class="author-details-page">

    <!-- ========================================
         LOADING STATE
    ======================================== -->

    <section
      v-if="isLoading"
      class="loading-section"
    >
      <div class="container">

        <div class="loading-header">
          <div class="skeleton skeleton-eyebrow"></div>
          <div class="skeleton skeleton-title"></div>
        </div>

        <div class="author-profile-card">

          <div class="skeleton skeleton-image"></div>

          <div class="skeleton-content">
            <div class="skeleton skeleton-small"></div>
            <div class="skeleton skeleton-name"></div>
            <div class="skeleton skeleton-text"></div>
            <div class="skeleton skeleton-text short"></div>
            <div class="skeleton skeleton-text shorter"></div>
          </div>

        </div>

      </div>
    </section>


    <!-- ========================================
         ERROR / NOT FOUND
    ======================================== -->

    <section
      v-else-if="error"
      class="error-section"
    >
      <div class="container">

        <div class="error-card">

          <div class="error-icon">
            ?
          </div>

          <span class="section-eyebrow">
            Author
          </span>

          <h1>
            {{ error }}
          </h1>

          <p>
            We couldn't find the author you're looking for.
          </p>

          <RouterLink
            to="/authors"
            class="primary-btn"
          >
            Browse Authors
            <span>→</span>
          </RouterLink>

        </div>

      </div>
    </section>


    <!-- ========================================
         AUTHOR DETAILS
    ======================================== -->

    <template v-else-if="author">

      <section class="author-hero">
        <div class="container">

          <div class="author-profile-card">

            <!-- Decorative background -->
            <div class="decorative-circle"></div>

            <div class="row align-items-center g-0">

              <!-- ========================================
                   IMAGE
              ======================================== -->

              <div class="col-md-4">

                <div class="author-image-wrapper">

                  <!-- Actual image -->
                  <img
                    v-if="imageSrc && !imageError"
                    :src="imageSrc"
                    :alt="`${author.name} portrait`"
                    class="author-image"
                    :class="{ 'image-hidden': imageLoading }"
                    @load="handleImageLoad"
                    @error="handleImageError"
                  />

                  <!-- Image loading -->
                  <div
                    v-if="imageLoading && !imageError"
                    class="image-placeholder image-loading"
                  >
                    <span class="placeholder-icon">
                      ✦
                    </span>
                  </div>

                  <!-- Image fallback -->
                  <div
                    v-if="imageError || !imageSrc"
                    class="image-placeholder"
                  >
                    <span class="placeholder-initial">
                      {{ authorInitial }}
                    </span>

                    <span class="placeholder-text">
                      No image available
                    </span>
                  </div>

                </div>

              </div>


              <!-- ========================================
                   AUTHOR INFORMATION
              ======================================== -->

              <div class="col-md-8">

                <div class="author-content">

                  <span class="section-eyebrow">
                    Meet the Author
                  </span>

                  <h1 class="author-name">
                    {{ author.name }}
                  </h1>

                  <div class="heading-line"></div>

                  <p class="author-bio">
                    {{ author.bio || "No biography available." }}
                  </p>

                  <blockquote
                    v-if="author.brief"
                    class="author-quote"
                  >
                    <span class="quote-mark">“</span>

                    <p>
                      {{ author.brief }}
                    </p>
                  </blockquote>

                  <div class="author-meta">

                    <div class="meta-item">
                      <span class="meta-label">
                        Profile
                      </span>

                      <span class="meta-value">
                        Author
                      </span>
                    </div>

                    <div class="meta-divider"></div>

                    <div class="meta-item">
                      <span class="meta-label">
                        Collection
                      </span>

                      <span class="meta-value">
                        Author's Works
                      </span>
                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>


      <!-- ========================================
           AUTHOR'S BOOKS
      ======================================== -->

      <section class="books-area">

        <BooksSection
          msg="Author's Work"
          :author="author"
        />

      </section>


      <!-- ========================================
           CHATBOT
      ======================================== -->

      <section class="chatbot-area">
        <div class="container">
          <ChatBot :author="author" />
        </div>
      </section>

    </template>

  </main>

</template>


<style scoped>

/* ========================================
   PAGE
======================================== */

.author-details-page {
  background: #f8f4ed;
  min-height: 100vh;
}


/* ========================================
   AUTHOR HERO
======================================== */

.author-hero {
  padding: 65px 0 55px;

  background: #f8f4ed;
}

.author-profile-card {
  position: relative;

  overflow: hidden;

  background: #ffffff;

  border: 1px solid #e9e2d8;
  border-radius: 20px;

  box-shadow: 0 10px 35px rgba(70, 50, 30, 0.08);
}


/* Decorative circle */

.decorative-circle {
  position: absolute;

  width: 400px;
  height: 400px;

  left: -170px;
  bottom: -210px;

  background: #f1e9df;

  border-radius: 50%;

  pointer-events: none;
}


/* ========================================
   IMAGE
======================================== */

.author-image-wrapper {
  position: relative;

  width: 100%;
  min-height: 430px;

  overflow: hidden;

  background: #f1e9df;
}

.author-image {
  width: 100%;
  height: 430px;

  display: block;

  object-fit: cover;

  transition:
    opacity 0.25s ease,
    transform 0.5s ease;
}

.author-image-wrapper:hover .author-image {
  transform: scale(1.025);
}

.image-hidden {
  opacity: 0;
}


/* ========================================
   IMAGE PLACEHOLDER
======================================== */

.image-placeholder {
  position: absolute;

  inset: 0;

  display: flex;

  flex-direction: column;

  align-items: center;
  justify-content: center;

  gap: 12px;

  background:
    radial-gradient(
      circle at center,
      #ffffff 0%,
      #f1e9df 70%
    );

  color: #8b5e34;

  text-align: center;
}

.placeholder-initial {
  width: 110px;
  height: 110px;

  display: flex;

  align-items: center;
  justify-content: center;

  background: #ffffff;

  border: 1px solid #ddcfbf;

  border-radius: 50%;

  color: #8b5e34;

  font-family: "Playfair Display", serif;

  font-size: 52px;
  font-weight: 700;

  box-shadow: 0 8px 25px rgba(70, 50, 30, 0.08);
}

.placeholder-icon {
  font-size: 32px;

  animation: pulse 1.5s ease-in-out infinite;
}

.placeholder-text {
  color: #887a6e;

  font-size: 13px;
  font-weight: 500;
}

.image-loading {
  background: #f1e9df;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 0.35;
  }

  50% {
    opacity: 1;
  }
}


/* ========================================
   AUTHOR CONTENT
======================================== */

.author-content {
  position: relative;

  z-index: 1;

  padding: 55px 55px 55px 50px;
}

.section-eyebrow {
  display: inline-block;

  margin-bottom: 8px;

  color: #8b5e34;

  font-size: 12px;
  font-weight: 700;

  letter-spacing: 2px;

  text-transform: uppercase;
}

.author-name {
  margin: 0;

  color: #2b2119;

  font-family: "Playfair Display", serif;

  font-size: clamp(36px, 5vw, 55px);
  font-weight: 700;

  line-height: 1.1;
}

.heading-line {
  width: 55px;
  height: 3px;

  margin: 18px 0 22px;

  background: #8b5e34;

  border-radius: 10px;
}


/* ========================================
   BIO
======================================== */

.author-bio {
  max-width: 680px;

  margin: 0 0 22px;

  color: #5f554d;

  font-size: 16px;

  line-height: 1.75;
}


/* ========================================
   QUOTE
======================================== */

.author-quote {
  position: relative;

  max-width: 650px;

  margin: 25px 0;

  padding: 18px 20px 18px 35px;

  background: #f8f4ed;

  border-left: 3px solid #8b5e34;

  border-radius: 0 10px 10px 0;
}

.author-quote p {
  margin: 0;

  color: #75695e;

  font-family: "Playfair Display", serif;

  font-size: 16px;

  font-style: italic;

  line-height: 1.6;
}

.quote-mark {
  position: absolute;

  top: 8px;
  left: 10px;

  color: #c6aa8c;

  font-family: "Playfair Display", serif;

  font-size: 30px;
}


/* ========================================
   META
======================================== */

.author-meta {
  display: flex;

  align-items: center;

  gap: 25px;

  margin-top: 28px;
}

.meta-item {
  display: flex;

  flex-direction: column;

  gap: 3px;
}

.meta-label {
  color: #a18f7d;

  font-size: 10px;
  font-weight: 700;

  letter-spacing: 1px;

  text-transform: uppercase;
}

.meta-value {
  color: #3e3228;

  font-size: 13px;
  font-weight: 600;
}

.meta-divider {
  width: 1px;
  height: 35px;

  background: #e2d8cd;
}


/* ========================================
   BOOKS AREA
======================================== */

.books-area {
  background: #f8f4ed;
}


/* ========================================
   CHATBOT
======================================== */

.chatbot-area {
  padding: 30px 0 70px;

  background: #ffffff;
}


/* ========================================
   LOADING STATE
======================================== */

.loading-section {
  padding: 65px 0 80px;

  background: #f8f4ed;
}

.loading-header {
  margin-bottom: 35px;
}

.skeleton {
  background:
    linear-gradient(
      90deg,
      #eee7df 25%,
      #f8f4ed 50%,
      #eee7df 75%
    );

  background-size: 200% 100%;

  animation: skeleton-loading 1.5s infinite;

  border-radius: 8px;
}

.skeleton-eyebrow {
  width: 120px;
  height: 12px;

  margin-bottom: 12px;
}

.skeleton-title {
  width: 220px;
  height: 42px;
}

.author-profile-card {
  min-height: 430px;
}

.skeleton-image {
  width: 100%;
  height: 430px;

  border-radius: 0;
}

.skeleton-content {
  padding: 50px;
}

.skeleton-small {
  width: 130px;
  height: 12px;

  margin-bottom: 15px;
}

.skeleton-name {
  width: 70%;
  height: 48px;

  margin-bottom: 25px;
}

.skeleton-text {
  width: 90%;
  height: 14px;

  margin-bottom: 12px;
}

.skeleton-text.short {
  width: 80%;
}

.skeleton-text.shorter {
  width: 55%;
}

@keyframes skeleton-loading {
  0% {
    background-position: 200% 0;
  }

  100% {
    background-position: -200% 0;
  }
}


/* ========================================
   ERROR STATE
======================================== */

.error-section {
  padding: 100px 0;

  background: #f8f4ed;
}

.error-card {
  max-width: 650px;

  margin: 0 auto;

  padding: 60px 30px;

  text-align: center;

  background: #ffffff;

  border: 1px solid #e9e2d8;
  border-radius: 18px;

  box-shadow: 0 8px 25px rgba(70, 50, 30, 0.06);
}

.error-icon {
  width: 65px;
  height: 65px;

  display: flex;

  align-items: center;
  justify-content: center;

  margin: 0 auto 20px;

  background: #f1e9df;

  border-radius: 50%;

  color: #8b5e34;

  font-family: "Playfair Display", serif;

  font-size: 28px;
  font-weight: 700;
}

.error-card h1 {
  margin: 5px 0 10px;

  color: #2b2119;

  font-family: "Playfair Display", serif;

  font-size: 32px;
}

.error-card p {
  margin-bottom: 25px;

  color: #74695f;
}


/* ========================================
   BUTTON
======================================== */

.primary-btn {
  display: inline-flex;

  align-items: center;

  gap: 10px;

  padding: 11px 20px;

  background: #8b5e34;

  color: #ffffff;

  border: 1px solid #8b5e34;
  border-radius: 8px;

  font-size: 13px;
  font-weight: 600;

  text-decoration: none;

  transition:
    background 0.25s ease,
    transform 0.25s ease,
    box-shadow 0.25s ease;
}

.primary-btn:hover {
  background: #704923;

  color: #ffffff;

  transform: translateY(-2px);

  box-shadow: 0 6px 15px rgba(139, 94, 52, 0.2);
}


/* ========================================
   RESPONSIVE
======================================== */

@media (max-width: 767px) {

  .author-hero {
    padding: 40px 0 45px;
  }

  .author-image-wrapper {
    min-height: 330px;
  }

  .author-image {
    height: 330px;
  }

  .author-content {
    padding: 35px 25px 40px;
  }

  .author-name {
    font-size: 38px;
  }

  .author-meta {
    gap: 15px;
  }

  .decorative-circle {
    width: 300px;
    height: 300px;

    left: -150px;
    bottom: -160px;
  }

  .skeleton-image {
    height: 330px;
  }

  .skeleton-content {
    padding: 35px 25px;
  }
}


@media (max-width: 480px) {

  .author-name {
    font-size: 34px;
  }

  .author-bio {
    font-size: 14px;
  }

  .author-meta {
    flex-direction: column;

    align-items: flex-start;

    gap: 12px;
  }

  .meta-divider {
    display: none;
  }

  .author-quote p {
    font-size: 14px;
  }
}

</style>