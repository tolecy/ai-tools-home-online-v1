<template>
  <div class="px-40 py-10">
    <Breadcrumbs :items="[
        { label: 'Models', to: '/models' },
        { label: 'Playground', to: '/models/playground' },
      ]" />
    <div class="w-full flex justify-center">
      <div class="flex w-1/3 md:max-w-sm my-4 rounded shadow">
        <div @click="activeTab = 'Detail'" :class="activeTab === 'Detail' ? 'active' : ''"
          class="w-full cursor-pointer flex justify-center font-medium rounded-l px-5 py-2 border bg-white text-gray-800 dark:bg-gray-800 dark:text-white dark:border-gray-800 border-gray-200 hover:bg-gray-100">
          Detail
        </div>

        <div @click="activeTab = 'Playground'" :class="activeTab === 'Playground' ? 'active' : ''"
          class="w-full cursor-pointer flex justify-center font-medium rounded-r px-5 py-2 border-t border bg-white text-gray-800 dark:bg-gray-800 dark:text-white dark:border-gray-800 border-gray-200 hover:bg-gray-100">
          Playground
        </div>
      </div>
      <div class="flex-1 max-w-[850px] ml-10"></div>
    </div>
    <div v-if="activeTab === 'Detail'" class="space-y-12">
      {{ currentModel?.description }}
    </div>
    <div v-if="activeTab === 'Playground'">
      <div class="flex justify-center">
        <div class="my-4 w-1/3 md:max-w-sm">
          <div class="w-full shadow-md dark:bg-gray-700 rounded-lg min-h-16 mb-4 border border-gray-200 dark:border-gray-700 p-4">
            <div class="pb-4 text-sm font-semibold text-gray-800 dark:text-white">Model</div>
            <div>{{ currentModel?.name }}</div>
          </div>
          <div class="flex justify-between text-gray-500">
            <label for="temperature-range" class="block text-gray-700 font-bold mb-2">Temperature</label>
            <span>{{ playgroundData.temperature }}</span>
          </div>
          <input type="range" id="temperature-range" class="w-full accent-indigo-600 cursor-pointer" step="0.1" min="0"
            max="1" :value="playgroundData.temperature" @input="updateData($event, 'temperature')">
          <div class="flex justify-between text-gray-500">
            <label for="maxLength-range" class="block text-gray-700 font-bold mb-2">Max Length</label>
            <span>{{ playgroundData.maxLength }}</span>
          </div>
          <input type="range" id="maxLength-range" class="w-full accent-indigo-600 cursor-pointer" step="1" min="0"
            max="2048" :value="playgroundData.maxLength" @input="updateData($event, 'maxLength')">
          <div class="flex justify-between text-gray-500">
            <label for="topP-range" class="block text-gray-700 font-bold mb-2">top P</label>
            <span>{{ playgroundData.topP }}</span>
          </div>
          <input type="range" id="topP-range" class="w-full accent-indigo-600 cursor-pointer" step="0.1" min="0" max="1"
            :value="playgroundData.topP" @input="updateData($event, 'topP')">
        </div>

        <!-- Mac 风格窗口 -->
        <div class="bg-white my-4 ml-10 dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 flex-1 max-w-[850px]">
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
          <div class="h-[600px] flex flex-col">
            <!-- 消息历史区域 - 使用 flex-1 自动占据剩余空间 -->
            <div class="flex-1 p-4 space-y-4 overflow-y-auto" ref="messageContainer">
              <div v-for="(message, index) in messageList" :key="index" class="flex" :class="message.role === 'user' ? 'justify-end' : 'justify-start'">
                <div v-if="message.role === 'user'" class="bg-primary/10 rounded-lg p-3 px-5">
                  <span>{{ message.content }}</span>
                </div>
                <div v-else class="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 px-5">
                  <span>{{ message.content }}</span>
                </div>
              </div>
              <div v-if="chatLoading" class="flex justify-start">
                <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 px-5 flex items-center">
                  <div class="text-gray-500 animate-pulse">loading</div>
                  <div class="rounded-full h-2 w-2 bg-gray-800 animate-ping ml-3"></div>
                  <div class="rounded-full h-2 w-2 bg-gray-800 animate-ping ml-3"></div>
                  <div class="rounded-full h-2 w-2 bg-gray-800 animate-ping ml-3"></div>
                </div>
              </div>
            </div>
            
            <!-- 输入框区域 - 固定在底部 -->
            <div class="p-4 border-t border-gray-200 dark:border-gray-700">
              <div class="flex gap-2">
                <div class="flex-1 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <!-- <input type="text" v-model="inputText" class="w-full h-full bg-transparent px-4 focus:outline-none"> -->
                  <textarea v-model="inputText" class="w-full h-full bg-transparent px-4 py-2 focus:outline-none resize-none" rows="1" placeholder="Send a message..." @keydown="handleKeyDown"></textarea>
                </div>
                <div class="w-16 h-10 bg-primary/30 rounded-lg relative cursor-pointer" :class="inputText ? 'active-btn' : ''" @click="sendMessage(inputText)">
                  <!-- 发送按钮 -->
                  <svg xmlns="http://www.w3.org/2000/svg" class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-white" viewBox="0 0 24 24">
                      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" fill="currentColor"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getModels, chat } from '../../../api/models'
const activeTab = ref('Playground')

const playgroundData = ref<{[key:string]: any}>({
  system: '',
  module: '',
  temperature: 0.5,
  maxLength: 1024,
  topP: 0.5
})
const updateData = (event: any, type: string) => {
  playgroundData.value[type] = event.target.value
}

const messageContainer = ref<HTMLDivElement>()
const route = useRoute()
const models = route.query.model
const { data: llmModels } = await getModels()
const inputText = ref('')
const chatLoading = ref(false)

const currentModel = computed(() => {
  return llmModels.value.find((model: any) => model.name === models)
})

// 引导语
const preMessageList = [
  {
    role: 'robot',
    content: 'Hello! How can I assist you today?'
  },
  {
    role: 'robot',
    content: 'You can ask me anything, and I will try my best to answer it.'
  }
]

const messageList = ref<{role: string, content: string}[]>([
  ...preMessageList
])

const createMessage = (message: string, role = 'user') => {
  messageList.value.push({
    role,
    content: message
  })
  scrollToBottom()
}

const scrollToBottom = () => {
  nextTick(() => {
    if (messageContainer.value) {
      messageContainer.value.scrollTop = messageContainer.value.scrollHeight
    }
  })
}

const sendMessage = async (message: string) => {
  if (!currentModel.value) {
    return
  }
  chatLoading.value = true
  try {
    createMessage(message)
    inputText.value = ''
    const { data: res } = await chat({
      model_name: currentModel.value.name,
      message
    })
    createMessage(res.value.response, 'robot')
  } catch (error: any) {
    console.error('error =====>', error)
    if (error === 401) {
      navigateTo('/login');
    }
    throw error
  } finally {
    chatLoading.value = false
  }
}

const handleKeyDown = (event: any) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    sendMessage(inputText.value);
  }
}
</script>

<style scoped>
.active {
  @apply bg-gray-900 dark:bg-white dark:text-gray-800 dark:border-white text-white border-gray-900 hover:bg-gray-800;
}
.active-btn {
  @apply bg-primary dark:bg-white dark:text-primary dark:border-white text-white border-primary hover:bg-primary;
}
</style>