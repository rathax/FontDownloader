
import '@/assets/css/main.scss'
import { createVuetify } from "vuetify";

import { aliases, mdi } from "vuetify/iconsets/mdi-svg";


export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    icons: {
      defaultSet: "mdi",
      aliases,
      sets: {
        mdi,
      },
    },
    ssr: process.server,
  });

  nuxtApp.vueApp.use(vuetify);
});
