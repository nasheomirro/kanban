<script lang="ts">
	import { app } from '$lib/app';
	import Board from '$lib/components/Board.svelte';

	$: board = $app.boards.find((board) => board.id === $app.id);
</script>

{#if board}
	<Board {board} />
{/if}
