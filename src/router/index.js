import AuthorDetails from '@/components/AuthorDetails.vue'
import BooksSection from '@/components/BooksSection.vue'
import AboutView from '@/views/AboutView.vue'
import AddBook from '@/views/AddBook.vue'
import AdminAuthorCreateView from '@/views/AdminAuthorCreateView.vue'
import AdminAuthorEditView from '@/views/AdminAuthorEditView.vue'
import AdminAuthorView from '@/views/AdminAuthorView.vue'
import AdminBooks from '@/views/AdminBooks.vue'
import AdminView from '@/views/AdminView.vue'
import AuthorsSection from '@/views/AuthorsSection.vue'
import BookDetailsView from '@/views/BookDetailsView.vue'
import EditBook from '@/views/EditBook.vue'
import Home from '@/views/Home.vue'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import SignupView from '@/views/SignupView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeView
    },
    {
      path: '/login',
      component: LoginView
    },
    {
      path: '/signup',
      component: SignupView
    },
    {
      path: '/about',
      component: AboutView
    },
    {
      path: '/books',
      component: BooksSection
    },
    {
      path: '/books/:id',
      component: BookDetailsView
    },
    {
      path: '/authors',
      component: AuthorsSection
    },
    {
      path: '/authors/:id',
      component: AuthorDetails
    },
    {
      path: '/admin',
      component: AdminView
    },
    {
      path: '/admin/books',
      component: AdminBooks
    },
    {
      path: '/admin/books/new',
      component: AddBook
    },
    {
      path: '/admin/books/:id/edit',
      component: EditBook
    },
    {
      path: '/admin/authors',
      component: AdminAuthorView
    },
    {
      path: '/admin/authors/new',
      component: AdminAuthorCreateView
    },
    {
      path: '/admin/authors/:id/edit',
      component: AdminAuthorEditView
    },
  ],
})

export default router
