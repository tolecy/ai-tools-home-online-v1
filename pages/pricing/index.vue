<!-- components/PricingSection.vue -->
<template>
  <div class="min-h-screen dark:bg-black bg-white dark:text-white p-4 md:p-8">
    <!-- Header Section -->
    <div class="text-center max-w-2xl mx-auto mb-12">
      <h1 class="text-2xl md:text-4xl font-bold mb-4">{{ $t('pricing.title') }}</h1>
      <p class="text-gray-400">{{ $t('pricing.subtitle') }}</p>
      
      <!-- Toggle Buttons -->
      <div class="flex justify-center gap-4 mt-6">
        <button class="px-4 py-2 text-white rounded-full bg-gray-800 hover:bg-gray-700">{{ $t('pricing.payYearly') }}</button>
        <button class="px-4 py-2 text-white rounded-full bg-purple-700 hover:bg-purple-600">{{ $t('pricing.savePercent') }}</button>
        <button class="px-4 py-2 text-white rounded-full bg-gray-800 hover:bg-gray-700">{{ $t('pricing.payMonthly') }}</button>
      </div>
    </div>

    <!-- Pricing Cards Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
      <PriceCard
        v-for="(price, index) in prices"
        :key="index"
        :features="price.features"
        :price="price.price"
        :title="price.title"
        ></PriceCard>
    </div>

    <!-- One-time Message Packs -->
    <div class="max-w-7xl mx-auto mt-14">
      <h2 class="text-xl md:text-2xl font-bold mb-6 text-center">{{ $t('pricing.bundles.title') }}</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <PriceCard
          v-for="(bundle, idx) in bundles"
          :key="`bundle-${idx}`"
          :title="bundle.title"
          :price="bundle.price"
          :features="bundle.features"
          :priceSuffix="t('pricing.oneTime')"
          :ctaKey="'pricing.buy'"
          @subscribe="buy(bundle, idx)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()
import http from '../../common/request'

// 定义基础价格数据结构
const basePrices = [
  {
    planKey: 'free',
    price: 0,
    featureKeys: ['pricing.plans.free.features.0']
  },
  {
    planKey: 'standard',
    price: 5.99,
    featureKeys: [
      'pricing.plans.standard.features.0',
      'pricing.plans.standard.features.1', 
      'pricing.plans.standard.features.2'
    ]
  },
  {
    planKey: 'premium',
    price: 14.99,
    featureKeys: [
      'pricing.plans.premium.features.0',
      'pricing.plans.premium.features.1',
      'pricing.plans.premium.features.2'
    ]
  },
  {
    planKey: 'deluxe',
    price: 49.99,
    featureKeys: [
      'pricing.plans.deluxe.features.0',
      'pricing.plans.deluxe.features.1',
      'pricing.plans.deluxe.features.2',
      'pricing.plans.deluxe.features.3',
      'pricing.plans.deluxe.features.4',
      'pricing.plans.deluxe.features.5'
    ]
  }
]

const prices = computed(() => 
  basePrices.map(basePrice => ({
    title: t(`pricing.plans.${basePrice.planKey}.title`),
    price: basePrice.price,
    features: basePrice.featureKeys.map(key => t(key))
  }))
)

// one-time bundles
const bundles = ref<{ key: string; title: string; price: number; features: string[] }[]>([])

onMounted(async () => {
  // 从后端读取数据库套餐
  try {
    const res: any = await http.get('/api/v1/payments/bundles')
    const list = res?.data?.value || []
    bundles.value = list.map((b: any) => ({
      key: b.key,
      title: b.title,
      price: Math.round((b.amount_cents || 0) / 100),
      features: [t('pricing.bundles.generic', { credits: b.credits })]
    }))
  } catch (e) {
    console.error('load bundles failed', e)
  }
})

if (process.client) {
  window.addEventListener('storage', (e) => {
    if (e.key === 'pricing_bundles_updated') {
      // 重新加载 bundles
      ;(async () => {
        try {
          const res: any = await http.get('/api/v1/payments/bundles')
          const list = res?.data?.value || []
          bundles.value = list.map((b: any) => ({
            key: b.key,
            title: b.title,
            price: Math.round((b.amount_cents || 0) / 100),
            features: [t('pricing.bundles.generic', { credits: b.credits })]
          }))
        } catch (e) {}
      })()
    }
  })
}

const buy = (bundle: { key: string; title: string; price: number }, idx: number) => {
  const path = localePath('/pay/ready')
  navigateTo({ path, query: { bundle: bundle.key } })
}
</script>
