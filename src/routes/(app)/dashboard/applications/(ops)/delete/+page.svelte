<script lang="ts">
	import { goto } from '$app/navigation';
	import { deleteApplicationFromFirestore } from '$lib/Application';
	import { user } from '$lib/stores/auth';
	import type { PageData } from './$types';
	import Application from '../../Application.svelte';

	export let data: PageData;
	let application = data.application;

	async function handleDelete() {
		if (!$user?.uid) return;
		await deleteApplicationFromFirestore($user.uid, application.id);
		goto('/dashboard/applications/');
	}

	function handleCancel() {
		goto('/dashboard/applications/');
	}
</script>

<div>
	<Application {application} />
</div>
<h2 class="sr-only">Delete Application</h2>
<p class="body-large">Are you sure u want to delete this application?</p>
<div>
	<button type="button" on:click={handleDelete} class="delete"
		><iconify-icon inline icon="ic:round-delete" /> delete</button
	>
	<button type="button" on:click={handleCancel}>cancel</button>
</div>

<style>
	p {
		text-align: center;
	}
	div {
		display: flex;
		justify-content: center;

		gap: 2.4rem;
		margin-bottom: 2.4rem;
	}

	.delete {
		background-color: rgba(var(--md-sys-color-error-container));
		color: rgba(var(--md-sys-color-error));
	}
</style>
