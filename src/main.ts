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
import { startVersionCheck } from './utils/versionCheck'
import TDesign from 'tdesign-vue-next'
import 'tdesign-vue-next/es/style/index.css'
import 'normalize.css/normalize.css'
// 启动版本检测服务 (20秒检查一次)
startVersionCheck(1000 * 20)
// 挂载到app上
createApp(App)
  .use(router)
  .use(createPinia())
  .use(TDesign)

  .mount('#app')
