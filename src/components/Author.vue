<script setup>
import { ref } from "vue";

const props = defineProps({
  author: {
    type: Object,
    required: true
  }
});

/* ========================================
   IMAGE STATE
======================================== */

const imageSrc = ref(
  props.author.imageUrl || props.author.avatarUrl || ""
);

const imageLoading = ref(!!imageSrc.value);
const imageError = ref(false);


/* ========================================
   IMAGE HANDLERS
======================================== */

function handleImageLoad() {
  imageLoading.value = false;
  imageError.value = false;
}

function handleImageError() {
  // If imageUrl failed, try avatarUrl
  if (
    imageSrc.value !== props.author.avatarUrl &&
    props.author.avatarUrl
  ) {
    imageSrc.value = props.author.avatarUrl;
    imageLoading.value = true;
    imageError.value = false;

    return;
  }

  // Both images failed
  imageLoading.value = false;
  imageError.value = true;
}
</script>


<template>
  <RouterLink
    :to="`/authors/${author.id}`"
    class="author-link"
  >
    <article class="author-card">

      <!-- ========================================
           AUTHOR IMAGE
      ======================================== -->

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

        <!-- Loading placeholder -->
        <div
          v-if="imageLoading && !imageError"
          class="image-placeholder image-loading"
        >
          <span class="placeholder-icon">✦</span>
        </div>

        <!-- Final fallback -->
        <div
          v-if="imageError || !imageSrc"
          class="image-placeholder"
        >
          <span class="placeholder-initial">
            {{ author.name?.charAt(0)?.toUpperCase() || "?" }}
          </span>

          <span class="placeholder-text">
            No image available
          </span>
        </div>

        <!-- Hover overlay -->
        <div class="image-overlay">
          <span>View Author</span>

          <span class="arrow">
            →
          </span>
        </div>

      </div>


      <!-- ========================================
           AUTHOR INFORMATION
      ======================================== -->

      <div class="author-content">

        <span class="author-eyebrow">
          Author
        </span>

        <h3 class="author-name">
          {{ author.name }}
        </h3>

        <p class="author-bio">
          {{ author.bio || "No biography available." }}
        </p>

        <div class="author-footer">
          <span>Explore profile</span>

          <span class="arrow">
            →
          </span>
        </div>

      </div>

    </article>
  </RouterLink>
</template>


<style scoped>

/* ========================================
   LINK
======================================== */

.author-link {
  display: block;

  height: 100%;

  color: inherit;

  text-decoration: none;
}


/* ========================================
   CARD
======================================== */

.author-card {
  height: 100%;

  overflow: hidden;

  background: #ffffff;

  border: 1px solid #e9e2d8;
  border-radius: 16px;

  box-shadow: 0 6px 20px rgba(70, 50, 30, 0.06);

  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease,
    border-color 0.3s ease;
}

.author-card:hover {
  transform: translateY(-7px);

  border-color: #d8c8b7;

  box-shadow: 0 15px 32px rgba(70, 50, 30, 0.12);
}


/* ========================================
   IMAGE
======================================== */

.author-image-wrapper {
  position: relative;

  height: 245px;

  overflow: hidden;

  background: #f1e9df;
}

.author-image {
  width: 100%;
  height: 100%;

  display: block;

  object-fit: cover;

  transition:
    opacity 0.25s ease,
    transform 0.5s ease,
    filter 0.5s ease;
}

.image-hidden {
  opacity: 0;
}

.author-card:hover .author-image {
  transform: scale(1.05);

  filter: brightness(0.88);
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

  gap: 10px;

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
  width: 75px;
  height: 75px;

  display: flex;

  align-items: center;
  justify-content: center;

  background: #ffffff;

  border: 1px solid #ddcfbf;

  border-radius: 50%;

  color: #8b5e34;

  font-family: "Playfair Display", serif;

  font-size: 34px;
  font-weight: 700;

  box-shadow: 0 5px 15px rgba(70, 50, 30, 0.08);
}

.placeholder-icon {
  font-size: 28px;

  animation: pulse 1.5s ease-in-out infinite;
}

.placeholder-text {
  color: #887a6e;

  font-size: 12px;
  font-weight: 500;
}


/* Loading */

.image-loading {
  background: #f1e9df;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 0.4;
  }

  50% {
    opacity: 1;
  }
}


/* ========================================
   IMAGE HOVER OVERLAY
======================================== */

.image-overlay {
  position: absolute;

  inset: 0;

  display: flex;

  align-items: flex-end;
  justify-content: space-between;

  padding: 18px;

  background:
    linear-gradient(
      to top,
      rgba(43, 33, 25, 0.65),
      transparent 55%
    );

  color: #ffffff;

  font-size: 13px;
  font-weight: 600;

  opacity: 0;

  transition: opacity 0.3s ease;
}

.author-card:hover .image-overlay {
  opacity: 1;
}

.image-overlay .arrow {
  font-size: 19px;

  transition: transform 0.25s ease;
}

.author-card:hover .image-overlay .arrow {
  transform: translateX(5px);
}


/* ========================================
   CONTENT
======================================== */

.author-content {
  padding: 19px 20px 18px;
}


/* ========================================
   EYEBROW
======================================== */

.author-eyebrow {
  display: block;

  margin-bottom: 5px;

  color: #a18f7d;

  font-size: 10px;
  font-weight: 700;

  letter-spacing: 1.5px;

  text-transform: uppercase;
}


/* ========================================
   NAME
======================================== */

.author-name {
  margin: 0 0 9px;

  color: #2b2119;

  font-family: "Playfair Display", serif;

  font-size: 22px;
  font-weight: 700;

  line-height: 1.2;

  transition: color 0.25s ease;
}

.author-card:hover .author-name {
  color: #8b5e34;
}


/* ========================================
   BIO
======================================== */

.author-bio {
  margin: 0 0 17px;

  color: #74695f;

  font-size: 13px;

  line-height: 1.55;

  display: -webkit-box;

  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;

  overflow: hidden;
}


/* ========================================
   FOOTER
======================================== */

.author-footer {
  display: flex;

  align-items: center;
  justify-content: space-between;

  padding-top: 12px;

  border-top: 1px solid #eee7df;

  color: #8b5e34;

  font-size: 12px;
  font-weight: 700;
}

.author-footer .arrow {
  font-size: 17px;

  transition: transform 0.25s ease;
}

.author-card:hover .author-footer .arrow {
  transform: translateX(5px);
}


/* ========================================
   RESPONSIVE
======================================== */

@media (max-width: 576px) {
  .author-image-wrapper {
    height: 230px;
  }

  .author-content {
    padding: 17px 18px;
  }

  .author-name {
    font-size: 20px;
  }
}

</style>