<script lang="ts">
	import { applicationToFirestore, deleteApplicationFromFirestore } from '$lib/Application';
	import { user } from '$lib/stores/auth';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import ApplicationForm from '../ApplicationForm.svelte';

	export let data: PageData;
	let application = data.application;

	let isDeletable = false;
	let deleting = false;
	let editing = false;

	const handleEditApplication = async () => {
		if (!$user?.uid) return;
		editing = true;
		await applicationToFirestore($user.uid, application);
		goto('/dashboard/applications/');
		editing = false;
	};

	const handleDeleteApplication = async () => {
		if (!$user?.uid) return;
		deleting = true;
		await deleteApplicationFromFirestore($user.uid, application.id);
		goto('/dashboard/applications/');
		deleting = false;
	};
</script>

<h2>edit application</h2>
<ApplicationForm {application} />
{#if !editing}
	<button type="button" on:click={handleEditApplication}>done</button>
{/if}
{#if !deleting}
	<form>
		<label for="delete">i want to delete this application</label>
		<input type="checkbox" name="delete-application" id="delete" bind:checked={isDeletable} />
		<button type="button" on:click={handleDeleteApplication} disabled={!isDeletable}>delete</button>
	</form>
{/if}
{#if deleting || editing}
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
