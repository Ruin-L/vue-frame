<template>
  <Head></Head>
  <p>{{ userStore.userInfo.age }}</p>
  <t-button @click="userStore.userInfo.age++">测试</t-button>
  <Foot></Foot>
</template>

<script setup lang="ts">
import { reactive, onMounted, watch } from 'vue'
import { useUserStore } from '@/store'
const userStore = useUserStore()
</script>

<style scoped lang="scss"></style>
