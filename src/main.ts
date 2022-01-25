import { createApp } from "vue";
import router from "./router/index"; //引入vue-router
import store from "./store/index";
import App from "./App.vue";

const app = createApp(App);
app.use(router); // 挂载到app上
app.use(store); // 挂载到app上
app.mount("#app");
