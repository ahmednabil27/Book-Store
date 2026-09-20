<template>
  <section class="hero-section">
    <div class="container">
      <div class="row align-items-center g-5">

        <!-- Text -->
        <div class="col-lg-6">
          <div class="hero-content">

            <span class="hero-badge">
              <span class="badge-dot"></span>
              Your next great read awaits
            </span>

            <h1 class="hero-title">
              Discover stories
              <span>worth remembering.</span>
            </h1>

            <p class="hero-description">
              Explore a carefully curated collection of books,
              discover fascinating authors, and find your next
              favorite story.
            </p>

            <div class="hero-actions d-flex flex-wrap gap-3">
              <RouterLink
                to="/books"
                class="btn btn-primary hero-btn"
              >
                Explore Books
                <span>→</span>
              </RouterLink>

              <RouterLink
                to="/authors"
                class="btn btn-outline-dark hero-btn"
              >
                Meet Authors
              </RouterLink>
            </div>

            <div class="hero-stats d-flex gap-4 mt-5">

              <div>
                <strong>100+</strong>
                <span>Books</span>
              </div>

              <div>
                <strong>25+</strong>
                <span>Authors</span>
              </div>

              <div>
                <strong>15+</strong>
                <span>Themes</span>
              </div>

            </div>

          </div>
        </div>

        <!-- Books visual -->
        <div class="col-lg-6">
          <div class="hero-books">

            <div class="book-decoration decoration-one"></div>
            <div class="book-decoration decoration-two"></div>

            <div class="book-cover book-back">
              <div class="cover-content">
                <small>THE</small>
                <strong>HOBBIT</strong>
                <span>J.R.R. Tolkien</span>
              </div>
            </div>

            <div class="book-cover book-middle">
              <div class="cover-content">
                <small>PROJECT</small>
                <strong>HAIL MARY</strong>
                <span>Andy Weir</span>
              </div>
            </div>

            <div class="book-cover book-front">
              <div class="cover-content">
                <small>THE</small>
                <strong>MARTIAN</strong>
                <span>Andy Weir</span>
              </div>
            </div>

            <div class="floating-card floating-top">
              <span class="floating-icon">📚</span>
              <div>
                <strong>Curated books</strong>
                <small>Find something new</small>
              </div>
            </div>

            <div class="floating-card floating-bottom">
              <span class="floating-icon">✨</span>
              <div>
                <strong>Explore & discover</strong>
                <small>Stories for everyone</small>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  min-height: 720px;
  display: flex;
  align-items: center;
  padding: 100px 0;
  overflow: hidden;
  background:
    radial-gradient(circle at 85% 20%, rgba(139, 94, 52, 0.12), transparent 30%),
    #f8f4ed;
}

.hero-content {
  max-width: 620px;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  margin-bottom: 25px;
  border-radius: 50px;
  background: rgba(139, 94, 52, 0.1);
  color: #8b5e34;
  font-size: 0.85rem;
  font-weight: 700;
}

.badge-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #8b5e34;
}

.hero-title {
  margin-bottom: 25px;
  color: #202020;
  font-size: clamp(3rem, 6vw, 5rem);
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: -0.04em;
}

.hero-title span {
  display: block;
  color: #8b5e34;
}

.hero-description {
  max-width: 540px;
  margin-bottom: 35px;
  color: #686868;
  font-size: 1.1rem;
  line-height: 1.8;
}

.hero-btn {
  padding: 13px 24px;
  border-radius: 10px;
  font-weight: 600;
}

.btn-primary {
  border-color: #8b5e34;
  background: #8b5e34;
}

.btn-primary:hover {
  border-color: #6f4828;
  background: #6f4828;
}

.hero-stats strong,
.hero-stats span {
  display: block;
}

.hero-stats strong {
  color: #202020;
  font-size: 1.5rem;
}

.hero-stats span {
  color: #777;
  font-size: 0.85rem;
}

/* Books */

.hero-books {
  position: relative;
  height: 540px;
  max-width: 500px;
  margin: auto;
}

.book-cover {
  position: absolute;
  width: 220px;
  height: 320px;
  padding: 25px;
  border-radius: 5px 12px 12px 5px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
  color: white;
}

.book-cover::after {
  content: "";
  position: absolute;
  left: 14px;
  top: 0;
  width: 3px;
  height: 100%;
  background: rgba(255, 255, 255, 0.2);
}

.cover-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}

.cover-content small {
  font-size: 0.7rem;
  letter-spacing: 0.2em;
}

.cover-content strong {
  margin: 10px 0;
  font-size: 1.7rem;
}

.cover-content span {
  font-size: 0.8rem;
  opacity: 0.8;
}

.book-back {
  left: 15%;
  top: 90px;
  transform: rotate(-12deg);
  background: #4b3621;
}

.book-middle {
  left: 30%;
  top: 50px;
  transform: rotate(3deg);
  background: #263b52;
  z-index: 2;
}

.book-front {
  left: 45%;
  top: 100px;
  transform: rotate(12deg);
  background: #8b3030;
  z-index: 3;
}

.floating-card {
  position: absolute;
  z-index: 5;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px;
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
}

.floating-card strong,
.floating-card small {
  display: block;
}

.floating-card strong {
  font-size: 0.85rem;
}

.floating-card small {
  color: #777;
  font-size: 0.7rem;
}

.floating-icon {
  font-size: 1.4rem;
}

.floating-top {
  top: 30px;
  right: 0;
}

.floating-bottom {
  bottom: 40px;
  left: 0;
}

.book-decoration {
  position: absolute;
  border-radius: 50%;
  background: rgba(139, 94, 52, 0.1);
}

.decoration-one {
  width: 350px;
  height: 350px;
  right: 0;
  top: 60px;
}

.decoration-two {
  width: 150px;
  height: 150px;
  left: 20px;
  bottom: 30px;
}

@media (max-width: 991px) {
  .hero-section {
    padding: 80px 0;
  }

  .hero-books {
    margin-top: 30px;
  }
}

@media (max-width: 576px) {
  .hero-books {
    height: 430px;
  }

  .book-cover {
    width: 160px;
    height: 240px;
  }

  .book-back {
    left: 5%;
  }

  .book-middle {
    left: 20%;
  }

  .book-front {
    left: 35%;
  }

  .floating-card {
    transform: scale(0.85);
  }

  .floating-top {
    right: -10px;
  }

  .floating-bottom {
    left: -10px;
  }
}
</style>