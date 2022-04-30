import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/explore',
    name: 'explore',
    component: () => import(/* webpackChunkName: "explore" */ '../views/ExploreView.vue')
  },
  {
    path: '/createAsset',
    name: 'createAsset',
    component: () => import(/* webpackChunkName: "createAsset" */ '../views/CreateAssetView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
