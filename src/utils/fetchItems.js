import { SITE } from "~/config.mjs";
import { getNormalizedItem } from "~/utils/getNormalizedItem";

const load = async function () {
  let items = [];

  if (SITE.content.type === "local") {
    items = import.meta.glob('~/data/items/**/*.{md,mdx}', {
      eager: true,
    });
  } else if (SITE.content.type === "inline") {
    items = Object.entries(SITE.content.items).map(([key, { body, ...item }]) => ({
      frontmatter: item,
      file: `${key}.md`, // Respect file
      compiledContent: () => body
    }));
  }

  const normalizedItems = Object.keys(items).map(async (key) => {
    const item = await items[key];
    return await getNormalizedItem(item);
  });

  const results = (await Promise.all(normalizedItems))
    .sort((a, b) => b.title - a.title)
    .filter((item) => !item.draft);
  return results;
};

let _items;

export const fetchContentItems = async () => {
  _items = _items || load();

  return await _items;
};

export const findItemByIds = async (ids) => {
  if (!Array.isArray(ids)) return [];

  const items = await fetchContentItems();

  return ids.reduce(function (r, a) {
    items.some(function (el) {
      return a === el.slug && r.push(el);
    });
    return r;
  }, []);
};
