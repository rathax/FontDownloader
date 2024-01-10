// Composables
import Home from '@/views/Home.vue'
import { useAppStore } from '@/store/app'
import { RouteRecordRaw } from 'vue-router'


export const routes = [
  {
    path: '/',
    name: "Home",
    component: Home,
  },
  {
    path: '/404',
    name: "404",
    component: Home,
  },
  {
    path: '/font',
    name: "font",
  },
  {
    path: '/font/:id',
    name: "Font",
    component: () => import('@/views/FontDetails/FontDetails.vue'),
    beforeEnter: async (to, from) => {
      // await useAppStore().getFont(to.params.id as string, { formats: [], subsets: [], variants: [] })
    },
  },
  { 
    path: '/:pathMatch(.*)*',
    redirect: to => {
      return { path: '/404' }
    },
  },

] as RouteRecordRaw[]

