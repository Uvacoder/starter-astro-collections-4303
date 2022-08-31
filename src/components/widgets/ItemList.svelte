<script>
  import { SITE } from "~/config.mjs";

  import { filters } from "~/utils/filterStore";

  export let items = [];

  let filteredItems = items;

  filters.listen(({ search, ...filter }) => {
    let newItems = items;

    if (search) {
      newItems = newItems.filter(
        (item) =>
          item.title.toLowerCase().includes(search.toLowerCase()) ||
          item.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    Object.entries(filter).forEach(([key, values]) => {
      if (Array.isArray(values)) {
        if (values.length === 0) return;
        newItems = newItems.filter((i) =>
          values.some((v) => i[key].includes(v))
        );
      } else {
        newItems = newItems.filter((i) => i[key] == values);
      }
    });

    filteredItems = newItems;
  });
</script>

<ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-5">
  {#each filteredItems as item}
    <li class="group">
      <div class="flex items-start justify-between">
        <a href={`/${SITE.contentSlug}/${item.slug}`}>
          <h3 class="font-bold text-lg">{item.title}</h3>
        </a>
        {#if item.link}
          <a
            class="flex-shrink-0 invisible group-hover:visible text-slate-300 hover:text-slate-700"
            href={item.link}
            target="_blank"
            rel="noopener"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path
                d="M11 7h-5a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-5"
              />
              <line x1="10" y1="14" x2="20" y2="4" />
              <polyline points="15 4 20 4 20 9" />
            </svg>
          </a>
        {/if}
      </div>
      <p>{item.description}</p>
    </li>
  {/each}
</ul>
