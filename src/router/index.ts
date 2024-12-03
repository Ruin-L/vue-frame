// import path from 'node:path/win32'
import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    component: () => import('@/views/index.vue'),
    children: [
      {
        path: '/',
        component: import('@/views/index.vue'),
        children: [{ path: '/', component: import('@/views/index.vue') }]
      }
    ]
    // redirect: "/index",
  },
  {
    path: '/user',
    component: () => import('@/views/user/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
export default router
