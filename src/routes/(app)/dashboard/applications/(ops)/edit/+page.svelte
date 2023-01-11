<script lang="ts">
	import { applicationToFirestore } from '$lib/Application';
	import { user } from '$lib/stores/auth';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import ApplicationForm from '../ApplicationForm.svelte';

	export let data: PageData;
	let application = data.application;

	let isExecutingAction = false;

	const handleEdit = async () => {
		if (!$user?.uid) return;
		isExecutingAction = true;
		await applicationToFirestore($user.uid, application);
		goto('/dashboard/applications/');
	};
</script>

<h2 class="sr-only">edit application</h2>
<ApplicationForm bind:application on:done={handleEdit} />
{#if isExecutingAction}
	<iconify-icon icon="line-md:loading-twotone-loop" />
{/if}

<style>
</style>
