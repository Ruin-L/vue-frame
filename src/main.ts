/*
 * @Description: {{ByRuin}}
 * @Version: 2.0
 * @Author: Ruin 🍭
 * @Date: 2022-01-25 16:22:24
 * @LastEditors: 刘引 liu.yin.work@foxmail.com
 * @LastEditTime: 2023-08-01 15:54:28
 */
import { createApp } from 'vue'
import router from './router/index' //引入vue-router
import App from './App.vue'
import { createPinia } from 'pinia'
import Foot from '@/components/Foot.vue'
import Head from '@/components/Head.vue'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'element-plus/dist/index.css'
import 'normalize.css/normalize.css'
// 挂载到app上
createApp(App)
  .use(router)
  .use(createPinia())
  .use(ElementPlus)
  .component('Foot', Foot)
  .component('Head', Head)
  .mount('#app')
