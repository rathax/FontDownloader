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
  
  export type FontDetailed = Omit<FontItem, 'variants'> & {
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