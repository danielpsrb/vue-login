import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Signup from '../views/Signup.vue'
import Dashboard from '../components/Dashboard.vue'
import ForgotPasswordVue from '@/components/ForgotPassword.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/forgot-password',
      name: 'forgotpassword',
      component: ForgotPasswordVue
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
