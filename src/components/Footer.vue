<script setup>
// import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
// import {
//   faFacebookF,
//   faXTwitter,
//   faYoutube,
//   faInstagram,
//   faLocationDot,
//   faClock,
//   faPhone,
//   faArrowRight,
// } from "@fortawesome/free-solid-svg-icons";
</script>

<template>
  <footer class="footer">

    <div class="container">

      <!-- Brand / Description -->
      <div class="footer-box brand-box">

        <RouterLink to="/" class="footer-brand">
          <span class="brand-icon">B</span>
          <span>BookStore</span>
        </RouterLink>

        <p class="footer-description">
          Discover stories worth remembering. Explore our collection of
          books, meet inspiring authors, and find your next favorite read.
        </p>

        <div class="social-links">
<!-- 
          <a
            href="#"
            class="social-link"
            aria-label="Facebook"
          >
            <FontAwesomeIcon :icon="faFacebookF" />
          </a>

          <a
            href="#"
            class="social-link"
            aria-label="Twitter / X"
          >
            <FontAwesomeIcon :icon="faXTwitter" />
          </a>

          <a
            href="#"
            class="social-link"
            aria-label="YouTube"
          >
            <FontAwesomeIcon :icon="faYoutube" />
          </a>

          <a
            href="#"
            class="social-link"
            aria-label="Instagram"
          >
            <FontAwesomeIcon :icon="faInstagram" />
          </a> -->

        </div>

      </div>


      <!-- Quick Links -->
      <div class="footer-box">

        <h3 class="footer-title">
          Quick Links
        </h3>

        <ul class="footer-links">

          <li>
            <RouterLink to="/">
              <!-- <FontAwesomeIcon :icon="faArrowRight" /> -->
              Home
            </RouterLink>
          </li>

          <li>
            <RouterLink to="/books">
              <!-- <FontAwesomeIcon :icon="faArrowRight" /> -->
              Books
            </RouterLink>
          </li>

          <li>
            <RouterLink to="/authors">
              <!-- <FontAwesomeIcon :icon="faArrowRight" /> -->
              Authors
            </RouterLink>
          </li>

          <li>
            <RouterLink to="/about">
              <!-- <FontAwesomeIcon :icon="faArrowRight" /> -->
              About
            </RouterLink>
          </li>

        </ul>

      </div>


      <!-- Useful Links -->
      <div class="footer-box">

        <h3 class="footer-title">
          Explore
        </h3>

        <ul class="footer-links">

          <li>
            <RouterLink to="/books">
              <!-- <FontAwesomeIcon :icon="faArrowRight" /> -->
              Browse Books
            </RouterLink>
          </li>

          <li>
            <RouterLink to="/authors">
              <!-- <FontAwesomeIcon :icon="faArrowRight" /> -->
              Meet Authors
            </RouterLink>
          </li>

          <li>
            <RouterLink to="/about">
              <!-- <FontAwesomeIcon :icon="faArrowRight" /> -->
              FAQ
            </RouterLink>
          </li>

          <li>
            <RouterLink to="/admin">
              <!-- <FontAwesomeIcon :icon="faArrowRight" /> -->
              Admin
            </RouterLink>
          </li>

        </ul>

      </div>


      <!-- Contact -->
      <div class="footer-box">

        <h3 class="footer-title">
          Contact Us
        </h3>

        <div class="contact-item">

          <!-- <FontAwesomeIcon
            :icon="faLocationDot"
            class="contact-icon"
          /> -->

          <div>
            Egypt
          </div>

        </div>

        <div class="contact-item">

          <!-- <FontAwesomeIcon
            :icon="faClock"
            class="contact-icon"
          /> -->

          <div>
            <span>Open Daily</span>
            <span>10:00 AM – 6:00 PM</span>
          </div>

        </div>

        <div class="contact-item">
<!-- 
          <FontAwesomeIcon
            :icon="faPhone"
            class="contact-icon"
          /> -->

          <div>
            <span>+20 123 456 789</span>
            <span>+20 198 765 432</span>
          </div>

        </div>

      </div>

    </div>


    <!-- Copyright -->
    <div class="copyright">

      <div class="container copyright-content">

        <p>
          © {{ new Date().getFullYear() }} BookStore.
          All rights reserved.
        </p>

        <p class="made-with">
          Made with
          <span>♥</span>
          for book lovers
        </p>

      </div>

    </div>

  </footer>
</template>


<style scoped>

.footer {
  background: #f8f4ed;
  border-top: 1px solid #e9e2d8;
  padding-top: 70px;
  color: #5f5145;
}


/* =========================
   Main Grid
========================= */

.footer > .container {
  display: grid;
  grid-template-columns:
    1.5fr
    1fr
    1fr
    1.2fr;

  gap: 50px;
}


/* =========================
   Brand
========================= */

.footer-brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;

  color: #2b2118;

  font-family: "Playfair Display", serif;
  font-size: 1.7rem;
  font-weight: 800;

  text-decoration: none;

  transition: color 0.25s ease;
}

.footer-brand:hover {
  color: #8b5e34;
}

.brand-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 38px;
  height: 38px;

  border-radius: 9px;

  background: #8b5e34;
  color: white;

  font-family: "Playfair Display", serif;
  font-size: 1.2rem;
}


/* =========================
   Description
========================= */

.footer-description {
  max-width: 360px;

  margin: 20px 0;

  color: #75685b;

  font-size: 0.92rem;
  line-height: 1.8;
}


/* =========================
   Social Links
========================= */

.social-links {
  display: flex;
  gap: 10px;
}

.social-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 40px;
  height: 40px;

  border: 1px solid #e1d7ca;
  border-radius: 50%;

  background: white;
  color: #8b5e34;

  text-decoration: none;

  transition: all 0.25s ease;
}

.social-link:hover {
  background: #8b5e34;
  border-color: #8b5e34;
  color: white;

  transform: translateY(-3px);
}


/* =========================
   Titles
========================= */

.footer-title {
  margin: 0 0 20px;

  color: #2b2118;

  font-family: "Playfair Display", serif;
  font-size: 1.2rem;
  font-weight: 700;
}


/* =========================
   Links
========================= */

.footer-links {
  list-style: none;

  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 12px;
}

.footer-links a {
  display: inline-flex;
  align-items: center;
  gap: 9px;

  color: #75685b;

  font-size: 0.9rem;
  text-decoration: none;

  transition: all 0.25s ease;
}

.footer-links a svg {
  color: #8b5e34;
  font-size: 0.7rem;

  transition: transform 0.25s ease;
}

.footer-links a:hover {
  color: #8b5e34;
  transform: translateX(4px);
}

.footer-links a:hover svg {
  transform: translateX(3px);
}


/* =========================
   Contact
========================= */

.contact-item {
  display: flex;
  align-items: flex-start;
  gap: 14px;

  margin-bottom: 22px;

  color: #75685b;

  font-size: 0.9rem;
  line-height: 1.6;
}

.contact-icon {
  flex-shrink: 0;

  width: 18px;

  margin-top: 3px;

  color: #8b5e34;
}

.contact-item span {
  display: block;
}


/* =========================
   Copyright
========================= */

.copyright {
  margin-top: 60px;

  border-top: 1px solid #e3dace;
}

.copyright-content {
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding-top: 22px;
  padding-bottom: 22px;
}

.copyright p {
  margin: 0;

  color: #8a7c6d;

  font-size: 0.8rem;
}

.made-with span {
  color: #8b5e34;
  font-size: 1rem;
}


/* =========================
   Tablet
========================= */

@media (max-width: 991.98px) {

  .footer > .container {
    grid-template-columns: repeat(2, 1fr);

    gap: 40px;
  }

}


/* =========================
   Mobile
========================= */

@media (max-width: 767.98px) {

  .footer {
    padding-top: 50px;
  }

  .footer > .container {
    grid-template-columns: 1fr;

    text-align: center;

    gap: 35px;
  }

  .footer-description {
    margin-inline: auto;
  }

  .social-links {
    justify-content: center;
  }

  .footer-links a {
    justify-content: center;
  }

  .contact-item {
    justify-content: center;
  }

  .copyright-content {
    flex-direction: column;

    gap: 8px;

    text-align: center;
  }

}

</style>