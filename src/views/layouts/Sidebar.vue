<template>
    <v-navigation-drawer :width="300"  v-model="isOpen"  @click="renderAllFontItems = true" @mouseenter.once="renderAllFontItems = true">
        <div class="p-6 flex">
            <v-text-field density="compact" variant="solo-filled" label="Filter" :prepend-inner-icon="mdiMagnify" v-model="searchString"
                single-line hide-details>
                <template v-slot:append-inner>
                    <SidebarSort v-model:sort="sorting"></SidebarSort>
                </template>
            </v-text-field>
        </div>
        <v-list density="compact" :style="{ 'min-height': minheight + 'px' }" slim aria-label="font list">
<!--             <v-list-item  value="" color="primary" :ripple="false" slim >
                <v-list-item-title>TEST <span class="text-gray-400 text-caption ml-1">sans serif</span></v-list-item-title>
            </v-list-item>   -->
           <template v-for="(item, i) in itemsToRender" :key="i">
                <router-link :to="{name: 'Font', params: {id: item.id}} " role="option" 
                    class="v-list-item v-list-item--slim v-theme--light v-list-item--density-compact v-list-item--one-line  hover:cursor-pointer" :class="[selectedFontId === item.id ? '!bg-primary !bg-opacity-[0.12] text-primary ' : 'hover:bg-surface1' ]" >
                    <div class="v-list-item__content" >
                        <div class="v-list-item-title ">{{ item.id }} <span class="text-gray-400 text-caption ml-1">{{
                            item.category }}</span></div>
                    </div>
                </router-link>
            </template>  
        </v-list>
    </v-navigation-drawer>
</template>

<script lang="ts" setup>
import { mdiMagnify } from '@mdi/js'
import { onMounted, ref } from "vue"
import { useAppStore } from '@/store/app'
import SidebarSort, {type SortOptions} from "./SidebarSort.vue";
import { useRouter } from "vue-router"
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { refDebounced } from '@vueuse/core'

/// Boilerplate
const appStore = useAppStore()
const router = useRouter()
const { fonts: items   } = storeToRefs(appStore)
export interface Props {
    modelValue?: boolean
}
const props = withDefaults(defineProps<Props>(), {})
const emit = defineEmits<{
    'update:modelValue': [value: boolean]
}>()
const isOpen = computed({
    get() { return props.modelValue },
    set(newValue) { emit('update:modelValue', newValue) }
})

// Search Logic
const searchString = ref<string | undefined>(undefined)
const debouncedDearchString = refDebounced(searchString, 350)
const sorting = ref<SortOptions>("family")

// List Render Logic
const minheight = computed(() => !renderAllFontItems.value ? 1595 * 40 : 100)
const renderAllFontItems = ref(false)
const itemsToRender = computed(() => {
    if (!renderAllFontItems.value)  return items.value.slice(0, 40)
    if( debouncedDearchString.value == undefined) return items.value;
    return items.value.filter(item => item.family.toLowerCase().includes((debouncedDearchString.value ?? '').toLowerCase()))
})
const selectedFontId = computed(() => {
    return router.currentRoute.value.params.id
})


onMounted(async () => {
 appStore.getFonts()
})


</script>
