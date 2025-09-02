<template>
  <div class="fixed top-0 left-0 right-0 z-50 flex justify-between items-center py-2 px-4 md:px-40 shadow-md bg-white dark:bg-gray-900">
    <div class="flex items-center cursor-pointer" @click="goHome">
      <svg class="w-10 h-10 text-black-600 dark:text-white" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 5L26.5 8.75V16.25L20 20L13.5 16.25V8.75L20 5Z" fill="currentColor"/>
        <path d="M28.5 12L35 15.75V23.25L28.5 27L22 23.25V15.75L28.5 12Z" fill="currentColor" opacity="0.7"/>
        <path d="M11.5 12L18 15.75V23.25L11.5 27L5 23.25V15.75L11.5 12Z" fill="currentColor" opacity="0.7"/>
        <path d="M20 24L26.5 27.75V35.25L20 39L13.5 35.25V27.75L20 24Z" fill="currentColor" opacity="0.7"/>
      </svg> 
      <span class="hidden md:block ml-2 font-bold text-xl text-gray-800 dark:text-white">AI Tools</span>
    </div>
    
    <nav class="flex items-center gap-4 md:gap-8">
      <NuxtLink 
        v-for="item in localizedNavItems" 
        :key="item.path"
        :to="item.path"
        class="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors md:text-base text-sm"
      >
        {{ $t(`nav.${item.name}`) }}
      </NuxtLink>
    </nav>

    <div class="flex items-center gap-4">
      <language-switcher />
      <theme-btn />
      <div v-if="userInfo" class="flex items-center gap-4">
        <div class="cursor-pointer px-4 py-1 rounded bg-teal-600 text-white dark:bg-gray-800 dark:text-white" @click="goProfile">{{ userInfo.username || getEmailPrefix(userInfo.email) }}</div>
        <div class="cursor-pointer login-btn" @click="handleLogout">Logout</div>
      </div>
      <div v-else @click="visibleLogin = true" class="cursor-pointer login-btn">Login</div>
    </div>
  </div>
  <LoginDialog v-model:modelValue="visibleLogin" @success="handleLoginSuccess"></LoginDialog>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { getUserInfo, logout } from '../api/user'

const { locale } = useI18n()

const visibleLogin = ref(false)
const navItems = [
  { name: 'homepage', path: '/' },
  { name: 'models', path: '/models' },
  { name: 'docs', path: '/docs' },
  { name: 'pricing', path: '/pricing' },
]

// 计算带有语言前缀的导航项
const localizedNavItems = computed(() => {
  return navItems.map(item => ({
    ...item,
    path: `/${locale.value}${item.path === '/' ? '' : item.path}`
  }))
})

const userInfo = ref()

const refreshUserInfo = async () => {
  const res = await getUserInfo()
  userInfo.value = res.data.value
}

const handleLoginSuccess = () => {
  window.location.reload()
}

const getEmailPrefix = (email) => {
  if (!email) return '';
  const parts = email.split('@');
  return parts[0];
}

const handleLogout = async () => {
  await logout()
  window.location.reload()
}

const localePath = useLocalePath()
const goHome = () => {
  const path = localePath('/')
  window.location.href = path
}

const goProfile = () => {
  const path = localePath('/profile')
  window.location.href = path
}

onMounted(async () => {
  await nextTick()
  refreshUserInfo()
})
</script>

<style scoped>
img[src*=".svg"] {
  color: currentColor;
}
.login-btn {
  @apply text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors md:text-base text-sm
}
</style>