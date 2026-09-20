<script setup>
import { computed } from "vue";

const props = defineProps({
  book: {
    type: Object,
    required: true
  },

  author: {
    type: Object,
    required: true
  }
});

/*
 * Generate unique accordion IDs for this book.
 * This prevents conflicts if more than one accordion
 * is rendered on the same page.
 */
const accordionId = computed(() => {
  return `book-info-${props.book.id}`;
});

const collapseOneId = computed(() => {
  return `${accordionId.value}-book`;
});

const collapseTwoId = computed(() => {
  return `${accordionId.value}-author`;
});

const collapseThreeId = computed(() => {
  return `${accordionId.value}-details`;
});
</script>


<template>

  <section class="accordion-section">

    <div class="container">

      <!-- Section Heading -->
      <div class="section-header">

        <h2 class="section-title">
          Book Info
        </h2>

        <p class="section-description">
          Learn more about the story, its author, and its publication details.
        </p>

      </div>


      <!-- Accordion -->
      <div
        class="book-accordion accordion"
        :id="accordionId"
      >

        <!-- About the Book -->
        <div class="accordion-item">

          <h2 class="accordion-header">

            <button
              class="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              :data-bs-target="`#${collapseOneId}`"
              aria-expanded="true"
              :aria-controls="collapseOneId"
            >
              <span class="accordion-number">
                01
              </span>

              <span>
                About the Book
              </span>
            </button>

          </h2>

          <div
            :id="collapseOneId"
            class="accordion-collapse collapse show"
            :data-bs-parent="`#${accordionId}`"
          >

            <div class="accordion-body">

              <p class="description">
                {{ book.description }}
              </p>

            </div>

          </div>

        </div>


        <!-- About the Author -->
        <div class="accordion-item">

          <h2 class="accordion-header">

            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              :data-bs-target="`#${collapseTwoId}`"
              aria-expanded="false"
              :aria-controls="collapseTwoId"
            >
              <span class="accordion-number">
                02
              </span>

              <span>
                About the Author
              </span>
            </button>

          </h2>

          <div
            :id="collapseTwoId"
            class="accordion-collapse collapse"
            :data-bs-parent="`#${accordionId}`"
          >

            <div class="accordion-body">

              <h3 class="author-name">
                {{ author.name }}
              </h3>

              <p class="author-description">
                {{ author.brief || author.bio }}
              </p>

              <RouterLink
                :to="`/authors/${author.id}`"
                class="author-link"
              >
                See more about {{ author.name }}
                <span>→</span>
              </RouterLink>

            </div>

          </div>

        </div>


        <!-- Publication Details -->
        <div class="accordion-item">

          <h2 class="accordion-header">

            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              :data-bs-target="`#${collapseThreeId}`"
              aria-expanded="false"
              :aria-controls="collapseThreeId"
            >
              <span class="accordion-number">
                03
              </span>

              <span>
                Publication Details
              </span>
            </button>

          </h2>

          <div
            :id="collapseThreeId"
            class="accordion-collapse collapse"
            :data-bs-parent="`#${accordionId}`"
          >

            <div class="accordion-body">

              <!-- Tags -->
              <div class="detail-row">

                <span class="detail-label">
                  Tags
                </span>

                <div class="tags">

                  <span
                    v-for="tag in book.tags"
                    :key="tag"
                    class="tag"
                  >
                    {{ tag }}
                  </span>

                </div>

              </div>


              <!-- Published Year -->
              <div class="detail-row">

                <span class="detail-label">
                  Published
                </span>

                <span class="detail-value">
                  {{ book.year }}
                </span>

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

.accordion-section {
  padding: 60px 0;

  background: #fff;
}


/* =========================
   Header
========================= */

.section-header {
  max-width: 700px;

  margin: 0 auto 35px;

  text-align: center;
}

.section-eyebrow {
  display: inline-block;

  margin-bottom: 8px;

  color: #8b5e34;

  font-size: 0.75rem;
  font-weight: 700;

  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.section-title {
  margin: 0 0 10px;

  color: #2b2118;

  font-family: "Playfair Display", serif;

  font-size: clamp(2rem, 4vw, 2.7rem);
  font-weight: 700;
}

.section-description {
  margin: 0;

  color: #817467;

  font-size: 0.95rem;
  line-height: 1.7;
}


/* =========================
   Accordion
========================= */

.book-accordion {
  max-width: 900px;

  margin: 0 auto;

  border: 1px solid #e9e2d8;
  border-radius: 14px;

  overflow: hidden;

  box-shadow: 0 12px 35px rgba(50, 35, 20, 0.06);
}

.accordion-item {
  border: none;

  border-bottom: 1px solid #e9e2d8;

  background: #fff;
}

.accordion-item:last-child {
  border-bottom: none;
}


/* =========================
   Accordion Button
========================= */

.accordion-button {
  display: flex;
  align-items: center;

  gap: 14px;

  padding: 20px 24px;

  background: #fff !important;

  color: #2b2118 !important;

  font-family: "DM Sans", sans-serif;

  font-size: 0.95rem;
  font-weight: 700;

  box-shadow: none !important;
}

.accordion-button:hover {
  color: #8b5e34 !important;
}

.accordion-button:not(.collapsed) {
  color: #8b5e34 !important;

  background: #fcfaf7 !important;
}


/* Bootstrap arrow */

.accordion-button::after {
  margin-left: auto;

  filter:
    sepia(30%)
    saturate(500%)
    hue-rotate(350deg);
}

.accordion-button:focus {
  border-color: transparent;

  box-shadow:
    0 0 0 3px rgba(139, 94, 52, 0.1) !important;
}


/* =========================
   Number
========================= */

.accordion-number {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 34px;
  height: 34px;

  flex-shrink: 0;

  border-radius: 50%;

  background: #f1e9df;
  color: #8b5e34;

  font-size: 0.72rem;
  font-weight: 700;
}


/* =========================
   Body
========================= */

.accordion-body {
  padding: 0 24px 25px 72px;

  color: #6f645a;

  font-size: 0.9rem;

  line-height: 1.8;
}

.description,
.author-description {
  margin: 0;
}


/* =========================
   Author
========================= */

.author-name {
  margin: 0 0 8px;

  color: #2b2118;

  font-family: "Playfair Display", serif;

  font-size: 1.25rem;
  font-weight: 700;
}

.author-description {
  margin-bottom: 12px;
}

.author-link {
  display: inline-flex;
  align-items: center;

  gap: 8px;

  color: #8b5e34;

  font-size: 0.85rem;
  font-weight: 700;

  text-decoration: none;

  transition: all 0.25s ease;
}

.author-link:hover {
  color: #5f3c21;
}

.author-link span {
  transition: transform 0.25s ease;
}

.author-link:hover span {
  transform: translateX(4px);
}


/* =========================
   Publication Details
========================= */

.detail-row {
  display: flex;
  align-items: flex-start;

  gap: 25px;

  padding: 12px 0;

  border-bottom: 1px solid #eee7df;
}

.detail-row:last-child {
  border-bottom: none;
}

.detail-label {
  min-width: 90px;

  color: #8a7c6d;

  font-size: 0.75rem;
  font-weight: 700;

  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.detail-value {
  color: #40352c;

  font-weight: 600;
}


/* =========================
   Tags
========================= */

.tags {
  display: flex;
  flex-wrap: wrap;

  gap: 7px;
}

.tag {
  padding: 4px 10px;

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

  transform: translateY(-1px);
}


/* =========================
   Mobile
========================= */

@media (max-width: 575.98px) {

  .accordion-section {
    padding: 45px 0;
  }

  .accordion-button {
    padding: 16px;
  }

  .accordion-body {
    padding: 0 16px 20px 16px;
  }

  .accordion-number {
    width: 30px;
    height: 30px;
  }

  .detail-row {
    flex-direction: column;

    gap: 8px;
  }

  .detail-label {
    min-width: auto;
  }

}

</style>