<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
const { locale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()

// 确保首次加载时设置英文为默认语言
onMounted(() => {
  // 如果当前没有语言前缀，或者在根路径，重定向到英文版首页
  if (route.path === '/' || !route.path.match(/^\/(en|zh)/)) {
    // window.location.href = '/en' + route.fullPath.replace(/^\//, '')
    navigateTo('/en' + route.fullPath.replace(/^\//, ''))
  }
})
</script>
