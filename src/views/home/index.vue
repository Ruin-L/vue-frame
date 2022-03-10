<!--
 * @Description: {{ByRuin}}
 * @Version: 2.0
 * @Author: Ruin 🍭
 * @Date: 2022-03-10 10:11:06
 * @LastEditors: 刘引
 * @LastEditTime: 2022-03-10 17:50:33
-->
<template>
  <div class="root-home">
    <p>我是home组件</p>
    <el-button>按钮</el-button>
    <news></news>
  </div>
</template>
<script setup lang="ts">
import { computed, watch, onUpdated, ref, reactive } from 'vue';
import news from './components/news.vue'

</script>

<style lang="scss" scoped>
</style>