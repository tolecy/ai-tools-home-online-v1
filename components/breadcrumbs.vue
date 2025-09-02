<template>
  <nav class="flex items-center py-2 whitespace-nowrap overflow-x-auto" aria-label="breadcrumb">
    <div v-for="(item, index) in items" :key="item.to" class="inline-flex items-center">
      <!-- 非最后一项使用可点击链接 -->
      <NuxtLink 
        v-if="index < items.length - 1" 
        :to="`/${locale}${item.to}`"
        class="text-gray-600 hover:text-[#1a73e8] dark:text-gray-300 dark:hover:text-white transition-colors"
      >
        {{ item.label }}
      </NuxtLink>
      
      <!-- 最后一项显示为纯文本 -->
      <span 
        v-else 
        class="text-gray-600"
        aria-current="page"
      >
        {{ item.label }}
      </span>

      <!-- 分隔符 -->
      <span 
        v-if="index < items.length - 1" 
        class="mx-2 text-gray-400"
        aria-hidden="true"
      >/</span>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const { locale } = useI18n()

const props = defineProps<{
  items: {
    label: string
    to: string
  }[]
}>()
</script>

