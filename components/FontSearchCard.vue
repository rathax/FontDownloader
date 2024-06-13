<template>
    <div class="px-1">
        <div class="w-full flex flex-col border-t p-6 pb-8  hover:bg-[#dadce0] hover:rounded-lg fontSearchCard cursor-pointer active:ring-2"
            :class="[props.showTopBorder ? 'border-[#dadce0]' : 'border-transparent']">
            <div class="flex gap-3 mb-8">
                <span class="font-semibold">{{ props.fontDetails.family }}</span>
                <span>{{ props.fontDetails.variants.length }} styles</span>
                <span> | </span>
                <span>{{ props.fontDetails.category }}</span>
            </div>
            <div>

            </div>
            <div class=" contain-layout overflow-clip ">
                <div class="text-5xl fontline  whitespace-nowrap transition-opacity duration-500 "
                    :class="[{ 'opacity-0': fontLoaded === false }]"
                    :style="{ fontFamily: documentFontName, fontWeight: regularVariant.fontWeight, fontStyle: regularVariant.fontStyle }">
                    Everyone has the right to freedom of thought, conscience and
                    religion; this right includes freedom to change his religion or belief, and freedom, either alone or in
                    community with others and in public or private, to manifest his religion or belief in teaching,
                    practice,
                    worship and observance.
                    Everyone has the right to freedom of opinion and expression; this right includes freedom to hold
                    opinions
                    without interference and to seek, receive and impart information and ideas through any media and
                    regardless
                    of frontiers.
                    Everyone has the right to rest and leisure, including reasonable limitation of working hours and
                    periodic
                    holidays with pay. </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { mdiSortAscending, mdiSortDescending, mdiFilter } from '@mdi/js'
import { computed, ref, watch, onMounted } from "vue";
export interface Props {
    fontDetails: FontDetailed
    showTopBorder: boolean
}
const props = withDefaults(defineProps<Props>(), {})

const regularVariant = props.fontDetails.variants.find(el => el.fontWeight === "regular") ?? props.fontDetails.variants[0]
const documentFontName = props.fontDetails.id + '-font-regular'
const fontLoaded = ref(false)
if (import.meta.browser) {
    addFont(documentFontName, regularVariant.woff).then(() => fontLoaded.value = true)
}

async function addFont(name: string, url: string) {
    const myFont = new FontFace(name, 'url(' + url + ')');
    await myFont.load();
    (document.fonts as any).add(myFont);
}

</script>
<style>
/* .fontline {
    -webkit-clip-path: inset(-100% 0 -100% -100%);
    clip-path: inset(-100% 0 -100% -100%);
    contain: layout;
} */

.fontSearchCard:hover .fontline:after {
    background: -webkit-gradient(linear, right top, left top, color-stop(0, #dadce0), to(transparent));
    background: -webkit-linear-gradient(right, #dadce0 0, transparent 100%);
    background: linear-gradient(to left, #dadce0 0, transparent 100%);
}

.fontline:after {
    content: "";
    background: -webkit-gradient(linear, right top, left top, color-stop(0, #fff), to(transparent));
    background: -webkit-linear-gradient(right, #fff 0, transparent 100%);
    background: linear-gradient(to left, #fff 0, transparent 100%);
    inset: 0 0 0 auto;
    position: absolute;
    width: min(80px, 100%);
}
</style>