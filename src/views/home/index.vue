<template>
  <div class="root-home">
    <p>我是home组件</p>
    <el-button>按钮</el-button>
    <news></news>
  </div>
</template>
<script setup lang="ts">
import { computed, watch, onUpdated, ref, reactive, onBeforeMount } from 'vue'
import news from './components/news.vue'
import { getInfo, getItem } from '@/services/home'

// get请求
const getDataFromApi = async () => {
  try {
    const res = await getInfo({ type: 'scorpio', time: 'today' })
    console.debug(res, '获取到的数据')
  } catch (error) {
    console.error('get获取星座数据报错', error)
  }
}

// post请求
const postDataFromApi = async () => {
  try {
  } catch (error) {
    console.error('post获取数据报错', error)
  }
}

// dom加载前调用
onBeforeMount(() => {
  // getDataFromApi()
  // postDataFromApi()
})
</script>

<style lang="scss" scoped></style>
