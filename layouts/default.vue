<template>
  <v-app>
    <v-app-bar :elevation="0">
      <div class="flex w-full ">
        <NuxtLink to="/" class="self-center sm:block hidden w-2/12 min-w-min">
          <div class="mx-5"
            style="font-size: 1.5rem;font-weight: 400; letter-spacing: 0; line-height: 1.75rem;text-transform: none;">
            FontDownloader
          </div>
        </NuxtLink>
        <div class="w-full md:w-8/12">
          <v-text-field class="max-w-2xl m-auto" placeholder="Search" loading hide-details single-line rounded
            @update:focused="gotoSearch" :prepend-inner-icon="mdiMagnify" bg-color="#6991d614" v-model="searchInputValue">
            <template v-slot:loader></template>
            <template v-slot:append-inner>
              <SortMenu v-model:sort="appStore.sort" v-model:ordered-a-s-c="appStore.orderedASC"></SortMenu>
            </template>
          </v-text-field>
        </div>
        <div class="hidden md:flex w-2/12 justify-center items-center">
          <a href="https://github.com/rathax/FontDownloader" target="_blank">
            <v-btn variant="elevated">
              <template v-slot:prepend>
                <v-icon>
                  <GutHubIcon class="w-6 h-6">
                  </GutHubIcon>
                </v-icon>
              </template>
              GitHub
            </v-btn>
          </a>

        </div>
      </div>
    </v-app-bar>
    <slot />
    <v-footer class="!bg-[rgb(248_249_250)] mt-20">
      <div class="w-full pt-8 px-4 pb-12 max-w-[1280px] mx-auto">
        <div>Follow me:
          <ul class="inline ml-5">
            <li class="inline">
              <a href="https://x.com/godlikeplayer1" target="_blank" class="pl-0 p-2">
                Twitter
              </a>
            </li>
            <li class="inline">
              <a href="https://www.reddit.com/user/godlikeplayer2" target="_blank" class="pl-0 p-2">
                Reddit
              </a>
            </li>
            <li class="inline">
              <a href="https://github.com/rathax" target="_blank" class="pl-0 p-2">
                GitHub
              </a>
            </li>
          </ul>


        </div>
        <div class="border-t border-[rgb(218_220_224)] my-8"></div>
        <div>
          <ul class="text-sm">
            <li class="inline">
              <nuxt-link to="/about" class="pl-0 p-2">
                About
              </nuxt-link>
            </li>
            <li class="inline">
              <nuxt-link to="/contact" class="pl-0 p-2">
                Contact
              </nuxt-link>
            </li>
            <li class="inline">
              <nuxt-link to="/privacy" class="pl-0 p-2">
                Privacy
              </nuxt-link>
            </li>
          </ul>
        </div>
      </div>
    </v-footer>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { mdiMagnify } from '@mdi/js'
import SortMenu, { type SortOptions } from '@/components/SortMenu.vue';
import { watchDebounced } from '@vueuse/core'
import GutHubIcon from "@/assets/icons/github.svg?component"

// import { VApp, VAppBar, VAppBarNavIcon, VTextField,  } from "vuetify/components"

const appStore = useAppStore()
const router = useRouter()

const searchInputValue = ref(undefined)
watchDebounced(
  searchInputValue,
  () => { appStore.searchString = searchInputValue.value },
  { debounce: 500 },
)

watch([() => appStore.sort, () => appStore.orderedASC, () => appStore.searchString], () => {
  gotoSearch()
})

function gotoSearch() {
  if (router.currentRoute.value.name !== "search") {
    router.push({ name: "search" })
  }
}

const navigationDrawerIsOpen = ref<boolean | undefined>(undefined)
const toggleDrawerIsOpen = () => {
  navigationDrawerIsOpen.value = navigationDrawerIsOpen.value === undefined ? true : !navigationDrawerIsOpen.value
}
</script>