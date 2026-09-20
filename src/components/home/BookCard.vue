<template>
  <article class="book-card h-100">

    <div class="book-cover-wrapper">
      <img
        :src="book.coverUrl"
        :alt="book.title"
        class="book-cover"
      />

      <span
        v-if="book.year"
        class="book-year"
      >
        {{ book.year }}
      </span>
    </div>

    <div class="book-info p-3">

      <div class="d-flex flex-wrap gap-1 mb-2">
        <span
          v-for="tag in book.tags?.slice(0, 2)"
          :key="tag"
          class="book-tag"
        >
          {{ tag }}
        </span>
      </div>

      <h3 class="book-title">
        {{ book.title }}
      </h3>

      <p class="book-author">
        {{ book.authorName }}
      </p>

      <RouterLink
        :to="`/books/${book.id}`"
        class="book-link"
      >
        View book →
      </RouterLink>

    </div>

  </article>
</template>

<script setup>
defineProps({
  book: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.book-card {
  overflow: hidden;
  border: 1px solid #e9e2d8;
  border-radius: 14px;
  background: #fff;
  transition: 0.3s ease;
}

.book-card:hover {
  transform: translateY(-7px);
  box-shadow: 0 20px 40px rgba(50, 35, 20, 0.12);
}

.book-cover-wrapper {
  position: relative;
  height: 300px;
  overflow: hidden;
  background: #eee;
}

.book-cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: 0.4s ease;
}

.book-card:hover .book-cover {
  transform: scale(1.04);
}

.book-year {
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 5px 9px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.9);
  color: #444;
  font-size: 0.7rem;
  font-weight: 700;
}

.book-tag {
  padding: 4px 8px;
  border-radius: 5px;
  background: #f1e9df;
  color: #8b5e34;
  font-size: 0.7rem;
  font-weight: 600;
}

.book-title {
  margin-bottom: 5px;
  color: #222;
  font-size: 1rem;
  font-weight: 700;
}

.book-author {
  margin-bottom: 12px;
  color: #777;
  font-size: 0.85rem;
}

.book-link {
  color: #8b5e34;
  font-size: 0.85rem;
  font-weight: 700;
  text-decoration: none;
}

.book-link:hover {
  color: #5f3c21;
}
</style>