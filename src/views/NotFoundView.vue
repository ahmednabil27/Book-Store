<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <main class="not-found-page">
    <div class="container">
      <div class="not-found-content">

        <!-- Decorative book -->
        <div class="book-illustration" aria-hidden="true">
          <div class="book-cover">
            <span>404</span>
          </div>

          <div class="book-page book-page-one"></div>
          <div class="book-page book-page-two"></div>
        </div>

        <!-- Text -->
        <p class="eyebrow">Lost Between the Pages</p>

        <h1>Page Not Found</h1>

        <p class="description">
          It looks like this page has wandered off the shelf.
          The page you're looking for doesn't exist or may have been moved.
        </p>

        <!-- Actions -->
        <div class="actions">
          <RouterLink to="/" class="btn-primary-custom">
            Back to Home
          </RouterLink>

          <RouterLink to="/books" class="btn-secondary-custom">
            Browse Books
          </RouterLink>
        </div>

        <p class="hint">
          You can always return to the bookstore and start exploring again.
        </p>

      </div>
    </div>
  </main>
</template>

<style scoped>
.not-found-page {
  min-height: calc(100vh - 76px);
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f4ed;
  color: #202020;
  padding: 5rem 1rem;
}

.not-found-content {
  width: 100%;
  max-width: 650px;
  text-align: center;
}

/* -----------------------------
   Book Illustration
----------------------------- */

.book-illustration {
  position: relative;
  width: 150px;
  height: 150px;
  margin: 0 auto 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.book-cover {
  position: relative;
  z-index: 3;
  width: 90px;
  height: 115px;
  border-radius: 5px 9px 9px 5px;
  background: #8b5e34;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 10px 10px 0 #d9c8b5;
  transform: rotate(-5deg);
}

.book-cover span {
  font-family: "Playfair Display", serif;
  font-size: 1.7rem;
  font-weight: 700;
}

.book-page {
  position: absolute;
  width: 85px;
  height: 108px;
  background: #fff;
  border: 1px solid #e9e2d8;
  border-radius: 4px 8px 8px 4px;
}

.book-page-one {
  transform: translate(7px, 2px) rotate(2deg);
}

.book-page-two {
  transform: translate(13px, 5px) rotate(5deg);
}

/* -----------------------------
   Typography
----------------------------- */

.eyebrow {
  margin-bottom: 0.75rem;
  color: #8b5e34;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

h1 {
  margin-bottom: 1rem;
  font-family: "Playfair Display", serif;
  font-size: clamp(2.8rem, 7vw, 4.5rem);
  font-weight: 700;
  line-height: 1.05;
  color: #202020;
}

.description {
  max-width: 540px;
  margin: 0 auto;
  color: #6f6a63;
  font-size: 1.05rem;
  line-height: 1.8;
}

/* -----------------------------
   Buttons
----------------------------- */

.actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 2rem;
}

.btn-primary-custom,
.btn-secondary-custom {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 145px;
  padding: 0.75rem 1.4rem;
  border-radius: 10px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.25s ease;
}

.btn-primary-custom {
  background: #8b5e34;
  color: #fff;
  border: 1px solid #8b5e34;
}

.btn-primary-custom:hover {
  background: #734b28;
  border-color: #734b28;
  color: #fff;
  transform: translateY(-2px);
}

.btn-secondary-custom {
  background: #fff;
  color: #8b5e34;
  border: 1px solid #d9c8b5;
}

.btn-secondary-custom:hover {
  background: #f3ece3;
  color: #734b28;
  border-color: #8b5e34;
  transform: translateY(-2px);
}

.hint {
  margin-top: 2rem;
  margin-bottom: 0;
  color: #999188;
  font-size: 0.9rem;
}

/* -----------------------------
   Responsive
----------------------------- */

@media (max-width: 576px) {
  .not-found-page {
    min-height: calc(100vh - 65px);
    padding: 3rem 1rem;
  }

  .book-illustration {
    transform: scale(0.9);
    margin-bottom: 1.5rem;
  }

  h1 {
    font-size: 2.8rem;
  }

  .description {
    font-size: 0.95rem;
  }

  .actions {
    flex-direction: column;
    align-items: center;
  }

  .btn-primary-custom,
  .btn-secondary-custom {
    width: 100%;
    max-width: 250px;
  }
}
</style>