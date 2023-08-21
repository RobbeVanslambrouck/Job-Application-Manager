<script lang="ts">
	import type { Event } from '$lib/Event';
	import { createEventDispatcher } from 'svelte';
	import Input from '$lib/components/Input.svelte';

	export let event: Event;
	export let action: 'ADD' | 'EDIT';

	const dispatch = createEventDispatcher();

	const handleSubmit = () => {
		dispatch('done');
	};
</script>

<form on:submit|preventDefault={handleSubmit}>
	<Input label="name" required={true} bind:value={event.title} focus={true} />
	<Input label="description" bind:value={event.description} />
	<Input type="datetime-local" label="start-time" bind:value={event.startDate} />
	<Input type="datetime-local" label="end-time" bind:value={event.endDate} />
	<Input label="location" bind:value={event.location} />
	<div class="buttons">
		<button type="submit">{action === 'ADD' ? 'add' : 'edit'} event</button>
		<button
			type="button"
			on:click={() => {
				dispatch('cancel');
			}}>cancel</button
		>
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
