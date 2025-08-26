<template>
  <div class="container mx-auto py-8 px-4">
    <div class="mx-40">
      <h1 class="text-3xl font-bold mb-8 text-center">User Profile</h1>
      
      <div v-if="loading" class="flex justify-center items-center h-40">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
      
      <div v-else-if="userInfo" class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mx-auto">
        <!-- User information display -->
        <div class="mb-8">
          <div class="flex flex-col md:flex-row items-center mb-6">
            <div class="w-12 h-12 rounded-full bg-teal-600 flex items-center justify-center text-white mr-4 ">
              {{ getUserInitial(userInfo.username || userInfo.email) }}
            </div>
            <div class="text-center md:text-left">
              <h2 class="text-2xl font-semibold">{{ userInfo.username || getEmailPrefix(userInfo.email) }}</h2>
              <p class="text-gray-600 dark:text-gray-400">{{ userInfo.email }}</p>
            </div>
          </div>
        </div>
        
        <!-- User details -->
        <div class="space-y-6">
          <!-- Username section with edit functionality -->
          <div class="border-b dark:border-gray-700 pb-4">
            <div class="flex justify-between items-center mb-2">
              <h3 class="text-lg font-medium">Username</h3>
              <button 
                v-if="!isEditingUsername" 
                @click="startEditUsername" 
                class="text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300 text-sm"
              >
                Edit
              </button>
            </div>
            
            <div v-if="isEditingUsername" class="mt-2">
              <div class="flex items-center">
                <input 
                  v-model="editedUsername" 
                  type="text" 
                  class="flex-1 px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Enter new username"
                />
                <div class="flex ml-2">
                  <button 
                    @click="saveUsername" 
                    class="px-3 py-1 bg-teal-600 text-white rounded-md hover:bg-teal-700 mr-4"
                    :disabled="isSaving"
                  >
                    {{ isSaving ? 'Saving...' : 'Save' }}
                  </button>
                  <button 
                    @click="cancelEditUsername" 
                    class="px-3 py-1 bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                </div>
              </div>
              <p v-if="usernameError" class="mt-1 text-red-500 text-sm">{{ usernameError }}</p>
            </div>
            
            <p v-else class="text-gray-800 dark:text-gray-200">
              {{ userInfo.username || 'Not set' }}
            </p>
          </div>
          
          <!-- Email section (non-editable) -->
          <div class="border-b dark:border-gray-700 pb-4">
            <h3 class="text-lg font-medium mb-2">Email</h3>
            <p class="text-gray-800 dark:text-gray-200">{{ userInfo.email }}</p>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Email cannot be changed</p>
          </div>
          
          <!-- Account status -->
          <div class="border-b dark:border-gray-700 pb-4">
            <h3 class="text-lg font-medium mb-2">Account Status</h3>
            <div class="flex items-center">
              <span 
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                :class="userInfo.is_active ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'"
              >
                {{ userInfo.is_active ? 'Active' : 'Inactive' }}
              </span>
            </div>
          </div>
          
          <!-- Credits balance -->
          <div>
            <h3 class="text-lg font-medium mb-2">Credits Balance</h3>
            <p class="text-2xl font-bold text-teal-600 dark:text-teal-400">{{ userInfo.credits || 0 }}</p>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Available credits for using AI tools</p>
          </div>
        </div>
      </div>
      
      <div v-else class="text-center py-12">
        <p class="text-xl text-gray-600 dark:text-gray-400">Please log in to view your profile</p>
        <button 
          @click="redirectToLogin" 
          class="mt-4 px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
        >
          Go to Login
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getUserInfo, updateUserInfo } from '../../api/user'

// Define interface for user data
interface UserData {
  email: string;
  username?: string;
  is_active: boolean;
  credits: number;
}

// Define interface for Nuxt's useFetch response
interface UseFetchResponse<T> {
  data: Ref<T>;
  error: Ref<any>;
}

const userInfo = ref<UserData | null>(null)
const loading = ref(true)
const isEditingUsername = ref(false)
const editedUsername = ref('')
const usernameError = ref('')
const isSaving = ref(false)

// Fetch user information
const fetchUserInfo = async () => {
  try {
    loading.value = true
    const res = await getUserInfo() as UseFetchResponse<UserData>
    console.log('fetchUserInfo res', res.data.value)
    if (res.data.value) {
      userInfo.value = res.data.value
    }
  } catch (error) {
    console.error('Failed to fetch user info:', error)
  } finally {
    loading.value = false
  }
}

// Start editing username
const startEditUsername = () => {
  editedUsername.value = userInfo.value?.username || ''
  isEditingUsername.value = true
  usernameError.value = ''
}

// Cancel username editing
const cancelEditUsername = () => {
  isEditingUsername.value = false
  usernameError.value = ''
}

// Save updated username
const saveUsername = async () => {
  if (!editedUsername.value.trim()) {
    usernameError.value = 'Username cannot be empty'
    return
  }
  
  try {
    isSaving.value = true
    usernameError.value = ''
    
    await updateUserInfo({ username: editedUsername.value.trim() })
    
    // Update local user info
    if (userInfo.value) {
      userInfo.value.username = editedUsername.value.trim()
    }
    isEditingUsername.value = false
    
    // Show success message or notification here if needed
  } catch (error) {
    console.error('Failed to update username:', error)
    usernameError.value = 'Failed to update username. Please try again.'
  } finally {
    isSaving.value = false
  }
}

// Helper functions
const getUserInitial = (text: string) => {
  if (!text) return '?'
  return text.charAt(0).toUpperCase()
}

const getEmailPrefix = (email: string) => {
  if (!email) return ''
  const parts = email.split('@')
  return parts[0]
}

const redirectToLogin = () => {
  navigateTo('/login');
};

// Initialize component
onMounted(async () => {
  await nextTick()
  await fetchUserInfo()
})
</script>
