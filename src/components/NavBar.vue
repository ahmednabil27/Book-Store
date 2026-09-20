<script setup>
</script>

<template>
  <nav class="navbar navbar-expand-lg bookstore-navbar sticky-top">
    <div class="container">

      <!-- Brand -->
      <RouterLink
        to="/"
        class="navbar-brand bookstore-brand"
      >
        <span class="brand-icon">B</span>
        <span>BookStore</span>
      </RouterLink>

      <!-- Mobile toggle -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Navigation -->
      <div
        class="collapse navbar-collapse"
        id="navbarSupportedContent"
      >

        <ul class="navbar-nav mx-auto mb-2 mb-lg-0">

          <li class="nav-item">
            <RouterLink
              to="/"
              class="nav-link"
            >
              Home
            </RouterLink>
          </li>

          <li class="nav-item">
            <RouterLink
              to="/books"
              class="nav-link"
            >
              Books
            </RouterLink>
          </li>

          <li class="nav-item">
            <RouterLink
              to="/authors"
              class="nav-link"
            >
              Authors
            </RouterLink>
          </li>

          <li class="nav-item">
            <RouterLink
              to="/about"
              class="nav-link"
            >
              About
            </RouterLink>
          </li>

        </ul>

        <!-- Right side -->
        <div class="d-flex align-items-lg-center gap-2">

          <RouterLink
            to="/admin"
            class="admin-link"
          >
            Admin
          </RouterLink>

        </div>

      </div>
    </div>
  </nav>
</template>

<style scoped>

.bookstore-navbar {
  background: rgba(248, 244, 237, 0.95);
  border-bottom: 1px solid #e9e2d8;
  backdrop-filter: blur(10px);
}

/* Brand */

.bookstore-brand {
  display: flex;
  align-items: center;
  gap: 9px;

  color: #2b2118;
  font-family: "Playfair Display", serif;
  font-size: 1.45rem;
  font-weight: 800;

  text-decoration: none;
}

.bookstore-brand:hover {
  color: #8b5e34;
}

.brand-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 34px;
  height: 34px;

  border-radius: 8px;

  background: #8b5e34;
  color: #fff;

  font-family: "Playfair Display", serif;
  font-size: 1.1rem;
  font-weight: 700;
}

/* Navigation links */

.navbar-nav {
  gap: 0.35rem;
}

.nav-link {
  position: relative;

  padding: 0.6rem 0.9rem !important;

  color: #5f5145 !important;
  font-size: 0.92rem;
  font-weight: 600;

  transition: color 0.25s ease;
}

.nav-link:hover {
  color: #8b5e34 !important;
}

/* Active RouterLink */

.nav-link.router-link-active {
  color: #8b5e34 !important;
}

/* Small underline for active page */

.nav-link.router-link-active::after {
  content: "";

  position: absolute;
  left: 0.9rem;
  right: 0.9rem;
  bottom: 3px;

  height: 2px;

  border-radius: 10px;

  background: #8b5e34;
}

/* Admin */

.admin-link {
  display: inline-block;

  padding: 0.55rem 1rem;

  border: 1px solid #8b5e34;
  border-radius: 8px;

  background: #8b5e34;
  color: #fff;

  font-size: 0.85rem;
  font-weight: 700;

  text-decoration: none;

  transition: all 0.25s ease;
}

.admin-link:hover {
  background: #6f4728;
  border-color: #6f4728;
  color: #fff;

  transform: translateY(-1px);
}

/* Mobile */

@media (max-width: 991.98px) {

  .navbar-collapse {
    padding: 1rem 0;
  }

  .navbar-nav {
    gap: 0;
  }

  .nav-link {
    padding: 0.7rem 0 !important;
  }

  .nav-link.router-link-active::after {
    left: 0;
    right: auto;
    width: 35px;
  }

  .admin-link {
    margin-top: 0.5rem;
  }
}

</style>