<script setup>
import BookInfoAccordion from "./BookInfoAccordion.vue";
import { useAuthorStore } from "@/stores/AuthorStore.js";
import { computed } from "vue";

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
</script>


<template>

  <section class="hero-book">

    <div class="container">

      <div class="hero-book-card">

        <div class="row align-items-center g-0">

          <!-- Book Cover -->
          <div class="col-md-5">

            <div class="book-cover-wrapper">

              <div class="cover-decoration"></div>

              <img
                :src="book.coverUrl"
                :alt="`${book.title} cover`"
                class="book-cover"
              />

            </div>

          </div>


          <!-- Book Information -->
          <div class="col-md-7">

            <div class="book-content">

              <!-- Eyebrow -->
              <span class="book-eyebrow">
                Featured Book
              </span>


              <!-- Title -->
              <h1 class="book-title">
                {{ book.title }}
              </h1>


              <!-- Author -->
              <div
                v-if="author"
                class="author-info"
              >

                <span class="author-label">
                  Written by
                </span>

                <RouterLink
                  :to="`/authors/${author.id}`"
                  class="author-link"
                >
                  {{ author.name }}
                </RouterLink>

              </div>


              <!-- Description -->
              <p class="book-description">
                {{ book.description }}
              </p>


              <!-- Metadata -->
              <div class="book-meta">

                <div class="meta-item">

                  <span class="meta-label">
                    Published
                  </span>

                  <span class="meta-value">
                    {{ book.year }}
                  </span>

                </div>

                <div class="meta-divider"></div>

                <div class="meta-item">

                  <span class="meta-label">
                    Genre
                  </span>

                  <span class="meta-value">
                    {{ book.tags?.[0] || "Book" }}
                  </span>

                </div>

              </div>


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


              <!-- Actions -->
              <div class="book-actions">

                <RouterLink
                  :to="`/books/${book.id}`"
                  class="primary-btn"
                >
                  View Book
                  <span>→</span>
                </RouterLink>

                <RouterLink
                  v-if="author"
                  :to="`/authors/${author.id}`"
                  class="secondary-btn"
                >
                  About the Author
                </RouterLink>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  </section>

</template>


<style scoped>

/* =========================
   Section
========================= */

.hero-book {
  padding: 60px 0;

  background: #f8f4ed;
}


/* =========================
   Main Card
========================= */

.hero-book-card {
  overflow: hidden;

  border: 1px solid #e9e2d8;
  border-radius: 22px;

  background: #fff;

  box-shadow:
    0 20px 50px rgba(50, 35, 20, 0.08);
}


/* =========================
   Book Cover
========================= */

.book-cover-wrapper {
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  min-height: 500px;

  padding: 45px;

  background:
    radial-gradient(
      circle at center,
      #f1e9df 0%,
      #e8ddd0 100%
    );
}

.book-cover {
  position: relative;
  z-index: 2;

  width: 75%;
  max-width: 330px;
  height: 410px;

  object-fit: cover;

  border-radius: 5px;

  box-shadow:
    15px 20px 35px rgba(50, 35, 20, 0.22);

  transition: transform 0.4s ease;
}

.hero-book-card:hover .book-cover {
  transform: translateY(-7px) rotate(-1deg);
}


/* Decorative shape */

.cover-decoration {
  position: absolute;

  width: 280px;
  height: 280px;

  border-radius: 50%;

  background: rgba(139, 94, 52, 0.1);
}


/* =========================
   Content
========================= */

.book-content {
  padding: 50px;
}

.book-eyebrow {
  display: inline-block;

  margin-bottom: 12px;

  color: #8b5e34;

  font-size: 0.75rem;
  font-weight: 700;

  letter-spacing: 0.16em;
  text-transform: uppercase;
}


/* =========================
   Title
========================= */

.book-title {
  max-width: 600px;

  margin: 0 0 15px;

  color: #2b2118;

  font-family: "Playfair Display", serif;

  font-size: clamp(2.2rem, 4vw, 3.4rem);
  font-weight: 700;

  line-height: 1.15;
}


/* =========================
   Author
========================= */

.author-info {
  display: flex;
  align-items: center;
  gap: 7px;

  margin-bottom: 25px;
}

.author-label {
  color: #8a7c6d;

  font-size: 0.9rem;
}

.author-link {
  color: #8b5e34;

  font-size: 0.95rem;
  font-weight: 700;

  text-decoration: none;

  transition: color 0.25s ease;
}

.author-link:hover {
  color: #5f3c21;
}


/* =========================
   Description
========================= */

.book-description {
  max-width: 620px;

  margin-bottom: 25px;

  color: #6f645a;

  font-size: 0.95rem;
  line-height: 1.85;
}


/* =========================
   Metadata
========================= */

.book-meta {
  display: flex;
  align-items: center;

  gap: 20px;

  margin-bottom: 22px;
}

.meta-item {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.meta-label {
  color: #9a8d80;

  font-size: 0.7rem;
  font-weight: 600;

  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.meta-value {
  color: #40352c;

  font-size: 0.9rem;
  font-weight: 700;
}

.meta-divider {
  width: 1px;
  height: 35px;

  background: #e4dace;
}


/* =========================
   Tags
========================= */

.tags {
  display: flex;
  flex-wrap: wrap;

  gap: 7px;

  margin-bottom: 30px;
}

.tag {
  display: inline-block;

  padding: 5px 11px;

  border: 1px solid #e3d7c9;
  border-radius: 20px;

  background: #f5eee6;
  color: #8b5e34;

  font-size: 0.72rem;
  font-weight: 600;

  transition: all 0.25s ease;
}

.tag:hover {
  border-color: #8b5e34;

  background: #8b5e34;
  color: #fff;

  transform: translateY(-2px);
}


/* =========================
   Buttons
========================= */

.book-actions {
  display: flex;
  flex-wrap: wrap;

  gap: 12px;
}

.primary-btn,
.secondary-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  min-height: 44px;

  padding: 10px 18px;

  border-radius: 8px;

  font-size: 0.85rem;
  font-weight: 700;

  text-decoration: none;

  transition: all 0.25s ease;
}

.primary-btn {
  gap: 10px;

  border: 1px solid #8b5e34;

  background: #8b5e34;
  color: #fff;
}

.primary-btn:hover {
  border-color: #6f4728;

  background: #6f4728;
  color: #fff;

  transform: translateY(-2px);

  box-shadow: 0 8px 20px rgba(139, 94, 52, 0.2);
}

.primary-btn span {
  transition: transform 0.25s ease;
}

.primary-btn:hover span {
  transform: translateX(4px);
}

.secondary-btn {
  border: 1px solid #ddd1c4;

  background: transparent;
  color: #6a5a4b;
}

.secondary-btn:hover {
  border-color: #8b5e34;

  color: #8b5e34;

  transform: translateY(-2px);
}


/* =========================
   Tablet
========================= */

@media (max-width: 767.98px) {

  .hero-book {
    padding: 40px 0;
  }

  .book-cover-wrapper {
    min-height: 380px;

    padding: 35px;
  }

  .book-cover {
    width: 65%;
    height: 320px;
  }

  .book-content {
    padding: 35px 25px;
  }

  .book-title {
    font-size: 2.2rem;
  }

}


/* =========================
   Mobile
========================= */

@media (max-width: 575.98px) {

  .book-cover-wrapper {
    min-height: 330px;

    padding: 25px;
  }

  .book-cover {
    width: 65%;
    height: 280px;
  }

  .book-content {
    padding: 30px 20px;
  }

  .book-title {
    font-size: 2rem;
  }

  .book-description {
    font-size: 0.88rem;
  }

  .book-meta {
    gap: 15px;
  }

  .book-actions {
    flex-direction: column;
  }

  .primary-btn,
  .secondary-btn {
    width: 100%;
  }

}

</style>