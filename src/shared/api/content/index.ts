import { privateConfig } from "@/shared/config/private";
import { FileFetcher } from "./_lib/file-fetcher";
import { ContentParser } from "./_lib/content-parser";
import {
  DummyCacheStrategy,
  ReactQueryCacheStrategy,
} from "./_lib/cache-strategy";

import { ContentApi } from "./_content_api";

const fileFetcher = new FileFetcher(privateConfig.CONTENT_TOKEN);
const contentParser = new ContentParser();

const prodCacheStrategy = new ReactQueryCacheStrategy();
const devCacheStrategy = new DummyCacheStrategy();

export const contentApi = new ContentApi(privateConfig.CONTENT_URL, {
  cacheStrategy:
    process.env.NODE_ENV === "development"
      ? devCacheStrategy
      : prodCacheStrategy,
  contentParser,
  fileFetcher,
});
