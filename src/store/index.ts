/*
 * @Description: {{ByRuin}}
 * @Version: 2.0
 * @Author: Ruin 🍭
 * @Date: 2022-01-25 17:00:37
 * @LastEditors: 刘引
 * @LastEditTime: 2022-01-25 17:00:38
 */
import { createStore } from "vuex";
export default createStore({
  state: {
    userInfo: {
      name: "yk",
    },
  },
  mutations: {
    getUserInfo(state, name) {
      state.userInfo.name = name;
    },
  },
  actions: {},
  getters: {},
});
