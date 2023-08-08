<script lang="ts">
	import type { ItemType } from "$lib/app";

  export let item: ItemType;
</script>

<div>
  <span>{item.name}</span>
</div>