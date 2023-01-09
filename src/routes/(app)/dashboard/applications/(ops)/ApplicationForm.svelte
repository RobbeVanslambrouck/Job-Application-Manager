<script lang="ts">
	import Links from './Links.svelte';
	import Events from './Events.svelte';
	import AddLinkForm from './AddLinkForm.svelte';
	import AddEventForm from './AddEventForm.svelte';
	import Input from './Input.svelte';
	import { createApplication, type Application } from '$lib/Application';
	import { createEventDispatcher } from 'svelte';
	import { goto } from '$app/navigation';

	export let application = createApplication();
	let hideButtons = false;
	let hideValidation = false;
	let addingLink = false;
	let addingEvent = false;
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
	function handleSubmit() {
		if (!isValid) {
			hideValidation = false;
			return;
		}
		hideButtons = true;
		dispatch('done', {
			application: application
		});
	}
	let value: string;
</script>

<form on:submit|preventDefault={handleSubmit}>
	<div class="application">
		<section>
			<h3>application info</h3>
			<Input label="job title" bind:value={application.jobTitle} required={true} />
			<Input label="company" bind:value={application.companyName} required={true} />
		</section>
		<section>
			<h3>links</h3>
			<Links links={application.links} />
			{#if addingLink}
				<AddLinkForm bind:links={application.links} on:done={() => (addingLink = false)} />
			{:else}
				<button type="button" class="add-btn" on:click={() => (addingLink = true)}>
					<i class="material-symbols-rounded">add</i>
				</button>
			{/if}
		</section>
		<section>
			<h3>events</h3>
			<Events events={application.events} />
			{#if addingEvent}
				<AddEventForm bind:events={application.events} on:done={() => (addingEvent = false)} />
			{:else}
				<button type="button" class="add-btn" on:click={() => (addingEvent = true)}>
					<i class="material-symbols-rounded">add</i>
				</button>
			{/if}
		</section>
	</div>
	<div class="buttons">
		<button type="submit" on:click={handleSubmit} hidden={hideButtons}>
			<slot name="done-button-text">done</slot>
		</button>
		<button type="button" on:click={() => goto('/dashboard/applications/')} hidden={hideButtons}
			>cancel</button
		>
	</div>
	<div>
		{#if !isValid}
			{#each validationMsgs as msg}
				<p class="validation">{msg}</p>
			{/each}
		{/if}
	</div>
</form>

<style>
	h3 {
		margin: 0;
	}

	.buttons {
		display: flex;
		gap: 2.4rem;
	}

	button {
		min-width: 10rem;
	}

	.add-btn {
		min-width: none;
	}

	.application {
		display: flex;
		flex-direction: column;
		gap: 2.4rem;
		padding: 0.8rem 1.2rem;
		background: rgba(var(--md-sys-color-primary-container), 0.6);
		color: rgb(var(--md-sys-color-on-primary-container));
		border-radius: var(--app-border-radius);
		margin-bottom: 1.2rem;
	}

	h3 {
		text-transform: capitalize;
	}
</style>
