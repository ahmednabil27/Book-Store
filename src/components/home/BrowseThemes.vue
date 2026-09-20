<template>
  <section class="themes-section py-5">
    <div class="container py-lg-5">

      <SectionHeader
        eyebrow="Find Your Story"
        title="Browse by Theme"
        description="Whether you're looking for adventure, mystery, science fiction, or something completely different."
      />

      <div class="row g-3">

        <div
          v-for="theme in themes"
          :key="theme.name"
          class="col-12 col-sm-6 col-lg-4"
        >
          <ThemeCard :theme="theme" />
        </div>

      </div>

    </div>
  </section>
</template>

<script setup>
import SectionHeader from "./SectionHeader.vue"
import ThemeCard from "./ThemeCard.vue"

const themes = [
  {
    name: "Sci-Fi",
    icon: "🚀",
    count: 18
  },
  {
    name: "Fantasy",
    icon: "🪄",
    count: 24
  },
  {
    name: "Mystery",
    icon: "🔎",
    count: 16
  },
  {
    name: "Romance",
    icon: "❤️",
    count: 12
  },
  {
    name: "History",
    icon: "🏛️",
    count: 14
  },
  {
    name: "Psychology",
    icon: "🧠",
    count: 10
  }
]
</script>

<style scoped>
.themes-section {
  background: #f8f4ed;
}
</style>