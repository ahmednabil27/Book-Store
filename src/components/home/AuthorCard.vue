<template>
  <article class="author-card">

    <img
      :src="author.avatarUrl"
      :alt="author.name"
      class="author-avatar"
    />

    <div class="author-info">

      <h3>{{ author.name }}</h3>

      <p>
        {{ author.bio }}
      </p>

      <RouterLink
        :to="`/authors/${author.id}`"
        class="author-link"
      >
        View Author →
      </RouterLink>

    </div>

  </article>
</template>

<script setup>
defineProps({
  author: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.author-card {
  height: 100%;
  padding: 25px;
  text-align: center;
  border: 1px solid #e9e2d8;
  border-radius: 16px;
  background: #fff;
  transition: 0.3s ease;
}

.author-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(50, 35, 20, 0.1);
}

.author-avatar {
  width: 100px;
  height: 100px;
  margin-bottom: 18px;
  border: 4px solid #f1e9df;
  border-radius: 50%;
  object-fit: cover;
}

.author-info h3 {
  margin-bottom: 8px;
  font-size: 1.1rem;
  font-weight: 700;
}

.author-info p {
  display: -webkit-box;
  margin-bottom: 15px;
  overflow: hidden;
  color: #777;
  font-size: 0.85rem;
  line-height: 1.6;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}

.author-link {
  color: #8b5e34;
  font-size: 0.85rem;
  font-weight: 700;
  text-decoration: none;
}
</style>