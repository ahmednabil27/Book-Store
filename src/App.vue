<script setup>
import Footer from './components/Footer.vue';
import NavBar from './components/NavBar.vue';
import Book from './components/Book.vue'
// import BooksSection from './views/BooksSection.vue';
import HeroBook from './components/HeroBook.vue';
import Author from './components/Author.vue';
import AuthorsSection from './views/AuthorsSection.vue';
import AuthorDetails from './components/AuthorDetails.vue';
import AboutView from './views/AboutView.vue';
import BookDetailsView from './views/BookDetailsView.vue';
import AdminView from './views/AdminView.vue';
import AdminBooks from './views/AdminBooks.vue';
import AddBook from './views/AddBook.vue';
import EditBook from './views/EditBook.vue';
import AdminAuthorView from './views/AdminAuthorView.vue';
import AdminAuthorCreateView from './views/AdminAuthorCreateView.vue';
import AdminAuthorEditView from './views/AdminAuthorEditView.vue';
import ChatBot from './components/ChatBot.vue';


console.log(import.meta.env.VITE_GEMINI_API_KEY);
</script>

<template>
  <NavBar />
  <div class="container px-2">
    <!-- <Book /> -->
     <!-- <BooksSection /> -->
      <!-- <HeroBook /> -->

      <!-- <BookDetailsView /> -->

      <!-- <Author /> -->
       <!-- <AdminBooks /> -->
        <!-- <AddBook /> -->
         <!-- <EditBook /> -->
          <!-- <AdminAuthorEditView />
          <AdminAuthorCreateView />
          <AdminAuthorView /> -->

          <RouterView />

       <!-- <AuthorsSection /> -->
        <!-- <AuthorDetails /> -->
         <!-- <AdminView /> -->
        <!-- <AboutView /> -->

  </div>
  <Footer />
</template>

<style scoped></style>
