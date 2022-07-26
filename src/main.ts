/*
 * @Description: {{ByRuin}}
 * @Version: 2.0
 * @Author: Ruin 🍭
 * @Date: 2022-01-25 16:22:24
 * @LastEditors: 刘引
 * @LastEditTime: 2022-03-11 14:55:52
 */
import { createApp } from "vue";

import router from "./router/index"; //引入vue-router
import store from "./store/index";
import App from "./App.vue";
// import
import "normalize.css/normalize.css";
const app = createApp(App);
app.use(router); // 挂载到app上
app.use(store); // 挂载到app上
app.mount("#app");
