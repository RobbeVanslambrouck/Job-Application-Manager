<script lang="ts">
	import Links from './Links.svelte';
	import Events from './Events.svelte';
	import AddLinkForm from './AddLinkForm.svelte';
	import AddEventForm from './AddEventForm.svelte';
	import { createApplication, type Application } from '$lib/Application';
	import { createEventDispatcher } from 'svelte';

	export let application = createApplication();
	export const hideDoneBtnOnDone = true;
	let hideDoneBtn = false;
	let hideValidation = true;
	const dispatch = createEventDispatcher();

	function validate() {
		if (application.companyName === '') return false;
		if (application.jobTitle === '') return false;
		return true;
	}
	function handleAction() {
		if (!validate()) {
			hideValidation = false;
			return;
		}
		hideDoneBtn = hideDoneBtnOnDone;
		dispatch('done', {
			application: application
		});
	}
</script>

<section>
	<h3>application info</h3>
	<form on:submit|preventDefault>
		<label for="job-title">job title</label>
		<input type="text" name="job-title" id="job-title" bind:value={application.jobTitle} required />
		<p class="validation" class:hidden={hideValidation || application.jobTitle !== ''}>
			job-title is required
		</p>
		<label for="company-name">company</label>

		<input
			type="text"
			name="company-name"
			id="company-name"
			bind:value={application.companyName}
			required
		/>
		<p class="validation" class:hidden={hideValidation || application.companyName !== ''}>
			company name is required
		</p>
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
{#if !hideDoneBtn}
	<button type="button" on:click|preventDefault={handleAction}>
		<slot name="done-button-text">done</slot>
	</button>
{/if}

<style>
	label {
		display: block;
	}

	.hidden {
		display: none;
	}

	.validation {
		color: rgba(var(--md-sys-color-error));
		margin: 0;
	}
</style>
