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
