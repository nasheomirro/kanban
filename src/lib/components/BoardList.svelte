<script lang="ts">
	import { nanoid } from 'nanoid';
	import { store, type BoardType } from '$lib/app';
	import BoardForm from './BoardForm.svelte';

	const handleSubmit = (event: SubmitEvent) => {
		const form = event.currentTarget as HTMLFormElement;
		const data = new FormData(form);
		const name = data.get('name') as string;

		const board: BoardType = {
			name,
			id: nanoid(6),
			columns: []
		};
    
		store.addBoard(board);
    form.reset();
	};
</script>

<select value={$store.id} on:change={(e) => store.setCurrent(e.currentTarget.value)}>
	{#each $store.boards as board}
		<option value={board.id}>{board.name}</option>
	{/each}
</select>

<BoardForm on:submit={handleSubmit}>
	<svelte:fragment slot="button">add board</svelte:fragment>
</BoardForm>
