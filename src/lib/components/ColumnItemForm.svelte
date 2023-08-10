<script lang="ts" context="module">
	import { app, type BoardType, type ColumnType } from '$lib/app';
	import { createStateStore } from '$lib/utils';
	import { nanoid } from 'nanoid';
	import { tick } from 'svelte';

	type State = {
		isFormSeen: boolean;
		text: string;
	};
	let state = createStateStore<State>({
		text: '',
		isFormSeen: false
	});
</script>

<script lang="ts">
	export let board: BoardType;
	export let column: ColumnType;

	state.initialize(column.id);

	$: ({ isFormSeen, text } = $state[column.id]);
	let form: HTMLFormElement;

	const showForm = async () => {
		$state[column.id].isFormSeen = true;
		// wait for form to show
		await tick();
		form.querySelector('textarea')?.focus();
	};

	const hideForm = () => {
		$state[column.id].isFormSeen = false;
		$state[column.id].text = '';
	};

	const submitForm = (e: SubmitEvent) => {
		e.preventDefault();

		app.addItem(board, column, {
			name: text,
			id: nanoid(4)
		});

		hideForm();
	};
</script>

<button
	on:click={showForm}
	class:hidden={isFormSeen}
	class:block={!isFormSeen}
	class="btn transition-colors-and-transform w-full btn-sm variant-soft-surface">Add Item</button
>

<form
	on:submit={submitForm}
	bind:this={form}
	class="space-y-2"
	class:block={isFormSeen}
	class:hidden={!isFormSeen}
>
	<textarea bind:value={$state[column.id].text} class="textarea" />
	<div class="flex justify-end gap-2">
		<button
			on:click={hideForm}
			type="button"
			class="btn btn-sm transition-colors-and-transform variant-ghost-surface"
		>
			Cancel</button
		>
		<button type="submit" class="btn btn-sm transition-colors-and-transform variant-filled"
			>Add</button
		>
	</div>
</form>
