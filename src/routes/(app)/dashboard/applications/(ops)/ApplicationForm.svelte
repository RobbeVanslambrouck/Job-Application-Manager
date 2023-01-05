<script lang="ts">
	import Links from './Links.svelte';
	import Events from './Events.svelte';
	import AddLinkForm from './AddLinkForm.svelte';
	import AddEventForm from './AddEventForm.svelte';
	import type { Application } from '$lib/Application';

	export let application: Application;
</script>

<section>
	<h3>application info</h3>
	<form on:submit|preventDefault>
		<label for="job-title">job title</label>
		<input type="text" name="job-title" id="job-title" bind:value={application.jobTitle} required />
		<label for="company-name">company</label>
		<input
			type="text"
			name="company-name"
			id="company-name"
			bind:value={application.companyName}
			required
		/>
	</form>
</section>
<section>
	<h3>links</h3>
	<Links links={application.links} />
	<AddLinkForm bind:links={application.links} />
</section>
<section>
	<h3>events</h3>
	<Events events={application.events} />
	<AddEventForm bind:events={application.events} />
</section>

<style>
	label {
		display: block;
	}
</style>
