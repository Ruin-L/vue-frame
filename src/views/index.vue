<!--
 * @Description: {{ByRuin}}
 * @Version: 2.0
 * @Author: Ruin 🍭
 * @Date: 2022-01-25 17:26:47
 * @LastEditors: 刘引
 * @LastEditTime: 2022-01-25 18:10:50
-->
<script setup lang="ts">
import HelloWorld from '@/components/HelloWorld.vue'
import { ref } from 'vue';

const msg = ref('这是主页')

</script>

<template>
  <div class="home">{{ msg }}</div>
  <div class="content">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Vue 3 + TypeScript + Vite + volar + vscode +element-plus" />
    <el-button>Default</el-button>
  </div>
</template>

<style lang="scss" scoped></style>