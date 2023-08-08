<script lang="ts">
  import { store } from '$lib/app';
	import Board from '$lib/components/Board.svelte';
	import BoardList from '$lib/components/BoardList.svelte';
	import { setInitialClassState } from '@skeletonlabs/skeleton';
	setInitialClassState();

	$: board = $store.boards.find((board) => board.id === $store.id);
</script>

<BoardList />
{#if board}
	<Board {board} />
{/if}
