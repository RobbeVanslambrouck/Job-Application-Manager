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
	let hideValidation = false;
	$: validationMsgs = getValidationMsgs(application);
	$: isValid = validate(application);

	const dispatch = createEventDispatcher();
	function validate(application: Application) {
		if (application.companyName === '') return false;
		if (application.jobTitle === '') return false;
		return true;
	}

	function getValidationMsgs(application: Application) {
		let messages = [];
		if (application.jobTitle === '') messages.push('job title is required');
		if (application.companyName === '') messages.push('company name is required');
		return messages;
	}
	function handleAction() {
		if (!isValid) {
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
		<p class="validation" hidden={hideValidation || application.jobTitle !== ''}>
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
		<p class="validation" hidden={hideValidation || application.companyName !== ''}>
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
	<button type="button" on:click|preventDefault={handleAction} disabled={!isValid}>
		<slot name="done-button-text">done</slot>
	</button>
	{#if !isValid}
		{#each validationMsgs as msg}
			<p class="validation">{msg}</p>
		{/each}
	{/if}
{/if}

<style>
	label {
		display: block;
	}

	input + .validation {
		position: absolute;
	}

	label {
		text-transform: capitalize;
		margin-top: 2rem;
	}
</style>
