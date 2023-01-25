<script lang="ts">
	import type { PageData } from './$types';
	import Agency from '../../Agency.svelte';
	import { user } from '$lib/stores/auth';
	import { deleteAgencyFromFirestore } from '$lib/recruitmentAgency';
	import { goto } from '$app/navigation';

	export let data: PageData;
	let agency = data.agency;

	async function handleDelete() {
		if (!$user?.uid) return;
		await deleteAgencyFromFirestore($user.uid, agency.name);
		goto('/dashboard/recruitment/');
	}

	function handleCancel() {
		goto('/dashboard/recruitment/');
	}
</script>

<h2 class="sr-only">Delete Application</h2>
<Agency {agency} />

<p class="body-large">Are you sure u want to delete this application?</p>
<div>
	<button type="button" on:click={handleDelete} class="delete"
		><iconify-icon inline icon="ic:round-delete" /> delete</button
	>
	<button type="button" on:click={handleCancel}>cancel</button>
</div>

<style>
	p {
		text-align: center;
	}
	div {
		display: flex;
		justify-content: center;

		gap: 2.4rem;
		margin-bottom: 2.4rem;
	}
	.delete {
		background-color: rgba(var(--md-sys-color-error-container));
		color: rgba(var(--md-sys-color-error));
	}
</style>
