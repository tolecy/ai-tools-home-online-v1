<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
    <app-header />
    <div class="mt-16 min-h-screen">
      <slot />
    </div>
    <app-footer />
  </div>
</template>

<script setup lang="ts">
import { useTheme } from '../composables/useTheme'
const { initTheme } = useTheme()

// 在组件挂载时初始化主题
onMounted(() => {
  initTheme()
})
</script>