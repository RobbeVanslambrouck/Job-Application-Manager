<script lang="ts">
	import { applicationToFirestore, createApplication } from '$lib/Application';
	import { createEvent } from '$lib/Event';
	import { user } from '$lib/stores/auth';
	import type { IEvent } from '$lib/Event';
	import type { Link } from '$lib/Link';
	import Links from '$lib/components/Application/Links.svelte';

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

	const handleAddLink = () => {
		//TODO: implement
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
	<form on:submit|preventDefault={handleAddLink}>
		<label for="name">name</label>
		<input type="text" name="name" id="link-name" />
		<label for="url">link</label>
		<input type="url" name="url" id="link-url" />
		<button type="submit">add link</button>
	</form>
</section>
<section>
	<h3>events</h3>
	<p>TODO: create events component</p>

	<form on:submit|preventDefault={handleAddEvent}>
		<label for="title">title</label>
		<input type="text" name="title" id="event-title" />
		<label for="description">description</label>
		<input type="text" name="description" id="event-description" />
		<label for="start-time">start time</label>
		<input type="datetime-local" name="start-time" id="event-start-time" />
		<label for="end-time">end time</label>
		<input type="datetime-local" name="end-time" id="event-end-time" />
		<label for="location">location</label>
		<input type="text" name="location" id="event-location" />
		<button type="submit">add event</button>
	</form>
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
