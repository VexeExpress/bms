// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  ssr: true,
  css: ['~/assets/css/main.css', '~/assets/scss/main.scss'],
  modules: [
    '@nuxtjs/tailwindcss'
  ],
  app: {
    head: {
      title: 'VinaHome',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      meta: [
        {
          name: "description",
          content: "Bus Management System"
        },
        {
          name: "og:title",
          content: "VinaHome"
        },
        {
          name: "og:description",
          content: "Bus Management System"
        },
        {
          name: "og:site_name",
          content: "VinaHome"
        },
      ]
    }
  }
})
