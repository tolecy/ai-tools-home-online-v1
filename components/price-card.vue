<template>
  <div class="dark:bg-gray-900 bg-white dark:border-none border border-purple-600 rounded-xl p-6 flex flex-col">
    <h2 class="text-xl font-bold mb-2">{{ title }}</h2>
    <div class="text-3xl font-bold mb-6" v-if="price !== 0">${{ price }}<span class="text-sm text-gray-400">{{ $t('pricing.perMonth') }}</span></div>
    <div class="text-3xl font-bold mb-6" v-else>{{ $t('pricing.free') }}</div>
    <ul class="space-y-4 flex-grow">
      <li class="flex items-start gap-2" v-for="(feature, index) in features" :key="index">
        <svg class="w-5 h-5 text-purple-500 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <span>{{ feature }}</span>
      </li>
    </ul>
    <button  v-if="price !== 0" class="w-full mt-6 bg-purple-700 hover:bg-purple-600 text-white py-3 rounded-lg cursor-pointer" @click="subscribe">{{ $t('pricing.subscribe') }}</button>
    <div v-else class="w-full mt-6 border-purple-700 border dark:text-white text-purple-700 py-3 rounded-lg text-center">{{ $t('pricing.portal') }}</div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  title: string
  price: number
  features: string[]
}>()

const emit = defineEmits(['subscribe'])

const subscribe = () => {
  emit('subscribe')
}
</script>