import type { FontVariants } from "@/stores/app";

export const generateCSS = (detailedFont: { id: string, version: string, family: string, storeID: string }, variant: FontVariants, pathPrefix: string, subsets: string[], vairant: 'modern' | 'legacy' | 'historic') => {
    const variantName = `${detailedFont.id}-${variant.id}`
    const path = pathPrefix + `/${detailedFont.id}-${detailedFont.version}-${detailedFont.storeID}-${variant.id}`;
    const defaultCSS = `/* ${variantName} - ${detailedFont.storeID} */
  @font-face {
    font-display: swap; /* Check https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display for other options. */
    font-family: ${variant.fontFamily};
    font-style: ${variant.fontStyle};
    font-weight: ${variant.fontWeight};`
    const modern = `
  ${defaultCSS}
    src: url('${path}.woff2') format('woff2'); /* Chrome 36+, Opera 23+, Firefox 39+, Safari 12+, iOS 10+ */
  }`;
    const legacy = `
  ${defaultCSS}
    src: url('${path}.woff2') format('woff2'), /* Chrome 36+, Opera 23+, Firefox 39+, Safari 12+, iOS 10+ */
          url('${path}.ttf') format('truetype'); /* Chrome 4+, Firefox 3.5+, IE 9+, Safari 3.1+, iOS 4.2+, Android Browser 2.2+ */
  }`;
    const historic = `
  ${defaultCSS}
    src: url('${path}.eot'); /* IE9 Compat Modes */
    src: url('${path}.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
          url('${path}.woff2') format('woff2'), /* Chrome 36+, Opera 23+, Firefox 39+, Safari 12+, iOS 10+ */
          url('${path}.woff') format('woff'), /* Chrome 5+, Firefox 3.6+, IE 9+, Safari 5.1+, iOS 5+ */
          url('${path}.ttf') format('truetype'), /* Chrome 4+, Firefox 3.5+, IE 9+, Safari 3.1+, iOS 4.2+, Android Browser 2.2+ */
          url('${path}.svg#${detailedFont.family}') format('svg'); /* Legacy iOS */
  }`;
    return vairant === 'modern' ? modern : vairant === 'legacy' ? legacy : historic
  }
  