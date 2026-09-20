<script setup>
import Book from "@/components/Book.vue";
import { useBookStore } from "@/stores/bookStore";
import { ref, computed } from "vue";

const props = defineProps({
  msg: {
    type: String,
    default: "Books"
  },

  tags: {
    type: Array,
    default: () => []
  },

  renderAuthor: {
    type: Boolean,
    default: false
  },

  author: {
    type: Object,
    default: null
  }
});

const bookStore = useBookStore();

const numberOfShowedBooks = ref(8);


/* =========================
   Related Books
========================= */

const relatedBooks = computed(() => {

  // Books related to tags
  if (props.tags.length > 0) {

    const books = props.tags.flatMap(tag =>
      bookStore.getRelatedBooks(tag)
    );

    // Remove duplicate books
    return [
      ...new Map(
        books.map(book => [book.id, book])
      ).values()
    ];
  }


  // Books written by author
  if (props.author) {

    return bookStore.getAuthorBooks(
      props.author.id
    );
  }


  // Default: all books
  return bookStore.allBooks;
});


/* =========================
   Load More
========================= */

function showMoreBooks() {

  if (numberOfShowedBooks.value < relatedBooks.value.length) {
    numberOfShowedBooks.value += 8;
  }

}
</script>


<template>

  <section class="book-section">

    <div class="container">

      <!-- Section Header -->
      <div class="section-header">

        <div class="section-heading">

          <span class="section-eyebrow">
            {{ author ? "Author Collection" : "Our Collection" }}
          </span>

          <h2 class="section-title">
            {{ msg }}
          </h2>

          <div class="heading-line"></div>

        </div>


        <!-- Count -->
        <div
          v-if="relatedBooks.length > 0"
          class="book-count"
        >
          <span class="count-number">
            {{ relatedBooks.length }}
          </span>

          <span class="count-label">
            {{ relatedBooks.length === 1 ? "book" : "books" }}
          </span>
        </div>

      </div>


      <!-- Books -->
      <div
        v-if="relatedBooks.length > 0"
        class="row g-4"
      >

        <Book
          v-for="book in relatedBooks.slice(0, numberOfShowedBooks)"
          :key="book.id"
          :book="book"
          :render-author="renderAuthor"
          class="col-sm-6 col-md-4 col-lg-3"
        />

      </div>


      <!-- Empty State -->
      <div
        v-else
        class="empty-state"
      >

        <div class="empty-icon">
          📚
        </div>

        <h3>
          No books found
        </h3>

        <p>
          We couldn't find any books matching your current selection.
        </p>

      </div>


      <!-- Load More -->
      <div
        v-if="numberOfShowedBooks < relatedBooks.length"
        class="load-more-wrapper"
      >

        <button
          type="button"
          class="load-more-btn"
          @click="showMoreBooks"
        >
          <span>Load More Books</span>
          <span class="arrow">↓</span>
        </button>

        <p class="remaining-text">
          Showing
          <strong>
            {{ Math.min(numberOfShowedBooks, relatedBooks.length) }}
          </strong>
          of
          <strong>{{ relatedBooks.length }}</strong>
          books
        </p>

      </div>


      <!-- All Books Message -->
      <div
        v-else-if="relatedBooks.length > 0 && numberOfShowedBooks >= relatedBooks.length"
        class="all-books-message"
      >
        <span>✦</span>
        You've reached the end of the collection.
        <span>✦</span>
      </div>

    </div>

  </section>

</template>


<style scoped>

/* =========================
   Section
========================= */

.book-section {
  padding: 70px 0;
  background: #f8f4ed;
}


/* =========================
   Section Header
========================= */

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  gap: 30px;

  margin-bottom: 40px;
}

.section-heading {
  position: relative;
}

.section-eyebrow {
  display: block;

  margin-bottom: 8px;

  color: #8b5e34;

  font-size: 0.75rem;
  font-weight: 700;

  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.section-title {
  margin: 0;

  color: #2b2118;

  font-family: "Playfair Display", serif;

  font-size: clamp(2rem, 4vw, 2.8rem);
  font-weight: 700;
}

.heading-line {
  width: 45px;
  height: 3px;

  margin-top: 14px;

  border-radius: 10px;

  background: #8b5e34;
}


/* =========================
   Book Count
========================= */

.book-count {
  display: flex;
  align-items: baseline;
  gap: 6px;

  padding: 8px 14px;

  border: 1px solid #e5dbce;
  border-radius: 30px;

  background: #fff;

  white-space: nowrap;
}

.count-number {
  color: #8b5e34;

  font-size: 1.1rem;
  font-weight: 700;
}

.count-label {
  color: #817467;

  font-size: 0.8rem;
}


/* =========================
   Load More
========================= */

.load-more-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 45px;
}

.load-more-btn {
  display: inline-flex;
  align-items: center;
  gap: 12px;

  padding: 12px 25px;

  border: 1px solid #8b5e34;
  border-radius: 8px;

  background: transparent;
  color: #8b5e34;

  font-family: "DM Sans", sans-serif;
  font-size: 0.9rem;
  font-weight: 700;

  cursor: pointer;

  transition: all 0.25s ease;
}

.load-more-btn:hover {
  background: #8b5e34;
  color: white;

  transform: translateY(-2px);

  box-shadow: 0 8px 20px rgba(139, 94, 52, 0.18);
}

.arrow {
  font-size: 1rem;

  transition: transform 0.25s ease;
}

.load-more-btn:hover .arrow {
  transform: translateY(3px);
}

.remaining-text {
  margin: 12px 0 0;

  color: #8a7c6d;

  font-size: 0.8rem;
}

.remaining-text strong {
  color: #5f5145;
}


/* =========================
   All Books Message
========================= */

.all-books-message {
  display: flex;
  justify-content: center;
  align-items: center;

  gap: 10px;

  margin-top: 45px;

  color: #8a7c6d;

  font-size: 0.85rem;
}

.all-books-message span {
  color: #8b5e34;
}


/* =========================
   Empty State
========================= */

.empty-state {
  padding: 70px 20px;

  border: 1px dashed #d8cbbd;
  border-radius: 16px;

  background: rgba(255, 255, 255, 0.6);

  text-align: center;
}

.empty-icon {
  margin-bottom: 15px;

  font-size: 2.5rem;
}

.empty-state h3 {
  margin-bottom: 8px;

  color: #2b2118;

  font-family: "Playfair Display", serif;
  font-size: 1.5rem;
}

.empty-state p {
  margin: 0;

  color: #817467;

  font-size: 0.9rem;
}


/* =========================
   Responsive
========================= */

@media (max-width: 767.98px) {

  .book-section {
    padding: 50px 0;
  }

  .section-header {
    flex-direction: column;
    align-items: flex-start;

    margin-bottom: 30px;
  }

  .book-count {
    align-self: flex-start;
  }

}

</style>