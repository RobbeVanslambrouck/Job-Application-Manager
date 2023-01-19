<script lang="ts">
	import Contacts from './Contacts.svelte';
	import Input from './Input.svelte';
	import { createEventDispatcher } from 'svelte';
	import { goto } from '$app/navigation';
	import { createRecruitmentAgency, type RecruitmentAgency } from '$lib/recruitmentAgency';

	export let agency: RecruitmentAgency = createRecruitmentAgency();
	let hideButtons = false;
	let hideValidation = false;
	$: isValid = validate(agency);

	const dispatch = createEventDispatcher();
	function validate(recruitmentAgency: RecruitmentAgency) {
		if (recruitmentAgency.name === '') return false;
		return true;
	}

	function handleSubmit() {
		if (!isValid) {
			hideValidation = false;
			return;
		}
		hideButtons = true;
		dispatch('done', {
			recruitmentAgency: agency
		});
	}
</script>

<form on:submit|preventDefault={handleSubmit}>
	<div class="agency">
		<section>
			<h3>agency info</h3>
			<Input label="name" bind:value={agency.name} required={true} />
		</section>
		<section>
			<h3>contacts</h3>
			<Contacts bind:contacts={agency.contacts} />
		</section>
	</div>
	<div class="buttons">
		<button type="submit" on:click={handleSubmit} hidden={hideButtons}>
			<slot name="done-button-text">done</slot>
		</button>
		<button type="button" on:click={() => goto('/dashboard/recruitment/')} hidden={hideButtons}
			>cancel</button
		>
	</div>
</form>

<style>
	form {
		width: max-content;
	}

	.agency {
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
