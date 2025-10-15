import { createPinia } from 'pinia'
const store = createPinia()
export { store }
export * from './modules/user'
// export let useStore = defineStore('useStore', {
//   /**
//    * 存储全局状态
//    * 1.必须是箭头函数: 为了在服务器端渲染的时候避免交叉请求导致数据状态污染
//    * 和 TS 类型推导
//    */
//   state: () => {
//     return {
//       count: 0,
//       list: [1, 2, 3, 4]
//     }
//   },
//   /**
//    * 用来封装计算属性 有缓存功能  类似于computed
//    */
//   getters: {},
//   /**
//    * 编辑业务逻辑  类似于methods
//    */
//   actions: {
//     changeData(val: number) {
//       this.count = val + 10
//     }
//   }
// })
