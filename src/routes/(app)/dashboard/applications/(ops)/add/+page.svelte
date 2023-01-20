<script lang="ts">
	import { applicationToFirestore } from '$lib/Application';
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

<h2 class="sr-only">add application</h2>
<div class="application">
	<ApplicationForm on:done={handleDone}>
		<span slot="done-button-text">add</span>
	</ApplicationForm>
</div>
{#if addingApplication}
	<iconify-icon icon="line-md:loading-twotone-loop" />
{/if}

<style>
</style>
