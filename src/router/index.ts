/*
 * @Description: {{ByRuin}}
 * @Version: 2.0
 * @Author: Ruin 🍭
 * @Date: 2022-01-25 16:57:54
 * @LastEditors: 刘引
 * @LastEditTime: 2022-03-11 14:26:24
 */
import path from 'node:path/win32'
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
// 我感觉
