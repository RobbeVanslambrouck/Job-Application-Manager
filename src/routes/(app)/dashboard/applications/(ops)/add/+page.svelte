<script lang="ts">
	import { applicationToFirestore, createApplication } from '$lib/Application';
	import { createEvent } from '$lib/Event';
	import { user } from '$lib/stores/auth';
	import { goto } from '$app/navigation';
	import ApplicationForm from '../ApplicationForm.svelte';

	let application = createApplication();
	let addingApplication = false;

	const handleAddApplication = async () => {
		if (!$user?.uid) return;
		addingApplication = true;
		if (application.events.length === 0) {
			const creationEvent = createEvent('created application');
			application.events.push(creationEvent);
		}
		await applicationToFirestore($user.uid, application);
		addingApplication = false;
		goto('/dashboard/applications/');
	};
</script>

<h2>add application</h2>
<ApplicationForm {application} />
{#if !addingApplication}
	<button type="submit" on:click|preventDefault={handleAddApplication}>add application</button>
{/if}
{#if addingApplication}
	<iconify-icon icon="line-md:loading-twotone-loop" />
{/if}

<style>
	button {
		display: block;
	}
</style>
