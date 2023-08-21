<script lang="ts">
	import type { Contact } from '$lib/recruitmentAgency';
	import { createEventDispatcher } from 'svelte';
	import Input from '$lib/components/Input.svelte';

	export let contact: Contact;
	export let action: 'ADD' | 'EDIT';

	const dispatch = createEventDispatcher();

	function handleSubmit() {
		dispatch('done');
	}
</script>

<form on:submit|preventDefault={handleSubmit}>
	<Input label="name" required={true} bind:value={contact.name} />
	<Input label="email" type="email" bind:value={contact.email} />
	<Input label="phone number" type="tel" bind:value={contact.phone} />
	<div class="buttons">
		<button type="submit">{action === 'ADD' ? 'add' : 'edit'} contact</button>
		<button type="button" on:click={() => dispatch('cancel')}>cancel</button>
	</div>
</form>

<style>
	.buttons {
		display: flex;
		gap: 2.4rem;
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
