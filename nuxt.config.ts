// https://nuxt.com/docs/api/configuration/nuxt-config
import '@nuxtjs/i18n'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  
  // 添加安全头信息
  app: {
    head: {
      meta: [
        { name: 'Content-Security-Policy', content: "default-src 'self'; script-src 'self' 'unsafe-inline' https://accounts.google.com https://*.googleapis.com; connect-src 'self' https://fastaitool.xyz; img-src 'self' data: https:; style-src 'self' 'unsafe-inline';" },
        { name: 'X-Content-Type-Options', content: 'nosniff' },
        { name: 'X-XSS-Protection', content: '1; mode=block' },
        { name: 'Referrer-Policy', content: 'strict-origin-when-cross-origin' }
      ]
    }
  },

  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: [
    '@nuxtjs/i18n',
    'nuxt-vue3-google-signin'
  ],
  googleSignIn: {
    // clientId: '1039795625697-1lmfb477apqec7depknihu0t1nu643fn.apps.googleusercontent.com'
    // clientId: '912451063192-d5nitg9jq7jb5qlucnbjd0uf4u9j2khe.apps.googleusercontent.com'
    clientId: '1084895909525-qvos2o1dlknojsbqqon0feigfps2tmet.apps.googleusercontent.com'
  },
  i18n: {
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        name: 'English',
        file: 'en.js'
      },
      {
        code: 'zh',
        iso: 'zh-CN',
        name: '简体中文',
        file: 'zh.js'
      }
    ],
    lazy: true,
    langDir: 'locales/',
    defaultLocale: 'en',
    strategy: 'prefix',
    skipSettingLocaleOnNavigate: false,
    detectBrowserLanguage: false
  }
})
