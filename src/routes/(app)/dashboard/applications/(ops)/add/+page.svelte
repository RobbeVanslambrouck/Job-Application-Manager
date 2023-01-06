<script lang="ts">
	import { applicationToFirestore, createApplication } from '$lib/Application';
	import { user } from '$lib/stores/auth';
	import { goto } from '$app/navigation';
	import ApplicationForm from '../ApplicationForm.svelte';

	let addingApplication = false;

	const handleDone = async (event: CustomEvent<any>) => {
		if (!$user?.uid) return;
		addingApplication = true;
		await applicationToFirestore($user.uid, event.detail.application);
		goto('/dashboard/applications/');
	};
</script>

<h2>add application</h2>
<ApplicationForm on:done={handleDone}>
	<p slot="done-button-text">add</p>
</ApplicationForm>
{#if addingApplication}
	<iconify-icon icon="line-md:loading-twotone-loop" />
{/if}
