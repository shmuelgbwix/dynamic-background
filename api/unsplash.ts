import { createApi } from "unsplash-js";
import * as nodeFetch from "node-fetch";

export const unsplash = createApi({
  accessKey: "psmv0JBHZ9zxhuVCGqMjVaHd333RkZGk02eEbGmyJ0Y",
  // @ts-ignore
  fetch: nodeFetch,
});
