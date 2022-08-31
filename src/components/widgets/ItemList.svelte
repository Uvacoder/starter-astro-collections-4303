<script>
  import { filters } from "~/utils/filterStore";

  export let items = [];

  let filteredItems = items;

  filters.listen((filter) => {
    let newItems = items;
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
    <li>
      <h3 class="font-bold text-lg">{item.title}</h3>
      <p>{item.description}</p>
    </li>
  {/each}
</ul>
