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
import { mdiSortAscending, mdiSortDescending, mdiFilter } from '@mdi/js'
import { computed, ref, watch } from "vue";

export type SortOptions = typeof items[number]["value"]
export interface Props {
    sort: SortOptions
}
const props = withDefaults(defineProps<Props>(), {})
const emit = defineEmits<{
    'update:sort': [value: SortOptions]
    'update:orderedASC': [value: boolean]
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
    set(newValue) {
        emit('update:sort', newValue)
     }
})


const order = () => {
    orderedASC.value = !orderedASC.value
    emit('update:orderedASC', orderedASC.value)
}


const handleClickSort = (toSort: SortOptions) => {
    sort.value = toSort;
}


</script>
