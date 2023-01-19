<script lang="ts">
	import type { Contact } from '$lib/recruitmentAgency';
	import { createEventDispatcher } from 'svelte';

	export let contact: Contact;

	let dispatch = createEventDispatcher();

	function handleEdit() {
		dispatch('edit');
	}
	function handleDelete() {
		dispatch('delete');
	}
</script>

<p>contact.name</p>
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

	p {
		color: rgb(var(--md-sys-color-on-primary-container));
		font-weight: 500;
	}
</style>
