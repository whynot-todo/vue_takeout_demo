import Vue from 'vue'
import VueRouter from 'vue-router'

import Msite from "../views/Msite/Msite"
import Order from "../views/Order/Order"
import Profile from "../views/Profile/Profile"
import Search from "../views/Search/Search"
import Shop from '@/views/Shop/Shop'
import ShopGoods from '@/views/Shop/ShopGoods/ShopGoods'
import ShopInfo from '@/views/Shop/ShopInfo/ShopInfo'
import ShopRatings from '@/views/Shop/ShopRatings/ShopRatings'
import Login from '@/views/Login/Login'

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
        redirect: '/msite'
    },
    {
        path: '/shop',
        component: Shop,
        children: [
            {
                path: '/shop/goods',
                component: ShopGoods
            },
            {
                path: '/shop/ratings',
                component: ShopRatings
            },
            {
                path: '/shop/info',
                component: ShopInfo
            },
            {
                path: '',
                redirect: '/shop/goods'
            },
        ]
    },
    {
        path: '/login',
        component: Login,
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
