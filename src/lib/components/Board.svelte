<script lang="ts">
	import { store, type BoardType } from '$lib/app';
	import Column from './Column.svelte';

	export let board: BoardType;
</script>

<h1>{board.name}</h1>
<button on:click={() => store.deleteBoard(board.id)}>delete</button>
<ul>
  {#each board.columns as column}
    <Column {column} />
  {/each}
</ul>