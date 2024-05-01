import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('../views/IndexView.vue')
    },
    {
      path: '/category/:slug/:subcategorySlug?',
      name: 'category',
      component: () => import('../views/CategoryView.vue')
    }
  ]
})

export default router
