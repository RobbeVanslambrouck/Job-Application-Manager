<script lang="ts">
	import { applicationToFirestore, createApplication } from '$lib/Application';
	import { createEvent } from '$lib/Event';
	import { user } from '$lib/stores/auth';
	import type { Event } from '$lib/Event';
	import type { Link } from '$lib/Link';
	import Links from '../Links.svelte';
	import Events from '../Events.svelte';
	import AddLinkForm from '../AddLinkForm.svelte';
	import AddEventForm from '../AddEventForm.svelte';
	import { goto } from '$app/navigation';

	let companyName = '';
	let jobTitle = '';

	let links: Link[] = [];
	let events: Event[] = [];

	let addingApplication = false;

	const handleAddApplication = async () => {
		if (!$user?.uid) return;
		addingApplication = true;
		const application = createApplication(companyName, jobTitle);
		application.links = links;
		application.events = events;
		if (events.length === 0) {
			const creationEvent = createEvent('created application');
			application.events.push(creationEvent);
		}
		await applicationToFirestore($user.uid, application);
		addingApplication = false;
		goto('/dashboard/applications/');
	};
</script>

<h2>add application</h2>
<section>
	<h3>application info</h3>
	<form on:submit|preventDefault={handleAddApplication}>
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
{#if !addingApplication}
	<button type="submit" on:click|preventDefault={handleAddApplication}>add application</button>
{/if}
{#if addingApplication}
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
