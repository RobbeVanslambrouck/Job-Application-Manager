<script lang="ts">
	import { createEvent, type Event } from '$lib/Event';
	import { createEventDispatcher } from 'svelte';
	import Input from './Input.svelte';

	const dispatch = createEventDispatcher();

	export let events: Event[] = [];

	let name = '';
	let description = '';
	let start = '';
	let end = '';
	let location = '';

	const handleSubmit = () => {
		const event = createEvent(name);
		event.description = description;
		event.location = location;
		if (start !== '') event.startDate = new Date(start);
		if (end !== '') event.endDate = new Date(end);

		events = [...events, event];

		dispatch('done');
	};
</script>

<form on:submit|preventDefault={handleSubmit}>
	<Input label="name" required={true} bind:value={name} />
	<Input label="description" bind:value={description} />
	<Input type="datetime-local" label="start-time" bind:value={end} />
	<Input type="datetime-local" label="end-time" bind:value={end} />
	<Input label="location" bind:value={location} />
	<div class="buttons">
		<button type="submit">add event</button>
		<button
			type="button"
			on:click={() => {
				dispatch('done');
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
