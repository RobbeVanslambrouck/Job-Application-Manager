<script lang="ts">
	import type { Link } from '$lib/Link';
	import { createEventDispatcher } from 'svelte';

	export let link: Link;

	let dispatch = createEventDispatcher();

	function handleEdit() {
		dispatch('edit');
	}
	function handleDelete() {
		dispatch('delete');
	}
</script>

<a href={link.url} target="_blank" rel="noreferrer">{link.name}</a>
<div class="buttons">
	<button type="button" on:click={handleEdit}>
		<iconify-icon inline icon="ic:round-edit" />
	</button>
	<button type="button" on:click={handleDelete}>
		<iconify-icon inline icon="ic:round-delete" />
	</button>
</div>

<style>
	button {
		padding: 0.4rem;
	}

	a {
		color: rgb(var(--md-sys-color-on-primary-container));
		font-weight: 500;
	}
</style>
