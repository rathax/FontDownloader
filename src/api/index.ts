import axios from "axios";
import { FontDetailed, FontItem } from "./types";

const axiosStrict = axios.create({
  transitional: {
    silentJSONParsing: false,
  },
  responseType: "json",
});


export const getFonts = () => {
  return axiosStrict.get<FontItem[]>("/api/fonts");
};


export type GetFontsPathParams = {
  id: string;
}
export type GetFontQueryParams = {
  download?: boolean
  subsets: string[];
  formats: string[];
  variants: string[];
};
export const getFont = (pathParams:GetFontsPathParams, params: GetFontQueryParams) => {
  return axios.get<FontDetailed>(`/api/fonts/${pathParams.id}`, {
    params: {
      subsets: params.subsets.join(",") || undefined,
      formats: params.formats.join(",")|| undefined,
      variants: params.variants.join(",")|| undefined,
    },
  });
};
export const downloadFont = (pathParams:GetFontsPathParams, params: GetFontQueryParams, filename: string) => {
  return axios.get(`/api/fonts/${pathParams.id}`, {
    params: {
      download: 'zip',
      subsets: params.subsets.join(",") || undefined,
      formats: params.formats.join(",")|| undefined,
      variants: params.variants.join(",")|| undefined,
    }, 
    responseType: 'blob',
  }).then((response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
  });
}