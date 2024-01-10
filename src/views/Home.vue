<template>

  <div>
    <v-breadcrumbs :items="[{title: 'Home', to: '/', disabled: false }]" :density="'compact'"
        class="text-caption !p-0 mb-4 [&>li>a]:first-letter:uppercase">
        <template v-slot:divider>
          <v-icon :icon="mdiChevronRight"></v-icon>
        </template>
      </v-breadcrumbs>
    <h1 class="text-h4 mb-7">
    Welcome to FontDownloader
  </h1>
  <p class="my-4">
    "Hey there! 👋 Welcome to FontDownloader.org. If you're a developer looking for a robust, user-friendly tool for managing web fonts provided by the <a class="text-primary" target="_blank" href="https://developers.google.com/fonts/docs/developer_api">Google Fonts Api</a>, you've landed in the right place. The app is tailored for developers who value efficiency and detail in their projects by only shipping the subsets of fonts that the client actually needs. Subsetting is the practice of creating a “subset” of a font which is a file that contains a limited collection of glyphs. Visit <a class="text-primary" target="_blank" href="https://fonts.google.com">fonts.google.com</a> for more information.
  </p>
  <h1 class="text-h5 mt-8 mb-6">
    Why self-hosting fonts?
  </h1>
  <ul class="my-4 list-disc [&>li]:ml-12 [&>li]:my-3 mb-8">
    <li><b>Performance Optimization:</b> Self-hosting fonts can lead to faster loading times for web pages. When fonts are hosted externally, the browser must make additional HTTP requests to fetch these fonts. Web performance metrics, such as <b>Google's PageSpeed Insights and Lighthouse, penalize sites that make numerous external requests, including for fonts</b>. By self-hosting, these requests are reduced, speeding up page load times, which is beneficial for SEO and user experience.</li>
    <li>
      <b>Customization and Optimization:</b> Self-hosting allows for more customization options. You can host specific font formats optimized for different browsers, and include only the specific subsets and weights you need, rather than the entire font family. This can significantly reduce file sizes.
    </li>
    <li>
      <b>Privacy Concerns and Avoiding Tracking:</b> When using fonts from services like Google Fonts, there's a potential for user tracking. Google may collect data on users who visit websites using their fonts. By self-hosting fonts, you eliminate this external dependency, thereby enhancing user privacy by preventing third-party tracking. This approach is particularly appealing for users and developers who prioritize data privacy and want to minimize the potential tracking footprint of their websites and wanting to minimize legal issues by staying GDPR-compliant.
    </li>
  </ul>
  <h1 class="text-h5 mt-8 mb-6" >How to download fonts?</h1>
  <p class="my-4">
    This font downloader app is designed to integrate seamlessly into the development workflow and generates all the necessary CSS needed to implement the chosen font sub sets. <b>Get started by selecting one of the fonts in the navigation bar to the left </b> and download the desired font. Select and configure only the font subsets and variants you need. It's all open-source and totally free – a little gift from one developer to another. Dive in, explore, and let's make the web a faster, more beautiful place together! 
  </p>

  <h1 class="text-h5 mt-8 mb-6" >Want to contribute?</h1>
  <p class="my-4">
    Got ideas to make FontDownloader.org even better? <a class="text-primary" href="https://github.com/rathax/FontDownloader">Visit the project on GitHub!</a> Whether it’s suggesting new features, reporting bugs, or contributing to the code, your input is invaluable in shaping this tool.
  </p>


</div>
</template>

<script lang="ts" setup>
import { mdiChevronRight } from '@mdi/js'
import { useHead } from '@unhead/vue';
useHead({
    title:  "Font Downloader | Download and subsetting Fonts for free",
    meta: [
      {
        name: 'description',
        content:  `Efficiently manage and download free web fonts with precise subset and variant selection, enhancing site performance and aesthetics.`
      },
      {
        name: 'keywords',
        content:  `web font downloader, download fonts, webfont helper, font downloder, google fonts api downloader, font helper, font downloader free, font downloader app`
      },
    ],
    link: [{ rel: "canonical", href: "https://www.fontdownloader.org/" }],
    htmlAttrs: { lang: "en" },
  })
</script>
