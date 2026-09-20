<template>
  <div class="section-header text-center mb-5">
    <span v-if="eyebrow" class="section-eyebrow">
      {{ eyebrow }}
    </span>

    <h2 class="section-title">
      {{ title }}
    </h2>

    <p v-if="description" class="section-description">
      {{ description }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  eyebrow: {
    type: String,
    default: ""
  },

  title: {
    type: String,
    required: true
  },

  description: {
    type: String,
    default: ""
  }
})
</script>

<style scoped>
.section-header {
  max-width: 700px;
  margin-inline: auto;
}

.section-eyebrow {
  display: inline-block;
  margin-bottom: 0.6rem;
  color: #8b5e34;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.section-title {
  margin-bottom: 0.8rem;
  color: #202020;
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
}

.section-description {
  margin: 0;
  color: #6c6c6c;
  font-size: 1.05rem;
  line-height: 1.7;
}
</style>