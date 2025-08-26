<template>
  <div class="max-w-7xl mx-auto px-4 py-8">
    <!-- 页面标题 -->
    <h1 class="text-3xl font-bold mb-8">{{ $t('models.title') }}</h1>

    <!-- 模型分类区域 -->
    <div class="space-y-12">
      <!-- Large Language Models 分类 -->
      <div class="model-category">
        <h2 class="text-2xl font-semibold mb-4">{{ $t('models.llm.title') }}</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <!-- 可点击模型卡片 -->
          <div 
            v-for="model in displayedModels" 
            :key="model.id"
            class="model-card cursor-pointer"
            @click="navigateToPlayground(model.name)"
          >
            <h3 class="text-xl font-medium mb-2">{{ model.name }}</h3>
            <p class="text-gray-600">{{ model.description }}</p>
          </div>
          <div 
            v-if="llmModels.length > 3" 
            class="model-card cursor-pointer flex flex-col items-center justify-center"
            @click="showAll = !showAll"
          >
            <div class="flex items-center gap-2">
              <span class="text-lg font-medium">{{ $t(`models.actions.${showAll ? 'less' : 'more'}`) }}</span>
              <div class="w-6 h-6" :class="{ 'rotate-180': showAll }">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 其他分类 -->
      <div class="model-category" v-for="category in otherCategories" :key="category.id">
        <h2 class="text-2xl font-semibold mb-4">{{ $t(`models.categories.${category.id}`) }}</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="model-card disabled">
            <h3 class="text-xl font-medium mb-2">{{ $t('models.comingSoon.title') }}</h3>
            <p class="text-gray-600">{{ $t('models.comingSoon.description') }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { getModels } from '../../api/models'

const { locale } = useI18n()

const otherCategories = ref([
  { id: 'llm-agents' },
  { id: 'vision-models' },
  { id: 'speech-models' }
])

const showAll = ref(false)

const displayedModels = computed(() => {
  if (showAll.value) {
    return llmModels.value
  }
  return llmModels.value.slice(0, 3)
})

const navigateToPlayground = (modelId) => {
  navigateTo(`/${locale.value}/models/playground?model=${modelId}`)
}

const { data: llmModels } = await getModels()
</script>

<style scoped>
.model-card {
  @apply p-6 rounded-lg border border-gray-200 transition-all duration-200;
  height: 160px;
}

.model-card.cursor-pointer {
  @apply hover:scale-[1.02] hover:shadow-lg hover:border-blue-200;
}

.model-card h3 {
  @apply text-xl font-medium mb-2;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.model-card p {
  @apply text-gray-600;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.model-card.disabled {
  @apply bg-[#9696961f] cursor-not-allowed border-transparent hover:shadow-none;
  opacity: 0.85;
}

.model-card.disabled h3,
.model-card.disabled p {
  @apply text-gray-500;
}
</style>