<script lang="ts">
	import type { Column } from "$lib/app";
	import Item from "./Item.svelte";

  export let column: Column;
</script>

<li>
  <ul>
    {#each column.items as item}
      <Item {item} />
    {/each}
  </ul>
</li>