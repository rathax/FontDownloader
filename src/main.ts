/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import "@/styles/tailwind.css";

import vuetify from "@/plugins/vuetify";

import { ViteSSG } from "vite-ssg";
// Components
import App from "./App.vue";
import { routes } from "./router";
import { createPinia } from "pinia";
import { markRaw } from "vue";


// `export const createApp` is required instead of the original `createApp(App).mount('#app')`
export const createApp = ViteSSG(
  // the root component
  App,
  // vue-router options
  { routes },
  // function to have custom setups
  async ({ app, router, routes, isClient, initialState }) => {
    // await enableMocking()
    app.use(vuetify);
    const pinia = createPinia();
    pinia.use(({ store }) => {
      store.router = markRaw(router)
    })
    app.use(pinia);
    if (import.meta.env.SSR) initialState.pinia = pinia.state.value;
    else pinia.state.value = initialState.pinia || {};
  },
);

// export async function includedRoutes() {
//   // Sensitive key is managed by Vite - this would not be available inside
//   // vite.config.js as it runs before the environment has been populated.

//   const fonts = (await (import("@/assets/fonts"))).default

//   return fonts.map((val) => '/font/' + val.id)
// }



/* async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') return
  const { worker } = await import('./mocks/browser')
 
  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start()
}
 */