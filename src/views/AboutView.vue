<script setup>
import { ref } from "vue";

/* IMAGE STATE */
const imageSrc = ref("../assets/about-img2.jpg");
const imageLoading = ref(true);
const imageError = ref(false);

/* IMAGE HANDLERS */
function handleImageLoad() {
  imageLoading.value = false;
  imageError.value = false;
}

function handleImageError() {
  imageLoading.value = false;
  imageError.value = true;
}
</script>

<template>
  <main class="about-page">
    <div class="container py-5">

      <!-- ==================== OUR STORY ==================== -->
      <section class="story-section mb-5">
        <div class="row align-items-center justify-content-between g-5">

          <!-- IMAGE -->
          <div class="col-md-5 col-lg-4">
            <div class="story-image-wrapper">

              <!-- Actual image -->
              <img
                v-if="imageSrc && !imageError"
                src="../assets/about-img2.jpg"
                alt="Inside our bookstore"
                class="story-image"
                :class="{ 'image-hidden': imageLoading }"
                @load="handleImageLoad"
                @error="handleImageError"
              />

              <!-- Loading placeholder -->
              <div
                v-if="imageLoading && !imageError"
                class="image-placeholder image-loading"
              >
                <span class="placeholder-icon">✦</span>
                <span>Loading image...</span>
              </div>

              <!-- Error fallback -->
              <div
                v-if="imageError || !imageSrc"
                class="image-placeholder image-error"
              >
                <span class="placeholder-icon">✦</span>
                <span>Image unavailable</span>
              </div>

              <!-- Decorative element -->
              <div class="image-decoration"></div>
            </div>
          </div>

          <!-- STORY CONTENT -->
          <div class="col-md-7 col-lg-7">
            <div class="story-content">

              <span class="section-eyebrow">
                Our Story
              </span>

              <h1 class="section-title">
                A Love for Books,
                <span>Shared With Everyone.</span>
              </h1>

              <div class="heading-line"></div>

              <div class="story-text">
                <p class="lead-text">
                  Our bookstore began with a simple idea: every great story
                  deserves a place to be discovered.
                </p>

                <p>
                  Founded in 2015 by a small group of passionate readers, our
                  bookstore started as a cozy local shop with only a few
                  shelves of carefully selected books. What began as a love
                  for literature soon grew into a community where readers
                  could discover new authors, revisit timeless classics, and
                  share their passion for books.
                </p>

                <p>
                  Over the years, we expanded our collection to include
                  fiction, science fiction, fantasy, mystery, biographies,
                  history, and many other genres. We also created a dedicated
                  space for discovering new and independent authors.
                </p>

                <p>
                  Today, our bookstore combines the warmth of a traditional
                  bookshop with the convenience of a modern digital
                  experience. Through our online platform, readers can explore
                  books, learn about their authors, and easily discover their
                  next favorite story.
                </p>

                <p>
                  Although we have grown since our beginning, our original
                  mission remains the same: to connect people with books and
                  make the joy of reading accessible to everyone.
                </p>
              </div>

              <!-- Small stats -->
              <div class="story-stats">
                <div class="story-stat">
                  <span class="stat-number">2015</span>
                  <span class="stat-label">Founded</span>
                </div>

                <div class="stat-divider"></div>

                <div class="story-stat">
                  <span class="stat-number">∞</span>
                  <span class="stat-label">Stories to Discover</span>
                </div>

                <div class="stat-divider"></div>

                <div class="story-stat">
                  <span class="stat-number">1</span>
                  <span class="stat-label">Love for Reading</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>


      <!-- ==================== FAQ ==================== -->
      <section class="faq-section">

        <div class="faq-header text-center">
          <span class="section-eyebrow">
            Frequently Asked Questions
          </span>

          <h2 class="section-title">
            Everything You Need to Know
          </h2>

          <div class="heading-line mx-auto"></div>

          <p class="section-description">
            Learn more about our bookstore, our collection, and how we help
            readers discover their next favorite story.
          </p>
        </div>


        <div
          class="accordion custom-accordion"
          id="aboutAccordion"
        >

          <!-- 01 -->
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button
                class="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#faqOne"
                aria-expanded="true"
                aria-controls="faqOne"
              >
                <span class="faq-number">01</span>
                <span>What is your bookstore?</span>
              </button>
            </h2>

            <div
              id="faqOne"
              class="accordion-collapse collapse show"
              data-bs-parent="#aboutAccordion"
            >
              <div class="accordion-body">
                Our bookstore is a <strong>modern</strong> online platform
                created for people who love reading. We provide a wide
                collection of books across different genres and help readers
                discover interesting books and authors in one convenient
                place.
              </div>
            </div>
          </div>


          <!-- 02 -->
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#faqTwo"
                aria-expanded="false"
                aria-controls="faqTwo"
              >
                <span class="faq-number">02</span>
                <span>When was the bookstore founded?</span>
              </button>
            </h2>

            <div
              id="faqTwo"
              class="accordion-collapse collapse"
              data-bs-parent="#aboutAccordion"
            >
              <div class="accordion-body">
                Our bookstore was founded in 2015 by a small group of
                passionate readers. What started as a small local bookstore
                gradually grew into a digital platform serving a wider
                community of readers.
              </div>
            </div>
          </div>


          <!-- 03 -->
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#faqThree"
                aria-expanded="false"
                aria-controls="faqThree"
              >
                <span class="faq-number">03</span>
                <span>What types of books do you offer?</span>
              </button>
            </h2>

            <div
              id="faqThree"
              class="accordion-collapse collapse"
              data-bs-parent="#aboutAccordion"
            >
              <div class="accordion-body">
                We offer books from a variety of genres, including fiction,
                science fiction, fantasy, mystery, romance, history,
                biographies, adventure, and classic literature. Our collection
                includes both modern works and timeless classics.
              </div>
            </div>
          </div>


          <!-- 04 -->
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#faqFour"
                aria-expanded="false"
                aria-controls="faqFour"
              >
                <span class="faq-number">04</span>
                <span>Can I learn more about the authors?</span>
              </button>
            </h2>

            <div
              id="faqFour"
              class="accordion-collapse collapse"
              data-bs-parent="#aboutAccordion"
            >
              <div class="accordion-body">
                Yes. Each author has a dedicated profile containing
                information about their background, biography, and notable
                works. This makes it easier to discover new authors and
                understand the stories behind the books you read.
              </div>
            </div>
          </div>


          <!-- 05 -->
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#faqFive"
                aria-expanded="false"
                aria-controls="faqFive"
              >
                <span class="faq-number">05</span>
                <span>How can I find a specific book?</span>
              </button>
            </h2>

            <div
              id="faqFive"
              class="accordion-collapse collapse"
              data-bs-parent="#aboutAccordion"
            >
              <div class="accordion-body">
                You can browse our book collection or use the search and
                filtering features to find a specific title, author, or
                genre. Each book also has a dedicated details page with
                additional information.
              </div>
            </div>
          </div>


          <!-- 06 -->
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#faqSix"
                aria-expanded="false"
                aria-controls="faqSix"
              >
                <span class="faq-number">06</span>
                <span>Do you have classic and modern books?</span>
              </button>
            </h2>

            <div
              id="faqSix"
              class="accordion-collapse collapse"
              data-bs-parent="#aboutAccordion"
            >
              <div class="accordion-body">
                Yes. Our collection combines classic literature with modern
                publications, allowing readers to explore influential works
                from the past alongside contemporary books.
              </div>
            </div>
          </div>


          <!-- 07 -->
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#faqSeven"
                aria-expanded="false"
                aria-controls="faqSeven"
              >
                <span class="faq-number">07</span>
                <span>Why should I create an account?</span>
              </button>
            </h2>

            <div
              id="faqSeven"
              class="accordion-collapse collapse"
              data-bs-parent="#aboutAccordion"
            >
              <div class="accordion-body">
                Creating an account gives you access to personalized features
                and makes it easier to manage your interactions with the
                bookstore. It also provides a more convenient experience when
                exploring and managing your favorite books.
              </div>
            </div>
          </div>


          <!-- 08 -->
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#faqEight"
                aria-expanded="false"
                aria-controls="faqEight"
              >
                <span class="faq-number">08</span>
                <span>How do you choose the books in your collection?</span>
              </button>
            </h2>

            <div
              id="faqEight"
              class="accordion-collapse collapse"
              data-bs-parent="#aboutAccordion"
            >
              <div class="accordion-body">
                We aim to provide a diverse collection that includes
                well-known authors, important literary classics, and popular
                works from different genres. Our goal is to give every reader
                an opportunity to find something they enjoy.
              </div>
            </div>
          </div>


          <!-- 09 -->
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#faqNine"
                aria-expanded="false"
                aria-controls="faqNine"
              >
                <span class="faq-number">09</span>
                <span>Can I recommend a book or author?</span>
              </button>
            </h2>

            <div
              id="faqNine"
              class="accordion-collapse collapse"
              data-bs-parent="#aboutAccordion"
            >
              <div class="accordion-body">
                Absolutely. We welcome recommendations from our readers.
                Suggestions help us understand what our community is interested
                in and can inspire future additions to our collection.
              </div>
            </div>
          </div>


          <!-- 10 -->
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#faqTen"
                aria-expanded="false"
                aria-controls="faqTen"
              >
                <span class="faq-number">10</span>
                <span>What is the goal of the bookstore?</span>
              </button>
            </h2>

            <div
              id="faqTen"
              class="accordion-collapse collapse"
              data-bs-parent="#aboutAccordion"
            >
              <div class="accordion-body">
                Our goal is to make discovering books and authors simple,
                enjoyable, and accessible. We want to create more than just a
                place to find books—we want to build a community around
                reading and literature.
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  </main>
</template>


<style scoped>
/* ========================================
   PAGE
======================================== */

.about-page {
  min-height: 100vh;
  background: #f8f4ed;
  color: #202020;
}


/* ========================================
   STORY SECTION
======================================== */

.story-section {
  padding: 35px 0 45px;
}


/* ========================================
   SECTION TYPOGRAPHY
======================================== */

.section-eyebrow {
  display: inline-block;
  margin-bottom: 10px;
  color: #8b5e34;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.section-title {
  margin: 0;
  color: #202020;
  font-family: "Playfair Display", serif;
  font-size: clamp(2.1rem, 4vw, 3.4rem);
  font-weight: 700;
  line-height: 1.15;
}

.section-title span {
  display: block;
  color: #8b5e34;
}

.heading-line {
  width: 55px;
  height: 3px;
  margin-top: 18px;
  border-radius: 20px;
  background: #8b5e34;
}


/* ========================================
   STORY IMAGE
======================================== */

.story-image-wrapper {
  position: relative;
  width: 100%;
  max-width: 360px;
  height: 470px;
  margin: 0 auto;
  overflow: visible;
}

.story-image {
  position: relative;
  z-index: 2;

  width: 100%;
  height: 100%;

  object-fit: cover;

  border: 8px solid #fff;
  border-radius: 18px;

  box-shadow: 0 15px 35px rgba(70, 50, 30, 0.12);

  opacity: 1;
  transform: scale(1);

  transition:
    opacity 0.35s ease,
    transform 0.45s ease,
    box-shadow 0.35s ease;
}

.story-image:hover {
  transform: scale(1.015);
  box-shadow: 0 20px 45px rgba(70, 50, 30, 0.18);
}

.image-hidden {
  opacity: 0;
}


/* Decorative offset frame */

.image-decoration {
  position: absolute;
  z-index: 1;
  right: -18px;
  bottom: -18px;

  width: 100%;
  height: 100%;

  border: 2px solid #8b5e34;
  border-radius: 18px;

  opacity: 0.35;
}


/* ========================================
   IMAGE PLACEHOLDER
======================================== */

.image-placeholder {
  position: absolute;
  inset: 0;
  z-index: 3;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 10px;

  border: 8px solid #fff;
  border-radius: 18px;

  background:
    radial-gradient(
      circle at center,
      #ffffff 0%,
      #f4eee5 65%,
      #e9dfd2 100%
    );

  color: #8b5e34;
  font-size: 0.85rem;
  font-weight: 600;
}

.placeholder-icon {
  font-size: 2rem;
}


/* Loading animation */

.image-loading .placeholder-icon {
  animation: imagePulse 1.2s ease-in-out infinite;
}

@keyframes imagePulse {
  0%,
  100% {
    opacity: 0.35;
    transform: scale(0.9);
  }

  50% {
    opacity: 1;
    transform: scale(1.1);
  }
}


/* ========================================
   STORY CONTENT
======================================== */

.story-content {
  max-width: 720px;
}

.story-text {
  margin-top: 25px;
  color: #5f5a54;
  font-size: 1rem;
  line-height: 1.8;
}

.story-text p {
  margin-bottom: 16px;
}

.story-text p:last-child {
  margin-bottom: 0;
}

.story-text .lead-text {
  color: #3f3a35;
  font-size: 1.15rem;
  font-weight: 500;
  line-height: 1.7;
}


/* ========================================
   STORY STATS
======================================== */

.story-stats {
  display: flex;
  align-items: center;
  gap: 28px;

  margin-top: 30px;
  padding-top: 25px;

  border-top: 1px solid #e3d9cc;
}

.story-stat {
  display: flex;
  flex-direction: column;
}

.stat-number {
  color: #8b5e34;
  font-family: "Playfair Display", serif;
  font-size: 1.6rem;
  font-weight: 700;
}

.stat-label {
  color: #77716a;
  font-size: 0.75rem;
  letter-spacing: 0.04em;
}

.stat-divider {
  width: 1px;
  height: 38px;
  background: #ded3c6;
}


/* ========================================
   FAQ SECTION
======================================== */

.faq-section {
  padding: 45px 0 70px;
}

.faq-header {
  max-width: 700px;
  margin: 0 auto 40px;
}

.section-description {
  max-width: 600px;
  margin: 18px auto 0;

  color: #6d6862;
  font-size: 0.95rem;
  line-height: 1.7;
}


/* ========================================
   CUSTOM ACCORDION
======================================== */

.custom-accordion {
  max-width: 900px;
  margin: 0 auto;

  border-radius: 16px;
  overflow: hidden;

  box-shadow: 0 8px 30px rgba(70, 50, 30, 0.07);
}

.custom-accordion .accordion-item {
  border: none;
  border-bottom: 1px solid #e8dfd4;
  background: #fff;
}

.custom-accordion .accordion-item:last-child {
  border-bottom: none;
}


/* Accordion button */

.custom-accordion .accordion-button {
  display: flex;
  align-items: center;
  gap: 18px;

  padding: 20px 24px;

  color: #292521;
  background: #fff;

  font-family: "DM Sans", sans-serif;
  font-size: 0.98rem;
  font-weight: 600;

  box-shadow: none;
}

.custom-accordion .accordion-button:hover {
  color: #8b5e34;
  background: #fcfaf7;
}

.custom-accordion .accordion-button:not(.collapsed) {
  color: #8b5e34;
  background: #fcfaf7;

  box-shadow: none;
}


/* Remove Bootstrap blue focus ring */

.custom-accordion .accordion-button:focus {
  box-shadow: 0 0 0 3px rgba(139, 94, 52, 0.12);
}


/* Bootstrap arrow */

.custom-accordion .accordion-button::after {
  margin-left: auto;

  background-size: 0.85rem;

  transition: transform 0.25s ease;
}

.custom-accordion .accordion-button:not(.collapsed)::after {
  transform: rotate(-180deg);
}


/* FAQ number */

.faq-number {
  flex-shrink: 0;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 34px;
  height: 34px;

  border-radius: 50%;

  color: #8b5e34;
  background: #f8f4ed;

  font-family: "Playfair Display", serif;
  font-size: 0.8rem;
  font-weight: 700;
}


/* Accordion body */

.custom-accordion .accordion-body {
  padding: 0 65px 25px 76px;

  color: #68625c;
  background: #fcfaf7;

  font-size: 0.93rem;
  line-height: 1.8;
}

.custom-accordion .accordion-body strong {
  color: #8b5e34;
}


/* ========================================
   RESPONSIVE
======================================== */

@media (max-width: 767px) {
  .story-section {
    padding-top: 15px;
  }

  .story-image-wrapper {
    height: 400px;
    max-width: 310px;
  }

  .story-content {
    text-align: left;
  }

  .story-stats {
    gap: 18px;
    justify-content: space-between;
  }

  .stat-number {
    font-size: 1.35rem;
  }

  .stat-label {
    font-size: 0.7rem;
  }

  .custom-accordion .accordion-button {
    padding: 17px 16px;
    gap: 12px;
    font-size: 0.9rem;
  }

  .custom-accordion .accordion-body {
    padding: 0 20px 22px 62px;
    font-size: 0.9rem;
  }
}


@media (max-width: 480px) {
  .story-image-wrapper {
    height: 350px;
  }

  .section-title {
    font-size: 2rem;
  }

  .story-text {
    font-size: 0.93rem;
  }

  .story-text .lead-text {
    font-size: 1.02rem;
  }

  .story-stats {
    gap: 12px;
  }

  .stat-divider {
    height: 30px;
  }

  .stat-number {
    font-size: 1.15rem;
  }

  .stat-label {
    font-size: 0.65rem;
  }

  .faq-number {
    width: 30px;
    height: 30px;
    font-size: 0.72rem;
  }

  .custom-accordion .accordion-button {
    padding: 15px 13px;
  }

  .custom-accordion .accordion-body {
    padding-left: 55px;
  }
}
</style>