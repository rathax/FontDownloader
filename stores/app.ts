import { defineStore } from "pinia";
import type { SortOptions } from "~/components/SortMenu.vue";
import type { GetFontQueryParams } from "~/server/api/fonts/[id]";
import type { SearchGetBody, searchQueryParam } from "~/server/api/search";

export const useAppStore = defineStore("websiteStore", {
  state: () => ({
    detailedFont: <FontDetailed | undefined>undefined,
    downloadFontApiCall: {
      isLoading: false,
    },
    sort: "family" as const satisfies SortOptions,
    orderedASC: true satisfies boolean,
    searchString: "" as string | undefined,
  }),
  actions: {
    async fetchFonts(query: searchQueryParam) {
      return useFetch<SearchGetBody>("/api/search", {query}).then((response) => {
       return response.data.value
      })
    },
    async getFont(id:string, params: GetFontQueryParams) {
      return useFetch<FontDetailed>("/api/fonts/" + id, {params}).then((response) => {
       if(response.data.value){
        this.detailedFont = response.data.value
       }
      }).catch(async (e) => {
        if(e.request.status === 404) {
          await (this as any).router.push({name: "404"})
        }
        return undefined
      });
    },
    async downloadFont(id:string, params: GetFontQueryParams,  filename: string) {
      $fetch<Blob>("/api/fonts/" + id, {params: {...params, download: true}}).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
      })
    },
  },
});

export type FontItem = {
  id: string;
  family: string;
  variants: string[];
  subsets: string[];
  category: string;
  version: string;
  lastModified: string;
  popularity: number;
  defSubset: string;
  defVariant: string;
};

export type FontDetailed = Omit<FontItem, "variants"> & {
  subsetMap: {
    latin: boolean;
    "latin-ext": boolean;
    vietnamese: boolean;
  };
  storeID: string;
  variants: {
    id: string;
    fontFamily: string;
    fontStyle: string;
    fontWeight: string;
    woff: string;
    svg: string;
    eot: string;
    woff2: string;
    ttf: string;
  }[];
};

export type FontVariants = {
  id: string;
  fontFamily: string;
  fontStyle: string;
  fontWeight: string;
  woff: string;
  svg: string;
  eot: string;
  woff2: string;
  ttf: string;
};
