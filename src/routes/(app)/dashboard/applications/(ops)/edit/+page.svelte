<script lang="ts">
	import { applicationToFirestore, deleteApplicationFromFirestore } from '$lib/Application';
	import { user } from '$lib/stores/auth';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import ApplicationForm from '../ApplicationForm.svelte';

	export let data: PageData;
	let application = data.application;

	let isDeletable = false;
	let isExecutingAction = false;

	const handleAction = async (action: 'DELETE' | 'EDIT') => {
		if (!$user?.uid) return;
		isExecutingAction = true;
		if (action === 'DELETE') await deleteApplicationFromFirestore($user.uid, application.id);
		if (action === 'EDIT') await applicationToFirestore($user.uid, application);
		goto('/dashboard/applications/');
	};
</script>

<h2>edit application</h2>
<ApplicationForm
	bind:application
	on:done={() => {
		handleAction('EDIT');
	}}
/>
{#if !isExecutingAction}
	<form on:submit|preventDefault>
		<label for="delete">i want to delete this application</label>
		<input type="checkbox" name="delete-application" id="delete" bind:checked={isDeletable} />
		<button
			type="button"
			on:click={() => {
				handleAction('DELETE');
			}}
			disabled={!isDeletable}>delete</button
		>
	</form>
{/if}
{#if isExecutingAction}
	<iconify-icon icon="line-md:loading-twotone-loop" />
{/if}

<style>
	label {
		display: block;
	}

	button {
		display: block;
	}
</style>
