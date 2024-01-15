export default defineNuxtConfig({
  extends: "@nuxt-themes/docus",
  modules: ["nuxt-umami"],
  css: [
    "~/assets/css/fixes.css"
  ],
  routeRules: {
    "/deploy/node": { redirect: "/deploy/runtimes/node" },
  },
  appConfig: {
    umami: {
      host: process.env.UMAMI_HOST,
      id: process.env.UMAMI_KEY,
      ignoreDnt: process.env.UMAMI_IGNORE_DNT,
      autoTrack: process.env.UMAMI_AUTO_TRACK,
      useDirective: true,
      version: 2,
    },
  },
  nitro: {
    prerender: {
      failOnError: false,
    },
  },
});
