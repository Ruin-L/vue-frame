<template>
  <Head></Head>
  <div>根组件{{ store.count }}</div>
  <home></home>
  <Foot></Foot>
</template>

<script setup lang="ts">
import { reactive, onMounted, watch } from 'vue'
import { useMain } from '@/store'
import home from '@/views/home/index.vue'

const store = useMain()
</script>

<style scoped lang="scss"></style>
