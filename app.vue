<template>
 <NuxtLayout>
  <v-main class=" bg-white mt-8 min-h-screen">
    <NuxtPage />
    </v-main>
  </NuxtLayout>
</template>


<script setup lang="ts">
import { VMain } from "vuetify/components"

useHead({
  link: [
    {
      rel: 'preload',
      type: 'font/woff2',
      href: (await import('@/assets/css/fonts/roboto-v30-latin-100.woff2')).default,
      as: 'font',
    },
    {
      rel: 'preload',
      type: 'font/woff2',
      href: (await import('@/assets/css/fonts/roboto-v30-latin-300.woff2')).default,
      as: 'font',
    },
    {
      rel: 'preload',
      type: 'font/woff2',
      href: (await import('@/assets/css/fonts/roboto-v30-latin-500.woff2')).default,
      as: 'font',
    },
    {
      rel: 'preload',
      type: 'font/woff2',
      href: (await import('@/assets/css/fonts/roboto-v30-latin-700.woff2')).default,
      as: 'font',
    },
    {
      rel: 'preload',
      type: 'font/woff2',
      href: (await import('@/assets/css/fonts/roboto-v30-latin-900.woff2')).default,
      as: 'font',
    },
    {
      rel: 'preload',
      type: 'font/woff2',
      href: (await import('@/assets/css/fonts/roboto-v30-latin-regular.woff2')).default,
      as: 'font',
    }
  ],
  htmlAttrs: { lang: "en" },
  script: [{
    type: "application/ld+json", innerHTML: JSON.stringify([
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "url": "https://fontdownloader.org",
        "name": "FontDownlaoder",
        "alternateName": [
          "Font Downlaoder",
          "Web Font Downlaoder",
          "Google Webfonts Helper"
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "url": "https://fontdownloader.org/",
        "name": "FontDownloader",
        "alternateName": [
          "Font Downlaoder",
          "Web Font Downlaoder",
          "Google Webfonts Helper"
        ],
        "applicationCategory": "DeveloperApplication",
        "browserRequirements": "Requires modern web browser",
        "featureList": [
          "Downloading customized fonts",
          "UI for the Google Fonts API",
          "Performance optimization for Google's PageSpeed Insights and Lighthouse",
          "Tackling  Privacy concerns and avoiding tracking on your website"
        ],
        "operatingSystem": "All",
        "softwareHelp": "https://github.com/rathax/FontDownloader",
        "offers": {
          "@type": "Offer",
          "price": "0"
        }
      },
    ])
  }]
})
</script>