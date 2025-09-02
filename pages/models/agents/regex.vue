<template>
  <div class="max-w-3xl mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-6">{{ $t('pages.regexAssistant.title') }}</h1>

    <div class="space-y-6">
      <div>
        <label class="block text-sm font-medium mb-2">{{ $t('pages.regexAssistant.fields.requirement') }}</label>
        <textarea v-model="form.requirement" rows="3" class="w-full border rounded-lg p-3 focus:outline-none focus:ring" :placeholder="$t('pages.regexAssistant.placeholders.requirement')"></textarea>
      </div>

      <div>
        <label class="block text-sm font-medium mb-2">{{ $t('pages.regexAssistant.fields.exampleString') }}</label>
        <textarea v-model="form.example_string" rows="4" class="w-full border rounded-lg p-3 focus:outline-none focus:ring" :placeholder="$t('pages.regexAssistant.placeholders.exampleString')"></textarea>
      </div>

      <div>
        <label class="block text-sm font-medium mb-2">{{ $t('pages.regexAssistant.fields.outputFormat') }}</label>
        <input v-model="form.output_format" class="w-full border rounded-lg p-3 focus:outline-none focus:ring" :placeholder="$t('pages.regexAssistant.placeholders.outputFormat')" />
      </div>

      <div class="flex items-center gap-3">
        <button :disabled="loading" @click="onSubmit" class="px-4 py-2 bg-primary text-white rounded-lg disabled:opacity-60">
          {{ loading ? $t('pages.regexAssistant.actions.submitting') : $t('pages.regexAssistant.actions.submit') }}
        </button>
        <button :disabled="loading" @click="onReset" class="px-4 py-2 border rounded-lg">{{ $t('pages.regexAssistant.actions.reset') }}</button>
      </div>

      <div v-if="errorMsg" class="p-3 rounded bg-red-50 text-red-600 border border-red-200">{{ errorMsg }}</div>

      <div v-if="result" class="mt-6 p-4 border rounded-lg bg-gray-50">
        <div class="flex items-center justify-between mb-2">
          <h2 class="text-lg font-semibold">{{ $t('pages.regexAssistant.result.title') }}</h2>
          <button class="text-sm text-blue-600" @click="copyResult">{{ $t('pages.regexAssistant.result.copy') }}</button>
        </div>
        <pre class="whitespace-pre-wrap break-words">{{ result }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { translateRegex } from '../../../api/models'
const { t } = useI18n()

const form = reactive({
  requirement: '',
  example_string: '',
  output_format: ''
})

const loading = ref(false)
const result = ref('')
const errorMsg = ref('')

const onSubmit = async () => {
  errorMsg.value = ''
  result.value = ''
  if (!form.requirement || !form.example_string || !form.output_format) {
    errorMsg.value = t('pages.regexAssistant.messages.fillAllFields')
    return
  }
  try {
    loading.value = true
    const { data }: any = await translateRegex({
      requirement: form.requirement,
      example_string: form.example_string,
      output_format: form.output_format
    })
    result.value = data?.value?.response || ''
  } catch (e: any) {
    errorMsg.value = t('pages.regexAssistant.messages.generateFailed')
  } finally {
    loading.value = false
  }
}

const onReset = () => {
  form.requirement = ''
  form.example_string = ''
  form.output_format = ''
  result.value = ''
  errorMsg.value = ''
}

const copyResult = async () => {
  if (!result.value) return
  try {
    await navigator.clipboard.writeText(result.value)
  } catch {}
}
</script>

<style scoped>
</style>


