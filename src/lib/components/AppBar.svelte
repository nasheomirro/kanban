<script lang="ts">
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import BoardList from './BoardList.svelte';
	import { modalStore } from '@skeletonlabs/skeleton';
	import { app } from '$lib/app';
	import { nanoid } from 'nanoid';

	const showCreateBoard = () => {
		modalStore.trigger({
			type: 'prompt',
			title: 'Create Board',
			body: 'Provide a name for the new board.',
			valueAttr: { required: true },
			response: (r: unknown) => {
				if (typeof r === 'string')
					app.addBoard({
						name: r,
						columns: [],
						id: nanoid(4)
					});
			}
		});
	};
</script>

<div class="p-4 shadow-sm bg-surface-100-800-token flex items-center gap-2">
	<BoardList />
	<div class="ml-auto flex gap-4 items-center">
		<LightSwitch />
		<button on:click={showCreateBoard} class="btn variant-filled-primary">create</button>
	</div>
</div>
