<script lang="ts">
	import { applicationToFirestore, deleteApplicationFromFirestore } from '$lib/Application';
	import { user } from '$lib/stores/auth';
	import Links from '$lib/components/Application/Links.svelte';
	import Events from '$lib/components/Application/Events.svelte';
	import AddLinkForm from './AddLinkForm.svelte';
	import AddEventForm from './AddEventForm.svelte';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';

	export let data: PageData;
	let deleteCheckbox = false;

	let application = data.application;
	let { companyName, jobTitle, links, events, id } = application;

	const handleEditApplication = () => {
		if (!$user?.uid) return;
		application = { companyName, jobTitle, links, events, id };
		applicationToFirestore($user.uid, application);
		goto('/dashboard/applications/');
	};

	const handleDeleteApplication = () => {
		if (!$user?.uid) return;
		deleteApplicationFromFirestore($user.uid, id);
		goto('/dashboard/applications/');
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
<button type="button" on:click={handleEditApplication}>done</button>
<form>
	<label for="delete">i want to delete this application</label>
	<input type="checkbox" name="delete-application" id="delete" bind:checked={deleteCheckbox} />
	{#if deleteCheckbox}
		<button type="button" on:click={handleDeleteApplication}>delete</button>
	{/if}
</form>

<style>
	label {
		display: block;
	}

	button {
		display: block;
	}
</style>
