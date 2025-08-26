<template>
  <div class="flex flex-col items-center justify-center min-h-screen p-8">
    <!-- 标题和演示区域的容器 -->
    <div class="flex flex-col md:flex-row items-center justify-between max-w-6xl w-full gap-12">
      <!-- 左侧标题区域 -->
      <div class="flex-1 space-y-6">
        <h1 class="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          {{ $t('home.title') }}
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-300">
          {{ $t('home.subtitle') }}
        </p>
        <button 
          class="px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          @click="navigateToModels()"
        >
          {{ $t('home.getStarted') }}
        </button>
      </div>

      <!-- 右侧聊天演示区域 -->
      <div class="flex-1">
        <!-- Mac 风格窗口 -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
          <!-- 窗口标题栏 -->
          <div class="h-8 bg-gray-100 dark:bg-gray-700 flex items-center px-4 relative">
            <!-- 红绿灯按钮 -->
            <div class="flex gap-2 absolute left-4">
              <div class="w-3 h-3 rounded-full bg-red-500"></div>
              <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div class="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
          </div>

          <!-- 聊天内容区域 - 使用 flex 布局 -->
          <div class="h-[400px] flex flex-col">
            <!-- 消息历史区域 - 使用 flex-1 自动占据剩余空间 -->
            <div class="flex-1 p-4 space-y-4">
              <!-- 用户消息 -->
              <div class="flex justify-end">
                <div class="bg-primary/10 rounded-lg p-3 w-48">
                  <div class="h-2 bg-primary/30 rounded-full w-32 mb-2"></div>
                  <div class="h-2 bg-primary/30 rounded-full w-24"></div>
                </div>
              </div>
              
              <!-- AI回复 -->
              <div class="flex justify-start">
                <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 w-64">
                  <div class="h-2 bg-gray-300 dark:bg-gray-500 rounded-full w-48 mb-2"></div>
                  <div class="h-2 bg-gray-300 dark:bg-gray-500 rounded-full w-40 mb-2"></div>
                  <div class="h-2 bg-gray-300 dark:bg-gray-500 rounded-full w-36"></div>
                </div>
              </div>
              
              <!-- 用户消息 -->
              <div class="flex justify-end">
                <div class="bg-primary/10 rounded-lg p-3 w-40">
                  <div class="h-2 bg-primary/30 rounded-full w-28 mb-2"></div>
                  <div class="h-2 bg-primary/30 rounded-full w-20"></div>
                </div>
              </div>
            </div>
            
            <!-- 输入框区域 - 固定在底部 -->
            <div class="p-4 border-t border-gray-200 dark:border-gray-700">
              <div class="flex gap-2">
                <div class="flex-1 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg"></div>
                <div class="w-16 h-10 bg-primary/30 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { locale } = useI18n()
const navigateToModels = () => {
  navigateTo(`/${locale.value}/models`)
}
</script>