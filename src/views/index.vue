<template>
  <Head></Head>
  <div>根组件{{ store.count }}</div>
  <Foot></Foot>
</template>

<script setup lang="ts">
import { reactive, onMounted, watch } from 'vue'
import { useMain } from '@/store'
const store = useMain()
</script>

<style scoped lang="scss"></style>
