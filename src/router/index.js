import Vue from 'vue'
import VueRouter from 'vue-router'
import Orders from '../views/Orders.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Orders
  },
  {
    path: '/products',
    name: 'Products',
    component: () => import('../views/Products.vue')
  },
  {
    path: '/categories',
    name: 'Categories',
    component: () => import('../views/Categories.vue')
  },
  {
    path: '/users',
    name: 'Users',
    component: () => import('../views/Users.vue')
  },
  {
    path: '/merchants',
    name: 'Merchants',
    component: () => import('../views/Merchants/index.vue')
  },
  {
    path: '/merchants/:merchantId/merchant-branches',
    name: 'Merchant-branches',
    component: () => import('../views/Merchants/main.vue')
  },
  {
    path: '/merchants/:merchantId/merchant-branches/:merchantBranchId',
    name: 'Merchant-branches-id',
    component: () => import('../views/Merchants/MerchantVendorUser.vue')
  },
  {
    path: '/couriers',
    name: 'couriers',
    component: () => import('../views/Courier.vue')
  },
  {
    path: '/reports',
    name: 'Reports',
    component: () => import('../views/Reports.vue')
  },
  {
    path: '/reports/:merchantId/merchant-branches',
    name: 'Reports-branches',
    component: () => import('../views/Reports/MerchantBranches.vue')
  },
  {
    path: '/reports/:courierId/couriers',
    name: 'Courier-branches',
    component: () => import('../views/Reports/Couriers.vue')
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
