# [Fontdownloader](https://fontdownloader.org/)

Welcome to FontDownloader.org. This service might be useful if you want to host a specific Google font on your own server. It's a straightforward app where you can pick and choose the exact fonts you need for your projects to self-host.

## Why Use Fontdownloader

- Customize: Pick only the font subsets and variants you actually need.
- Speed is Key: I’ve built this using Vue, Vuetify and Tailwind for a snappy experience in material design.
- Boost Your Site’s Health: Self-host those fonts! It’s a game-changer for your Google PageSpeed and Lighthouse scores by avoiding unnecessary external requests.
- Privacy-Focused: In a world where tracking is everywhere, hosting your fonts means one less way for big companies to monitor your users and reduces the surface of potential GDPR violations.

## JSON API
The API is public, feel free to use it directly (rate-limits may apply).

### GET `/api/fonts`
Returns a list of all fonts, sorted by popularity. E.g. `curl https://fontdownloader.org/api/search?start=6&end=16&orderedASC=true&search=Roboto&sort=popularity`:
```json
"totalFilteredElements": 1595,
  "data": [
        {
            "id": "roboto-serif",
            "family": "Roboto Serif",
            "subsets": [
                "cyrillic",
                "cyrillic-ext",
                "latin",
                "latin-ext",
                "vietnamese"
            ],
            "category": "serif",
            "version": "v13",
            "lastModified": "2023-04-04",
            "popularity": 171,
            "defSubset": "latin",
            "defVariant": "regular",
            "subsetMap": {
                "cyrillic": false,
                "cyrillic-ext": false,
                "latin": true,
                "latin-ext": false,
                "vietnamese": false
            },
            "storeID": "latin",
            "variants": [
                {
                    "id": "100",
                    "fontFamily": "'Roboto Serif'",
                    "fontStyle": "normal",
                    "fontWeight": "100",
                    "svg": "https://fonts.gstatic.com/l/font?kit=R71RjywflP6FLr3gZx7K8UyuXDs9zVwDmXCb8lxYgmuii32UGoVldX6UgfjL4-3sMM_kB_qXSEXTJQCFLH5-_bcEliosl6B8Bw&skey=801f2162155a60bc&v=v13#RobotoSerif",
                    "woff2": "https://fonts.gstatic.com/s/robotoserif/v13/R71RjywflP6FLr3gZx7K8UyuXDs9zVwDmXCb8lxYgmuii32UGoVldX6UgfjL4-3sMM_kB_qXSEXTJQCFLH5-_bcEliosl6B8AA.woff2",
                    "ttf": "https://fonts.gstatic.com/s/robotoserif/v13/R71RjywflP6FLr3gZx7K8UyuXDs9zVwDmXCb8lxYgmuii32UGoVldX6UgfjL4-3sMM_kB_qXSEXTJQCFLH5-_bcEliosl6B8BQ.ttf",
                    "eot": "https://fonts.gstatic.com/s/robotoserif/v13/R71RjywflP6FLr3gZx7K8UyuXDs9zVwDmXCb8lxYgmuii32UGoVldX6UgfjL4-3sMM_kB_qXSEXTJQCFLH5-_bcEliosl6B8BA.eot",
                    "woff": "https://fonts.gstatic.com/s/robotoserif/v13/R71RjywflP6FLr3gZx7K8UyuXDs9zVwDmXCb8lxYgmuii32UGoVldX6UgfjL4-3sMM_kB_qXSEXTJQCFLH5-_bcEliosl6B8Bg.woff"
                },
            ]
        }
  ]
```

### GET `/api/fonts/[id]?subsets=latin,latin-ext`
Returns a font with urls to the actual font files google's servers. `subsets` is optional (will serve the `defSubset` if unspecified).  E.g. `curl "https://fontdownloader.org/api/fonts/modern-antiqua?subsets=latin,latin-ext"` (the double quotes are important as query parameters may else be stripped!):

```json
{
  "id": "modern-antiqua",
  "family": "Modern Antiqua",
  "variants": [{
    "id": "regular",
    "eot": "https://fonts.gstatic.com/s/modernantiqua/v6/8qX_tr6Xzy4t9fvZDXPkhzThM-TJeMvVB0dIsYy4U7E.eot",
    "fontFamily": "'Modern Antiqua'",
    "fontStyle": "normal",
    "fontWeight": "400",
    "woff": "https://fonts.gstatic.com/s/modernantiqua/v6/8qX_tr6Xzy4t9fvZDXPkh1bbnkJREviNM815YSrb1io.woff",
    "local": ["Modern Antiqua Regular", "ModernAntiqua-Regular"],
    "ttf": "https://fonts.gstatic.com/s/modernantiqua/v6/8qX_tr6Xzy4t9fvZDXPkhxr_S_FdaWWVbb1LgBbjq4o.ttf",
    "svg": "https://fonts.gstatic.com/l/font?kit=8qX_tr6Xzy4t9fvZDXPkh0sAoW0rAsWAgyWthbXBUKs#ModernAntiqua",
    "woff2": "https://fonts.gstatic.com/s/modernantiqua/v6/8qX_tr6Xzy4t9fvZDXPkh08GHjg64nS_BBLu6wRo0k8.woff2"
  }],
  "subsets": ["latin", "latin-ext"],
  "category": "display",
  "version": "v6",
  "lastModified": "2014-08-28",
  "popularity": 522,
  "defSubset": "latin",
  "defVariant": "regular",
  "subsetMap": {
    "latin": true,
    "latin-ext": true
  },
  "storeID": "latin-ext_latin"
}
```

### GET `/api/fonts/[id]?download=true&subsets=latin&formats=woff,woff2&variants=regular`

Download a zipped archive with all `.eot`, `.woff`, `.woff2`, `.svg`, `.ttf` files of a specified font. The query parameters `formats` and `variants` are optional (includes everything if no filtering is applied). is E.g. `curl -o fontfiles.zip "https://fontdownloader.org/api/fonts/lato?download=zip&subsets=latin,latin-ext&variants=regular,700&formats=woff"` (the double quotes are important as query parameters may else be stripped!)

## Roadmap

- [ ] Improve Mobile UX
- [ ] create favicon
- [ ] Add FAQs
- [ ] add translations
- [ ] add e2e (playwright) test suit
- [ ] Rewrite the backend with NestJS
- [ ] ...

Feel free to open issues and provide feedback.

## Attributon

This app was written as a portfolio app with the help of AI tools (mostly texts from ChatGPT 4.0).

Initial app written by [majodev](https://github.com/majodev)

check out the [original google-webfonts-helper repo](https://github.com/majodev/google-webfonts-helper) where you can also find the backend and docker images



## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
