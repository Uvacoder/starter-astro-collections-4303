<script lang="ts">
  import { filters } from "~/utils/filterStore";

  export let items = [];

  let filterOptions: Record<string, string[]> = {};

  items.forEach((item) => {
    const {
      draft,
      slug,
      title,
      description,
      body,
      image,
      excerpt,
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
</script>

<aside id="filters">
  <h2 class="font-bold mb-4 text-lg flex justify-between items-center">
    <span>Filters</span>
    {#if hasFilters}
      <button on:click={clearFilters} aria-label="Clear filters" class="text-slate-500">
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
  </h2>
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
</aside>
