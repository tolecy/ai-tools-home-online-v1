<template>
  <div class="min-h-screen flex flex-col items-center justify-center dark:bg-black bg-white dark:text-white p-6 text-center">
    <h1 class="text-2xl font-bold mb-4">{{ $t('pay.result.title') }}</h1>
    <p v-if="status==='success'" class="text-green-500 mb-4">{{ $t('pay.result.success') }}</p>
    <p v-else-if="status==='canceled'" class="text-yellow-500 mb-4">{{ $t('pay.result.canceled') }}</p>
    <p v-else-if="status==='failed'" class="text-red-500 mb-4">{{ $t('pay.result.failed') }}</p>
    <p v-else class="text-gray-400 mb-4">{{ $t('pay.result.loading') }}</p>
    <div class="flex gap-3">
      <button class="px-4 py-2 rounded bg-gray-700 text-white" @click="toPricing">{{ $t('pay.result.toPricing') }}</button>
      <button class="px-4 py-2 rounded bg-purple-700 text-white" @click="toProfile">{{ $t('pay.result.toProfile') }}</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import httpRequest from '../../common/request'

const route = useRoute()
const router = useRouter()
const localePath = useLocalePath()
const sessionId = computed(() => (route.query.session_id as string) || '')
const status = ref<'loading'|'success'|'failed'|'canceled'>('loading')

onMounted(async () => {
  const s = await probeStatus()
  status.value = s
  // 若仍不确定，轮询公共接口 6 次（约9秒）
  if (status.value === 'loading') {
    for (let i = 0; i < 6; i++) {
      await new Promise(r => setTimeout(r, 1500))
      try {
        const pub: any = await httpRequest.get('/api/v1/payments/public/session/status', { session_id: sessionId.value })
        const st = pub?.data?.value?.status
        if (st === 'paid') { status.value = 'success'; break }
        if (st === 'failed') { status.value = 'failed'; break }
        // pending 继续等待
      } catch {}
    }
  }
})

async function probeStatus(): Promise<'success'|'failed'|'canceled'|'loading'> {
  try {
    // 先尝试用 session_id 拿 client_secret，若能拿到说明是有效会话，进一步去查询订单状态
    const sess: any = await httpRequest.get('/api/v1/payments/session', { session_id: sessionId.value })
    if (sess?.data?.value?.client_secret) {
      // 查询与对账：根据 session_id 找到 order 并更新状态（需要新增后端接口按 session_id 查找）。
      // 这里退而求其次，拉取订单列表并匹配 session_id。
      const list: any = await httpRequest.get('/api/v1/payments/orders')
      const orders = list?.data?.value || []
      const order = orders.find((o: any) => o?.stripe_session_id === sessionId.value) || null
      if (!order) return 'failed'
      const rec: any = await httpRequest.get(`/api/v1/payments/reconcile/${order.id}`)
      const st = rec?.data?.value?.status
      if (st === 'paid') return 'success'
      if (st === 'failed') return 'failed'
      return 'loading'
    }
  } catch (e) {
    // ignore
  }
  // 未登录或上述查询失败，使用公共查询接口
  try {
    const pub: any = await httpRequest.get('/api/v1/payments/public/session/status', { session_id: sessionId.value })
    const st = pub?.data?.value?.status
    if (st === 'paid') return 'success'
    if (st === 'failed') return 'failed'
    if (st === 'pending') return 'loading'
  } catch {}
  // 不确定则保持 loading，等待轮询
  return 'loading'
}

function toPricing() {
  const path = localePath('/pricing')
  router.push(path)
}
function toProfile() {
  const path = localePath('/profile')
  router.push(path)
}
</script>


