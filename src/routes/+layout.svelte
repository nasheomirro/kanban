<script lang="ts">
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	import '../app.css';

	import { Modal, setInitialClassState } from '@skeletonlabs/skeleton';
	import AppBar from '$lib/components/AppBar.svelte';

	setInitialClassState();
</script>

<div class="flex flex-col h-[100vh] w-[100vw]">
  <Modal duration={200} />
  <AppBar />
  <slot />
</div>
