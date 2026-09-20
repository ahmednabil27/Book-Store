<template>
  <section class="py-5 featured-books">
    <div class="container py-lg-5">

      <SectionHeader
        eyebrow="Our Collection"
        title="Featured Books"
        description="Explore some of the stories waiting for you in our collection."
      />

      <div class="row g-4">

        <div
          v-for="book in books"
          :key="book.id"
          class="col-12 col-sm-6 col-lg-3"
        >
          <BookCard :book="book" />
        </div>

      </div>

      <div class="text-center mt-5">
        <RouterLink
          to="/books"
          class="btn btn-outline-dark px-4 py-2"
        >
          View All Books →
        </RouterLink>
      </div>

    </div>
  </section>
</template>

<script setup>
import SectionHeader from "./SectionHeader.vue"
import BookCard from "./BookCard.vue"

const books = [
  {
    id: 1,
    title: "Project Hail Mary",
    authorName: "Andy Weir",
    year: 2021,
    tags: ["Sci-Fi", "Space"],
    coverUrl:
      "https://covers.openlibrary.org/b/isbn/9780593135204-L.jpg"
  },
  {
    id: 2,
    title: "The Hobbit",
    authorName: "J.R.R. Tolkien",
    year: 1937,
    tags: ["Fantasy", "Adventure"],
    coverUrl:
      "https://covers.openlibrary.org/b/isbn/9780547928227-L.jpg"
  },
  {
    id: 3,
    title: "The Martian",
    authorName: "Andy Weir",
    year: 2011,
    tags: ["Sci-Fi", "Survival"],
    coverUrl:
      "https://covers.openlibrary.org/b/isbn/9780553418026-L.jpg"
  },
  {
    id: 4,
    title: "The Murder of Roger Ackroyd",
    authorName: "Agatha Christie",
    year: 1926,
    tags: ["Mystery", "Crime"],
    coverUrl:
      "https://covers.openlibrary.org/b/isbn/9780008192415-L.jpg"
  }
]
</script>

<style scoped>
.featured-books {
  background: #fff;
}
</style>