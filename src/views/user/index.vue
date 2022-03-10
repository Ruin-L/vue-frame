<!--
 * @Description: {{ByRuin}}
 * @Version: 2.0
 * @Author: Ruin 🍭
 * @Date: 2022-03-10 10:11:06
 * @LastEditors: 刘引
 * @LastEditTime: 2022-03-10 16:05:04
-->
<template>
  <div class="root-home">
    <news></news>
    <el-button @click="changeData()">更改值了</el-button>
    <h1>写一点demo玩一玩</h1>
    {{ res }}
  </div>
</template>

<script setup lang="ts">
import news from "./components/news.vue"
import { useStore } from 'vuex';
import { computed } from "vue";
const store = useStore()
let res: any = computed(() => store.state.userInfo.name)
const changeData = () => {
  store.dispatch('setData')
}

</script>

<style lang="scss" scoped>
</style>
