<template>
   <v-sheet class="h-full max-w-[960px] mx-auto py-10 px-10 leading-7 font-light">
      <p><i>Last updated: June 8, 2024</i></p>
      <h1 class="text-h4 mt-8 mb-6">
         About FontDownloader
      </h1>
      <p class="my-4">
         Hello, my name is ratHax, and I'm a Swiss software engineer with a master’s degree in computer science that loves
         to write web apps like this one in his free time.

      </p>
      <p class="my-4">
         This graphical user interface for the Google Fonts API was made with vue, nuxt, vuetify and tailwindCSS.
      </p>

      <p class="my-4">
         Are you curious about this app, its tech stack, our privacy policies, or anything else? Do you have any feedback,
         write me an email at <a href="mailto: rathaxdev@gmail.com" class="font-bold">rathaxdev@gmail.com</a> or <a
            class="text-primary" rel="nofollow" href="https://github.com/rathax/FontDownloader">Visit the project on
            GitHub!</a>.
      </p>
   </v-sheet>
</template>
 
<script setup lang="ts">
useSeoMeta({
  creator: 'ratHax',
  title: `FontDownloader | About`,
  ogTitle: `FontDownloader | About`,
  ogUrl: "https://fontdownloader.org/about",
})
useHead({
   link: [{ rel: "canonical", href: "https://fontdownloader.org/about"}],
   script: [{
      type: "application/ld+json", innerHTML: JSON.stringify([
         {
            "@context": "https://schema.org",
            "@type": ["Person", "Organization"],
            "@id": "https://generateuuid.net/about",
            "name": "ratHax",
            "email": "rathaxdev@gmail.com",
            "image": {
               "@type": "ImageObject",
               "inLanguage": "en-US",
               "@id": "https://generateuuid.net/#/schema/person/image/",
               "url": "https://generateuuid.net/rathax.jpg",
               "contentUrl": "https://generateuuid.net/rathax.jpg",
               "width": 435,
               "height": 843,
               "caption": "ratHax"
            },
            "logo": { "@id": "https://generateuuid.net/#/schema/person/image/" },
            "sameAs": [
               "https://fontdownloader.org/about",
               "https://generateuuid.net/about",
               "https://x.com/godlikeplayer1",
               "https://www.reddit.com/user/godlikeplayer2",
               "https://github.com/rathax"
            ]
         }
      ])
   }]
})

</script>