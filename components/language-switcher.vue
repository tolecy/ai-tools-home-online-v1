<template>
  <div class="relative">
    <button
      @click="toggleDropdown"
      class="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path>
      </svg>
      <span class="hidden sm:inline">{{ currentLanguage.name }}</span>
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
      </svg>
    </button>
    
    <div
      v-if="isOpen"
      class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-50"
    >
      <div class="py-1">
        <button
          v-for="lang in availableLocales"
          :key="lang.code"
          @click="switchLanguage(lang.code)"
          class="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          :class="{
            'bg-gray-100 dark:bg-gray-700': locale === lang.code
          }"
        >
          <span class="mr-3">{{ lang.flag }}</span>
          <span>{{ lang.name }}</span>
          <svg
            v-if="locale === lang.code"
            class="w-4 h-4 ml-auto text-blue-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const router = useRouter()

const isOpen = ref(false)

// 可用语言配置
const availableLocales = computed(() => [
  {
    code: 'en',
    name: 'English',
    flag: '🇺🇸'
  },
  {
    code: 'zh',
    name: '中文',
    flag: '🇨🇳'
  }
])

// 当前语言
const currentLanguage = computed(() => {
  return availableLocales.value.find(lang => lang.code === locale.value) || availableLocales.value[0]
})

// 切换下拉菜单
const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

// 切换语言
const switchLanguage = async (langCode) => {
  if (langCode !== locale.value) {
    const path = switchLocalePath(langCode)
    await router.push(path)
  }
  isOpen.value = false
}

// 点击外部关闭下拉菜单
const handleClickOutside = (event) => {
  const target = event.target
  const dropdown = target.closest('.relative')
  if (!dropdown) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
/* 确保下拉菜单在最上层 */
.relative {
  position: relative;
}
</style>