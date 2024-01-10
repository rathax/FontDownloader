// Utilities
import { defineStore } from "pinia";
import * as api from "@/api";
import { FontDetailed, FontItem } from "@/api/types";
import { AxiosError } from "axios";

export const useAppStore = defineStore("app", {
  state: () => ({
    fonts: <FontItem[]>[],
    detailedFont: <FontDetailed | undefined>undefined,
    downloadFontApiCall: {
      isLoading: false
    }
  }),
  actions: {
    async getFonts() {
      return api.getFonts().then((response) => {
        this.fonts = response.data.sort((a, b) => a.family.localeCompare(b.family))
      }).catch((e) => {
        console.log(e)
        return []
      });
    },
    async getFont(id: string, params: api.GetFontQueryParams) {
      return api.getFont({id}, params)
        .then((response) => {
          this.detailedFont = response.data;
        }).catch(async (e: AxiosError) => {
          if(e.request.status === 404) {
            await (this as any).router.push({name: "404"})
          }
          return undefined
        });


    },

    async downloadFont(id: string, params: api.GetFontQueryParams, filename: string) {
      this.downloadFontApiCall.isLoading = true
      return api.downloadFont({id}, params, filename).finally(
        () =>   this.downloadFontApiCall.isLoading = false
      )
    },
  },
});
