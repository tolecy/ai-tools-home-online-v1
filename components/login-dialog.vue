<script lang="ts" setup>
  import { googleSignIn, register, login } from '../api/user'

  const visible = defineModel<boolean>()
  const emit = defineEmits(['success'])

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
          visible.value = false
          res.data?.value?.access_token && localStorage.setItem('token', res.data?.value?.access_token)
          emit('success')
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
        visible.value = false
        res.data?.value?.access_token && localStorage.setItem('token', res.data?.value?.access_token)
        emit('success')
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
        visible.value = false
        res.data?.value?.access_token && localStorage.setItem('token', res.data?.value?.access_token)
        emit('success')
      }
    } catch (error) {
      console.error('handleSignUp error ==>', error)
      throw error
    }
  }
</script>
<template>
<div v-if="visible" class="w-[400px] rounded-md absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-40 shadow-lg border-[1px] border-gray-200 dark:border-gray-700">
  <svg class="size-[14px] absolute right-2 top-2 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" @click="visible = false">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
  </svg>
  <LoginBox @sign-in="handleSignIn" @sign-up="handleSignUp" @success="handleLoginSuccess"></LoginBox>
</div>
</template>
