import { createRouter, createWebHistory } from 'vue-router'
import PluginNotFound from '../views/PluginNotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: PluginNotFound,
    },
    {
      path: '/exchangeRate',
      name: 'exchangeRate',
      component: () => import('../views/ExchangeRate.vue'),
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue'),
    // },
  ],
})

export default router
