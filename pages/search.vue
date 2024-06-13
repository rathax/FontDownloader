<template>
  <div class="mx-20 mt-20">
    <span class="font-light">{{ totalFilteredElements }} of {{ totalEments }} families</span>
    <v-infinite-scroll :items="fontList" :onLoad="load" v-if="showInfiteScroll">
      <template v-for="(item, index) in fontList" :key="index">
        <div  @mouseenter="hoverIndex = index" @mouseleave="hoverIndex = null" @click="goToFont(item.id)">
          <font-search-card :fontDetails="item" :showTopBorder="!((index === 0) || (hoverIndex !== null && index === hoverIndex + 1))" />
        </div>
      </template>
    </v-infinite-scroll>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import FontSearchCard from '~/components/FontSearchCard.vue';
import { useAppStore } from '~/stores/app';

const load = async ({ done }: any) => {
  console.log("load")
  const items = await loadFontList(fontList.value.length, 10)
  if(items.length > 0) {
    done('ok')

  } else {
    console.log('empty')
    done('empty')
  }
}

const showInfiteScroll = ref(true)
const appStore = useAppStore()
const fontList = ref<FontDetailed[]>([])
const hoverIndex = ref<number | null>(null)
const router = useRouter()
const totalEments =  ref<number>(0)
const totalFilteredElements =  ref<number>(0)


const goToFont = (id: string) => {
  router.push({name: "font-id", params: {id}})
}

async function loadFontList(start: number, size: number) {
  const fetchedFonts = await appStore.fetchFonts({start: String(start), end: String(start + size), orderedASC: String(appStore.orderedASC), search: appStore.searchString , sort: appStore.sort})
  fontList.value.push(...fetchedFonts?.data ?? [])
  totalEments.value = fetchedFonts?.totalElements ?? 0;
  totalFilteredElements.value = fetchedFonts?.totalFilteredElements ?? 0;

  return fetchedFonts?.data ?? [];
}

watch([() => appStore.sort, () => appStore.orderedASC, () => appStore.searchString], () => {
  showInfiteScroll.value = false
  fontList.value = []
  nextTick().then(() => {
    showInfiteScroll.value = true
  })
} )

await loadFontList(fontList.value.length, 10)

useSeoMeta({
  creator: 'ratHax',
  title: `FontDownloader | Search Fonts`,
  ogTitle: `FontDownloader | Search Fonts`,
  description: `Search and filter the Google Fonts Api for the right font`,
  ogDescription: `Search and filter the Google Fonts Api for the right font`,
  ogUrl: "https://fontdownloader.org/search" ,
  applicationName: "FontDownloader",
})
useHead({
    link: () => [{ rel: "canonical", href: "https://fontdownloader.org/search" }],
})

</script>