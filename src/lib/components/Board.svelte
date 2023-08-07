<script lang="ts">
	import type { Board } from '$lib/app';
	import Column from './Column.svelte';

	export let board: Board;
</script>

<ul>
  {#each board.columns as column}
    <Column {column} />
  {/each}
</ul>

