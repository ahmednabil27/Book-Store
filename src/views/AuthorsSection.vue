<script setup>
import Author from "@/components/Author.vue";
import { useAuthorStore } from "@/stores/AuthorStore";
import { storeToRefs } from "pinia";

const authorStore = useAuthorStore();
const { allAuthors } = storeToRefs(authorStore);
</script>

<template>
  <section class="authors-section">
    <div class="container">

      <!-- Section Header -->
      <div class="section-header">
        <div class="section-heading">
          <span class="section-eyebrow">
            Our Writers
          </span>

          <h2 class="section-title">
            Authors
          </h2>

          <div class="heading-line"></div>

          <p class="section-description">
            Meet the writers behind the stories that fill our shelves.
          </p>
        </div>

        <!-- Author Count -->
        <div v-if="allAuthors.length > 0" class="author-count">
          <span class="count-number">
            {{ allAuthors.length }}
          </span>

          <span class="count-label">
            {{ allAuthors.length === 1 ? "author" : "authors" }}
          </span>
        </div>
      </div>


      <!-- Authors -->
      <div
        v-if="allAuthors.length > 0"
        class="authors-grid"
      >
        <Author
          v-for="author in allAuthors"
          :key="author.id"
          :author="author"
        />
      </div>


      <!-- Empty State -->
      <div
        v-else
        class="empty-state"
      >
        <div class="empty-icon">✦</div>

        <h3>No Authors Found</h3>

        <p>
          There are currently no authors in our collection.
        </p>
      </div>

    </div>
  </section>
</template>

<style scoped>

/* ========================================
   SECTION
======================================== */

.authors-section {
  padding: 65px 0 80px;

  background: #f8f4ed;
}


/* ========================================
   HEADER
======================================== */

.section-header {
  display: flex;

  align-items: flex-end;
  justify-content: space-between;

  gap: 30px;

  margin-bottom: 42px;
}

.section-heading {
  max-width: 650px;
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

.section-title {
  margin: 0;

  color: #2b2119;

  font-family: "Playfair Display", serif;

  font-size: clamp(34px, 5vw, 48px);
  font-weight: 700;

  line-height: 1.1;
}

.heading-line {
  width: 55px;
  height: 3px;

  margin: 15px 0 15px;

  background: #8b5e34;

  border-radius: 10px;
}

.section-description {
  max-width: 580px;

  margin: 0;

  color: #74695f;

  font-size: 15px;

  line-height: 1.7;
}


/* ========================================
   AUTHOR COUNT
======================================== */

.author-count {
  flex-shrink: 0;

  display: flex;

  align-items: baseline;

  gap: 7px;

  padding: 10px 17px;

  background: #ffffff;

  border: 1px solid #e8ded2;
  border-radius: 30px;

  box-shadow: 0 4px 14px rgba(70, 50, 30, 0.05);
}

.count-number {
  color: #8b5e34;

  font-family: "Playfair Display", serif;

  font-size: 22px;
  font-weight: 700;
}

.count-label {
  color: #766b61;

  font-size: 13px;
}


/* ========================================
   AUTHORS GRID
======================================== */

.authors-grid {
  display: grid;

  grid-template-columns:
    repeat(auto-fill, minmax(240px, 1fr));

  gap: 24px;
}


/* ========================================
   EMPTY STATE
======================================== */

.empty-state {
  padding: 70px 25px;

  text-align: center;

  background: #ffffff;

  border: 1px solid #e9e2d8;
  border-radius: 16px;

  box-shadow: 0 6px 20px rgba(70, 50, 30, 0.05);
}

.empty-icon {
  width: 55px;
  height: 55px;

  display: flex;

  align-items: center;
  justify-content: center;

  margin: 0 auto 18px;

  background: #f1e9df;

  border-radius: 50%;

  color: #8b5e34;

  font-size: 22px;
}

.empty-state h3 {
  margin-bottom: 8px;

  color: #2b2119;

  font-family: "Playfair Display", serif;

  font-size: 24px;
}

.empty-state p {
  margin: 0;

  color: #74695f;

  font-size: 14px;
}


/* ========================================
   RESPONSIVE
======================================== */

@media (max-width: 768px) {

  .authors-section {
    padding: 50px 0 65px;
  }

  .section-header {
    align-items: flex-start;

    flex-direction: column;

    margin-bottom: 32px;
  }

  .author-count {
    align-self: flex-start;
  }

  .authors-grid {
    grid-template-columns:
      repeat(auto-fill, minmax(200px, 1fr));

    gap: 18px;
  }
}


@media (max-width: 480px) {

  .authors-section {
    padding: 40px 0 55px;
  }

  .section-title {
    font-size: 36px;
  }

  .authors-grid {
    grid-template-columns: 1fr;

    gap: 16px;
  }
}

</style>