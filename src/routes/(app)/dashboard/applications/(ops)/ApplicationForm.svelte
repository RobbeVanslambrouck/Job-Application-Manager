<script lang="ts">
	import Links from './Links.svelte';
	import Events from './Events.svelte';
	import Input from '$lib/components/Input.svelte';
	import { createApplication, type Application } from '$lib/Application';
	import { createEventDispatcher } from 'svelte';
	import { goto } from '$app/navigation';

	export let application = createApplication();
	let hideButtons = false;
	$: isValid = validate(application);

	const dispatch = createEventDispatcher();
	function validate(application: Application) {
		if (application.companyName === '') return false;
		if (application.jobTitle === '') return false;
		return true;
	}

	function handleSubmit() {
		if (!isValid) return;
		hideButtons = true;
		dispatch('done', {
			application: application
		});
	}
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
			<Links bind:links={application.links} />
		</section>
		<section>
			<h3>events</h3>
			<Events bind:events={application.events} />
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
</form>

<style>
	form {
		width: max-content;
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
		width: 25rem;
	}

	h3 {
		text-transform: capitalize;
		text-align: center;
		margin-bottom: 0.4rem;
	}
	.buttons {
		display: flex;
		gap: 2.4rem;
		justify-content: center;
		align-items: stretch;
	}

	button {
		width: 100%;
	}

	form:invalid button[type='submit'] {
		background-color: rgba(var(--md-sys-color-error-container));
		color: rgba(var(--md-sys-color-error));
		cursor: not-allowed;
	}
</style>
