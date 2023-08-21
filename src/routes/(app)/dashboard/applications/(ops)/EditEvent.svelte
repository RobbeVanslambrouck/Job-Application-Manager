<script lang="ts">
	import type { Event } from '$lib/Event';
	import { createEventDispatcher } from 'svelte';

	export let event: Event;

	let dispatch = createEventDispatcher();

	function handleEdit() {
		dispatch('edit', { event: event, index: -1 });
	}
	function handleDelete() {
		dispatch('delete', { event: event, index: -1 });
	}
</script>

<p class="title">{event.title}</p>
<div class="buttons">
	<button type="button" on:click={handleEdit}>
		<iconify-icon inline icon="ic:round-edit" />
	</button>
	<button type="button" on:click={handleDelete}>
		<iconify-icon inline icon="ic:round-delete" />
	</button>
</div>

<style>
	p {
		display: inline-block;
		margin: 0;
	}

	.title {
		font-weight: 500;
	}

	button {
		padding: 0.4rem;
	}
</style>
