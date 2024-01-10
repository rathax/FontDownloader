// Plugins
import vue from "@vitejs/plugin-vue";
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
import fs from "fs";
import { generateSitemap } from "./src/utils/generateSitemap"
import fonts from "./src/assets/fonts"

// Utilities
import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";

// https://vitejs.dev/config/
export default defineConfig((options) => {
  if (options.ssrBuild) {
    const sitemap = generateSitemap(fonts)
    fs.writeFile("./public/sitemap.xml", sitemap, (err) => {
      if (err) {
        throw err;
      }
    });
  }

  return {
    ssgOptions: {
      crittersOptions: {
        preload: "media",
      },
    },
    ssr: {
      // TODO: workaround until they support native ESM

      noExternal: ["vuetify"],
    },
    build: {
      rollupOptions: {
        external: [options.ssrBuild ? "./mocks/browser" : undefined],
      },
    },
    plugins: [
      vue({
        template: { transformAssetUrls },
      }),
      // https://github.com/vuetifyjs/vuetify-loader/tree/master/packages/vite-plugin#readme
      vuetify({
        autoImport: true,
      }),
    ],
    define: { "process.env": {} },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
      extensions: [".js", ".json", ".jsx", ".mjs", ".ts", ".tsx", ".vue"],
    },
    server: {
      port: 3000,
      proxy: {
        "/api": {
          target: "https://gwfh.mranftl.com/",
          changeOrigin: true,
          configure: (proxy, options) => {
            // proxy will be an instance of 'http-proxy'
          },
        },
      },
    },
  };
});
