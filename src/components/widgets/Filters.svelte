<script lang="ts">
  import { onMount } from "svelte";

  import { filters } from "~/utils/filterStore";

  export let items = [];

  let filterOptions: Record<string, string[]> = {};

  let openFilters = true;

  onMount(() => {
    if (window.matchMedia("(max-width: 768px)").matches) {
      openFilters = false;
    }
  });

  items.forEach((item) => {
    const {
      draft,
      slug,
      title,
      description,
      body,
      image,
      excerpt,
      link,
      ...filters
    } = item;

    Object.entries(filters).forEach(
      ([key, value]: [string, string | string[]]) => {
        if (!filterOptions[key]) filterOptions[key] = [];

        if (Array.isArray(value)) {
          value.forEach((eachValue) => {
            if (!filterOptions[key].includes(eachValue))
              filterOptions[key].push(eachValue);
          });
        } else {
          if (!filterOptions[key].includes(value))
            filterOptions[key].push(value);
        }
      }
    );
  });

  const updateFilter = (evt) => {
    const key: string = evt.target.name;
    const value: string = evt.target.value;
    if (evt.target.type === "radio") {
      filters.setKey(key, value);
    } else if (evt.target.type === "checkbox") {
      const currentValue = new Set(filters.get()[key] || []);
      if (evt.target.checked) {
        currentValue.add(value);
      } else {
        currentValue.delete(value);
      }
      filters.setKey(key, Array.from(currentValue));
    }
  };

  $: fOptions = Object.entries(filterOptions);

  let hasFilters = false;
  filters.listen((filter) => {
    hasFilters = Object.keys(filter).length > 0;
  });

  const clearFilters = () => {
    filters.set({});
    document.querySelectorAll("#filters input").forEach((inputElt) => {
      // @ts-ignore
      inputElt.checked = false;
    });
  };

  const updateSearch = (evt) => {
    filters.setKey("search", evt.target.value || "");
  };

  const toggleFilterSection = () => (openFilters = !openFilters);
</script>

<div
  id="filters"
  class="bg-slate-100 dark:bg-slate-800 rounded-lg shadow p-4 mb-4"
>
  <label>
    <div class="mb-2">Search</div>
    <input
      type="text"
      class="px-2 py-1 w-full rounded dark:bg-slate-600 dark:text-slate-200"
      placeholder="Text to search for.."
      name="Search"
      on:input={updateSearch}
    />
  </label>
</div>

<div id="filters" class="bg-slate-100 dark:bg-slate-800 rounded-lg shadow p-4">
  <h2
    class="text-lg flex justify-between items-center border-slate-300"
    class:mb-2={openFilters}
    class:border-b={openFilters}
  >
    <span>Filters</span>
    <div class="flex items-center gap-2">
      {#if hasFilters}
        <button
          on:click={clearFilters}
          aria-label="Clear filters"
          class="text-slate-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <rect x="4" y="4" width="16" height="16" rx="2" />
            <path d="M10 10l4 4m0 -4l-4 4" />
          </svg>
        </button>
      {/if}
      <button
        on:click={toggleFilterSection}
        aria-label="Clear filters"
        class="text-slate-500"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="transform"
          class:rotate-180={!openFilters}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="#2c3e50"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <polyline points="6 15 12 9 18 15" />
        </svg>
      </button>
    </div>
  </h2>

  {#if openFilters}
    {#each fOptions as [key, values]}
      <div>
        <div class="uppercase font-bold pt-2 mb-4 text-lg">{key}</div>
        <ul>
          {#each values as value}
            <li class="my-1">
              <label>
                <input
                  type={key == "category" ? "radio" : "checkbox"}
                  {value}
                  name={key}
                  on:change={updateFilter}
                />
                <span class="capitalize">{value}</span>
              </label>
            </li>
          {/each}
        </ul>
      </div>
    {/each}
  {/if}
</div>
