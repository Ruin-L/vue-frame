<!--
 * @Description: {{ByRuin}}
 * @Version: 2.0
 * @Author: Ruin 🍭
 * @Date: 2022-03-10 10:15:28
 * @LastEditors: 刘引 liu.yin.work@foxmail.com
 * @LastEditTime: 2023-08-01 15:45:21
-->
<template>
  <div class="root">我是公共头部组件</div>
</template>
<script setup lang="ts">
import { computed, onBeforeMount } from 'vue'

onBeforeMount(() => {})
computed(() => {
  console.log(123)
})
</script>
<style lang="scss" scoped></style>
