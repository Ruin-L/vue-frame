import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useUserStore = defineStore(
  'useUserStore',
  () => {
    const userInfo = reactive({
      name: 'yin.liu',
      age: 18
    })
    return { userInfo }
  },
  {
    persist: true
  }
)
