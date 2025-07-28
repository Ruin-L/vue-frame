<template>
  <Head></Head>
  <div @click="store.count++">根组件{{ store.count }}</div>
  <t-button>测试</t-button>
  <Foot></Foot>
</template>

<script setup lang="ts">
import { reactive, onMounted, watch } from 'vue'
import { useStore } from '@/store'
const store = useStore()
</script>

<style scoped lang="scss"></style>
