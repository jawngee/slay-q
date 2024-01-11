// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devServer: { host: '0.0.0.0'},
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    siteUrl: "",
    slayQRpcEndpoint: "",
    slayQSecret: "",
    slayQDatabaseConnectionString: "",
    slayQEndpoint: "",
  }
})
