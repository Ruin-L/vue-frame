<template>
  <Header></Header>
  <div>根组件{{ store.count }}</div>
  <Footer></Footer>
</template>

<script setup lang="ts">
import { reactive, onMounted, watch } from 'vue'
import { useMain } from '@/store'
const store = useMain()
</script>

<style scoped lang="scss"></style>
