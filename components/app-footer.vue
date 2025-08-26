<template>
  <footer class="h-[150px] bg-gray-100 dark:bg-gray-800">
    <div class="container mx-auto px-4 h-full flex items-center justify-between">
      <div class="text-gray-600 dark:text-gray-300">
        <p>&copy; 2025 AI Tools. All rights reserved.</p>
      </div>
      
      <div class="flex gap-6 text-gray-600 dark:text-gray-300">
        <NuxtLink :to="`/${locale}/terms`" class="hover:text-gray-900 dark:hover:text-gray-100">
          Terms of Service
        </NuxtLink>
        <NuxtLink :to="`/${locale}/privacy`" class="hover:text-gray-900 dark:hover:text-gray-100">
          Privacy Policy
        </NuxtLink>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const { locale } = useI18n()
</script>
