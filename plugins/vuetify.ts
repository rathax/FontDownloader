// import this after install `@mdi/font` package
// import '@mdi/font/css/materialdesignicons.css'

// Styles
// import '@/assets/css/main.scss'
// import { createVuetify } from "vuetify";
// import { aliases, mdi } from "vuetify/iconsets/mdi-svg";

// export default defineNuxtPlugin((app) => {
//   const vuetify = createVuetify({
//     icons: {
//       defaultSet: "mdi",
//       aliases,
//       sets: {
//         mdi,
//       },
//     },
//     theme: {
//       themes: {
//         light: {
//           colors: {
//             primary: "#1a73e8",
//             secondary: "#5CBBF6",
//             background: "#e8eaed",
//           },
//         },
//       },
//     },
//   });
//   app.vueApp.use(vuetify);
// });

import '@/assets/css/main.scss'
import { createVuetify } from "vuetify";
/* import {VApp, VTextField, VSheet, VMain, VListItem, VList, VMenu, VListItemTitle, VIcon, VListItemSubtitle, VListSubheader, VDivider, VBtn, VAppBar, VFooter, VInfiniteScroll, VBreadcrumbs, VSelect, VCheckbox, VBtnToggle, VSnackbar } from "vuetify/components"; */
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
    ssr: true,
/*     components: {
      VApp,
      VTextField,
      VSheet,
      VMain,
      VListItem, VList, VMenu, VListItemTitle, VIcon,
      VListItemSubtitle, VListSubheader, VDivider, VBtn,  VAppBar, VFooter, VInfiniteScroll,  VBreadcrumbs, VSelect, VCheckbox, VBtnToggle, VSnackbar
    }, */

    // },
    // directives: process.server ? undefined : directives,
  });

  nuxtApp.vueApp.use(vuetify);
});
