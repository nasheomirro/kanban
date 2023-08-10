<script lang="ts" context="module">
	import { app, type BoardType, type ColumnType, type ItemType } from '$lib/app';
	import { createStateStore } from '$lib/utils';
	import { tick } from 'svelte';

	type State = {
		toggled: boolean;
		text: string;
	};

	let state = createStateStore<State>({
		text: '',
		toggled: false
	});
</script>

<script lang="ts">
	import EditIcon from './icons/EditIcon.svelte';

	export let board: BoardType;
	export let column: ColumnType;
	export let item: ItemType;

	state.initialize(item.id, { text: item.name });

	let form: HTMLFormElement;
	$: ({ text, toggled } = $state[item.id]);

	const showForm = async () => {
		$state[item.id].toggled = true;
		// wait for form to show
		await tick();
		form.querySelector('textarea')?.focus();
	};

	const hideForm = () => {
		$state[item.id].toggled = false;
		tick().then(() => ($state[item.id].text = item.name));
	};

	const submitForm = (e: SubmitEvent) => {
		e.preventDefault();

		app.updateItem(board, column, {
			...item,
			name: text
		});

		hideForm();
	};
</script>

<div class="card bg-surface-200-700-token p-3 pr-2">
	<div class="flex" class:hidden={toggled}>
		<span class="grow">{item.name}</span>
		<button on:click={showForm} class="btn-icon btn-icon-sm transition w-[1.5rem] h-[1.5rem] p-1.5">
			<EditIcon />
		</button>
	</div>

	<form class:hidden={!toggled} on:submit={submitForm} class="space-y-2" bind:this={form}>
		<textarea class="w-full textarea overflow-hidden" bind:value={$state[item.id].text} />
		<div class="flex justify-end gap-2">
			<button
				on:click={hideForm}
				type="button"
				class="btn btn-sm transition-colors-and-transform variant-ghost-surface"
			>
				Cancel</button
			>
			<button type="submit" class="btn btn-sm transition-colors-and-transform variant-filled"
				>Edit</button
			>
		</div>
	</form>
</div>
