<script lang="ts">
	import { createEvent, type IEvent } from '$lib/Event';

	export let events: IEvent[] = [];

	let title = '';
	let description = '';
	let start = '';
	let end = '';
	let location = '';

	const handleSubmit = () => {
		const event = createEvent(title);
		event.description = description;
		if (start !== '') event.startDate = new Date(start);
		if (end !== '') event.endDate = new Date(end);
		if (location !== '') event.location = location;

		events = [...events, event];
	};
</script>

<form on:submit|preventDefault={handleSubmit}>
	<label for="title">title</label>
	<input type="text" name="title" id="title" bind:value={title} required />
	<label for="description">description</label>
	<input type="text" name="description" id="event-description" bind:value={description} />
	<label for="start-time">start time</label>
	<input type="datetime-local" name="start-time" id="event-start-time" bind:value={start} />
	<label for="end-time">end time</label>
	<input type="datetime-local" name="end-time" id="event-end-time" bind:value={end} />
	<label for="location">location</label>
	<input type="text" name="location" id="event-location" bind:value={location} />
	<button type="submit">add event</button>
</form>

<style>
	label {
		display: block;
	}

	button {
		display: block;
	}
</style>
