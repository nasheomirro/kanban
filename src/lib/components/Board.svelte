<script lang="ts">
	import { app, type BoardType, type ColumnType } from '$lib/app';
	import { modalStore } from '@skeletonlabs/skeleton';
	import { nanoid } from 'nanoid';

	import Column from './Column.svelte';
	import EditIcon from './icons/EditIcon.svelte';
	import { dndzone, type DndEvent, SHADOW_ITEM_MARKER_PROPERTY_NAME } from 'svelte-dnd-action';
	import { flip } from 'svelte/animate';
	import { onMount, tick } from 'svelte';

	export let board: BoardType;
	let boardElement: HTMLUListElement;

	const promptEditBoard = () => {
		modalStore.trigger({
			type: 'prompt',
			value: board.name,
			title: `Rename "${board.name}"`,
			body: 'Provide a name to update the board with.',
			valueAttr: { required: true },
			response: (r: unknown) => {
				if (typeof r === 'string') app.updateBoard({ name: r, id: board.id });
			}
		});
	};

	const promptDeleteBoard = () => {
		const deleteBoad = (r: boolean) => r && app.deleteBoard(board.id);
		if (!board.columns.length) return deleteBoad(true);

		modalStore.trigger({
			type: 'confirm',
			title: `Delete "${board.name}"?`,
			body: 'There are items still on the board, are you sure?',
			response: deleteBoad
		});
	};

	const promptAddColumn = () => {
		modalStore.trigger({
			type: 'prompt',
			title: 'Create List',
			body: 'Provide a name for the new list.',
			valueAttr: { required: true },
			response: async (r: unknown) => {
				if (typeof r === 'string') {
					app.addColumn(board, { name: r, id: nanoid(4), items: [] });
					await tick();
					// we then scroll into the added column
					boardElement.lastElementChild?.scrollIntoView({ behavior: 'smooth', inline: 'end' });
				}
			}
		});
	};

	function handleDndConsider(e: CustomEvent<DndEvent<ColumnType>>) {
		// just update local state, consider should be considered unstable
		board = { ...board, columns: e.detail.items };
	}

	function handleDndFinalize(e: CustomEvent<DndEvent<ColumnType>>) {
		const items = e.detail.items.filter((item) => {
			// @ts-expect-error if things go south, a refresh should fix things,
			// as long as the local storage state isn't "corrupted".
			return !item[SHADOW_ITEM_MARKER_PROPERTY_NAME] && Object.keys(item).length === 3;
		});
		app.updateBoard({ ...board, columns: items });
	}
</script>

<div class="p-4 space-y-4">
	<div class="flex items-end gap-2">
		<h1 class="h1">{board.name}</h1>
		<button
			on:click={promptEditBoard}
			class="btn btn-icon btn-icon-sm p-2 text-surface-400-500-token"
		>
			<EditIcon />
			<span class="sr-only">Edit board name</span>
		</button>
	</div>
	<div class="flex gap-2">
		<button on:click={promptDeleteBoard} class="btn btn-sm variant-outline-error text-error-600"
			>Delete Board</button
		>
		<button on:click={promptAddColumn} class="btn btn-sm variant-outline-primary text-primary-600"
			>Create New List</button
		>
	</div>
</div>

<ul
	bind:this={boardElement}
	use:dndzone={{ flipDurationMs: 200, items: board.columns, type: 'columns', dropTargetStyle: {} }}
	on:consider={handleDndConsider}
	on:finalize={handleDndFinalize}
	class="w-full flex gap-4 items-start overflow-x-scroll overflow-y-hidden p-3 grow"
>
	{#each board.columns as column (column.id)}
		<li
			animate:flip={{ duration: 200 }}
			class="relative rounded shadow-sm border border-surface-200-700-token bg-surface-100-800-token min-w-[18rem] w-[18rem] max-h-full h-full flex flex-col"
		>
			<Column {board} {column} />
		</li>
	{/each}
</ul>
