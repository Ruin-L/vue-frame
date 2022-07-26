/*
 * @Description: {{ByRuin}}
 * @Version: 2.0
 * @Author: Ruin 🍭
 * @Date: 2022-01-25 17:00:37
 * @LastEditors: 刘引
 * @LastEditTime: 2022-07-26 16:38:41
 */
import { createStore } from "vuex";
export default createStore({
  // 存放数据
  state: {
    userInfo: {
      name: "testVueX",
    },
  },
  // 同步方法更改state中属性的状态
  mutations: {
    getUserInfo(state, name) {
      state.userInfo.name = "我的值被改动";
      console.log("vueX中的方法触发");
    },
    setAsyncInfo(state) {
      state.userInfo.name = "setTimeOut";
    },
  },
  // 异步调用mutations中的方法更改state状态 并不能直接更改
  actions: {
    setData(context) {
      setTimeout(() => {
        context.commit("setAsyncInfo");
      }, 1000);
    },
  },
  //state中的数据做过滤等简单处理，相当于是计算属性
  getters: {},
});
