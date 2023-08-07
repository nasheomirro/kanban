<script lang="ts">
	import type { Item } from "$lib/app";

  export let item: Item;
</script>

<div>
  <span>{item.name}</span>
</div>