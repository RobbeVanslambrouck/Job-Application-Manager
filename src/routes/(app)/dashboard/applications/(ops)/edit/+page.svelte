<script lang="ts">
	import { applicationToFirestore, deleteApplicationFromFirestore } from '$lib/Application';
	import { user } from '$lib/stores/auth';
	import Links from '../Links.svelte';
	import Events from '../Events.svelte';
	import AddLinkForm from '../AddLinkForm.svelte';
	import AddEventForm from '../AddEventForm.svelte';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';

	export let data: PageData;
	let { companyName, jobTitle, links, events, id } = data.application;

	let isDeletable = false;
	let deleting = false;
	let editing = false;

	const handleEditApplication = async () => {
		if (!$user?.uid) return;
		editing = true;
		let application = { companyName, jobTitle, links, events, id };
		await applicationToFirestore($user.uid, application);
		goto('/dashboard/applications/');
		editing = false;
	};

	const handleDeleteApplication = async () => {
		if (!$user?.uid) return;
		deleting = true;
		await deleteApplicationFromFirestore($user.uid, id);
		goto('/dashboard/applications/');
		deleting = false;
	};
</script>

<h2>edit application</h2>
<section>
	<h3>application info</h3>
	<form on:submit|preventDefault={handleEditApplication}>
		<label for="job-title">job title</label>
		<input type="text" name="job-title" id="job-title" bind:value={jobTitle} required />
		<label for="company-name">company</label>
		<input type="text" name="company-name" id="company-name" bind:value={companyName} required />
	</form>
</section>
<section>
	<h3>links</h3>
	<Links {links} />
	<AddLinkForm bind:links />
</section>
<section>
	<h3>events</h3>
	<Events {events} />
	<AddEventForm bind:events />
</section>
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
