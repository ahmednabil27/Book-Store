import AuthorDetails from '@/components/AuthorDetails.vue'
import BooksSection from '@/components/BooksSection.vue'
import AboutView from '@/views/AboutView.vue'
import AuthorsSection from '@/views/AuthorsSection.vue'
import BookDetailsView from '@/views/BookDetailsView.vue'
import Home from '@/views/Home.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Home
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
    }
  ],
})

export default router
