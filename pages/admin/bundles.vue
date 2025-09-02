<template>
  <div class="min-h-screen dark:bg-black bg-white dark:text-white p-6">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold">套餐管理</h1>
      <div class="flex items-center gap-3">
        <span v-if="loading" class="text-sm text-gray-400">加载中...</span>
        <button class="px-3 py-1 rounded bg-gray-700" @click="load(true)">刷新</button>
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="md:col-span-2">
        <table class="w-full text-left text-sm">
          <thead>
            <tr class="border-b border-gray-700">
              <th class="py-2">Key</th>
              <th class="py-2">标题</th>
              <th class="py-2">Credits</th>
              <th class="py-2">金额(分)</th>
              <th class="py-2">币种</th>
              <th class="py-2">排序</th>
              <th class="py-2">启用</th>
              <th class="py-2">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="!loading && bundles.length === 0">
              <td colspan="8" class="py-6 text-center text-gray-400">暂无数据</td>
            </tr>
            <tr v-for="b in bundles" :key="b.key" class="border-b border-gray-800">
              <td class="py-2">{{ b.key }}</td>
              <td class="py-2">{{ b.title }}</td>
              <td class="py-2">{{ b.credits }}</td>
              <td class="py-2">{{ b.amount_cents }}</td>
              <td class="py-2">{{ b.currency }}</td>
              <td class="py-2">{{ b.sort_order }}</td>
              <td class="py-2">
                <span :class="b.is_active ? 'text-green-500':'text-gray-400'">{{ b.is_active ? '是' : '否' }}</span>
              </td>
              <td class="py-2 flex gap-2">
                <button class="px-3 py-1 rounded bg-gray-700" @click="editBundle(b)">编辑</button>
                <button class="px-3 py-1 rounded bg-yellow-700" @click="toggleActive(b)">{{ b.is_active ? '下线' : '上线' }}</button>
                <button class="px-3 py-1 rounded bg-red-700" @click="removeBundle(b)">删除</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <h2 class="text-xl font-semibold mb-3">{{ formMode==='create' ? '创建套餐' : '编辑套餐' }}</h2>
        <div class="flex flex-col gap-4 bg-gray-950/40 rounded-lg p-4 border border-gray-800">
          <div class="flex flex-col gap-1">
            <label class="text-sm text-gray-400">Key <span class="text-gray-600">(字段: key)</span></label>
            <input v-model="form.key" :disabled="formMode==='edit'" placeholder="例如：pack4500" class="px-3 py-2 rounded bg-gray-900 border border-gray-700 focus:outline-none focus:border-purple-600" />
          </div>
          <div class="flex flex-col gap-1">
            <label class="text-sm text-gray-400">排序 <span class="text-gray-600">(字段: sort_order)</span></label>
            <input v-model.number="form.sort_order" type="number" placeholder="数字越小越靠前" class="px-3 py-2 rounded bg-gray-900 border border-gray-700 focus:outline-none focus:border-purple-600" />
          </div>
          <div class="flex flex-col gap-1">
            <label class="text-sm text-gray-400">标题 <span class="text-gray-600">(字段: title)</span></label>
            <input v-model="form.title" placeholder="展示给用户的名称" class="px-3 py-2 rounded bg-gray-900 border border-gray-700 focus:outline-none focus:border-purple-600" />
          </div>
          <div class="flex flex-col gap-1">
            <label class="text-sm text-gray-400">Credits <span class="text-gray-600">(字段: credits)</span></label>
            <input v-model.number="form.credits" type="number" placeholder="购买获得的积分数量" class="px-3 py-2 rounded bg-gray-900 border border-gray-700 focus:outline-none focus:border-purple-600" />
          </div>
          <div class="flex flex-col gap-1">
            <label class="text-sm text-gray-400">金额(分) <span class="text-gray-600">(字段: amount_cents)</span></label>
            <input v-model.number="form.amount_cents" type="number" placeholder="单位：分，例如 600 表示 $6.00" class="px-3 py-2 rounded bg-gray-900 border border-gray-700 focus:outline-none focus:border-purple-600" />
          </div>
          <div class="flex flex-col gap-1">
            <label class="text-sm text-gray-400">币种 <span class="text-gray-600">(字段: currency)</span></label>
            <input v-model="form.currency" placeholder="默认 usd" class="px-3 py-2 rounded bg-gray-900 border border-gray-700 focus:outline-none focus:border-purple-600" />
          </div>
          <div class="flex items-center justify-between gap-2">
            <label class="text-sm text-gray-400">启用 <span class="text-gray-600">(字段: is_active)</span></label>
            <label class="inline-flex items-center gap-2 text-sm">
              <input type="checkbox" v-model="form.is_active" class="accent-purple-600" />
              <span>{{ form.is_active ? '是' : '否' }}</span>
            </label>
          </div>
          <div class="flex gap-2 pt-2">
            <button class="px-4 py-2 rounded bg-purple-700 hover:bg-purple-600" @click="submit">{{ formMode==='create' ? '创建' : '保存' }}</button>
            <button class="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600" @click="resetForm">重置</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import http from '../../common/request'
import http, { BASE_URL } from '../../common/request'

type Bundle = {
  key: string;
  title: string;
  credits: number;
  amount_cents: number;
  currency: string;
  is_active: boolean;
  sort_order: number;
}

const bundles = ref<Bundle[]>([])
const formMode = ref<'create'|'edit'>('create')
const form = reactive<Bundle>({ key: '', title: '', credits: 0, amount_cents: 0, currency: 'usd', is_active: true, sort_order: 0 })
const loading = ref(false)
const errorMsg = ref('')

onMounted(async () => {
  // 预热一次后端（解决首次可能的冷启动或 DNS 预解析延迟），再强制加载
  try {
    await fetch(`${BASE_URL}/api/v1/users/me`, { headers: { Authorization: 'Bearer ' + (process.client ? localStorage.getItem('token') : '') } })
  } catch {}
  await load(true)
})

async function load(force = false) {
  loading.value = true
  try {
    const res: any = await http.get('/api/v1/payments/bundles/admin', force ? { _ts: Date.now() } : {})
    console.log('admin bundles loaded:', res)
    bundles.value = res?.data?.value || []
    errorMsg.value = ''
  } catch (e: any) {
    console.error('load admin bundles failed', e)
    const code = typeof e === 'number' ? e : undefined
    if (code === 401) errorMsg.value = '未登录或登录已过期，请先登录'
    else if (code === 403) errorMsg.value = '无权限访问，请确认后端 ADMIN_EMAILS 已包含你的邮箱并重新登录'
    else errorMsg.value = '加载失败，请稍后重试'
    if (process.client && errorMsg.value) alert(errorMsg.value)
  } finally {
    loading.value = false
  }
}

function editBundle(b: Bundle) {
  formMode.value = 'edit'
  Object.assign(form, JSON.parse(JSON.stringify(b)))
}

function resetForm() {
  formMode.value = 'create'
  Object.assign(form, { key: '', title: '', credits: 0, amount_cents: 0, currency: 'usd', is_active: true, sort_order: 0 })
}

async function submit() {
  if (formMode.value === 'create') {
    await http.post('/api/v1/payments/bundles', form)
  } else {
    await http.Put(`/api/v1/payments/bundles/${form.key}`, form)
  }
  await load()
  broadcastPricingBundlesUpdated()
}

async function toggleActive(b: Bundle) {
  await http.Put(`/api/v1/payments/bundles/${b.key}`, { ...b, is_active: !b.is_active })
  await load()
  broadcastPricingBundlesUpdated()
}

async function removeBundle(b: Bundle) {
  await http.Delete(`/api/v1/payments/bundles/${b.key}`, {})
  await load()
  broadcastPricingBundlesUpdated()
}

function broadcastPricingBundlesUpdated() {
  if (!process.client) return
  try {
    localStorage.setItem('pricing_bundles_updated', String(Date.now()))
  } catch {}
}
</script>


