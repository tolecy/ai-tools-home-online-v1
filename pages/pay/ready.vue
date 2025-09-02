<template>
  <div class="min-h-screen flex flex-col items-center justify-center dark:bg-black bg-white dark:text-white p-6 text-center">
    <div class="w-full max-w-2xl flex items-center mb-6">
      <!-- <button class="px-4 py-2 rounded bg-gray-700 text-white" @click="goBack">返回</button> -->
      <h1 class="flex-1 text-center text-2xl font-bold">{{ $t('pay.ready.title') }}</h1>
    </div>
    <p class="text-gray-400 mb-6">{{ $t('pay.ready.autoRedirect', { s: countdown }) }}</p>
    <div class="flex gap-3">
      <button class="px-4 py-2 rounded bg-gray-700 text-white" @click="goCheckout">{{ $t('pay.ready.goNow') }}</button>
      <button class="px-4 py-2 rounded bg-gray-500 text-white" @click="cancel">{{ $t('pay.ready.cancel') }}</button>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'blank' })
const route = useRoute()
const router = useRouter()
const localePath = useLocalePath()
const bundle = computed(() => (route.query.bundle as string) || '')
const countdown = ref(3)
let timer: any = null

onMounted(() => {
  // 参数缺失则返回定价页
  if (!bundle.value) {
    const path = localePath('/pricing')
    navigateTo(path)
    return
  }
  timer = setInterval(() => {
    countdown.value -= 1
    if (countdown.value <= 0) {
      clearInterval(timer)
      goCheckout()
    }
  }, 1000)
})

onBeforeUnmount(() => timer && clearInterval(timer))

function cancel() {
  router.back()
}

function goCheckout() {
  const path = localePath('/pay/checkout')
  router.push({ path, query: { bundle: bundle.value } })
}

function goBack() {
  if (history.length > 1) {
    router.back()
  } else {
    const path = localePath('/pricing')
    router.replace(path)
  }
}
</script>


