<!--
 * @Description: {{ByRuin}}
 * @Version: 2.0
 * @Author: Ruin 🍭
 * @Date: 2022-01-25 16:22:24
 * @LastEditors: 刘引
 * @LastEditTime: 2022-03-10 10:55:38
-->

<template>
  <Header></Header>
  <router-view></router-view>
  <Footer></Footer>
</template>

<script setup lang="ts">
import Header from "@/components/Header.vue"
import Footer from "@/components/Footer.vue"
</script>

<style>
@import "./assets/scss/index.scss";
</style>
