<template>
  <v-sheet class="h-full max-w-[960px] mx-auto py-10 px-10 leading-7 font-light">
    <p><i>Last updated: June 19, 2024</i></p>
    <h1 class="text-h3 mt-8 mb-6">
       Welcome
     </h1>
    <p class="my-4">
      <b class="font-bold">FontDownloader</b> is a hassle free tool for managing web fonts provided by the <a
        class="text-primary" target="_blank" rel="nofollow"
        href="https://developers.google.com/fonts/docs/developer_api">Google Fonts Api</a>. This GUI is tailored for
      developers who value efficiency and detail in their projects by
      only shipping the subsets of fonts that the user actually needs. Subsetting is the practice of creating a “subset”
      of a font which is a file that contains a limited collection of glyphs. Visit <a class="text-primary"
        target="_blank" rel="nofollow" href="https://fonts.google.com">fonts.google.com</a> for more information.
    </p>
    <h2 class="text-h4 mt-8 mb-6">
      Why self-hosting fonts?
    </h2>
    <ul class="my-4 list-disc [&>li]:ml-12 [&>li]:my-3 mb-8">
      <li><b class="font-bold">Performance Optimization:</b> Self-hosting fonts can lead to faster loading times for
        websites. When fonts
        are hosted externally, the browser might have to do additional HTTP requests to fetch these fonts an external domain. Web performance
        metrics, such as <b>Google's PageSpeed Insights and Lighthouse, penalize sites that make numerous external
          requests, including for fonts</b>. By self-hosting, these requests are reduced, speeding up page load times,
        which is beneficial for SEO and user experience.</li>
      <li>
        <b class="font-bold">Customization and Optimization:</b> Self-hosting allows for more customization options. You
        can host specific
        font formats optimized for different browsers, and include only the specific subsets and weights you need, rather
        than the entire font family. This can significantly reduce file sizes.
      </li>
      <li>
        <b class="font-bold">Privacy Concerns and Avoiding Tracking:</b> When using fonts from services like Google Fonts,
        there's a
        potential for user tracking. Google may collect data on users who visit websites using their fonts. By hosting the
        fonts yourself, you eliminate this external dependency, thereby enhancing user privacy by preventing
        third-party tracking. This approach is particularly appealing for users and developers who prioritize data privacy
        and want to minimize the potential tracking footprint of their websites and wanting to minimize legal issues by
        staying GDPR-compliant.
      </li>
    </ul>
    <h2 class="text-h4 mt-8 mb-6">How to use this Font Downloader?</h2>
    <p class="my-4">
      The Fontdownloader generates all the necessary CSS needed to implement and self-host the chosen font sub sets.
      <b>Get started by searching your desired font on the top nav bar</b> and download the desired font. Select and configure only the font subsets and variants you need.
      It's all open-source and free!
    </p>
    <h2 class="text-h4  mt-8 mb-6">JSON API</h2>
    <p class="my-4">
      This API allows you to us google fonts without having to use a Google account. The API is public, feel free to use
      it directly (rate-limits may apply). No authentication is required. For more <a class="text-primary" rel="nofollow"
        href="https://github.com/rathax/FontDownloader?tab=readme-ov-file#json-api">Visit the API Docs on GitHub!</a>
    </p>
    <h2 class="text-h4 mt-8 mb-6 ">Want to contribute?</h2>
    <p class="my-4">
      Got ideas to make this Google Webfonts Helper even better? <a class="text-primary" rel="nofollow"
        href="https://github.com/rathax/FontDownloader">Visit the project on GitHub!</a> Whether it’s suggesting new
      features, reporting bugs, or contributing to the code, your input is invaluable in shaping this tool.
    </p>
  </v-sheet>
</template>

<script setup lang="ts">
useSeoMeta({
  creator: 'ratHax',
  title: `FontDownloader | Web GUI for the Google Fonts API`,
  ogTitle: `FontDownloader | Web GUI for the Google Fonts API`,
  description: `Tool to download and self-host fonts with precise subset and variant selection. Download over 1500 Fonts for free with this Font Downloader.`,
  ogDescription: `Tool to download and self-host fonts with precise subset and variant selection. Download over 1500 Fonts for free with this Font Downloader.`,
  keywords: `web font downloader, fontdownloader, download fonts, webfont helper, Google Webfonts Helper, font downloder, google fonts api downloader, font helper, font downloader free, font downloader app`,
  ogUrl: "https://fontdownloader.org",
  applicationName: () => "FontDownloader",
})
useHead({
  link: [{ rel: "canonical", href: "https://fontdownloader.org"}]
})


</script>