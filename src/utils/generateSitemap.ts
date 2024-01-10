

export function generateSitemap(fonts: any[]) {
    return (() => 
    `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>https://www.fontdownloader.org/</loc>
        <lastmod>2022-06-04</lastmod>
      </url>
      ${fonts.map((item) => {
        return `<url>
        <loc>https://www.fontdownloader.org/font/${item.id}</loc>
        <lastmod>2024-01-07</lastmod>
      </url>
      `}).join("")}
    </urlset>`)()    
}