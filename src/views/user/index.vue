<!--
 * @Description: {{ByRuin}}
 * @Version: 2.0
 * @Author: Ruin 🍭
 * @Date: 2022-03-10 10:11:06
 * @LastEditors: 刘引 liu.yin.work@foxmail.com
 * @LastEditTime: 2023-08-01 15:45:57
-->
<template>
  <div class="root-home">
    <news></news>
    <el-button @click="changeData()">更改值了</el-button>
    <h1>写一点demo玩一玩</h1>
  </div>
</template>

<script setup lang="ts">
import news from './components/news.vue'

import { computed } from 'vue'
const changeData = () => {}
</script>

<style lang="scss" scoped></style>
