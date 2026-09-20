<template>
  <section class="cta-section py-5">
    <div class="container py-lg-4">

      <div class="cta-card text-center">

        <div class="cta-decoration decoration-one">
          ✦
        </div>

        <div class="cta-decoration decoration-two">
          ✦
        </div>

        <span class="cta-eyebrow">
          Start Exploring
        </span>

        <h2>
          Your next favorite book
          is waiting.
        </h2>

        <p>
          Browse our collection and discover a story
          you'll want to remember.
        </p>

        <RouterLink
          to="/books"
          class="btn btn-light px-4 py-3"
        >
          Browse Books →
        </RouterLink>

      </div>

    </div>
  </section>
</template>

<style scoped>
.cta-section {
  background: #fff;
}

.cta-card {
  position: relative;
  overflow: hidden;
  padding: 80px 30px;
  border-radius: 22px;
  background: #8b5e34;
  color: white;
}

.cta-eyebrow {
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  opacity: 0.8;
}

.cta-card h2 {
  max-width: 650px;
  margin: 15px auto;
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 800;
}

.cta-card p {
  max-width: 500px;
  margin: 0 auto 30px;
  color: rgba(255, 255, 255, 0.8);
}

.cta-decoration {
  position: absolute;
  color: rgba(255, 255, 255, 0.15);
  font-size: 5rem;
}

.decoration-one {
  top: 10px;
  left: 8%;
}

.decoration-two {
  right: 8%;
  bottom: 0;
}
</style>