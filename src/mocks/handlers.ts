import { http, HttpResponse } from "msw";
import { allItems,detailedFont, detailedFontAfacad} from "./fonts";

export const handlers = [
  http.get("/api/fonts", ({ request, params, cookies }) => {
    return HttpResponse.json(allItems);
  }),
  http.get("/api/font/:id", ({ request, params, cookies }) => {
    const url = new URL(request.url)
    const subsets = url.searchParams.get('subsets')?.replaceAll(",", "_")
    console.log(subsets)
    if(params.id == "afacad") return HttpResponse.json({...detailedFontAfacad, storeID: subsets || 'latin'});
    else return HttpResponse.json({...detailedFont, storeID: subsets || 'latin'});
  }),
];
