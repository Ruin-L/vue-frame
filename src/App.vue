<!-- 基于rspack打包github&gitee -->
<template>
  <router-view></router-view>
  <footer class="app-version">
    <span>版本：{{ versionText }}</span>
  </footer>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const versionText = ref('未知')
onMounted(async () => {
  try {
    const res = await fetch('/version.json', { cache: 'no-store' })
    if (res.ok) {
      const data = await res.json()
      const v = typeof data?.version === 'string' && data.version.trim() ? data.version.trim() : ''
      versionText.value = v || '未知'
    } else {
      versionText.value = '未知'
    }
  } catch (e) {
    versionText.value = '未知'
  }
})
</script>

<style>
@import './assets/scss/index.scss';
.app-version {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  padding: 6px 8px;
  font-size: 12px;
  color: #333;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: saturate(180%) blur(6px);
  border-top: 1px solid rgba(0, 0, 0, 0.08);
}
</style>
