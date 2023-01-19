<script lang="ts">
	import { agencyToFirestore } from '$lib/recruitmentAgency';
	import { user } from '$lib/stores/auth';
	import { goto } from '$app/navigation';
	import AgencyForm from '../AgencyForm.svelte';

	let addingAgency = false;

	const handleDone = async (event: CustomEvent<any>) => {
		if (!$user?.uid) return;
		addingAgency = true;
		await agencyToFirestore($user.uid, event.detail.recruitmentAgency);
		goto('/dashboard/recruitment/');
	};
</script>

<h2 class="sr-only">add application</h2>
<div class="application">
	<AgencyForm on:done={handleDone}>
		<span slot="done-button-text">add</span>
	</AgencyForm>
</div>
{#if addingAgency}
	<iconify-icon icon="line-md:loading-twotone-loop" />
{/if}

<style>
</style>
