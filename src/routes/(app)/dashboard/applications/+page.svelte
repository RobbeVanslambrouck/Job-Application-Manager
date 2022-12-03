<script lang="ts">
	import type { PageData } from './$types';
	import Application from '$lib/components/Application/Application.svelte';
	import { applicationToFirestore, createApplication } from '$lib/application';
	import { user } from '$lib/stores/auth';

	export let data: PageData;
	let applications = data.applications;

	let companyName = '';
	let jobTitle = '';

	const handleAddApplication = () => {
		if (!$user?.uid) return;
		const application = createApplication(companyName, jobTitle);
		applicationToFirestore($user.uid, application);
		applications = [...applications, application];
		companyName = '';
		jobTitle = '';
	};
</script>

<section>
	<h2>Applications</h2>
	<ul>
		{#each applications as application}
			<li><Application data={application} /></li>
		{/each}
	</ul>
</section>

<form on:submit|preventDefault={handleAddApplication}>
	<label for="company-name">company name</label>
	<input type="text" name="company-name" id="company-name" bind:value={companyName} />
	<label for="job-title">job title</label>
	<input type="text" name="job-title" id="job-title" bind:value={jobTitle} />
	<button type="submit">add application</button>
</form>
