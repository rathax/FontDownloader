// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["assets/css/main.css"],

  // nitro: {
  //   routeRules: {
  //     '/api/**': {
  //       proxy: 'https://fontdownloader.org/api/**',
  //       cors: false
  //     }
  //   }
  // },
  build: {
    transpile: ["vuetify"],
  },

  modules: [
    "nuxt-svgo",
    "@pinia/nuxt",
    async (options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        config.plugins ||= [];
        config.plugins.push(
          vuetify({
            autoImport: true
          })
        );
      });
    },
    //...
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  nuxtIcon: {
    size: "24px", // default <Icon> size applied
    class: "", // default <Icon> class applied
    aliases: {
      nuxt: "",
    },
  },
});
