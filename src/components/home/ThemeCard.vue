<template>
  <RouterLink
    :to="`/books?theme=${theme.name.toLowerCase()}`"
    class="theme-card text-decoration-none"
  >

    <div class="theme-icon">
      {{ theme.icon }}
    </div>

    <div>
      <h3>{{ theme.name }}</h3>
      <p>{{ theme.count }} books</p>
    </div>

    <span class="theme-arrow">
      →
    </span>

  </RouterLink>
</template>

<script setup>
defineProps({
  theme: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.theme-card {
  position: relative;
  display: flex;
  align-items: center;
  gap: 15px;
  height: 100%;
  padding: 22px;
  overflow: hidden;
  border: 1px solid #e9e2d8;
  border-radius: 14px;
  background: #fff;
  color: #222;
  transition: 0.3s ease;
}

.theme-card:hover {
  border-color: #cdb99f;
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(50, 35, 20, 0.08);
}

.theme-icon {
  width: 52px;
  height: 52px;
  display: grid;
  place-items: center;
  flex-shrink: 0;
  border-radius: 12px;
  background: #f1e9df;
  font-size: 1.5rem;
}

.theme-card h3 {
  margin: 0 0 4px;
  font-size: 1rem;
  font-weight: 700;
}

.theme-card p {
  margin: 0;
  color: #888;
  font-size: 0.8rem;
}

.theme-arrow {
  margin-left: auto;
  color: #8b5e34;
  font-size: 1.2rem;
}
</style>