<script lang="ts" setup>
  const emit = defineEmits(['success', 'signIn', 'signUp'])

  const status = ref('signin') // signin | signup

  const loginFormData = reactive({
    username: '',
    password: ''
  })

  const signupFormData = reactive({
    email: '',
    username: '',
    password: ''
  })

  // handle success event
  const handleLoginSuccess = (response: any) => {
    emit('success', response)
  };

  const handleLoginError = () => {
    console.error("Login failed");
  };

  const handleSignIn = (params: any) => {
    emit('signIn', params)
  }

  const handleSignUp = (params: any) => {
    emit('signUp', params)
  }
</script>
<template>
<div class="w-full bg-white rounded-lg dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
  <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
      Sign in to your account
    </h1>

    <form id="connect-google-button">
      <ClientOnly>
        <GoogleSignInButton @success="handleLoginSuccess" @error="handleLoginError" class="w-full flex justify-center google-button" />
      </ClientOnly>
    </form>

    <div class="flex items-center">
      <div class="w-full h-0.5 bg-gray-200 dark:bg-gray-700"></div>
      <div class="px-5 text-center text-gray-500 dark:text-gray-400">or</div>
      <div class="w-full h-0.5 bg-gray-200 dark:bg-gray-700"></div>
    </div>

    <form class="space-y-4 md:space-y-6" v-if="status === 'signin'">
      <div>
        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email / Username</label>
        <input v-model="loginFormData.username" type="email" name="login" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required>
      </div>
      <div>
        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
        <input v-model="loginFormData.password" type="password" name="password" id="password" placeholder="password" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
      </div>

      <div class="text-white bg-teal-600 py-1.5 px-4 rounded font-bold w-full cursor-pointer text-center" @click="handleSignIn(loginFormData)">
        Sign in
      </div>

      <p class="text-sm font-light text-gray-500 dark:text-gray-400">
        Don’t have an account yet? <span class="font-medium m-2 text-teal-600 hover:underline cursor-pointer dark:text-teal-500" @click="status = 'signup'">Sign up</span>
      </p>
    </form>
    <form class="space-y-4 md:space-y-6" v-else>
      <div>
        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
        <input v-model="signupFormData.email" type="email" name="login" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required>
      </div>
      <div>
        <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
        <input v-model="signupFormData.username" type="text" name="username" id="username" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="username" required>
      </div>
      <div>
        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
        <input v-model="signupFormData.password" type="password" name="password" id="password" placeholder="password" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
      </div>

      <div class="text-white bg-teal-600 py-1.5 px-4 rounded font-bold w-full cursor-pointer text-center" @click="handleSignUp(signupFormData)">
        Sign up
      </div>

      <p class="text-sm font-light text-gray-500 dark:text-gray-400">
        Already have an account? <span class="font-medium m-2 text-teal-600 hover:underline cursor-pointer dark:text-teal-500" @click="status = 'signin'">Sign in</span>
      </p>
    </form>
  </div>
</div>
</template>
