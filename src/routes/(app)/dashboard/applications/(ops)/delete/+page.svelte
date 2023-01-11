<script lang="ts">
	import { goto } from '$app/navigation';
	import { deleteApplicationFromFirestore } from '$lib/Application';
	import { user } from '$lib/stores/auth';
	import type { PageData } from './$types';

	export let data: PageData;
	let application = data.application;

	async function handleDelete() {
		if (!$user?.uid) return;
		await deleteApplicationFromFirestore($user.uid, application.id);
		goto('/dashboard/applications/');
	}

	function handleCancel() {
		goto('/dashboard/applications/');
	}
</script>

<p>are you sure u want to delete this application</p>
<button type="button" on:click={handleDelete}> delete</button>
<button type="button" on:click={handleCancel}> cancel</button>
