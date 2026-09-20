<template>
  <section class="why-section py-5">
    <div class="container py-lg-5">

      <div class="row align-items-center g-5">

        <div class="col-lg-5">

          <span class="section-eyebrow">
            Why BookNest?
          </span>

          <h2 class="section-title">
            More than a bookstore.
            <span>A place for readers.</span>
          </h2>

          <p class="section-description">
            We make discovering books simple. Explore stories,
            learn about authors, and find something that matches
            your interests.
          </p>

          <RouterLink
            to="/about"
            class="btn btn-dark px-4 py-2 mt-3"
          >
            Learn More
          </RouterLink>

        </div>

        <div class="col-lg-7">

          <div class="row g-4">

            <div
              v-for="feature in features"
              :key="feature.title"
              class="col-sm-6"
            >

              <div class="feature-card">

                <div class="feature-icon">
                  {{ feature.icon }}
                </div>

                <h3>{{ feature.title }}</h3>

                <p>
                  {{ feature.description }}
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  </section>
</template>

<script setup>
const features = [
  {
    icon: "📚",
    title: "Curated Collection",
    description:
      "Explore a collection of interesting books across many themes and genres."
  },
  {
    icon: "👤",
    title: "Discover Authors",
    description:
      "Learn about the people behind the stories you love."
  },
  {
    icon: "🔎",
    title: "Easy Discovery",
    description:
      "Find books quickly through themes, authors, and categories."
  },
  {
    icon: "✨",
    title: "Simple Experience",
    description:
      "A clean and enjoyable way to explore your next read."
  }
]
</script>

<style scoped>
.why-section {
  background: #fff;
}

.section-eyebrow {
  color: #8b5e34;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.section-title {
  margin: 15px 0;
  color: #202020;
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  line-height: 1.1;
}

.section-title span {
  display: block;
  color: #8b5e34;
}

.section-description {
  color: #6c6c6c;
  line-height: 1.8;
}

.feature-card {
  height: 100%;
  padding: 25px;
  border: 1px solid #eee5da;
  border-radius: 14px;
  background: #fff;
  transition: 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(50, 35, 20, 0.08);
}

.feature-icon {
  width: 50px;
  height: 50px;
  display: grid;
  place-items: center;
  margin-bottom: 18px;
  border-radius: 12px;
  background: #f1e9df;
  font-size: 1.4rem;
}

.feature-card h3 {
  margin-bottom: 10px;
  font-size: 1rem;
  font-weight: 700;
}

.feature-card p {
  margin: 0;
  color: #777;
  font-size: 0.88rem;
  line-height: 1.7;
}
</style>