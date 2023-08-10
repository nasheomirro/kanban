<script lang="ts">
	import { app, type BoardType, type ColumnType, type ItemType } from '$lib/app';
	import { modalStore } from '@skeletonlabs/skeleton';

	import Item from './Item.svelte';
	import EditIcon from './icons/EditIcon.svelte';
	import TrashIcon from './icons/TrashIcon.svelte';
	import { dndzone, type DndEvent, SHADOW_ITEM_MARKER_PROPERTY_NAME } from 'svelte-dnd-action';
	import ColumnItemForm from './ColumnItemForm.svelte';
	import { flip } from 'svelte/animate';

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

	function handleDndConsider(e: CustomEvent<DndEvent<ItemType>>) {
		// just update local state, consider should be considered unstable
		column = { ...column, items: e.detail.items };
	}

	function handleDndFinalize(e: CustomEvent<DndEvent<ItemType>>) {
		// grab the latest board state from app, this function might be called
		// multiple times without refreshing board state in between.
		const _board = $app.boards.find((_board) => _board.id === board.id);
		if (!_board) return;

		let keys: string[] = [];
		// if things go south, a refresh should fix things,
		// as long as the local storage state isn't "corrupted".
		const items = e.detail.items.filter((item) => {
			if (
				// @ts-expect-error
				!item[SHADOW_ITEM_MARKER_PROPERTY_NAME] &&
				Object.keys(item).length === 2 &&
				!keys.includes(item.id)
			) {
				keys.push(item.id);
				return true;
			}

			return false;
		});

		app.updateColumn(_board, { ...column, items });
	}
</script>

<div class="h-full grow flex flex-col overflow-hidden">
	<div class="p-3 space-y-3">
		<div class="flex gap-1 items-center">
			<h2 class="h3">{column.name}</h2>
			<button
				on:click={promptEditColumn}
				class="ml-auto w-[1.5rem] h-[1.5rem] p-0.5 btn-icon transition-colors-and-transform text-surface-400-500-token"
			>
				<EditIcon />
				<span class="sr-only">Edit column name</span>
			</button>
			<button
				on:click={promptDeleteColumn}
				class="w-[1.5rem] h-[1.5rem] p-0.5 btn-icon transition-colors-and-transform text-surface-400-500-token"
			>
				<TrashIcon />
				<span class="sr-only">Delete column</span>
			</button>
		</div>
		<ColumnItemForm {board} {column} />
	</div>
	<ul
		use:dndzone={{
			items: column.items,
			flipDurationMs: 200,
			type: 'items',
			dropTargetStyle: {},
			dropTargetClasses: ['bg-surface-200-700-token', 'opacity-40']
		}}
		on:consider={handleDndConsider}
		on:finalize={handleDndFinalize}
		class="flex p-3 flex-col gap-3 transition h-full overflow-scroll"
	>
		{#each column.items as item (item.id)}
			<li animate:flip={{ duration: 200 }}>
				<Item {board} {column} {item} />
			</li>
		{/each}
	</ul>
</div>
