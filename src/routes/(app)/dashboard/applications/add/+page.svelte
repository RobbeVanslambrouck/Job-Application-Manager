<script lang="ts">
	import { applicationToFirestore, createApplication } from '$lib/application';
	import { user } from '$lib/stores/auth';

	let companyName = '';
	let jobTitle = '';

	const handleAddApplication = () => {
		if (!$user?.uid) return;
		const application = createApplication(companyName, jobTitle);
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
