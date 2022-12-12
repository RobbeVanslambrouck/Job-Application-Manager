<script lang="ts">
	import { applicationToFirestore, createApplication } from '$lib/Application';
	import { createEvent } from '$lib/Event';
	import { user } from '$lib/stores/auth';
	import type { IEvent } from '$lib/Event';
	import type { Link } from '$lib/Link';
	import Links from '$lib/components/Application/Links.svelte';
	import Events from '$lib/components/Application/Events.svelte';
	import AddLinkForm from './AddLinkForm.svelte';
	import AddEventForm from './AddEventForm.svelte';

	let companyName = '';
	let jobTitle = '';

	let links: Link[] = [];
	let events: IEvent[] = [];

	const handleAddApplication = () => {
		if (!$user?.uid) return;
		const application = createApplication(companyName, jobTitle);
		const creationEvent = createEvent('created application');
		application.events.push(creationEvent);
		applicationToFirestore($user.uid, application);
	};

	const handleAddEvent = () => {
		//TODO: implement
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
<button type="submit" on:click|preventDefault={handleAddApplication}>add application</button>

<style>
	label {
		display: block;
	}

	button {
		display: block;
	}
</style>
