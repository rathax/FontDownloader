import { FontDetailed } from "~/stores/app";
import fontsJSON from "@/api/fontDetails.json";
import { SortOptions } from "~/components/SortMenu.vue";

export type searchQueryParam = {
  start?: string;
  end?: string;
  sort?: string;
  search?: string;
  orderedASC?: string;
}

export type SearchGetBody = {
  data: FontDetailed[],
  totalElements: number
  totalFilteredElements: number

}


export default defineEventHandler<SearchGetBody>((event) => {
    const query: searchQueryParam = getQuery(event)
    const toSort = query.sort as SortOptions ??  "family";
    const orderedASC: boolean = query.orderedASC === 'true' ? true : false
    const searchString = query.search as string
    const start = parseInt(query.start ?? "0")
    const end = parseInt(query.end ?? "10")

    const sortedFonts = sortFonts(orderedASC, toSort)
    const filteredFonts = sortedFonts?.filter(item => item.family.toLowerCase().includes(searchString?.toLowerCase() ?? ''))
    return {
      totalFilteredElements: filteredFonts.length,
      data: filteredFonts.slice(start, end),
      totalElements: fontsJSON.length
    }
})


function sortFonts(orderedASC:boolean, toSort: SortOptions) {
    const fonts:FontDetailed[] = fontsJSON.toSorted()
    if (orderedASC === true) {
        if (toSort === "family") {
          return fonts.sort((a, b) => a.family.localeCompare(b.family));
        } else if (toSort === "category") {
          return fonts.sort((a, b) => a.category.localeCompare(b.category));
        } else if (toSort === "popularity") {
          return fonts.sort((a, b) => b.popularity - a.popularity);
        } else if (toSort === "lastModified") {
          return fonts.sort((a, b) => {
            const dateA = new Date(a.lastModified);
            const dateB = new Date(b.lastModified);
            return dateA > dateB ? 1 : dateA < dateB ? -1 : 0;
          });
        }
      } else {
        if (toSort === "family") {
          return fonts.sort((a, b) =>
            b.family.localeCompare(a.family)
          );
        } else if (toSort === "category") {
          return fonts.sort((a, b) =>
            b.category.localeCompare(a.category)
          );
        } else if (toSort === "popularity") {
          return fonts.sort((a, b) => a.popularity - b.popularity);
        } else if (toSort === "lastModified") {
          return fonts.sort((a, b) => {
            const dateA = new Date(b.lastModified);
            const dateB = new Date(a.lastModified);
            return dateA > dateB ? 1 : dateA < dateB ? -1 : 0;
          });
        }
      }
      return []
}