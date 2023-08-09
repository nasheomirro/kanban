<script lang="ts">
	import { app } from '$lib/app';
</script>

<select
	disabled={$app.boards.length === 0}
	class="select w-full max-w-sm"
	value={$app.id}
	on:change={(e) => app.setCurrent(e.currentTarget.value)}
>
	{#each $app.boards as board}
		<option value={board.id}>{board.name}</option>
	{/each}
</select>
