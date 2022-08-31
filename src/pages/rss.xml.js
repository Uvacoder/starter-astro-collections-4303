import rss from "@astrojs/rss";

import { SITE } from "~/config.mjs";
import { fetchContentItems } from "~/utils/fetchItems";
import { getPermalink } from "~/utils/permalinks";

const items = await fetchContentItems();

export const get = () =>
  rss({
    title: SITE.title,
    description: SITE.description,
    site: import.meta.env.SITE,

    items: items.map((item) => ({
      link: getPermalink(item.slug, "content"),
      title: item.title,
      description: item.description,
    })),
  });
