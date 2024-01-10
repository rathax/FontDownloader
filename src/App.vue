<template>
  <v-app class="rounded-md">
    <v-app-bar color="primary">
      <template v-slot:title>
        <router-link :to="'/'">Font Dowloader</router-link>
      </template>
      <template v-slot:prepend>
        <v-app-bar-nav-icon @click="toggleDrawerIsOpen" aria-label="toggle menu" />
      </template>


    </v-app-bar>
    <sidebar v-model="navigationDrawerIsOpen" />
    <v-main class="h-full">
      <v-sheet :elevation="2" class="h-full max-w-[900px] mx-auto mt-8 py-10 px-10" border>
        <router-view v-slot="{ Component, route }">
          <transition name="fade" mode="out-in" :key="route.fullPath"> 
            <component :is="Component"  />
          </transition>
        </router-view>
      </v-sheet>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import Sidebar from '@/views/layouts/Sidebar.vue';


const navigationDrawerIsOpen = ref<boolean | undefined>(undefined)
const toggleDrawerIsOpen = () => {
  navigationDrawerIsOpen.value = navigationDrawerIsOpen.value === undefined ? true : !navigationDrawerIsOpen.value
}

</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.150s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>