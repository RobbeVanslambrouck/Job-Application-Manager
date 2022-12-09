<script lang="ts">
	import { applicationToFirestore, createApplication } from '$lib/Application';
	import { createEvent } from '$lib/Event';
	import { user } from '$lib/stores/auth';

	let companyName = '';
	let jobTitle = '';

	const handleAddApplication = () => {
		if (!$user?.uid) return;
		const application = createApplication(companyName, jobTitle);
		const creationEvent = createEvent('created application');
		application.events.push(creationEvent);
		applicationToFirestore($user.uid, application);
	};
</script>

<form on:submit|preventDefault={handleAddApplication}>
	<label for="job-title">job title</label>
	<input type="text" name="job-title" id="job-title" bind:value={jobTitle} required />
	<label for="company-name">company</label>
	<input type="text" name="company-name" id="company-name" bind:value={companyName} required />
	<button type="submit">add application</button>
</form>
