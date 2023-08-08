<script lang="ts">
	import type { ColumnType } from "$lib/app";
	import Item from "./Item.svelte";

  export let column: ColumnType;
</script>

<li>
  <span>{column.name}</span>
  <ul>
    {#each column.items as item}
      <Item {item} />
    {/each}
  </ul>
</li>