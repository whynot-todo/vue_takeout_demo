import Vue from 'vue'
import VueRouter from 'vue-router'

import Msite from "../views/Msite/Msite"
import Order from "../views/Order/Order"
import Profile from "../views/Profile/Profile"
import Search from "../views/Search/Search"
import Shop from '@/views/Shop/Shop'

Vue.use(VueRouter)

  const routes = [
    {
      path: '/msite',
      component: Msite, 
      meta: {
        showFooter: true
      }
    },
    {
      path: '/search',
      component: Search,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/order',
      component: Order,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/profile',
      component: Profile,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/',
      redirect:'/msite'
    },
    {
      path: '/shop',
      component:Shop
    },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
