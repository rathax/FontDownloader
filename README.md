# [Fontdownloader](https://fontdownloader.org/)

Welcome to FontDownloader.org. This service might be useful if you want to host a specific Google font on your own server. It's a straightforward app where you can pick and choose the exact fonts you need for your projects to self-host.

## Why Use Fontdownloader

- Customize: Pick only the font subsets and variants you actually need.
- Speed is Key: I’ve built this using Vue, Vuetify and Tailwind for a snappy experience in material design.
- Boost Your Site’s Health: Self-host those fonts! It’s a game-changer for your Google PageSpeed and Lighthouse scores by avoiding unnecessary external requests.
- Privacy-Focused: In a world where tracking is everywhere, hosting your fonts means one less way for big companies to monitor your users and reduces the surface of potential GDPR violations.

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
