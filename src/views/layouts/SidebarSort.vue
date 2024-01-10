<template>
    <div class="d-flex justify-space-around">
        <v-menu transition="scale-transition" :close-on-content-click="false">
            <template v-slot:activator="{ props }">
                <v-btn slim size="small" variant="text" :icon="mdiFilter" v-bind="props" aria-label="open sort menu">
                </v-btn>
            </template>
            <v-list density="compact">
                <v-list-subheader>FILTER</v-list-subheader>
                <v-list density="compact">
                    <v-list-item v-for="(item, i) in items" :key="i" :value="item" color="primary" :active="props.sort === item.value"
                        @click="handleClickSort(item.value)">
                        <v-list-item-title>{{ item.title }} </v-list-item-title>
                    </v-list-item>
                    <v-divider class="border-gray-400" thickness="2px"></v-divider>

                    <v-list-item color="primary" value="DESC" @click="order()" >
                        <template v-slot:append>
                            <v-icon v-if="orderedASC" :icon="mdiSortAscending"></v-icon>
                            <v-icon v-else :icon="mdiSortDescending"></v-icon>

                        </template>
                        <v-list-item-title> Descending </v-list-item-title>
                    </v-list-item>
                </v-list>

            </v-list>
        </v-menu>
    </div>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/store/app';
import { mdiSortAscending, mdiSortDescending, mdiFilter } from '@mdi/js'
import { computed, ref, watch } from "vue";
const appStore = useAppStore()

export type SortOptions = typeof items[number]["value"]
export interface Props {
    sort: SortOptions
}
const props = withDefaults(defineProps<Props>(), {})
const emit = defineEmits<{
    'update:sort': [value: SortOptions]
}>()

const orderedASC = ref(true)
const items = [
    { title: 'Family', value: 'family' },
    { title: 'Category', value: 'category' },
    { title: 'Popularity', value: 'popularity' },
    { title: 'Last modified', value: 'lastModified' },
] as const

const sort = computed({
    get() { return props.sort},
    set(newValue) { emit('update:sort', newValue) }
})


const order = () => {
    orderedASC.value = !orderedASC.value
    handleClickSort(sort.value)
}

watch([() => props.sort, orderedASC], ([toSort, orderedASC]) => {
    const fonts = appStore.fonts
    if (orderedASC === true) {
        if (toSort === 'family') {
            appStore.fonts = fonts.sort((a, b) => a.family.localeCompare(b.family))
        } else if (toSort === 'category') {
            appStore.fonts = fonts.sort((a, b) => a.category.localeCompare(b.category))
        } else if (toSort === 'popularity') {
            appStore.fonts = fonts.sort((a, b) => b.popularity - a.popularity)
        } else if (toSort === 'lastModified') {
            appStore.fonts = fonts.sort((a, b) => {
                const dateA = new Date(a.lastModified);
                const dateB = new Date(b.lastModified);
                return dateA > dateB ? 1 : dateA < dateB ? -1 : 0;
            })
        }
    } else {
        if (toSort === 'family') {
            appStore.fonts = fonts.sort((a, b) => b.family.localeCompare(a.family))
        } else if (toSort === 'category') {
            appStore.fonts = fonts.sort((a, b) => b.category.localeCompare(a.category))
        } else if (toSort === 'popularity') {
            appStore.fonts = fonts.sort((a, b) => a.popularity - b.popularity)
        } else if (toSort === 'lastModified') {
            appStore.fonts = fonts.sort((a, b) => {
                const dateA = new Date(b.lastModified);
                const dateB = new Date(a.lastModified);
                return dateA > dateB ? 1 : dateA < dateB ? -1 : 0;
            })
        }
    }

})

const handleClickSort = (toSort: SortOptions) => {
    sort.value = toSort;
}





</script>
