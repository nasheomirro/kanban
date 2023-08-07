<script lang="ts">
	import { store } from '$lib/app';
	import Board from '$lib/components/Board.svelte';

	let currentId = '';
	$: board = $store.find((board) => board.id === currentId);
</script>

{#if board}
	<Board {board} />
{/if}
