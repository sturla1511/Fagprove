// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro:{
    azure:{
      config:{
        networking: {
          allowedIpRanges: ["AzureFrontDoor.Backend"]
        }
      }
    }
  },
  devtools: { enabled: true },
  css: ['~/assets/css/main.scss'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "./assets/css/variables.scss";',
        },
      },
    },
    server: {
      fs: {
        strict: false
      },
    },
  },
  modules: [
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
  ],
  pinia: {
    autoImports: ["defineStore", ["defineStore", "definePiniaStore"]],
  },
  piniaPersistedstate: {
    cookieOptions: {
      sameSite: 'strict',
    },
    storage: 'localStorage'
  },
})
