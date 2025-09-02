<template>
  <div class="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { useTheme } from '../composables/useTheme'
const { initTheme } = useTheme()

onMounted(() => {
  initTheme()
})
</script>


