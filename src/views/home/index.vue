<!--
 * @Description: {{ByRuin}}
 * @Version: 2.0
 * @Author: Ruin 🍭
 * @Date: 2022-03-10 10:11:06
 * @LastEditors: 刘引
 * @LastEditTime: 2022-03-10 13:02:31
-->
<template>
  <div class="root-home">
    <p>写一点demo玩一玩</p>
    <el-button @click="getData()">{{ res }}</el-button>
    <button @click="changeData()">更改值</button>
    <div v-for="(item, index) in moreRes">{{ index }}==={{ item.title }}</div>
  </div>
</template>
<script setup lang="ts">
import { onBeforeMount, onDeactivated, onMounted, onUpdated, reactive, ref } from 'vue';
let res = ref('我是响应式数据')
let moreRes = reactive([{ title: '我是复杂数据' }, { title: '我是复杂数据' }, { title: '我是复杂数据' }])
const getData = () => {
  console.log('出发一下');
  moreRes[0].title = '123'
  for (let i of moreRes) {
    console.log(i);
  }
  // console.log(moreRes);
}
const changeData = () => {
  res.value = '呵呵'
  console.log(res.value);
  console.log('触发');
}
// localStorage.setItem('key', res)

onBeforeMount(() => {
  console.log('dom渲染之前触发');
})
onMounted(() => {
  console.log('dom渲染完毕时触发')
})
onUpdated(() => {
  console.log('在界面数据更改时会触发');
})
onDeactivated(() => {
  console.log('组件销毁时触发');
})


</script>

<style lang="scss" scoped>
</style>