import Vue from 'vue'
import VueRouter from 'vue-router'

import Msite from "../views/Msite/Msite"
import Order from "../views/Order/Order"
import Profile from "../views/Profile/Profile"
import Search from "../views/Search/Search"

Vue.use(VueRouter)

  const routes = [
    {
      path: '/msite',
      component: Msite
    },
    {
      path: '/order',
      component: Order
    },
    {
      path: '/profile',
      component: Profile
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/',
      redirect:'/msite'
    },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
