/*
 * @Author: 刘引 liu.yin.work@foxmail.com
 * @Date: 2023-08-01 13:46:06
 * @LastEditors: 刘引 liu.yin.work@foxmail.com
 * @LastEditTime: 2023-08-01 15:56:19
 * @FilePath: \kthec-emss-web\src\pinia\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineStore } from 'pinia' // 定义容器

export let useMain = defineStore('useStore', {
  /**
   * 存储全局状态
   * 1.必须是箭头函数: 为了在服务器端渲染的时候避免交叉请求导致数据状态污染
   * 和 TS 类型推导
   */
  state: () => {
    return {
      count: 0,
      list: [1, 2, 3, 4]
    }
  },
  /**
   * 用来封装计算属性 有缓存功能  类似于computed
   */
  getters: {},
  /**
   * 编辑业务逻辑  类似于methods
   */
  actions: {
    changeData(val: number) {
      this.count = val + 10
    }
  }
})
