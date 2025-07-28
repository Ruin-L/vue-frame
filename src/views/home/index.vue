<template>
  <div class="root-home">
    <p>我是home组件</p>

    <news></news>
  </div>
</template>
<script setup lang="ts">
import { computed, watch, onUpdated, ref, reactive } from 'vue'
import news from './components/news.vue'
</script>

<style lang="scss" scoped></style>
