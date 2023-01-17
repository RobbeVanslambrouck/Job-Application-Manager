<script lang="ts">
	import type { Event } from '$lib/Event';
	import { createEventDispatcher } from 'svelte';
	import { onMount, onDestroy } from 'svelte';
	import Input from './Input.svelte';

	const dispatch = createEventDispatcher();

	export let event: Event;
	export let action: 'ADD' | 'EDIT';

	let start = '';
	let end = '';
	let loc = '';

	$: if (start !== '') event.startDate = new Date(start);
	$: if (end !== '') event.endDate = new Date(end);
	$: if (loc !== '') event.location = loc;

	const handleSubmit = () => {
		dispatch('done');
	};
</script>

<form on:submit|preventDefault={handleSubmit}>
	<Input label="name" required={true} bind:value={event.title} focus={true} />
	<Input label="description" bind:value={event.description} />
	<Input type="datetime-local" label="start-time" bind:value={start} />
	<Input type="datetime-local" label="end-time" bind:value={end} />
	<Input label="location" bind:value={loc} />
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
