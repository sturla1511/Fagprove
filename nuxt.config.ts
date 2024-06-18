// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro:{
    azure:{
      config:{
        networking: {
          allowedIpRanges: ["AzureFrontDoor.Backend"]
        } ,
        forwardingGateway: {
          requiredHeaders: {
            "X-Azure-FDID" : "645f2b63-8488-4ff1-9d76-98d2f3894b89"
          },
          allowedForwardedHosts: [
            "ep-inventory-fwa5b2f8akfxgmfa.a01.azurefd.net"
          ]
        }
      }
    }
  },
  devtools: { enabled: true },
  ssr: false,
  app: {
    head: {
      title: 'GPS Inventory',
      chartset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      htmlAttrs: {
        lang: 'nb'
      },
      meta: [
        { name: 'description', content: 'Inventory for glasspaper solutions' }
      ]
    }
  },
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
