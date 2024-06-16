import { SitemapStream, streamToPromise } from 'sitemap'
import { FontItem } from '~/stores/app'



export default defineEventHandler(async (event) => {
  // Fetch all documents
  const response = await $fetch<FontItem[]>(process.env.API_HOST + "/api/fonts")
  const sitemap = new SitemapStream({
    hostname: 'https://fontdownloader.org'
  })
  sitemap.write({
    url: "https://fontdownloader.org",
  })
  sitemap.write({
    url: "https://fontdownloader.org/about",
  })
  sitemap.write({
    url: "https://fontdownloader.org/privacy",
  })
  sitemap.write({
    url: "https://fontdownloader.org/contact",
  })
  for (const doc of response) {
    sitemap.write({
      url: "https://fontdownloader.org/font/" + doc.id,
      changefreq: 'monthly'
    })
  }

  sitemap.end()

  return streamToPromise(sitemap)
})