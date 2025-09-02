<template>
  <div class="min-h-screen flex flex-col items-center justify-start dark:bg-black bg-white dark:text-white p-6">
    <div class="w-full max-w-2xl flex items-center mb-4">
      <button class="px-4 py-2 rounded bg-gray-700 text-white" @click="goBack">{{ $t('pay.checkout.back') }}</button>
      <h1 class="flex-1 text-center text-2xl font-bold">{{ $t('pay.checkout.title') }}</h1>
    </div>
    <div id="checkout" class="w-full max-w-2xl"></div>
  </div>
</template>

<script setup lang="ts">
import { loadStripe } from '@stripe/stripe-js'
import httpRequest from '../../common/request'
definePageMeta({ layout: 'blank' })

const route = useRoute()
const router = useRouter()
const { t, locale } = useI18n()
const bundle = computed(() => (route.query.bundle as string) || '')
const sessionId = computed(() => (route.query.session_id as string) || '')
let embeddedCheckout: any = null

function destroyEmbeddedCheckout() {
  try {
    if (embeddedCheckout && typeof embeddedCheckout.destroy === 'function') {
      embeddedCheckout.destroy()
    } else if (embeddedCheckout && typeof embeddedCheckout.unmount === 'function') {
      embeddedCheckout.unmount()
    }
  } catch (e) {}
  embeddedCheckout = null
  if (process.client) {
    try {
      const w: any = window as any
      if (w.__embeddedCheckout && typeof w.__embeddedCheckout.destroy === 'function') {
        w.__embeddedCheckout.destroy()
      }
      w.__embeddedCheckout = null
    } catch {}
    try {
      const el = document.getElementById('checkout')
      if (el) el.innerHTML = ''
    } catch {}
  }
}

onMounted(async () => {
  // 避免重复实例
  destroyEmbeddedCheckout()
  // 如果是从 return_url 返回，直接恢复
  if (sessionId.value) {
    try {
      const res = await fetchClientSecretBySession(sessionId.value)
      if (!res || !res.client_secret || !res.publishable_key) throw new Error('Missing client secret')
      const stripe = await loadStripe(res.publishable_key)
      if (!stripe) throw new Error('Stripe load failed')
      embeddedCheckout = await (stripe as any).initEmbeddedCheckout({ clientSecret: res.client_secret })
      if (process.client) (window as any).__embeddedCheckout = embeddedCheckout
      embeddedCheckout.mount('#checkout')
    } catch (e) {
      console.error('restore checkout failed', e)
      alert(t('pay.checkout.errors.restoreFailed') as string)
      const lp = useLocalePath()
      const path = lp('/pricing')
      router.replace(path)
    }
    return
  }

  // 新建会话
  try {
    if (!bundle.value) throw new Error('Missing bundle')
    const res = await createSession(bundle.value)
    if (!res || !res.client_secret || !res.publishable_key) throw new Error('Create session failed')
    const stripe = await loadStripe(res.publishable_key)
    if (!stripe) throw new Error('Stripe load failed')
    embeddedCheckout = await (stripe as any).initEmbeddedCheckout({ clientSecret: res.client_secret })
    if (process.client) (window as any).__embeddedCheckout = embeddedCheckout
    embeddedCheckout.mount('#checkout')
  } catch (e) {
    console.error('create checkout failed', e)
    alert(t('pay.checkout.errors.createFailed') as string)
    const lp = useLocalePath()
    const path = lp('/pricing')
    router.replace(path)
  }
})

onBeforeUnmount(() => {
  destroyEmbeddedCheckout()
})

function goBack() {
  const lp = useLocalePath()
  if (history.length > 1) {
    router.back()
  } else {
    const path = lp('/pricing')
    router.replace(path)
  }
}

async function createSession(bundleKey: string): Promise<{ client_secret: string; publishable_key: string }> {
  const res: any = await httpRequest.post('/api/v1/payments/create-checkout-session', { bundle_key: bundleKey, locale: locale.value }, { method: 'POST' })
  // useFetch返回对象.data.value
  // @ts-ignore
  return res.data.value
}

async function fetchClientSecretBySession(sessionId: string): Promise<{ client_secret: string; publishable_key: string }> {
  const res: any = await httpRequest.get('/api/v1/payments/session', { session_id: sessionId })
  // @ts-ignore
  return res.data.value
}
</script>


