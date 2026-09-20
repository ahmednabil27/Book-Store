<template>
  <section class="authors-section py-5">
    <div class="container py-lg-5">

      <SectionHeader
        eyebrow="The Writers"
        title="Meet the Authors"
        description="Discover the writers behind some of the most memorable stories in our collection."
      />

      <div class="row g-4">

        <div
          v-for="author in authors"
          :key="author.id"
          class="col-12 col-sm-6 col-lg-3"
        >
          <AuthorCard :author="author" />
        </div>

      </div>

      <div class="text-center mt-5">

        <RouterLink
          to="/authors"
          class="btn btn-outline-dark px-4 py-2"
        >
          Explore All Authors →
        </RouterLink>

      </div>

    </div>
  </section>
</template>

<script setup>
import SectionHeader from "./SectionHeader.vue"
import AuthorCard from "./AuthorCard.vue"

const authors = [
  {
    id: 1,
    name: "Andy Weir",
    bio: "American novelist known for science-fiction stories and technically detailed adventures.",
    avatarUrl: "https://ui-avatars.com/api/?name=Andy+Weir&background=8b5e34&color=fff"
  },
  {
    id: 2,
    name: "Brandon Sanderson",
    bio: "American fantasy author known for expansive worlds, magic systems, and epic storytelling.",
    avatarUrl: "https://ui-avatars.com/api/?name=Brandon+Sanderson&background=8b5e34&color=fff"
  },
  {
    id: 3,
    name: "Agatha Christie",
    bio: "English writer famous for detective fiction and some of the world's most celebrated mysteries.",
    avatarUrl: "https://ui-avatars.com/api/?name=Agatha+Christie&background=8b5e34&color=fff"
  },
  {
    id: 4,
    name: "J.R.R. Tolkien",
    bio: "English writer and philologist whose works helped define modern fantasy literature.",
    avatarUrl: "https://ui-avatars.com/api/?name=J.R.R.+Tolkien&background=8b5e34&color=fff"
  }
]
</script>

<style scoped>
.authors-section {
  background: #f8f4ed;
}
</style>