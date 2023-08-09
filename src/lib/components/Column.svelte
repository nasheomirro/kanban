<script lang="ts">
	import { app, type BoardType, type ColumnType } from '$lib/app';
	import { modalStore } from '@skeletonlabs/skeleton';

	import Item from './Item.svelte';
	import EditIcon from './icons/EditIcon.svelte';
	import TrashIcon from './icons/TrashIcon.svelte';

	export let column: ColumnType;
	export let board: BoardType;

	const promptEditColumn = () => {
		modalStore.trigger({
			type: 'prompt',
			title: `Rename "${column.name}"`,
			body: 'Provide a name for the new list.',
			value: column.name,
			valueAttr: { required: true },
			response: (r: unknown) => {
				if (typeof r === 'string') app.updateColumn(board, { name: r, id: column.id });
			}
		});
	};

	const promptDeleteColumn = () => {
		const deleteColumn = (r: boolean) => r && app.deleteColumn(board, column.id);
		if (!column.items.length) return deleteColumn(true);

		modalStore.trigger({
			type: 'confirm',
			title: `Delete "${column.name}"?`,
			body: 'There are items still in the column, are you sure?',
			response: deleteColumn
		});
	};
</script>

<div>
	<div class="flex gap-1 items-center">
		<h2 class="h3">{column.name}</h2>
		<button
			on:click={promptEditColumn}
			class="ml-auto w-[1.5rem] h-[1.5rem] p-0.5 btn-icon transition-colors-and-transform text-surface-400-500-token"
		>
			<EditIcon />
			<span class="sr-only">Edit board name</span>
		</button>
		<button
			on:click={promptDeleteColumn}
			class="w-[1.5rem] h-[1.5rem] p-0.5 btn-icon transition-colors-and-transform text-surface-400-500-token"
		>
			<TrashIcon />
			<span class="sr-only">Edit board name</span>
		</button>
	</div>
	<ul>
		{#each column.items as item}
			<Item {item} />
		{/each}
	</ul>
</div>
