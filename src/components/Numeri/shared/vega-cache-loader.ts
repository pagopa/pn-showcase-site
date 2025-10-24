import { loader } from "vega";

const cache: Record<string, Promise<string>> = {};
const cacheLoader = loader();
const originalHttp = cacheLoader.http;

/**
 * Wrap original http method to use cache.
 * See {@link https://github.com/vega/vega/tree/master/packages/vega-loader#load_file}.
 * Eventually add loader promise to cache and return cached dataset promise.
 */
cacheLoader.http = function cacheLoaderHttp(url, options) {
  if (!cache[url]) {
    cache[url] = originalHttp.call(this, url, options); // Set cached data
  }
  return cache[url].then((res) => JSON.parse(JSON.stringify(res))); // BUG: Avoid shared data instance
};

export { cacheLoader };
