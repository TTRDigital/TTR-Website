/*
 * Stands in for next/dist/build/polyfills/polyfill-module (see next.config.ts).
 * Next ships that file to every browser. Everything in it is built into the
 * browsers Next 16 supports (Chrome 111, Edge 111, Firefox 111, Safari 16.4;
 * see browserslist in package.json) except URL.canParse, which Safari added
 * in 17, so only that one is kept. Lighthouse flagged the rest as legacy
 * JavaScript.
 */
if (typeof URL !== "undefined" && !("canParse" in URL)) {
  URL.canParse = function (url, base) {
    try {
      return !!new URL(url, base);
    } catch {
      return false;
    }
  };
}
