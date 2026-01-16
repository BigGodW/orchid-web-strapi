// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/apollo', '@nuxtjs/tailwindcss', '@nuxtjs/strapi', '@vant/nuxt'],
  apollo: {
    clients: {
      default: {
        httpEndpoint: 'https://strapi-api.orchids.com.cn/graphql',
      },
    },
  },
  strapi: {
    url: 'https://strapi-api.orchids.com.cn',
  },
})