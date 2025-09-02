<template>
  <div class="px-6 md:px-20 lg:px-16 py-8">
    <Breadcrumbs :items="[
        { label: 'Models', to: '/models' },
        { label: 'Vision', to: '/models/vision' },
        { label: '1P-Bandai', to: '/models/vision/generate_1p_bandai' }
      ]" />

    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-4">
      <div class="flex items-center gap-3">
        <div class="flex w-auto md:max-w-sm my-2 rounded shadow">
          <div class="w-full flex justify-center font-medium rounded-l px-5 py-2 border bg-white text-gray-800 border-gray-200">Vision · 1P Bandai</div>
        </div>
      </div>
      <div class="flex items-center gap-3">
        <button :disabled="loading || !form.imageBase64" @click="submit" class="px-5 py-2 rounded-lg text-white bg-purple-700 hover:bg-purple-600 disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2">
          <svg v-if="!loading" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5"><path d="M12 3v10.586l3.293-3.293 1.414 1.414L12 17.414l-4.707-4.707 1.414-1.414L11 13.586V3h1z"/></svg>
          <svg v-else class="animate-spin w-5 h-5" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/></svg>
          <span>{{ loading ? 'Generating...' : 'Generate' }}</span>
        </button>
        <button @click="resetAll" class="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50">Reset</button>
        <button v-if="resultUrl" @click="downloadResult" class="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50">Download</button>
      </div>
    </div>

    <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
      <!-- Left: Upload / Preview -->
      <div class="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        <div class="h-10 bg-gray-100 flex items-center px-4">
          <div class="text-gray-700 font-medium">Preview</div>
        </div>
        <div class="p-5">
          <div
            class="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50"
            @dragover.prevent
            @drop.prevent="onDrop"
            @click="onPickFile"
          >
            <input ref="fileInput" type="file" accept="image/*" class="hidden" @change="onFileChange" />
            <div v-if="!previewUrl" class="text-gray-500">
              <div class="text-sm">Drag & drop image here, or click to upload</div>
            </div>
            <div v-else>
              <img :src="previewUrl" class="mx-auto max-h-96 rounded" />
            </div>
          </div>
          <div v-if="previewUrl" class="flex justify-center gap-3 mt-4">
            <button @click="openLightbox(previewUrl)" class="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50">View</button>
            <button @click="clearPreview" class="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50">Remove</button>
          </div>
        </div>
      </div>

      <!-- Right: Result -->
      <div class="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        <div class="h-10 bg-gray-100 flex items-center px-4 justify-between">
          <div class="text-gray-700 font-medium">Result</div>
          <div v-if="error" class="text-red-500 text-sm">{{ error }}</div>
        </div>
        <div class="p-5 min-h-[12rem] flex items-center justify-center">
          <div v-if="loading" class="flex flex-col items-center text-gray-500">
            <svg class="animate-spin w-8 h-8 mb-2" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/></svg>
            <div>Generating...</div>
          </div>
          <div v-else-if="resultUrl" class="w-full">
            <img :src="resultUrl" class="mx-auto max-h-[28rem] rounded" />
            <div class="flex justify-center gap-3 mt-4">
              <button @click="openLightbox(resultUrl)" class="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50">View</button>
              <button @click="downloadResult" class="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50">Download</button>
            </div>
          </div>
          <div v-else class="text-gray-400">No result yet</div>
        </div>
      </div>
    </div>

    <!-- Lightbox Modal -->
    <div v-if="lightboxOpen" class="fixed inset-0 z-50 bg-black/70 flex items-center justify-center" @click.self="closeLightbox">
      <div class="bg-white rounded-lg p-4 max-w-[90vw] max-h-[90vh] overflow-auto">
        <div class="flex justify-between items-center mb-3">
          <div class="font-medium">Preview</div>
          <button class="text-gray-500 hover:text-gray-700" @click="closeLightbox">Close</button>
        </div>
        <img :src="lightboxUrl" class="max-w-full max-h-[80vh] object-contain" />
      </div>
    </div>
  </div>
  
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { generateImageBy1p } from '../../../api/models'

type VisionForm = {
  imageBase64: string
}

const form = ref<VisionForm>({ imageBase64: '' })
const previewUrl = ref<string>('')
const resultUrl = ref<string>('')
const loading = ref<boolean>(false)
const error = ref<string>('')

const fileInput = ref<HTMLInputElement | null>(null)

const onPickFile = () => fileInput.value?.click()

const onFileChange = (e: Event) => {
  const input = e.target as HTMLInputElement
  const file = input.files && input.files[0]
  if (!file) return
  readAsDataUrl(file)
}

const onDrop = (e: DragEvent) => {
  const file = e.dataTransfer?.files && e.dataTransfer.files[0]
  if (!file) return
  readAsDataUrl(file)
}

const readAsDataUrl = (file: File) => {
  const reader = new FileReader()
  reader.onload = () => {
    const dataUrl = String(reader.result)
    form.value.imageBase64 = dataUrl
    previewUrl.value = dataUrl
  }
  reader.readAsDataURL(file)
}

const submit = async () => {
  if (!form.value.imageBase64 || loading.value) return
  loading.value = true
  error.value = ''
  resultUrl.value = ''
  try {
    const { data } = await generateImageBy1p({
      image_base64: form.value.imageBase64
    })
    const blob = data.value
    const url = URL.createObjectURL(blob)
    resultUrl.value = url
  } catch (err: unknown) {
    if (err === 401) {
      navigateTo('/login')
    } else if (typeof err === 'number') {
      error.value = `Error: ${err}`
    } else {
      error.value = 'Failed to generate image'
    }
  } finally {
    loading.value = false
  }
}

const resetAll = () => {
  form.value.imageBase64 = ''
  previewUrl.value = ''
  resultUrl.value = ''
  error.value = ''
}

const clearPreview = () => {
  form.value.imageBase64 = ''
  previewUrl.value = ''
}

const downloadResult = () => {
  if (!resultUrl.value) return
  const a = document.createElement('a')
  a.href = resultUrl.value
  a.download = 'result.png'
  a.click()
}

// Lightbox
const lightboxOpen = ref<boolean>(false)
const lightboxUrl = ref<string>('')
const openLightbox = (url: string) => {
  lightboxUrl.value = url
  lightboxOpen.value = true
}
const closeLightbox = () => {
  lightboxOpen.value = false
  lightboxUrl.value = ''
}
</script>

<style scoped>
</style>


