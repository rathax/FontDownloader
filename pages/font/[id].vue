<template>
  
  <v-sheet :elevation="2" class="h-full max-w-[1240px] mx-auto py-10 px-10">
    <template v-if="detailedFont !== null" >
    <div class="flex justify-between">
      <v-breadcrumbs :items="breadcrumbItems" :density="'compact'" class="text-caption !p-0 mb-4">
        <template v-slot:divider>
          <v-icon :icon="mdiChevronRight"></v-icon>
        </template>
      </v-breadcrumbs>
      <div class="text-caption">last modified: {{ detailedFont.lastModified }} ({{ detailedFont.version }})</div>
    </div>
    <h1 class="text-h4 mb-7">
      {{ detailedFont.family }} Font <span class="text-subtitle-2">{{ detailedFont.category }}</span>
    </h1>


    <p class="text-base my-4">
      Download the {{ detailedFont.family }} font. Configure the charsets (subsets) and styles to be included in the font
      bundle. Learn more about the {{ detailedFont.family }} font and its License on <a class="text-primary"
        rel="nofollow" :href="'https://fonts.google.com/specimen/' + detailedFont.family + '/about'">fonts.google.com</a>.
    </p>

    <h2 class="text-h5 mt-12 mb-6">
      1. Select subsets
    </h2>
    <p class="my-4">select one or multiple available subsets that will be included in bundle.<br> Available options: {{
      detailedFont.subsets.join(', ') }}. default: {{ detailedFont.defSubset }}</p>
    <div class="text-base my-4">
      <v-select label="Subsets" v-model:focused="selectSubsetIsFocused" :items="detailedFont.subsets" multiple
        v-model="selectedSubsets" variant="outlined"></v-select>
    </div>

    <h2 class="text-h5 mt-6 mb-6">
      2. Select styles
    </h2>

    <div class="bg-surface1 flex flex-col  py-4 -mx-10 px-10">

      <v-text-field color="primary" label="Sampel Text" variant="underlined" v-model="sampleText" class="w-full my-5" aria-label="Sampel Text">
        <template v-slot:append>
          <v-text-field v-model="fontSize" hide-details variant="plain" single-line label="Font-Size" aria-label="Font Size" density="compact"
            type="number" suffix="px" style="width: 57px" ></v-text-field>
        </template>
      </v-text-field>
      <v-checkbox label="check all" hide-details class="min-w-36" density="compact" v-model="checkAll"></v-checkbox>
      <template v-for="(item, i) in detailedFont.variants" :key="i">
        <div class="flex gap items-center">
          <v-checkbox :label="item.id" hide-details class="min-w-36" density="compact" :value="item.id"
            v-model="checkedFontVariants"></v-checkbox>
          <div class="w-full transition-opacity duration-500"
            :style="{ fontSize: fontSize + 'px', fontFamily: 'font' + i, fontWeight: item.fontWeight, fontStyle: item.fontStyle }"
            :class="[{ 'opacity-0': fontsLoaded === false || fontsAreReloading === true }]">{{ sampleText }}</div>
        </div>
      </template>
    </div>
    <h2 class="text-h5 mt-6 mb-6">
      3. Generate CSS
    </h2>
    <p class="text-base my-4 ">
      Select the desired level of browser support. Choose <span class="font-semibold">Modern Browsers</span> if supporting
      old browsers is not relevant, <span class="font-semibold">Legacy Support</span> if old browsers still need to be
      supported and <span class="font-semibold">Historic Support</span> if very old browsers needs to be supported.
    </p>
    <div class="mt-6 overflow-hidden overflow-x-auto -mx-10 md:mx-0">
      <div class="min-w-fit">
        <v-btn-toggle color="primary" group v-model="vairant">
          <v-btn value="modern">
            Modern Browsers
          </v-btn>
          <v-btn value="legacy">
            Legacy Support
          </v-btn>
          <v-btn value="historic">
            Historic Support
          </v-btn>
        </v-btn-toggle>
      </div>

    </div>


    <div class="overflow-x-auto bg-surface1 pb-5 mb-6 text-sm select-all -mx-10 px-10">
      <pre class="language-css"
        data-hljs="css"><code v-html="computedCSSHtml" class="language-css whitespace-pre-wrap" data-hljs="css"></code></pre>
    </div>

    <div class="flex items-center my-8 flex-col gap-3 md:gap-6 md:flex-row">
      <div class="whitespace-nowrap">Customize folder prefix (optional):</div>
      <div class="w-full">
        <v-text-field color="primary" variant="outlined" hide-details :density="'compact'"
          v-model="pahtPrefix" aria-label="Path Prefix"></v-text-field>
      </div>

    </div>
    <p class="my-2 text-center">Click <span class="text-primary hover:cursor-pointer" @click="copyText">here</span> to
      copy the generated CSS, then paste it into your own CSS file.
    </p>

    <h2 class="text-h5 mt-12 mb-6">
      4. Download the Fonts
    </h2>

    <p clasS="my-2">Your generated archive for <span class="font-semibold">{{ detailedFont.family }}</span> with subsets <span
        class="text-subtitle-2">[{{ selectedSubsets.join(",") }}]</span> and styles <span class="text-subtitle-2">[{{
          checkedFontVariants.join(",") }}]</span> includes the formats
      <span class="text-subtitle-2">[{{ formats.join(",") }}]</span>.
    </p>

    <div class="flex justify-center mt-12 mb-6">
      <v-btn elevation="4" size="x-large" color="primary"
        :loading="(fontsLoaded === false || fontsAreReloading === true) || appStore.downloadFontApiCall.isLoading"
        @click="downloadFont" :prepend-icon="mdiDownload">{{ filename }}
      </v-btn>

    </div>

    <p class="text-caption text-center">Fonts are copyright of their respective authors. <br>
      See <a href="https://fonts.google.com/attribution" target="_blank" class="text-primary hover:cursor-pointer"
        rel="nofollow">Google
        Fonts Open Source Font Attribution</a> to find out the specific license that this font uses.
    </p>
    <v-snackbar :location="'bottom left'" v-model="copySnackbar">
      Copied to clipboard
    </v-snackbar>
  </template>
  </v-sheet>
</template>
  
<script lang="ts" setup>
import { computed, ref, watch, onMounted } from 'vue';
import hljs from 'highlight.js/lib/core';
import css from 'highlight.js/lib/languages/css';
import { mdiDownload, mdiChevronRight } from '@mdi/js'
import { useAppStore } from '@/stores/app'
import { useRouter, } from 'vue-router';
import { sleep } from "@/uitls/index"
import { generateCSS } from '@/uitls/generateCSS';
import { useHead } from '@unhead/vue';

// Boilerplate
const router = useRouter()
const id = computed(() => router.currentRoute.value.params.id as string)
const appStore = useAppStore()

// Main Data
const detailedFont = computed(() => appStore.detailedFont || null)
const detailedFontVariants = computed(() => appStore.detailedFont?.variants || [])
const breadcrumbItems = computed(() => [
  {
    title: 'Home',
    disabled: false,
    to: '/',
  },
  {
    title: 'Fonts',
    disabled: true,
  },
  {
    title: (detailedFont.value?.id || "").charAt(0).toUpperCase() + detailedFont.value?.id.slice(1),
    disabled: true,
  },
])

appStore.detailedFont = undefined
await appStore.getFont(id.value, { formats: [], subsets: [], variants: [] })


// Subset & Variant Logic
const selectedSubsets = ref<(string)[]>([])
const selectSubsetIsFocused = ref(false);
const fontSize = ref(16)
const sampleText = ref('Whereas disregard and contempt for human rights have resulted.')
const checkedFontVariants = ref<string[]>([])
const allVariants = computed(() => detailedFont.value?.variants.map((variant) => variant.id) || [])
const checkAll = computed({
  get() { return checkedFontVariants.value.length >= allVariants.value.length },
  set(newValue) {
    if (!newValue) checkedFontVariants.value = []
    else checkedFontVariants.value = allVariants.value
  }
})

// set defaults
watch(() => detailedFont.value?.family, () => {
  if (detailedFont.value?.defSubset) {
    selectedSubsets.value.push(detailedFont.value.defSubset)
  }
  if (detailedFont.value?.defVariant) {
    checkedFontVariants.value.push(detailedFont.value.defVariant)
  }
}, {immediate: true})

// Font Loading Logic
const fontsLoaded = ref(false)
const fontsAreReloading = ref(false)
const addFont = async (name: string, url: string) => {
  // console.log(`registering font: ${name}, url ${url},`)
  const myFont = new FontFace(name, 'url(' + url + ')');
  await myFont.load();
  (document.fonts as any).add(myFont);
}
const loadFonts = () => {
  if (import.meta.env.SSR) {
    return
  }
  (document.fonts as any).clear();
  const promises = []
  console.log("loading fonts for: " + detailedFont.value?.storeID)
  for (const [index, value] of detailedFontVariants.value.entries()) {
    promises.push(addFont('font' + index, value.woff2))
  }
  Promise.allSettled(promises).then(async () => {
    fontsLoaded.value = true
  });
}

watch(selectSubsetIsFocused, async () => {
  if (selectSubsetIsFocused.value) return
  if(selectedSubsets.value.length === 0 && detailedFont.value?.defSubset) selectedSubsets.value.push(detailedFont.value.defSubset)

  fontsAreReloading.value = true
  await Promise.allSettled(
    [useAppStore().getFont(detailedFont.value!.id, { formats: [], subsets: selectedSubsets.value, variants: [] }),
    sleep(500)
    ])
  loadFonts()
  fontsAreReloading.value = false
})

// CSS Generator Logic
const vairant = ref<'modern' | 'legacy' | 'historic'>("modern")
const pahtPrefix = ref('../fonts')

hljs.registerLanguage('css', css);

const computedCSSString = computed(() => {
  let cssString = ''
  for (const value of detailedFontVariants.value) {
    if (checkedFontVariants.value.includes(value.id)) {
      cssString = cssString + generateCSS(detailedFont.value!, value, pahtPrefix.value, selectedSubsets.value, vairant.value)
    }
  }
  return cssString
})
const computedCSSHtml = computed(() => {
  return hljs.highlight(computedCSSString.value, { language: 'css' }).value
})


// Copy CSS Logic & Download Logic
const copySnackbar = ref(false)
const copyText = () => {
  navigator.clipboard.writeText(computedCSSString.value);
  copySnackbar.value = true
}
const filename = computed(() => `${detailedFont.value?.id}-${detailedFont.value?.version}-${detailedFont.value?.storeID}.zip`)
const modern = ["woff2"]
const legacy = modern.concat(["tff"])
const historic = legacy.concat(["woff", "svg", "eot"])
const formats = computed(() => vairant.value === "modern" ? modern : vairant.value === "legacy" ? legacy : historic)

const downloadFont = () => {
  if (!detailedFont.value?.id) return
 appStore.downloadFont(detailedFont.value.id, { subsets: selectedSubsets.value, variants: checkedFontVariants.value, formats: formats.value }, filename.value)
}




onBeforeMount(async () => {
 loadFonts()
})

useSeoMeta({
  creator: 'ratHax',
  title:  () => `FontDownloader | Download The ${detailedFont.value?.family} Font`,
  ogTitle: () => `FontDownloader | Download The ${detailedFont.value?.family} Font`,
  description: () => `Download and configure the ${detailedFont.value?.family} font for free with just a few clicks.`,
  ogDescription: () => `Download and configure the ${detailedFont.value?.family} font for free with just a few clicks.`,
  keywords: () => `${detailedFont.value?.family}, download ${detailedFont.value?.family}, download ${detailedFont.value?.family} font, self host  ${detailedFont.value?.family}, font downloder, google fonts api downloader, font helper`,
  ogUrl: () =>"https://fontdownloader.org/font/" + detailedFont.value?.id ,
  applicationName: () => "FontDownloader",
})
useHead({
    link: () => [{ rel: "canonical", href: "https://fontdownloader.org/font/" + detailedFont.value?.id }],
})




</script>

<style>
.hljs {
  display: block;
  overflow-x: auto;
  padding: .5em;
  background: #f0f0f0;
  -webkit-text-size-adjust: none
}

.hljs,
.hljs-subst,
.hljs-tag .hljs-title,
.nginx .hljs-title {
  color: #000
}

.apache .hljs-cbracket,
.apache .hljs-tag,
.asciidoc .hljs-header,
.bash .hljs-variable,
.coffeescript .hljs-attribute,
.django .hljs-variable,
.erlang_repl .hljs-function_or_atom,
.haml .hljs-symbol,
.hljs-addition,
.hljs-constant,
.hljs-flow,
.hljs-parent,
.hljs-pragma,
.hljs-preprocessor,
.hljs-rules .hljs-value,
.hljs-stream,
.hljs-string,
.hljs-tag .hljs-value,
.hljs-template_tag,
.hljs-title,
.markdown .hljs-header,
.ruby .hljs-symbol,
.ruby .hljs-symbol .hljs-string,
.smalltalk .hljs-class,
.tex .hljs-command,
.tex .hljs-special {
  color: #800
}

.asciidoc .hljs-blockquote,
.diff .hljs-header,
.hljs-annotation,
.hljs-chunk,
.hljs-comment,
.markdown .hljs-blockquote,
.smartquote {
  color: #6a6a6a
}

.asciidoc .hljs-bullet,
.asciidoc .hljs-link_url,
.go .hljs-constant,
.hljs-change,
.hljs-date,
.hljs-hexcolor,
.hljs-literal,
.hljs-number,
.hljs-regexp,
.lasso .hljs-variable,
.makefile .hljs-variable,
.markdown .hljs-bullet,
.markdown .hljs-link_url,
.smalltalk .hljs-char,
.smalltalk .hljs-symbol {
  color: #080
}

.apache .hljs-sqbracket,
.asciidoc .hljs-attribute,
.asciidoc .hljs-link_label,
.clojure .hljs-attribute,
.coffeescript .hljs-property,
.erlang_repl .hljs-reserved,
.haml .hljs-bullet,
.hljs-array,
.hljs-attr_selector,
.hljs-decorator,
.hljs-deletion,
.hljs-doctype,
.hljs-envvar,
.hljs-filter .hljs-argument,
.hljs-important,
.hljs-javadoc,
.hljs-label,
.hljs-localvars,
.hljs-phony,
.hljs-pi,
.hljs-prompt,
.hljs-pseudo,
.hljs-shebang,
.lasso .hljs-attribute,
.markdown .hljs-link_label,
.nginx .hljs-built_in,
.ruby .hljs-string,
.tex .hljs-formula,
.vhdl .hljs-attribute {
  color: #88f
}

.apache .hljs-tag,
.asciidoc .hljs-strong,
.bash .hljs-variable,
.css .hljs-tag,
.hljs-built_in,
.hljs-dartdoc,
.hljs-id,
.hljs-javadoctag,
.hljs-keyword,
.hljs-phpdoc,
.hljs-request,
.hljs-status,
.hljs-title,
.hljs-type,
.hljs-typename,
.hljs-winutils,
.hljs-yardoctag,
.markdown .hljs-strong,
.smalltalk .hljs-class,
.tex .hljs-command {
  font-weight: 700
}

.asciidoc .hljs-emphasis,
.markdown .hljs-emphasis {
  font-style: italic
}

.nginx .hljs-built_in {
  font-weight: 400
}

.coffeescript .javascript,
.javascript .xml,
.lasso .markup,
.tex .hljs-formula,
.xml .css,
.xml .hljs-cdata,
.xml .javascript,
.xml .vbscript {
  opacity: .5
}
</style>