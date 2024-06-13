import { FontDetailed } from "~/stores/app";

export default defineEventHandler((event) => {
  const id = getRouterParam(event, "id");
  const query = getQuery<GetFontQueryParams>(event);

  const download: string | undefined = query.download?.toString()
  const subsets: string | undefined = query.subsets?.toString();
  const formats: string | undefined = query.formats?.toString();
  const variants: string | undefined = query.variants?.toString();

  return $fetch<FontDetailed>(process.env.API_HOST + "/api/fonts/" + id, {
    params: {
      download:  download == 'true' ? "zip" : undefined,
      subsets,
      formats,
      variants,
    },
    responseType: download == 'true' ? "blob" : "json",
  });
});


export type GetFontQueryParams = {
    download?: boolean
    subsets: string[];
    formats: string[];
    variants: string[];
  };