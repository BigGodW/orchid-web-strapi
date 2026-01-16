// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/apollo', '@nuxtjs/tailwindcss', '@nuxtjs/strapi', '@vant/nuxt'],
  apollo: {
    clients: {
      default: {
        httpEndpoint: 'http://47.109.179.80:1338/graphql',
      },
    },
  },
  strapi: {
    url: 'http://47.109.179.80:1338',
  },
})