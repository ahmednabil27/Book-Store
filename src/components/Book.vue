<script setup>
import { computed, ref } from "vue";
import { useAuthorStore } from "@/stores/AuthorStore";

const props = defineProps({
  book: {
    type: Object,
    required: true
  }
});

const authorStore = useAuthorStore();

const author = computed(() => {
  return authorStore.getAuthorById(props.book.authorId);
});


/* ========================================
   IMAGE STATE
======================================== */

const imageSrc = ref(props.book.coverUrl || "");
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
  imageLoading.value = false;
  imageError.value = true;
}


/* ========================================
   FALLBACK TEXT
======================================== */

const fallbackInitial = computed(() => {
  return props.book.title?.charAt(0)?.toUpperCase() || "?";
});
</script>


<template>
  <RouterLink
    :to="`/books/${book.id}`"
    class="book-link text-decoration-none"
  >
    <article class="book-card">

      <!-- ========================================
           BOOK COVER
      ======================================== -->

      <div class="book-cover-wrapper">

        <!-- Actual image -->
        <img
          v-if="imageSrc && !imageError"
          :src="imageSrc"
          :alt="`${book.title} cover`"
          class="book-cover"
          :class="{ 'image-hidden': imageLoading }"
          @load="handleImageLoad"
          @error="handleImageError"
        />

        <!-- Loading placeholder -->
        <div
          v-if="imageLoading && !imageError"
          class="cover-placeholder cover-loading"
        >
          <span class="placeholder-icon">
            ✦
          </span>
        </div>

        <!-- Image error / missing image -->
        <div
          v-if="imageError || !imageSrc"
          class="cover-placeholder"
        >
          <div class="placeholder-book">
            <span class="placeholder-initial">
              {{ fallbackInitial }}
            </span>

            <span class="placeholder-title">
              {{ book.title }}
            </span>

            <span class="placeholder-text">
              Cover unavailable
            </span>
          </div>
        </div>

        <!-- Year badge -->
        <span class="year-badge">
          {{ book.year }}
        </span>

      </div>


      <!-- ========================================
           BOOK INFORMATION
      ======================================== -->

      <div class="book-content">

        <!-- Title -->
        <h3 class="book-title">
          {{ book.title }}
        </h3>


        <!-- Author -->
        <p
          v-if="author"
          class="book-author"
        >
          <span class="author-label">
            by
          </span>

          {{ author.name }}
        </p>


        <!-- Description -->
        <p class="book-description">
          {{ book.description }}
        </p>


        <!-- Tags -->
        <div
          v-if="book.tags?.length"
          class="tags"
        >
          <span
            v-for="tag in book.tags"
            :key="tag"
            class="tag"
          >
            {{ tag }}
          </span>
        </div>


        <!-- View Book -->
        <div class="view-book">
          <span>
            View Book
          </span>

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
   CARD
======================================== */

.book-link {
  display: block;
  height: 100%;
}

.book-card {
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

.book-card:hover {
  transform: translateY(-7px);

  border-color: #d8c8b7;

  box-shadow: 0 14px 30px rgba(70, 50, 30, 0.12);
}


/* ========================================
   COVER
======================================== */

.book-cover-wrapper {
  position: relative;

  height: 300px;

  overflow: hidden;

  background: #f1e9df;
}

.book-cover {
  width: 100%;
  height: 100%;

  display: block;

  object-fit: cover;

  opacity: 1;

  transition:
    opacity 0.3s ease,
    transform 0.5s ease;
}

.image-hidden {
  opacity: 0;
}

.book-card:hover .book-cover {
  transform: scale(1.04);
}


/* ========================================
   COVER PLACEHOLDER
======================================== */

.cover-placeholder {
  position: absolute;

  inset: 0;

  display: flex;

  align-items: center;
  justify-content: center;

  background:
    radial-gradient(
      circle at center,
      #ffffff 0%,
      #f1e9df 70%
    );

  color: #8b5e34;
}

.cover-loading {
  background: #f1e9df;
}

.placeholder-icon {
  font-size: 30px;

  animation: pulse 1.5s ease-in-out infinite;
}


/* ========================================
   FALLBACK BOOK COVER
======================================== */

.placeholder-book {
  width: 145px;
  min-height: 190px;

  display: flex;

  flex-direction: column;

  align-items: center;
  justify-content: center;

  gap: 10px;

  padding: 20px;

  background: #ffffff;

  border: 1px solid #ddcfbf;

  border-radius: 4px;

  box-shadow:
    8px 8px 0 #e4d7c9,
    0 8px 20px rgba(70, 50, 30, 0.08);

  text-align: center;
}

.placeholder-initial {
  width: 55px;
  height: 55px;

  display: flex;

  align-items: center;
  justify-content: center;

  background: #f1e9df;

  border-radius: 50%;

  color: #8b5e34;

  font-family: "Playfair Display", serif;

  font-size: 28px;
  font-weight: 700;
}

.placeholder-title {
  color: #3e3228;

  font-family: "Playfair Display", serif;

  font-size: 14px;
  font-weight: 700;

  line-height: 1.3;
}

.placeholder-text {
  color: #9a8c7e;

  font-size: 10px;
  font-weight: 600;

  text-transform: uppercase;

  letter-spacing: 0.7px;
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
   YEAR BADGE
======================================== */

.year-badge {
  position: absolute;

  top: 14px;
  right: 14px;

  padding: 5px 11px;

  background: rgba(255, 255, 255, 0.94);

  color: #8b5e34;

  border: 1px solid #e3d7c9;

  border-radius: 20px;

  font-size: 12px;
  font-weight: 700;

  letter-spacing: 0.3px;
}


/* ========================================
   CONTENT
======================================== */

.book-content {
  padding: 20px 20px 18px;
}


/* ========================================
   TITLE
======================================== */

.book-title {
  margin: 0 0 7px;

  color: #2b2119;

  font-family: "Playfair Display", serif;

  font-size: 21px;
  font-weight: 700;

  line-height: 1.25;

  transition: color 0.25s ease;
}

.book-card:hover .book-title {
  color: #8b5e34;
}


/* ========================================
   AUTHOR
======================================== */

.book-author {
  margin: 0 0 12px;

  color: #6f6257;

  font-size: 14px;
  font-weight: 500;
}

.author-label {
  margin-right: 3px;

  color: #a4978b;

  font-style: italic;
}


/* ========================================
   DESCRIPTION
======================================== */

.book-description {
  margin: 0 0 16px;

  color: #71675f;

  font-size: 14px;

  line-height: 1.55;

  display: -webkit-box;

  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;

  overflow: hidden;
}


/* ========================================
   TAGS
======================================== */

.tags {
  display: flex;

  flex-wrap: wrap;

  gap: 6px;

  margin-bottom: 17px;
}

.tag {
  display: inline-block;

  padding: 4px 10px;

  background: #f5eee6;

  color: #8b5e34;

  border: 1px solid #e3d7c9;

  border-radius: 20px;

  font-size: 11px;
  font-weight: 600;

  transition:
    background 0.25s ease,
    color 0.25s ease;
}

.book-card:hover .tag {
  background: #efe4d7;
}


/* ========================================
   VIEW BOOK
======================================== */

.view-book {
  display: flex;

  align-items: center;
  justify-content: space-between;

  padding-top: 13px;

  border-top: 1px solid #eee7df;

  color: #8b5e34;

  font-size: 13px;
  font-weight: 700;
}

.arrow {
  font-size: 18px;

  transition: transform 0.25s ease;
}

.book-card:hover .arrow {
  transform: translateX(5px);
}


/* ========================================
   RESPONSIVE
======================================== */

@media (max-width: 576px) {

  .book-cover-wrapper {
    height: 280px;
  }

  .book-content {
    padding: 18px;
  }

  .book-title {
    font-size: 20px;
  }

}

</style>