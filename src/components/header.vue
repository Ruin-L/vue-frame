<!--
 * @Description: {{ByRuin}}
 * @Version: 2.0
 * @Author: Ruin 🍭
 * @Date: 2022-03-10 10:15:28
 * @LastEditors: 刘引
 * @LastEditTime: 2022-03-10 14:58:15
-->
<template>
  <div class="root">我是公共头部组件</div>
</template>
<script setup lang="ts">
import { computed, onBeforeMount } from 'vue';
import { useStore } from 'vuex';
const store = useStore()


onBeforeMount(() => {

})
computed(() => {
  console.log(123);
})
</script>
<style lang="scss" scoped>
</style>