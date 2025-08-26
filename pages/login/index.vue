<template>
  <div class="pt-40 flex flex-col items-center h-screen">
    <div class="fixed top-0 left-0 right-0 z-50 flex justify-between items-center py-2 px-4 md:px-40 shadow-md bg-white dark:bg-gray-900">
      <div class="flex items-center cursor-pointer" @click="goHome">
        <svg class="w-10 h-10 text-black-600 dark:text-white" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 5L26.5 8.75V16.25L20 20L13.5 16.25V8.75L20 5Z" fill="currentColor"/>
          <path d="M28.5 12L35 15.75V23.25L28.5 27L22 23.25V15.75L28.5 12Z" fill="currentColor" opacity="0.7"/>
          <path d="M11.5 12L18 15.75V23.25L11.5 27L5 23.25V15.75L11.5 12Z" fill="currentColor" opacity="0.7"/>
          <path d="M20 24L26.5 27.75V35.25L20 39L13.5 35.25V27.75L20 24Z" fill="currentColor" opacity="0.7"/>
        </svg> 
        <span class="hidden md:block ml-2 font-bold text-xl text-gray-800 dark:text-white">AI Tools</span>
      </div>
    </div>
    <div class="flex-1">
      <div class="w-[400px] rounded-md border-[1px] border-gray-200 dark:border-gray-700 mx-auto">
        <LoginBox @sign-in="handleSignIn" @sign-up="handleSignUp" @success="handleLoginSuccess"></LoginBox>
      </div>
    </div>
    <AppFooter class="w-full flex-shrink-0"></AppFooter>
  </div>
</template>
<script lang="ts" setup>
  import { googleSignIn, register, login } from '../../api/user'
  definePageMeta({
    layout: false
  })

  const router = useRouter()

  // handle success event
  const handleLoginSuccess = (response: any) => {
    const { credential } = response;
    console.log("Response", response);
    console.log("Access Token", credential);
    setTimeout(async () => {
      try {
        const res: any = await googleSignIn(credential);
        console.log(res.data.value);
        if (res.data.value) {
          res.data?.value?.access_token && localStorage.setItem('token', res.data?.value?.access_token)
          router.push('/')
        }
      } catch (error) {
        console.error(error)
        throw error
      }
    }, 2000)
  };

  const handleSignIn = async (params: any) => {
    try {
      const res: any = await login(params)
      console.log('handleSignIn ==>', res.data.value);
      if (res.data.value) {
        res.data?.value?.access_token && localStorage.setItem('token', res.data?.value?.access_token)
        router.push('/')
      }
    } catch (error) {
      console.error('handleSignIn error ==>', error)
      throw error
    }
  }

  const handleSignUp = async (params: any) => {
    try {
      const res: any = await register(params)
      console.log('handleSignUp ==>', res.data.value);
      if (res.data.value) {
        res.data?.value?.access_token && localStorage.setItem('token', res.data?.value?.access_token)
        router.push('/')
      }
    } catch (error) {
      console.error('handleSignUp error ==>', error)
      throw error
    }
  }

  const goHome = () => {
    router.push('/')
  }
</script>
<style scoped></style>