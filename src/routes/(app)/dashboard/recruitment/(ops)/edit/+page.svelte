<script lang="ts">
	import type { PageData } from './$types';
	import { user } from '$lib/stores/auth';
	import { agencyToFirestore, deleteAgencyFromFirestore } from '$lib/recruitmentAgency';
	import { goto } from '$app/navigation';
	import AgencyForm from '../AgencyForm.svelte';

	export let data: PageData;
	let agency = data.agency;
	let oldName = agency.name;

	let isExecutingAction = false;

	const handleEdit = async () => {
		if (!$user?.uid) return;
		isExecutingAction = true;
		if (oldName !== agency.name) {
			await deleteAgencyFromFirestore($user.uid, oldName);
		}
		await agencyToFirestore($user.uid, agency);
		goto('/dashboard/recruitment/');
	};
</script>

<AgencyForm bind:agency on:done={handleEdit} />
{#if isExecutingAction}
	<iconify-icon icon="line-md:loading-twotone-loop" />
{/if}
