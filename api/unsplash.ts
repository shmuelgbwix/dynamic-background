import { createApi } from "unsplash-js";
import * as nodeFetch from "node-fetch";

console.log({ key: process.env.UNSPLASH_KEY });

export const unsplash = createApi({
  accessKey: process.env.UNSPLASH_KEY,
  // @ts-ignore
  fetch: nodeFetch,
});
