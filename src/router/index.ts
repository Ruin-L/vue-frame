/*
 * @Description: {{ByRuin}}
 * @Version: 2.0
 * @Author: Ruin 🍭
 * @Date: 2022-01-25 16:57:54
 * @LastEditors: 刘引
 * @LastEditTime: 2022-01-25 17:35:58
 */
import { createRouter, createWebHashHistory } from "vue-router";
const routes = [
  {
    path: "/",
    component: () => import("../views/index.vue"),
    // redirect: "/index",
  },
  // {
  //   path: "/index",
  //   component: () => import("../views/index.vue"),
  // },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;
